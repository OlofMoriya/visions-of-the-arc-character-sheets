<script setup lang="ts">
    import { onSnapshot, query, collection, where, Timestamp, limit, orderBy } from "firebase/firestore";
    import { db } from "../firebase";

    import { ref } from "vue";

    const props = defineProps<{
        onRoll?: Function,
        onClose?: Function
    }>()

    let rollsLog = ref([]);
    let timeout;
    let showLog = ref(false);

    const unsub = onSnapshot(query(collection(db, 'rolls'), where("date", ">", Timestamp.now()), orderBy("date", "desc"), limit(8)), (snapshot) => {
    const log = [];
    snapshot.forEach(doc => {
        log.push(doc.data());
    });
    rollsLog.value = log;
    if (log.length > 0)
        showLog.value = true;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(()=>{
        showLog.value = false;
        }, 10000);
    });

const renderIconName = (num: number) => {
    const name = "bi-dice-"+num+"-fill";
    return name;
}

</script>

<template>
    <div v-if="showLog" class="bg-neutral-200/90 text-neutral-600 rounded-b-lg p-4 absolute left-4 top-0 w-200 flex flex-col">
        <div class="flex py-2 px-2 justify-between">
            <v-icon 
                class="w-6 h-6 cursor-pointer" 
                v-for="i in [1,2,3,4,5,6]" 
                :key="'custom-roll'+i" 
                :name="renderIconName(i)" 
                :onClick="()=>{onRoll?.(i)}"/>
        </div>
        <div v-for="(roll,i) in rollsLog" :key="i">
            <div class="p-2 border-b border-neutral-800">
                <div class="font-bold">{{roll.character}}</div>
                <div>{{roll.message}}</div>
                <div class="text-emerald-700 text-rose-800"/>
                <div class="flex flex-row">
                    <v-icon 
                     class="w-8 h-8" 
                     v-for="(r,i) in roll.roll" 
                     :class="{
                             ['text-amber-500']: r === roll.outcome && roll.outcome > 3 && roll.outcome < 6, 
                             ['text-rose-800']: r === roll.outcome && roll.outcome < 4,
                             ['text-emerald-700']: r === roll.outcome && roll.outcome === 6,
                             }" 
                     :name="renderIconName(r)" :key="i"
                     />
                </div>
            </div>
        </div>
        <div class="px-4 py-2 text-center cursor-pointer" :onClick="()=>{showLog = false; onClose?.() }">Hide</div>
    </div>
    <div v-else class="absolute left-4 top-4 ">
        <div class="h-6 w-6 rounded-full cursor-pointer bg-neutral-50/80 flex items-center justify-center" :onClick="()=>{showLog = true}">
            <v-icon class="fill-black text-black" :name="renderIconName(6)"/>
        </div>
    </div>
</template>
