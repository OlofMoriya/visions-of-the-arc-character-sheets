<script setup lang="ts">
    import { db } from "../firebase";
    import { onSnapshot ,query, collection, where, Timestamp } from "firebase/firestore";
    import { ref } from "vue";

    import GenericLevel from '../components/GenericLevel.vue';

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
</script>

<template>
  <div class="p-8">
      <div class="gap-4 flex flex-col">
        <div v-for="character in characters" :key="character.id">
            <div class="flex gap-4">
                <div class="w-20 h-20 rounded-full overflow-clip">
                    <img :src="'/public/'+character.id+'.jpeg'">
                </div>
                <div class="flex flex-col">
                    <div class="">
                        {{character.name}}
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
  </div>
</template>

