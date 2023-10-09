<script setup lang="ts">
    import { computed } from 'vue';
const props = defineProps<{
    titleLeft: string,
    titleRight: string,
    levelLeft: number,
    levelRight: number,
    setLevelLeft: Function,
    setLevelRight: Function,
  
}>()

const first = computed(()=> props.levelLeft > 0);
const second = computed(()=> props.levelLeft > 1);
const third = computed(()=> props.levelRight > 0);
const forth = computed(()=> props.levelRight > 1);
const setLevelLeft = (level:number) => {
        props.setLevelLeft(level);
};
const setLevelRight = (level:number) => {
        props.setLevelRight(level);
};

</script>

<template>
    <div class="mx-2 flex gap-4 justify-between pt-1 align-center items-center">
        <div class="flex gap-1">
            <div class="w-20 pr-2 text-right font-bold">{{titleLeft}}</div>
            <div class="cursor-pointer w-3 h-3 m-1 border border-neutral-500 rounded-full" 
                    :class="{ ['bg-amber-600'] : second}"
                    :onClick="()=>second ? setLevelLeft(1) : setLevelLeft(2)"
            />
            <div class="cursor-pointer w-3 h-3 m-1 border border-neutral-500 rounded-full" 
                    :class="{ ['bg-amber-500'] : first}"
                    :onClick="()=>first ? setLevelLeft(0) : setLevelLeft(1)"
            />
            <div class="w-3 h-3 m-1 border bg-neutral-700 rounded-full" 
            />
            <div class="cursor-pointer w-3 h-3 m-1 border border-neutral-500 rounded-full" 
                    :class="{ ['bg-amber-500'] : third}"
                    :onClick="()=>third ? setLevelRight(0) : setLevelRight(1)"
            />
            <div class="cursor-pointer w-3 h-3 m-1 border border-neutral-500 rounded-full" 
                    :class="{ ['bg-amber-600'] : forth}"
                    :onClick="()=>forth ? setLevelRight(1) : setLevelRight(2)"
            />
            <div class="w-20 pl-2 text-left font-bold">{{titleRight}}</div>
            </div>
    </div>
</template>
