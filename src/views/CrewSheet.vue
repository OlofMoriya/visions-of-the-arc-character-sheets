<script setup lang="ts">
    import InputView from '../components/InputView.vue';
    import Skill from '../components/Skill.vue';
    import Virtue from '../components/Virtue.vue';
    import FourClock from '../components/FourClock.vue';
    import GenericLevel from '../components/GenericLevel.vue';
    import Items from '../components/Items.vue';
    import ItemList from '../components/ItemList.vue';
    import '../style.css'; 
    import { ref, reactive, computed, watchEffect, onMounted } from 'vue';
    import { BiDice1Fill } from 'oh-vue-icons/icons';
    import { setDoc, addDoc, collection, doc, onSnapshot, query, Timestamp, where } from "firebase/firestore";
    import {db} from "../firebase"

    function setGroup(parsedGroup:any) {
          group.id = parsedGroup.id;
          group.name = parsedGroup.name;
          group.reputation = parsedGroup.reputation;
          group.inItFor = parsedGroup.inItFor;
          group.motto = parsedGroup.motto;
          group.members = parsedGroup.members;
          group.lairCoverStory = parsedGroup.lairCoverStory;
          group.lairLocation = parsedGroup.lairLocation;
          group.coverStoryStrength = parsedGroup.coverStoryStrength;
          group.vaultSize = parsedGroup.vaultSize;
          group.lairSecurity = parsedGroup.lairSecurity;
          group.numberOfBeds = parsedGroup.numberOfBeds;
          group.workbenches = parsedGroup.workbenches;
          group.heat = parsedGroup.heat;
          group.rep = parsedGroup.rep;
          group.wantedLevel = parsedGroup.wantedLevel;
          group.tier = parsedGroup.tier;
          group.cohortDamage1 = parsedGroup.cohortDamage1;
          group.cohortDamage2 = parsedGroup.cohortDamage2;
          group.cohortDamage3 = parsedGroup.cohortDamage3;
          group.cohortDamage4 = parsedGroup.cohortDamage4;
          group.familyType = parsedGroup.familyType;
          group.coin = parsedGroup.coin;
          group.vaultContents = parsedGroup.vaultContents;
          group.specialCrewAbilities = parsedGroup.specialCrewAbilities;
    }

    const savedGroup = localStorage.getItem('group');
    const parsedGroup = savedGroup ? JSON.parse(savedGroup) : {};
    console.log("parsed", parsedGroup);
    let group = reactive({
          id: ref(parsedGroup.id ?? Math.random().toString(36)),
          name: ref(parsedGroup.name ?? null),
          reputation: ref(parsedGroup.reputation ?? null),
          inItFor: ref(parsedGroup.inItFor ?? null),
          motto: ref(parsedGroup.motto ?? null),
          members: ref(parsedGroup.members ?? []),
          lairCoverStory: ref(parsedGroup.lairCoverStory ?? null),
          lairLocation: ref(parsedGroup.lairLocation ?? null),
          coverStoryStrength: ref(parsedGroup.coverStoryStrength ?? null),
          vaultSize: ref(parsedGroup.vaultSize ?? null),
          lairSecurity: ref(parsedGroup.lairSecurity ?? null),
          numberOfBeds: ref(parsedGroup.numberOfBeds ?? null),
          workbenches: ref(parsedGroup.workbenches ?? null),
          heat: ref(parsedGroup.heat ?? 0),
          rep: ref(parsedGroup.rep ?? 0),
          wantedLevel: ref(parsedGroup.wantedLevel ?? 0),
          tier: ref(parsedGroup.tier ?? 0),
          cohortDamage1: ref(parsedGroup.cohortDamage1 ?? null),
          cohortDamage2: ref(parsedGroup.cohortDamage2 ?? null),
          cohortDamage3: ref(parsedGroup.cohortDamage3 ?? null),
          cohortDamage4: ref(parsedGroup.cohortDamage4 ?? null),
          familyType: ref(parsedGroup.familyType ?? null),
          coin: ref(parsedGroup.coin ?? null),
          vaultContents: ref(parsedGroup.vaultContents ?? null),
          specialCrewAbilities: ref(parsedGroup.specialCrewAbilities ?? null)
        });
    setGroup(parsedGroup);


    let editing = ref(false);

    onMounted(async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');

      if (id || parsedGroup.id) {
        console.log("Id parameter found:", id);
        localStorage.setItem("group", JSON.stringify({id}));
        group.id = id ?? parsedGroup.id;
      }

      if (group.id) {
        console.log("why undefined", group.id);
        const unsub = onSnapshot(doc(db, "crews", group.id), (doc) => {
            console.log("Current data: ", doc.data());
            if (JSON.stringify(doc.data()) != JSON.stringify(group)){
                console.log("not same data from snapshot", doc.data()); 
                setGroup(doc.data());            
            }
        });   
      }

    watchEffect(async () => {
            console.log('saving', group.name, group.reputation, group.inItFor, group.motto, group.members, group.lairCoverStory, group.lairLocation, group.coverStoryStrength, group.vaultSize, group.lairSecurity, group.numberOfBeds, group.workbenches, group.heat, group.rep, group.wantedLevel, group.tier, group.cohortDamage1,group.cohortDamage2, group.cohortDamage3, group.cohortDamage4, group.familyType, group.coin, group.vaultContents, group.specialCrewAbilities, );

            localStorage.setItem("group", JSON.stringify(group));
            if (group.name)
                saveGroup();
        });
    });

    let saveUserTimer: number;
    async function saveGroup(){
        console.log("id", group.id);
        if (saveUserTimer)
            window.clearTimeout(saveUserTimer);
            
            saveUserTimer = window.setTimeout(async ()=>{
            const docRef = await setDoc(doc(db, "crews", group.id), group);
            
            console.log("updated group", docRef);
        }, 500);
    }

