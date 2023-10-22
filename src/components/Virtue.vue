<script setup lang="ts">
    import { computed } from 'vue';
const props = defineProps<{
    titleLeft: string,
    titleRight: string,
    levelLeft: number,
    levelRight: number,
    setLevelLeft: Function,
    setLevelRight: Function,
    activeLevelLeft: number,
    activeLevelRight: number,
    setActiveLevelLeft: Function,
    setActiveLevelRight: Function,
    editing: boolean,
}>()

const first = computed(()=> props.levelLeft > 0);
const second = computed(()=> props.levelLeft > 1);
const third = computed(()=> props.levelRight > 0);
const forth = computed(()=> props.levelRight > 1);
const activeFirst = computed(()=> props.activeLevelLeft > 0);
const activeSecond = computed(()=> props.activeLevelLeft > 1);
const activeThird = computed(()=> props.activeLevelRight > 0);
const activeForth = computed(()=> props.activeLevelRight > 1);
const setLevelLeft = (level:number) => {
        if (props.editing){
            props.setLevelLeft(level);
        }
        else if (level <= props.levelLeft) {
            props.setActiveLevelLeft(level);
        }
};
const setLevelRight = (level:number) => {
        if (props.editing){
            props.setLevelRight(level);
        }
        else if (level <= props.levelRight) {
            props.setActiveLevelRight(level);
        }
};

</script>

<template>
    <div class="mx-2 flex gap-4 justify-between pt-1 align-center items-center">
        <div class="flex gap-1">
            <div class="w-20 pr-2 text-right font-bold">{{titleLeft}}</div>
            <div class="cursor-pointer w-3 h-3 m-1 border border-neutral-500 rounded-full" 
                    :class="{ 
                 ['bg-amber-600'] : editing && second, 
                 ['bg-rose-600']: !editing && second && !activeSecond,
                 ['bg-gray-600']: !editing && second && activeSecond
                 }"
                    :onClick="()=>setLevelLeft(editing && second || !editing && activeSecond ? 1 : 2)"
            />
            <div class="cursor-pointer w-3 h-3 m-1 border border-neutral-500 rounded-full" 
                    :class="{ 
                 ['bg-amber-500'] : editing && first, 
                 ['bg-rose-500']: !editing && first && !activeFirst,
                 ['bg-gray-600']: !editing && first && activeFirst
                 }"
                    :onClick="()=>setLevelLeft(editing && first || !editing && activeFirst ? 0 : 1)"
            />
            <div class="w-3 h-3 m-1 border bg-neutral-700 rounded-full" 
            />
            <div class="cursor-pointer w-3 h-3 m-1 border border-neutral-500 rounded-full" 
                    :class="{ 
                 ['bg-amber-500'] : third,
                 ['bg-rose-500']: !editing && third && !activeThird,
                 ['bg-gray-600']: !editing && third && activeThird
                 }"
                    :onClick="()=>setLevelRight(editing && third || !editing && activeThird ? 0 : 1)"
            />
            <div class="cursor-pointer w-3 h-3 m-1 border border-neutral-500 rounded-full" 
                    :class="{ 
                 ['bg-amber-600'] : forth,
                 ['bg-rose-500']: !editing && forth && !activeForth,
                 ['bg-gray-600']: !editing && forth && activeForth
                 }"
                    :onClick="()=>setLevelRight(editing && forth || !editing && activeForth ? 1 : 2)"
            />
            <div class="w-20 pl-2 text-left font-bold">{{titleRight}}</div>
            </div>
    </div>
</template>
