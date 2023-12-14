<script lang="ts">
    export default {
        props:['maxLevel', 'level', 'setLevel', 'title', 'breakAt', 'longTitle', 'wide'],
        setup(props:{
            maxLevel: number,
            level: number,
            setLevel?: Function,
            title?: string,
            breakAt?: number,
            longTitle?: boolean,
            wide?: boolean
        }){
            const items = Array.from({ length: props.maxLevel}, (_, index) => index);
            const setLevel = (level:number) => {
                    props.setLevel(level);
            };
            return {items, setLevel}
        }
    }
</script>

<template>
    <div class="grid-cols-1 grid-cols-2 grid-cols-4 grid-cols-6 grid-cols-10 grid-cols-12"/>
    <div class="flex justify-between gap-4 py-1 align-center items-center"
         :class="{['w-full']:wide}">
        <div :class="{['w-20'] : !longTitle}">{{title}}</div>
        <div class="grid gap-1" :class="{[`grid-cols-${breakAt ?? maxLevel}`]: true}">
            <div v-for="(i) in items" 
                 class="cursor-pointer w-4 h-4 m-1 border border-neutral-500 rounded-sm" 
                 :key="i"
                 :class="{ ['bg-amber-600'] : (i + 1) <= level }"
                 :onClick="() => {i+1 === level ? setLevel(i) : setLevel(i+1)}"
            />
        </div>
    </div>
</template>
