<script setup lang="ts">
import InputView from '../components/InputView.vue';
import Skill from '../components/Skill.vue';
import Virtue from '../components/Virtue.vue';
import FourClock from '../components/FourClock.vue';
import GenericLevel from '../components/GenericLevel.vue';
import Items from '../components/Items.vue';
import ItemList from '../components/ItemList.vue';
import '../style.css'; 
import { ref, reactive, computed, watchEffect } from 'vue';

let editing = ref(false);
let showItems = ref(false);

let inputMode: boolean = false;
const savedUser = localStorage.getItem("user");
const parsedUser = savedUser ? JSON.parse(savedUser) : {};
const user = reactive({
    name: ref(parsedUser.name),
    class: ref(parsedUser.class),
    crew: ref(parsedUser.crew),
    cover: ref(parsedUser.cover),
    looks: ref(parsedUser.looks),
    heritage: ref(parsedUser.heritage),
    vice: ref(parsedUser.vice),
    deduce: ref(parsedUser.deduce),
    sense: ref(parsedUser.sense),
    locate: ref(parsedUser.locate),
    appraise: ref(parsedUser.appraise),
    control: ref(parsedUser.control),
    finess: ref(parsedUser.finess),
    prowl: ref(parsedUser.prowl),
    wreck: ref(parsedUser.wreck),
    captivate: ref(parsedUser.captivate),
    command: ref(parsedUser.command),
    convince: ref(parsedUser.convince),
    feign: ref(parsedUser.feign),
    humility: ref(parsedUser.humility),
    ambition: ref(parsedUser.ambition),
    honesty: ref(parsedUser.honesty),
    creativity: ref(parsedUser.creativity),
    justice: ref(parsedUser.justice),
    mercy: ref(parsedUser.mercy),
    dignity: ref(parsedUser.dignity),
    tolerance: ref(parsedUser.tolerance),
    bravery: ref(parsedUser.bravery),
    caution: ref(parsedUser.caution),
    curiosity: ref(parsedUser.curiosity),
    loyalty: ref(parsedUser.loyalty),
    activeHumility: ref(parsedUser.activeHumility ?? parsedUser.humility ?? 0),
    activeAmbition: ref(parsedUser.activeAmbition ?? parsedUser.humility ?? 0),
    activeHonesty: ref(parsedUser.activeHonesty ?? parsedUser.humility ?? 0),
    activeHreativity: ref(parsedUser.activeHreativity ?? parsedUser.humility ?? 0),
    activeHustice: ref(parsedUser.activeHustice ?? parsedUser.humility ?? 0),
    activeHercy: ref(parsedUser.activeHercy ?? parsedUser.humility ?? 0),
    activeHignity: ref(parsedUser.activeHignity ?? parsedUser.humility ?? 0),
    activeHolerance: ref(parsedUser.activeHolerance ?? parsedUser.humility ?? 0),
    activeHravery: ref(parsedUser.activeHravery ?? parsedUser.humility ?? 0),
    activeHaution: ref(parsedUser.activeHaution ?? parsedUser.humility ?? 0),
    activeHuriosity: ref(parsedUser.activeHuriosity ?? parsedUser.humility ?? 0),
    activeHoyalty: ref(parsedUser.activeHoyalty ?? parsedUser.humility ?? 0),
    stress: ref(parsedUser.stress),
    mentalXp: ref(parsedUser.mentalXp),
    physicalXp: ref(parsedUser.physicalXp),
    socialXp: ref(parsedUser.socialXp),
    struggleOrExpress: ref(parsedUser.struggleOrExpress),
    heal: ref(parsedUser.heal),
    trauma: ref(parsedUser.trauma),
    harm3: ref(parsedUser.harm3),
    harm21: ref(parsedUser.harm21),
    harm22: ref(parsedUser.harm22),
    harm11: ref(parsedUser.harm11),
    harm12: ref(parsedUser.harm12),
    specialSkills: ref(parsedUser.specialSkills),
    specialItems: ref(parsedUser.specialItems),
    specialArmour: ref(parsedUser.specialArmour),
    crafting: ref(parsedUser.crafting),
    loadLevel: ref(parsedUser.loadLevel ?? 0),
    load1: ref(parsedUser.load1),
    load2: ref(parsedUser.load2),
    load3: ref(parsedUser.load3),
    load4: ref(parsedUser.load4),
    load5: ref(parsedUser.load5),
    load6: ref(parsedUser.load6),
    load7: ref(parsedUser.load7),
    load8: ref(parsedUser.load8),
    load9: ref(parsedUser.load9),
    load0: ref(parsedUser.load0),
    coin: ref(parsedUser.coin),
    stash: ref(parsedUser.stash),
    specialArmourToggle: ref(parsedUser.specialArmourToggle),
    });

