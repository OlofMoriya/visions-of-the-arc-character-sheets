<script lang="ts">
    export default {
        props:['items', 'setItems', 'maxLoad', ],
        setup(props: {
            items: Array<Object>,
            setItems: Function,
            maxLoad: number,
        }){}
};

</script>

<template>
    <div class="flex justify-between gap-4 py-1 align-center items-center">
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
