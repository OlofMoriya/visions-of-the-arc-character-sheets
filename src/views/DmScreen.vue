<script setup lang="ts">
    import { db } from "../firebase";
    import { onSnapshot ,query, collection, where, Timestamp, addDoc } from "firebase/firestore";
    import { onMounted, ref } from "vue";

    import DiceBox from "@3d-dice/dice-box";
    import GenericLevel from '../components/GenericLevel.vue';
    import DiceLog from '../components/DiceLog.vue';

    const characters = ref([]);
    
    const unsub = onSnapshot(query(collection(db, 'characters')), (snapshot) => {
        const c = [];
        snapshot.forEach(doc => {
            c.push(doc.data());
        });

        characters.value = c;
    });

    const getHarm = (c) => {
        return [c.harm11, c.harm12, c.harm21, c.harm22, c.harm3].filter(h=>h!=""&&h).join(", ");
    }

let diceBox: DiceBox;
onMounted(() => {
    diceBox = new DiceBox("#dice-box", {
      assetPath: "/dice-box/", // required
      themeColor: '#ffffff'
    });

    diceBox.init().then(() => {
      //diceBox.roll("2d6");
    });
});

async function roll(num: number, message?: string) {
    diceBox.show()
    const result = await diceBox.roll(num + "d6");
    const diceResults = result.map((r: { value: any; }) => r.value);
    const obj = {
        character: "DM",
        character_id: "dm",
        roll: diceResults,
        message: "Rolled " + num + "d6",
        date: Timestamp.now(),
        outcome: num < 1 ? Math.min(...diceResults) : Math.max(...diceResults),
    };
    const docRef = await addDoc(collection(db, "rolls"), obj);
    console.log("Document written with ID: ", docRef.id);
}

</script>
<template>
  <div class="p-8">
      <DiceLog :onRoll="(num)=>{roll(num)}" :onClose="()=>{diceBox.hide()}"/>
      <div class="gap-4 flex flex-col-reverse">
          <div v-for="character in characters" :key="character.id">
              <div class="flex gap-4">
                  <div class="w-20 h-20 rounded-full overflow-clip">
                      <img :src="'/'+character.id+'.jpeg'">
                  </div>
                  <div class="flex flex-col">
                      <div class="">
                          {{character.name}}
                      </div>
                      <div class="hidden">
                          {{character.id}}
                      </div>
                      <GenericLevel title="Stress" :level="character.stress" :maxLevel="10" :setLevel="(l) => {}"/>
                      <GenericLevel title="Loadout" :level="character.loadLevel" :maxLevel="4" :setLevel="(l) => {}"/>
                      <div v-if="character.load" class="w-full h-8 text-neutral-400">{{character.load.filter(l=>l!==" "&&l).join(", ")}}</div> 
                      <div v-if="getHarm(character)" class="w-full h-8 text-neutral-400">{{getHarm(character)}}</div> 
                      <div v-if="character.trauma" class="w-full h-8">Trauma: {{character.trauma}}</div> 
                  </div>
              </div>
          </div>
      </div>
      <div class="pointer-events-none absolute top-10 left-20 right-20 ">
          <div class=" flex h-80 w-full" id="dice-box"/>
          </div>
      </div>
</template>