watchEffect(()=>{
    console.log('saving', user.name, user.class, user.crew, user.cover, user.looks, user.heritage, user.vice, user.deduce, user.sense, user.locate, user.appraise, user.control, user.finess, user.prowl, user.wreck, user.captivate, user.command, user.convince, user.feign, user.humility, user.ambition, user.honesty, user.creativity, user.justice, user.mercy, user.dignity, user.tolerance, user.bravery, user.caution, user.curiosity, user.loyalty, user.stress, user.mentalXp, user.physicalXp, user.socialXp, user.struggleOrExpress, user.heal, user.heal, user.trauma, user.harm3, user.harm21, user.harm22, user.harm11, user.harm12, user.specialSkills, user.specialItems, user.loadLevel, user.load1, user.load2, user.load3, user.load4, user.load5, user.load6, user.load7, user.load8, user.load9, user.load0, user.coin, user.stash, user.specialArmour, user.crafting, user.specialArmourToggle);

    localStorage.setItem("user", JSON.stringify(user));
});
const getLoadIndex = (index:  number) => user[`load${index}`] || '';
const setLoadIndex = (index:  number, load: string) => user[`load${index}`] = load;
const numberOfItems = computed(()=>user.loadLevel ? user.loadLevel * 2 + 1: 0);
const mental = computed(()=>{return [user.deduce, user.sense, user.locate, user.appraise].filter(s=>s>0).length});

const physical = computed(()=>{return [user.control, user.prowl, user.wreck, user.finess].filter(s=>s>0).length});

const social = computed(()=>{return [user.convince, user.captivate, user.command, user.feign].filter(s=>s>0).length});

const load = computed(()=>Array.from({ length: 1 + user.loadLevel*2}, (value, index) => index));
</script>

