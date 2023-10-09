
<script setup lang="ts">
    import { computed } from 'vue';
const props = defineProps<{
    maxLevel: number,
    level: number,
    setLevel?: Function,
    title?: string,
    breakAt?: number,
    longTitle?: boolean,
}>()
const items = Array.from({ length: props.maxLevel}, (value, index) => index);
const setLevel = (level:number) => {
        props.setLevel(level);
};
</script>

<template>
    <div class="grid-cols-6 grid-cols-10 grid-cols-12"/>
    <div class="flex justify-between gap-4 py-1 align-center items-center">
        <div :class="{['w-20'] : !longTitle}">{{title}}</div>
        <div class="grid gap-1" :class="{[`grid-cols-${breakAt ?? maxLevel}`]: true}">
            <div v-for="(i) in items" 
                 class="cursor-pointer w-4 h-4 m-1 border border-neutral-500 rounded-sm" 
                 :key="i"
                 :class="{ ['bg-amber-600'] : (i + 1) <= props.level }"
                 :onClick="() => {i+1 === props.level ? setLevel(i) : setLevel(i+1)}"
            />
        </div>
    </div>
</template>
