<script lang="ts">
    import { ref } from "vue";
    import DiceLog from "./DiceLog.vue";

    export default {
        props:['onRoll', 'onClose', 'alwaysDisplay'],
        components: {DiceLog},
        setup(props:{
            onRoll?: Function,
            onClose?: Function,
            alwaysDisplay?: boolean
        }){

            let timeout: string|number|NodeJS.Timeout;
            let showLog = ref(false);

            const renderIconName = (num: number) => {
                const name = "bi-dice-"+num+"-fill";
                return name;
            }

            return {renderIconName, showLog, DiceLog};
        }
    }
</script>

<template>
    <div class="rounded-b-lg absolute left-4 top-0 w-200 dark:bg-neutral-800 dark:text-neutral-200 bg-neutral-200/90 text-neutral-600 ">
        <div v-if="showLog && onRoll" class="flex py-2 px-2 justify-between">
            <v-icon 
                class="w-6 h-6 cursor-pointer" 
                v-for="i in [1,2,3,4,5,6]" 
                :key="'custom-roll'+i" 
                :name="renderIconName(i)" 
                :onClick="()=>{onRoll?.(i)}"/>
        </div>
        <DiceLog :limit="5" :onChage="()=>{showLog=true}" :showLog="showLog"/>
        <div v-if="showLog && onClose" class="px-4 py-2 text-center cursor-pointer" :onClick="()=>{showLog = false; onClose?.() }">Hide</div>
    </div>
    <div v-if="!showLog" class="absolute left-4 top-4 ">
        <div class="h-6 w-6 rounded-full cursor-pointer bg-neutral-50/80 flex items-center justify-center" :onClick="()=>{showLog = true}">
            <v-icon class="fill-black text-black" :name="renderIconName(6)"/>
        </div>
    </div>
</template>
