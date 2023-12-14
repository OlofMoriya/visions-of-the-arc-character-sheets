<script lang="ts">
    import { onSnapshot, query, collection, where, Timestamp, limit, orderBy } from "firebase/firestore";
    import { db } from "../firebase";
    import { ref } from "vue";

    export default {
        props:['onUpdate', 'limit', 'showLog'],
        setup(props:{
            onUpdate?: Function,
            limit?: number
            showLog?: boolean
        }){
            let rollsLog = ref([]);
            const unsub = onSnapshot(query(collection(db, 'rolls'), where("date", ">", Timestamp.now()), orderBy("date", "desc"), limit(8)), (snapshot) => {
                const log = [];
                let i = 0;
                snapshot.forEach(doc => {
                    log.push(doc.data());
                });
                rollsLog.value = log;
                if (log.length > 0){
                    props.onUpdate?.()
                }

            });

            const renderIconName = (num: number) => {
                const name = "bi-dice-"+num+"-fill";
                return name;
            }

            return {renderIconName, rollsLog};
        }
    }

</script>

<template>
    <div v-if="showLog !== false" class="w-full dark:bg-neutral-800 dark:text-neutral-200 bg-neutral-200/90 text-neutral-600 rounded-b-lg p-4 flex flex-col">
        <div v-for="(roll,i) in rollsLog" :key="i">
            <div class="p-2 border-b border-neutral-800">
                <div class="flex gap-2">
                    <div class="w-12 h-12 rounded-full overflow-clip">
                        <img :src="'/'+roll.character_id+'.jpeg'"/>
                    </div>
                    <div>
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
            </div>
        </div>
    </div>
</template>
