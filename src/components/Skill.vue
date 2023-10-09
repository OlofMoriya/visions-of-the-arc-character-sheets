<script setup lang="ts">
    import { computed } from 'vue';
const props = defineProps<{
    title: string,
    level: number,
    computedLevel?: boolean,
    setLevel?: Function,
  
}>()

const first = computed(()=> props.level > 0);
const second = computed(()=> props.level > 1);
const third = computed(()=> props.level > 2);
const forth = computed(()=> props.level > 3);
const setLevel = (level:number) => {
    if (!props.computedLevel) {
        props.setLevel?.(level);
    }
};
</script>

<template>
    <div class="mx-2 flex gap-4 justify-between align-center items-center">
        <div>{{title}}</div>
        <div class="flex gap-1">
            <div class="cursor-pointer w-4 h-4 m-1 border border-neutral-500 rounded-sm" 
                    :class="{ ['bg-amber-600'] : first}"
                    :onClick="()=>props.level == 1 ? setLevel(0) : setLevel(1)"
            />
            <div class="cursor-pointer w-4 h-4 m-1 border border-neutral-500 rounded-sm" 
                    :class="{ ['bg-amber-500'] : second}"
                    :onClick="()=>props.level == 2 ? setLevel(1) : setLevel(2)"
            />
            <div class="cursor-pointer w-4 h-4 m-1 border border-neutral-500 rounded-sm" 
                    :class="{ ['bg-amber-400'] : third}"
                    :onClick="()=>props.level == 3 ? setLevel(2) : setLevel(3)"
            />
            <div class="cursor-pointer w-4 h-4 m-1 border border-neutral-500 rounded-sm" 
                    :class="{ ['bg-amber-300'] : forth}"
                    :onClick="()=>props.level == 4 ? setLevel(3) : setLevel(4)"
            />
            </div>
    </div>
</template>