<template>
  <main class="mr-6 dark:bg-neutral-900 dark:text-neutral-200 rounded-sm bg-neutral-50 pt-20 h-full relative">
      <div class="flex flex-col absolute top-4 right-4" >
          <div class="w-8 h-8 rounded-md border cursor-pointer" :onClick="() => editing = !editing" :class="{['bg-amber-500']:editing}" />
        </div>
  <div class="w-full flex justify-center">
      <div class="flex justify-center dark:border-neutral-400 border-y-1 border-x-0 border border-neutral-600 my-4 w-3/4">
          <InputView noBorder :editing="editing" placeholder="name" :onChange="t => user.name = t" :value="user.name" />
          <!-- <InputView :value="user.name" placeholder="name" onClick="t => user.name = t" :editing="editing"/> -->
      </div>
      </div>
      <div class="flex justify-center">
          <div class="">
              <InputView placeholder="class : specialization" :value="user.class" :onChange="t => user.class = t" :editing="editing"/> 
          </div>
          <div class="mx-12">X</div>
          <div class="">
              <InputView class="h-8 dark:bg-neutral-700 p-2 text-center"  :value="user.crew" placeholder="Crew" :onChange="t => user.crew = t" :editing="editing"/> 
          </div>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-3">
        <div class="flex flex-col">
            <div class="my-4 mx-2 flex flex-col ">
                <InputView placeholder="Cover" :value="user.cover" :onChange="t => user.cover = t" :editing="editing"/> 
                <InputView textArea placeholder="Looks" :value="user.looks" :onChange="t => user.looks = t" :editing="editing"/> 
                <InputView placeholder="Heritage" :value="user.heritage" :onChange="t => user.heritage = t" :editing="editing"/> 
                <InputView placeholder="Vice" :value="user.vice" :onChange="t => user.vice = t" :editing="editing"/> 
            </div> 
            <div class="my-4 mx-2 flex items-center flex-col ">
                <div class="font-bold border-b-1 border-b text-center w-4/5 border-neutral-300">Virtues</div>
                <Virtue titleLeft="Humility" :levelLeft="user.humility" :setLevelLeft="(l) => user.humility = l" titleRight="Ambition" :levelRight="user.ambition" :setLevelRight="(l) => user.ambition = l" :activeLevelLeft="user.activeHumility" :setActiveLevelLeft="(l) => user.activeHumility = l" :activeLevelRight="user.activeAmbition" :setActiveLevelRight="(l) => user.activeambition = l" :editing="editing"/>
               <Virtue titleLeft="Honesty" :levelLeft="user.honesty" :setLevelLeft="(l) => user.honesty = l" titleRight="Creativity" :levelRight="user.creativity" :setLevelRight="(l) => user.creativity = l" :activeLevelLeft="user.activeHonesty" :setActiveLevelLeft="(l) => user.activeHonesty = l" :activeLevelRight="user.activeCreativity" :setActiveLevelRight="(l) => user.activeCreativity = l" :editing="editing"/>
               <Virtue titleLeft="Justice" :levelLeft="user.justice" :setLevelLeft="(l) => user.justice = l" titleRight="Mercy" :levelRight="user.mercy" :setLevelRight="(l) => user.mercy = l" :activeLevelLeft="user.activeJustice" :setActiveLevelLeft="(l) => user.activeJustice = l" :activeLevelRight="user.activeMercy" :setActiveLevelRight="(l) => user.activeMercy = l" :editing="editing"/>
               <Virtue titleLeft="Dignity" :levelLeft="user.dignity" :setLevelLeft="(l) => user.dignity = l" titleRight="Tolerance" :levelRight="user.tolerance" :setLevelRight="(l) => user.tolerance = l" :activeLevelLeft="user.activeDignity" :setActiveLevelLeft="(l) => user.activeDignity = l" :activeLevelRight="user.activeTolerance" :setActiveLevelRight="(l) => user.activeTolerance = l" :editing="editing"/>
               <Virtue titleLeft="Bravery" :levelLeft="user.bravery" :setLevelLeft="(l) => user.bravery = l" titleRight="Caution" :levelRight="user.caution" :setLevelRight="(l) => user.caution = l" :activeLevelLeft="user.activeBravery" :setActiveLevelLeft="(l) => user.activeBravery = l" :activeLevelRight="user.activeCaution" :setActiveLevelRight="(l) => user.activeCaution = l" :editing="editing"/>
               <Virtue titleLeft="Curiosity" :levelLeft="user.curiosity" :setLevelLeft="(l) => user.curiosity = l" titleRight="Loyalty" :levelRight="user.loyalty" :setLevelRight="(l) => user.loyalty = l" :activeLevelLeft="user.activeCuriosity" :setActiveLevelLeft="(l) => user.activeCuriosity = l" :activeLevelRight="user.activeLoyalty" :setActiveLevelRight="(l) => user.activeLoyalty = l" :editing="editing"/>
            </div>

            <div class="my-4 mx-2 p-2 flex flex-col">
                <div class="flex w-full justify-center">
                    <div class="flex flex-col">
                        <GenericLevel title="Stress" :level="user.stress" :maxLevel="10" :setLevel="(l) => user.stress = l"/>
                          <input class=" w-full h-8 dark:bg-neutral-700 p-2 text-center"  :value="user.trauma" placeholder="Trauma" @input="e => user.trauma = e.target.value"/> 
                    </div>
                    <div class="items-center justify-center flex flex-col">
                        <div>Heal</div>
                        <FourClock :level="user.heal" :setLevel="(l) => user.heal = l"/>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <div class="font-bold border-b-1 border-b text-center w-4/5 border-neutral-300">Harm</div>

                    <div class="mt-2 gap-1 grid grid-cols-2">
                        <div class="col-span-2">
                              <input class="h-8 w-full dark:bg-neutral-700 p-2 text-center"  :value="user.harm3" placeholder="3" @input="e => user.harm3 = e.target.value"/> 
                        </div>

                        <div class="">
                              <input class="h-8 w-full dark:bg-neutral-700 p-2 text-center"  :value="user.harm21" placeholder="2" @input="e => user.harm21 = e.target.value"/> 
                        </div>
                        <div class="">
                              <input class="w-full h-8 dark:bg-neutral-700 p-2 text-center"  :value="user.harm22" placeholder="2" @input="e => user.harm22 = e.target.value"/> 
                        </div>
                        <div class="">
                              <input class="h-8 w-full dark:bg-neutral-700 p-2 text-center"  :value="user.harm11" placeholder="1" @input="e => user.harm11 = e.target.value"/> 
                        </div>
                        <div class="">
                              <input class="w-full h-8 dark:bg-neutral-700 p-2 text-center"  :value="user.harm12" placeholder="1" @input="e => user.harm12 = e.target.value"/> 
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div class="flex flex-col">
            <div class="flex flex-col mt-4">

                <div class="mx-2 flex flex-col dark:bg-neutral-100 bg-neutral-800 dark:text-neutral-800 text-neutral-200">
                    <Skill title="Mental" :level="mental" :computedLevel="true"/>
                </div>

                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Get a sense of value, strengths and weaknesses</div>
                    <Skill title="Appraise" :level="user.appraise" :setLevel="(l) => {user.appraise = l}" />
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Make a logical conclusion, a precise translation</div>
                    <Skill title="Deduce" :level="user.deduce" :setLevel="(l) => {user.deduce = l}" />
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 ">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Find what is hidden, a trace of who passed here before</div>
                    <Skill title="Locate" :level="user.locate" :setLevel="(l) => {user.locate = l}" />
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 ">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Become aware of threats or sense motives</div>
                    <Skill title="Sense" :level="user.sense" :setLevel="(l) => {user.sense = l}" />
                </div>

                <div class="mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 dark:bg-neutral-100 bg-neutral-800 dark:text-neutral-800 text-neutral-200">
                    <Skill title="Physical" :level="physical" :computedLevel="true"/>
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 ">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Slow things down, stabilize, hold something back</div>
                    <Skill title="Control" :level="user.control" :setLevel="(l) => {user.control = l}" />
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 ">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Achieve accuracy, fidelity, exactness</div>
                    <Skill title="Finess" :level="user.finess" :setLevel="(l) => {user.finess = l}" />
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 ">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Move silently, discretely, subtly</div>
                    <Skill title="Prowl" :level="user.prowl" :setLevel="(l) => {user.prowl = l}" />
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 ">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Cause chaos, destruction and damage</div>
                    <Skill title="Wreck" :level="user.wreck" :setLevel="(l) => {user.wreck = l}" />
                </div>
                <div class="mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 dark:bg-neutral-100 bg-neutral-800 dark:text-neutral-800 text-neutral-200">
                    <Skill title="Social" :level="social" :computedLevel="true" />
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 ">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Capture the attention, distract, entertain, disgust or attract</div>
                    <Skill title="Captivate" :level="user.captivate" :setLevel="(l) => {user.captivate = l}" />
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 ">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Ensure subordination based on fear or loyalty</div>
                    <Skill title="Command" :level="user.command" :setLevel="(l) => {user.command = l}" />
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 ">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Pretend to be something or someone you are not</div>
                    <Skill title="Convince" :level="user.convince" :setLevel="(l) => {user.convince = l}" />
                </div>
                <div class="group relative mx-2 flex flex-col dark:border-neutral-400 border border-neutral-600 ">
                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Influence opinions, preferences or beliefs</div>
                    <Skill title="Feign" :level="user.feign" :setLevel="(l) => {user.feign = l}" />
                </div>
            </div>
            <div class="my-8 mx-2 flex flex-col items-center">
                <div class="font-bold border-b-1 border-b text-center w-4/5 border-neutral-300">Xp triggers</div>
                <GenericLevel :level="user.physicalXp" :setLevel="(l) => user.physicalXp = l" :maxLevel="6" title="Physical"/>
                <GenericLevel :level="user.mentalXp" :setLevel="(l) => user.mentalXp = l" :maxLevel="6" title="Mental"/>
                <GenericLevel :level="user.socialXp" :setLevel="(l) => user.socialXp = l" :maxLevel="6" title="Social"/>
                <GenericLevel :level="user.struggleOrExpress" :setLevel="(l) => user.struggleOrExpress = l" :maxLevel="8" title="Special ability" :breakAt="6"/>

            </div>
            <div class="my-1 mx-2 flex justify-center gap-2">
                <div class="flex flex-col">
                        <div class="text-center">Coin</div>
                      <input class="h-8 w-full dark:bg-neutral-700 p-2 text-center"  :value="user.coin" placeholder="0" @input="e => user.coin = e.target.value"/> 
                </div>
                <div class="">
                        <div class="text-center">Stash</div>
                      <input class="w-full h-8 dark:bg-neutral-700 p-2 text-center"  :value="user.stash" placeholder="0" @input="e => user.stash = e.target.value"/> 
                </div>

            </div>
        </div>

        <div class="flex flex-col">
            <div class="my-4 mx-2 flex flex-col ">
                <GenericLevel title="Special armour" :maxLevel="1" :longTitle="true" :level="user.specialArmourToggle" :setLevel="(l) => user.specialArmourToggle = l"/>
                <InputView placeholder="" :onChange="t => user.specialArmour = t" :editing="editing" :value="user.specialArmour"/> 
                <InputView placeholder="Special abilities" :onChange="t => user.specialSkills = t" :editing="editing" textArea :value="user.specialSkills"/> 
                <InputView rows="3" placeholder="Special Items" :onChange="t => user.specialItems = t" :editing="editing" textArea :value="user.specialItems"/> 
                <InputView placeholder="Crafting" :onChange="t => user.crafting = t" :editing="editing" textArea :value="user.crafting"/> 
            </div>
            <div class="my-4 mx-2 flex flex-col">
                <GenericLevel :level="user.loadLevel" :setLevel="(l) => user.loadLevel = l" title="Loadout" :maxLevel="4" :breakAt="4"/>
                <div class="gap-1 grid col-span-2">
                    <input v-for="(i, index) in load" :key="index" class="w-full h-8 dark:bg-neutral-700 p-2 text-center"  :value="getLoadIndex(index)" placeholder="" @input="e => setLoadIndex(index, e.target.value)"/> 
                </div>

                <!-- <Items :maxLoad="numberOfItems()" :setItems="(items) => user.items = items" :items="user.items"/> -->
            </div>
        </div>
      </div>
      <div class="cursor-pointer ml-4" :onClick="() => {showItems = !showItems}">Toggle item list</div>

  <div v-if="showItems" class="w-full md:w-3/4 p-8">
        <ItemList/>
  </div>
  </main>
</template>
