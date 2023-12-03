
<script setup lang="ts">
    import { onSnapshot, query, collection, where, Timestamp } from "firebase/firestore";
    import { db } from "../firebase";

import { ref } from "vue";

let rollsLog = ref([]);
let timeout;
let showLog = ref(false);

    const unsub = onSnapshot(query(collection(db, 'rolls'), where("date", ">", Timestamp.now())), (snapshot) => {
    const log = [];
    snapshot.forEach(doc => {
        log.push(doc.data());
    });
    rollsLog.value = log;
    if (log.length > 0)
        showLog.value = true;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(()=>{
        console.log("timed out"); 
        showLog.value = false;

        }, 10000);
    });

const renderIconName = (num: number) => {
    const name = "bi-dice-"+num+"-fill";
    return name;
}
</script>

<template>
        <div v-if="showLog" class="bg-neutral-200/20 rounded-b-lg p-4 absolute left-4 top-0 w-200">
            <div v-for="(roll,i) in rollsLog" :key="i">
                <div class="p-2">
                    <div class="font-bold">{{roll.character}}</div>
                    <div>{{roll.message}}</div>
                    <div class="flex flex-row">
                        <v-icon v-for="(r,i) in roll.roll" :name="renderIconName(r)" :key="i"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="rollsLog?.length" class="absolute left-4 top-4 ">
            <div class="h-6 w-6 rounded-full cursor-pointer bg-neutral-50/80 flex items-center justify-center" :onClick="()=>{showLog = true}">
                <v-icon :name="renderIconName(6)"/>
            </div>
        </div>
</template>
