<script setup lang="ts">
import hellazgo_map from '../../public/hellazgo.png';
import InputView from '../components/InputView.vue';
import Skill from '../components/Skill.vue';
import Virtue from '../components/Virtue.vue';
import FourClock from '../components/FourClock.vue';
import GenericLevel from '../components/GenericLevel.vue';
import Items from '../components/Items.vue';
import ItemList from '../components/ItemList.vue';
import '../style.css'; 
import { ref, reactive, computed, watchEffect, onMounted } from 'vue';
import DiceBox from "@3d-dice/dice-box";
import { BiDice1Fill } from 'oh-vue-icons/icons';
import { setDoc, addDoc, collection, doc, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import {db} from "../firebase"
import DiceLog from '../components/DiceLog.vue';


let editing = ref(false);
let showItems = ref(false);
let showMap = ref(false);
let showDice = ref(false);

let inputMode: boolean = false;
const savedUser = localStorage.getItem("user");
const parsedUser = savedUser ? JSON.parse(savedUser) : {};
const user = reactive({
    id: ref(parsedUser.id ?? Math.random().toString(36)),
    name: ref(parsedUser.name ?? null),
    class: ref(parsedUser.class ?? null),
    crew: ref(parsedUser.crew ?? null),
    cover: ref(parsedUser.cover ?? null),
    looks: ref(parsedUser.looks ?? null),
    heritage: ref(parsedUser.heritage ?? null),
    vice: ref(parsedUser.vice ?? null),
    deduce: ref(parsedUser.deduce ?? null),
    sense: ref(parsedUser.sense ?? null),
    locate: ref(parsedUser.locate ?? null),
    appraise: ref(parsedUser.appraise ?? null),
    control: ref(parsedUser.control ?? null),
    finess: ref(parsedUser.finess ?? null),
    prowl: ref(parsedUser.prowl ?? null),
    wreck: ref(parsedUser.wreck ?? null),
    captivate: ref(parsedUser.captivate ?? null),
    command: ref(parsedUser.command ?? null),
    convince: ref(parsedUser.convince ?? null),
    feign: ref(parsedUser.feign ?? null),
    humility: ref(parsedUser.humility ?? null),
    ambition: ref(parsedUser.ambition ?? null),
    honesty: ref(parsedUser.honesty ?? null),
    creativity: ref(parsedUser.creativity ?? null),
    justice: ref(parsedUser.justice ?? null),
    mercy: ref(parsedUser.mercy ?? null),
    dignity: ref(parsedUser.dignity ?? null),
    tolerance: ref(parsedUser.tolerance ?? null),
    bravery: ref(parsedUser.bravery ?? null),
    caution: ref(parsedUser.caution ?? null),
    curiosity: ref(parsedUser.curiosity ?? null),
    loyalty: ref(parsedUser.loyalty ?? null),
    notes: ref(parsedUser.notes ?? null),
    activeHumility: ref(parsedUser.activeHumility ?? parsedUser.humility ?? 0 ?? null),
    activeAmbition: ref(parsedUser.activeAmbition ?? parsedUser.ambition ?? 0 ?? null),
    activeHonesty: ref(parsedUser.activeHonesty ?? parsedUser.honesty ?? 0 ?? null),
    activeCreativity: ref(parsedUser.activeCreativity ?? parsedUser.creativity ?? 0 ?? null),
    activeJustice: ref(parsedUser.activeJustice ?? parsedUser.justice ?? 0 ?? null),
    activeMercy: ref(parsedUser.activeMercy ?? parsedUser.mercy ?? 0 ?? null),
    activeDignity: ref(parsedUser.activeDignity ?? parsedUser.dignity ?? 0 ?? null),
    activeTolerance: ref(parsedUser.activeTolerance ?? parsedUser.tolerance ?? 0 ?? null),
    activeBravery: ref(parsedUser.activeBravery ?? parsedUser.bravery ?? 0 ?? null),
    activeCaution: ref(parsedUser.activeCaution ?? parsedUser.caution ?? 0 ?? null),
    activeCuriosity: ref(parsedUser.activeCuriosity ?? parsedUser.curiosity ?? 0 ?? null),
    activeLoyalty: ref(parsedUser.activeLoyalty ?? parsedUser.loyalty ?? 0 ?? null),
    stress: ref(parsedUser.stress ?? null),
    mentalXp: ref(parsedUser.mentalXp ?? null),
    physicalXp: ref(parsedUser.physicalXp ?? null),
    socialXp: ref(parsedUser.socialXp ?? null),
    struggleOrExpress: ref(parsedUser.struggleOrExpress ?? null),
    heal: ref(parsedUser.heal ?? null),
    trauma: ref(parsedUser.trauma ?? null),
    harm3: ref(parsedUser.harm3 ?? null),
    harm21: ref(parsedUser.harm21 ?? null),
    harm22: ref(parsedUser.harm22 ?? null),
    harm11: ref(parsedUser.harm11 ?? null),
    harm12: ref(parsedUser.harm12 ?? null),
    specialSkills: ref(parsedUser.specialSkills ?? null),
    specialItems: ref(parsedUser.specialItems ?? null),
    specialArmour: ref(parsedUser.specialArmour ?? null),
    crafting: ref(parsedUser.crafting ?? null),
    loadLevel: ref(parsedUser.loadLevel ?? 0 ?? null),
    load: ref(parsedUser.load ?? [] ?? null),
    coin: ref(parsedUser.coin ?? null),
    stash: ref(parsedUser.stash ?? null),
    specialArmourToggle: ref(parsedUser.specialArmourToggle ?? null),
    });

watchEffect(async ()=>{
    console.log('saving', user.name, user.class, user.crew, user.cover, user.looks, user.heritage, user.vice, user.deduce, user.sense, user.locate, user.appraise, user.control, user.finess, user.prowl, user.wreck, user.captivate, user.command, user.convince, user.feign, user.humility, user.ambition, user.honesty, user.creativity, user.justice, user.mercy, user.dignity, user.tolerance, user.bravery, user.caution, user.curiosity, user.loyalty, user.stress, user.mentalXp, user.physicalXp, user.socialXp, user.struggleOrExpress, user.heal, user.heal, user.trauma, user.harm3, user.harm21, user.harm22, user.harm11, user.harm12, user.specialSkills, user.specialItems, user.loadLevel, user.coin, user.stash, user.specialArmour, user.crafting, user.specialArmourToggle, user.notes);

    localStorage.setItem("user", JSON.stringify(user));
    if (user.name)
        saveUser();
});

let saveUserTimer;
async function saveUser(){
    
    console.log("id", user.id);
    if (saveUserTimer)
        window.clearTimeout(saveUserTimer);
        
    saveUserTimer = window.setTimeout(async ()=>{
    const docRef = await setDoc(doc(db, "characters", user.id), user);
    
    console.log("updated user", docRef);
    }, 500);
}

const getLoadIndex = (index:  number) => user.load[index] || '';
const setLoadIndex = (index:  number, load: string) => user.load[index] = load;

const numberOfItems = computed(()=>user.loadLevel ? user.loadLevel * 2 + 1: 0);
const mental = computed(()=>{return [user.deduce, user.sense, user.locate, user.appraise].filter(s=>s>0).length});

const physical = computed(()=>{return [user.control, user.prowl, user.wreck, user.finess].filter(s=>s>0).length});

const social = computed(()=>{return [user.convince, user.captivate, user.command, user.feign].filter(s=>s>0).length});

const load = computed(()=>Array.from({ length: 1 + user.loadLevel*2}, (value, index) => index));

let diceBox: DiceBox;
onMounted(() => {
    diceBox = new DiceBox("#dice-box", {
      assetPath: "/public/dice-box/", // required
      themeColor: '#ffffff'
    });

    diceBox.init().then(() => {
      //diceBox.roll("2d6");
    });
});

async function roll(skill: number, message?: string) {
    let num = 0;
    skill = skill + loaded.value;
    switch(skill < 1) {
        case true: 
            num = 2;
            break;
        default: 
            num = skill;
    }
    diceBox.show()
    const result = await diceBox.roll(num + "d6");
    const diceResults = result.map((r: { value: any; }) => r.value);
    const obj = {
        character: user.name || "Unknown",
        character_id: user.id, 
        roll: diceResults,
        message: (message ?? ("Rolled " + num + "d6")) + (skill === 0 ? " for least value": "") + (loaded.value != 0 ? (" loaded with " + loaded.value) : ""),
        date: Timestamp.now(),
        outcome: skill < 1 ? Math.min(...diceResults) : Math.max(...diceResults),
    };
    const docRef = await addDoc(collection(db, "rolls"), obj);
    console.log("Document written with ID: ", docRef.id);
    loaded.value = 0;
}
const loaded = ref(0);
        
function renderLoadedDiceName(pos: boolean) {
    if (pos && loaded.value > 0 || !pos && loaded.value < 0)
        return "bi-dice-"+Math.max(Math.min(Math.abs(loaded.value), 6), 1)+"-fill"
    else 
        return "bi-dice-1-fill"
    
}

</script>

<template>
    <main class="mr-6 dark:bg-neutral-900 dark:text-neutral-200 rounded-sm bg-neutral-50 pt-20 h-full relative">
        <DiceLog :onRoll="(num)=>{roll(num)}" :onClose="()=>{diceBox.hide()}"/>
        <div class="flex gap-6 absolute top-4 right-4" >
            <div class="flex flex-col">           
                <div 
                    class="w-8 h-8 rounded-md border cursor-pointer"  
                    :onClick="() => {showItems = !showItems}" 
                    :class="{['bg-amber-500']:showItems}"/>
                    Items
                </div>
                <div class="flex flex-col">
                    <div class="w-8 h-8 rounded-md border cursor-pointer" :onClick="() => {showMap = !showMap}" :class="{['bg-amber-500']:showMap}" />
                        Map
                    </div>
                    <div class="flex flex-col">
                        <div class="w-8 h-8 rounded-md border cursor-pointer" :onClick="() => editing = !editing" :class="{['bg-amber-500']:editing}" />
                            Edit
                        </div>
                    </div>
                    <div class="gap-8 flex px-8 ">
                        <div class="rounded-full w-24 h-24 overflow-clip bg-white">
                            <img class="w-24 h-24" :src="'/public/'+user.id + '.jpeg'"/>
                        </div>                            
                        <div class="flex flex-col"> 
                            <div class="">
                                <InputView  :editing="editing" placeholder="name" :onChange="t => user.name = t" :value="user.name" />
                            </div>
                            <div class="">
                                <InputView placeholder="class : specialization" :value="user.class" :onChange="t => user.class = t" :editing="editing"/> 
                            </div>
                            <div class="">
                                <InputView :value="user.crew" placeholder="Crew" :onChange="t => user.crew = t" :editing="editing"/> 
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div class="mx-12">
                            <v-icon 
                                :class="{
                                    ['text-amber-300']: loaded < 0 && loaded > -4,
                                    ['text-amber-600']: loaded < -3 && loaded > -6,
                                    ['text-rose-600']: loaded < -5
                                }"
                                :onClick="()=>{
                                    if (loaded == -6)
                                        loaded = 0;
                                    else
                                        loaded--;
                                }" 
                                :name="renderLoadedDiceName(false)"
                                class="mt-5 w-6 h-6 cursor-pointer"
                                /> 
                            <v-icon 
                                :class="{
                                    ['text-emerald-300']: loaded > 0 && loaded < 4,
                                    ['text-emerald-600']: loaded > 3 && loaded < 6,
                                    ['text-emerald-700']: loaded > 5
                                }"
                                :onClick="()=>{
                                    if (loaded == 6)
                                        loaded = 0;
                                    else
                                        loaded++;
                                }" 
                                :name="renderLoadedDiceName(true)"
                                class="mt-5 w-6 h-6 cursor-pointer"
                                /> 
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
                            <div class="my-2 mx-2 flex items-center flex-col ">
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
                                    <Skill :onRoll="(num) => {roll(num, 'Rolled mental')}" title="Mental" :level="mental" :computedLevel="true"/>
                                </div>

                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Get a sense of value, strengths and weaknesses</div>
                                    <Skill :onRoll="(num) => {roll(num, 'Rolled appraise')}" title="Appraise" :level="user.appraise" :setLevel="(l) => {user.appraise = l}" />
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Make a logical conclusion, a precise translation</div>
                                    <Skill title="Deduce" :onRoll="(num) => {roll(num, 'Rolled deduce')}" :level="user.deduce" :setLevel="(l) => {user.deduce = l}" />
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 ">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Find what is hidden, a trace of who passed here before</div>
                                    <Skill title="Locate" :onRoll="(num) => {roll(num, 'Rolled locate')}" :level="user.locate" :setLevel="(l) => {user.locate = l}" />
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 ">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Become aware of threats or sense motives</div>
                                    <Skill title="Sense" :onRoll="(num) => {roll(num, 'Rolled sense')}" :level="user.sense" :setLevel="(l) => {user.sense = l}" />
                                </div>

                                <div class="mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 dark:bg-neutral-100 bg-neutral-800 dark:text-neutral-800 text-neutral-200">
                                    <Skill title="Physical" :onRoll="(num) => {roll(num, 'Rolled physical')}" :level="physical" :computedLevel="true" extra/>
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 ">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Slow things down, stabilize, hold something back</div>
                                    <Skill title="Control" :onRoll="(num) => {roll(num, 'Rolled control')}" :level="user.control" :setLevel="(l) => {user.control = l}" />
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 ">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Achieve accuracy, fidelity, exactness</div>
                                    <Skill title="Finess" :onRoll="(num) => {roll(num, 'Rolled finess')}" :level="user.finess" :setLevel="(l) => {user.finess = l}" />
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 ">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Move silently, discretely, subtly</div>
                                    <Skill title="Prowl" :onRoll="(num) => {roll(num, 'Rolled prowl')}" :level="user.prowl" :setLevel="(l) => {user.prowl = l}" />
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 ">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Cause chaos, destruction and damage</div>
                                    <Skill title="Wreck" :onRoll="(num) => {roll(num, 'Rolled wreck')}" :level="user.wreck" :setLevel="(l) => {user.wreck = l}" />
                                </div>
                                <div class="mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 dark:bg-neutral-100 bg-neutral-800 dark:text-neutral-800 text-neutral-200">
                                    <Skill title="Social" :onRoll="(num) => {roll(num, 'Rolled social')}" :level="social" :computedLevel="true" />
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 ">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Capture the attention, distract, entertain, disgust or attract</div>
                                    <Skill title="Captivate" :onRoll="(num) => {roll(num, 'Rolled captivate')}" :level="user.captivate" :setLevel="(l) => {user.captivate = l}" />
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 ">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Ensure subordination based on fear or loyalty</div>
                                    <Skill title="Command" :onRoll="(num) => {roll(num, 'Rolled command')}" :level="user.command" :setLevel="(l) => {user.command = l}" />
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 ">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Pretend to be something or someone you are not</div>
                                    <Skill title="Convince" :onRoll="(num) => {roll(num, 'Rolled convince')}" :level="user.convince" :setLevel="(l) => {user.convince = l}" />
                                </div>
                                <div class="group relative mx-2 flex flex-col dark:border-neutral-600 border border-neutral-600 ">
                                    <div class="hidden group-hover:block z-10 absolute top-10 left-0 p-1 rounded-s bg-neutral-700">Influence opinions, preferences or beliefs</div>
                                    <Skill title="Feign" :onRoll="(num) => {roll(num, 'Rolled feign')}" :level="user.feign" :setLevel="(l) => {user.feign = l}" />
                                </div>
                            </div>
                                <div class="my-4 mx-2 flex flex-col">
                                    <GenericLevel :level="user.loadLevel" :setLevel="(l) => user.loadLevel = l" title="Loadout" :maxLevel="4" :breakAt="4"/>
                                    <div class="gap-1 grid col-span-2">
                                        <input v-for="(i, index) in load" :key="index" class="w-full h-8 dark:bg-neutral-700 p-2 text-center"  :value="getLoadIndex(index)" placeholder="" @input="e => setLoadIndex(index, e.target.value)"/> 
                                    </div>

                                    <!-- <Items :maxLoad="numberOfItems()" :setItems="(items) => user.items = items" :items="user.items"/> -->
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
                                    <InputView placeholder="Special Items" :onChange="t => user.specialItems = t" :editing="editing" textArea :value="user.specialItems"/> 
                                    <InputView placeholder="Crafting" :onChange="t => user.crafting = t" :editing="editing" textArea :value="user.crafting"/> 
                                </div>
                                <div class="my-2 mx-2 flex flex-col items-center">
                                    <div class="font-bold border-b-1 border-b text-center w-4/5 border-neutral-300">Xp triggers</div>
                                    <GenericLevel :level="user.physicalXp" :setLevel="(l) => user.physicalXp = l" :maxLevel="6" title="Physical"/>
                                    <GenericLevel :level="user.mentalXp" :setLevel="(l) => user.mentalXp = l" :maxLevel="6" title="Mental"/>
                                    <GenericLevel :level="user.socialXp" :setLevel="(l) => user.socialXp = l" :maxLevel="6" title="Social"/>
                                    <GenericLevel :level="user.struggleOrExpress" :setLevel="(l) => user.struggleOrExpress = l" :maxLevel="8" title="Special ability" :breakAt="6"/>

                                </div>
                                <div class="my-4 mx-2 flex flex-col items-center">
                                    <div class="font-bold border-b-1 border-b mb-2 text-center w-4/5 border-neutral-300">Notes</div>
                                    <InputView :rows=6 placeholder="Notes" :editing="true" textArea :onChange="t => user.notes = t" :value="user.notes"/>
                                </div>
                            </div>
                        </div>
                        <div class="pointer-events-none absolute top-10 left-20 right-20 ">
                            <div class=" flex h-80 w-full" id="dice-box"/>
                        </div>

                        <div v-if="showMap" class="p-8 absolute top-10 left-10 right-10">
                            <img :src="hellazgo_map"/>
                        </div>

                        <div v-if="showItems" class="w-full md:w-3/4 p-8">
                            <ItemList/>
                        </div>

        <div v-if="editing">
            <div class="p-2 cursor-no-drop" :onClick="()=>{user.id = null}">Reset id</div>   
        </div>
    </main>
</template>
