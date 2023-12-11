<script lang="ts">
    export default {
        props: ['level', 'setLevel'],
        setup(props:{
            level: number,
            setLevel: Function,
        }){
            const setLevel = (level:number) => {
                props.setLevel(level);
            };
            return {setLevel};
        }
    }
</script>

<template>
    <div class="mx-2 flex justify-between gap-4 p-1 align-center items-center">
        <div class=" min-w-[38px] grid grid-cols-2 gap-0.5" >
            <div 
                 class="cursor-pointer w-5 h-5 border border-neutral-500 rounded-tl-full" 
                 :class="{ ['bg-amber-600'] : level > 0}"
                 :onClick="() => {level == 1 ? setLevel(0) : setLevel(1)}"
            />
            <div 
                 class="cursor-pointer w-5 h-5 border border-neutral-500 rounded-tr-full" 
                 :class="{ ['bg-amber-600'] : level > 1}"
                 :onClick="() => {level == 2 ? setLevel(1) : setLevel(2)}"
            />
            <div 
                 class="cursor-pointer w-5 h-5 border border-neutral-500 rounded-bl-full" 
                 :class="{ ['bg-amber-600'] : level > 2}"
                 :onClick="() => {level == 3 ? setLevel(2) : setLevel(3)}"
            />
            <div 
                 class="cursor-pointer w-5 h-5 border border-neutral-500 rounded-br-full" 
                 :class="{ ['bg-amber-600'] : level > 3}"
                 :onClick="() => {level == 4 ? setLevel(3) : setLevel(4)}"
            />
        </div>
    </div>
</template>