</script>

<template>
    <main class="flex flex-col justify-center mr-6 dark:bg-neutral-900 gap-10 dark:text-neutral-200 rounded-sm bg-neutral-50 h-full p-8">
        <div class="flex gap-6 absolute top-4 right-4" >
            <div class="flex flex-col">           
                <div class="flex flex-col">
                    <div class="flex flex-col">
                        <div class="w-8 h-8 rounded-md border cursor-pointer" :onClick="() => editing = !editing" :class="{['bg-amber-500']:editing}" />
                        Edit
                    </div>
                </div>
            </div>
        </div>
        <div class="items-center justify-center gap-8 flex px-8 ">
            <div class="">
                <InputView  :editing="editing" placeholder="Name" :onChange="t => group.name = t" :value="group.name" />
            </div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
                <InputView placeholder="Motto" :value="group.motto" :onChange="t => group.motto = t" :editing="editing"/> 
                <InputView placeholder="Reputation" :value="group.reputation" :onChange="t => group.reputation = t" :editing="editing"/>
                <InputView placeholder="In It For" :value="group.inItFor" :onChange="t => group.inItFor = t" :editing="editing"/>
            </div>
            <div>
                <GenericLevel title="Heat" :maxLevel="10" :level="group.heat" :setLevel="(l) => group.heat = l"/>
                <GenericLevel title="Rep" :maxLevel="10" :level="group.rep" :setLevel="(l) => group.rep = l"/>
                <GenericLevel title="Wanted Level" :longTitle="true" :maxLevel="4" :level="group.wantedLevel" :setLevel="(l) => group.wantedLevel = l"/>
                <GenericLevel title="Tier" :maxLevel="6" :level="group.tier" :setLevel="(l) => group.tier = l"/>
            </div>
            <div>
                <InputView placeholder="Lair Cover Story" :value="group.lairCoverStory" :onChange="t => group.lairCoverStory = t" :editing="editing"/>
                <InputView placeholder="Lair Location" :value="group.lairLocation" :onChange="t => group.lairLocation = t" :editing="editing"/>
            </div>
            <div>  
                <InputView placeholder="Family Type" :value="group.familyType" :onChange="t => group.familyType = t" :editing="editing"/>
                <InputView placeholder="Coin" :value="group.coin" :onChange="t => group.coin = t" :editing="editing"/>
                <InputView placeholder="Vault Contents" :value="group.vaultContents" :onChange="t => group.vaultContents = t" :editing="editing"/>
                <InputView :textArea="true" :rows=6 placeholder="Special Crew Abilities" :value="group.specialCrewAbilities" :onChange="t => group.specialCrewAbilities = t" :editing="editing"/>
            </div>
            <div>
                <Skill :editing="true" title="Cohort Damage" :level="group.cohortDamage1" :setLevel="(l) => {group.cohortDamage1 = l}" />
                <Skill :editing="true" title="Cohort Damage" :level="group.cohortDamage2" :setLevel="(l) => {group.cohortDamage2 = l}" />
                <Skill :editing="true" title="Cohort Damage" :level="group.cohortDamage3" :setLevel="(l) => {group.cohortDamage3 = l}" />
                <Skill :editing="true" title="Cohort Damage" :level="group.cohortDamage4" :setLevel="(l) => {group.cohortDamage4 = l}" />
            </div>
            <div>
                <InputView placeholder="Cover Story Strength" :value="group.coverStoryStrength" :onChange="t => group.coverStoryStrength = t" :editing="editing"/>
                <InputView placeholder="Vault Size" :value="group.vaultSize" :onChange="t => group.vaultSize = t" :editing="editing"/>
                <InputView placeholder="Lair Security" :value="group.lairSecurity" :onChange="t => group.lairSecurity = t" :editing="editing"/>
                <InputView placeholder="Number of Beds" :value="group.numberOfBeds" :onChange="t => group.numberOfBeds = t" :editing="editing"/>
                <InputView placeholder="Workbenches" :value="group.workbenches" :onChange="t => group.workbenches = t" :editing="editing"/>
            </div>

            <div class="flex flex-col">
                <div v-for="(member, index) in group.members" :key="index" class="w-12 h-12 rounded-full overflow-clip">
                    <img :src="'/'+member+'.jpeg'"/>
                </div>
            </div>
        </div>
    </main>
</template>
