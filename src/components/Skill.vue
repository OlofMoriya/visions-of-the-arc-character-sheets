<script lang="ts">
    import { computed } from 'vue';
    export default {
        props:['title', 'level', 'computedLevel', 'setLevel', 'extra', 'onRoll' ],
        setup(props:{
                title: string,
                level: number,
                computedLevel?: boolean,
                setLevel?: Function,
                extra?: boolean,
                onRoll?: Function
            }) {

            const first = computed(()=> props.level > 0);
            const second = computed(()=> props.level > 1);
            const third = computed(()=> props.level > 2);
            const forth = computed(()=> props.level > 3);
            const fifth = computed(()=> props.extra ?? false);

            const setLevel = (level:number) => {
                if (!props.computedLevel) {
                    props.setLevel?.(level);
                }
            };

            return { first, second, third, forth, fifth, setLevel }
        }
    }
</script>

<template>
    <div class="mx-2 flex gap-4 justify-between align-center items-center">
        <div class="cursor-pointer" :onClick="()=>{onRoll(level + (extra ? 1 : 0))}">{{title}}</div>
        <div class="flex gap-1">
            <div 
                v-if="extra" 
                class="cursor-pointer w-4 h-4 m-1 border border-neutral-300 rounded-sm" 
                :class="{ ['bg-rose-600'] : fifth}"
            />
            <div class="cursor-pointer w-4 h-4 m-1 border border-neutral-500 rounded-sm" 
                    :class="{ ['bg-amber-600'] : first}"
                    :onClick="()=>level == 1 ? setLevel(0) : setLevel(1)"
            />
            <div class="cursor-pointer w-4 h-4 m-1 border border-neutral-500 rounded-sm" 
                    :class="{ ['bg-amber-500'] : second}"
                    :onClick="()=>level == 2 ? setLevel(1) : setLevel(2)"
            />
            <div class="cursor-pointer w-4 h-4 m-1 border border-neutral-500 rounded-sm" 
                    :class="{ ['bg-amber-400'] : third}"
                    :onClick="()=>level == 3 ? setLevel(2) : setLevel(3)"
            />
            <div class="cursor-pointer w-4 h-4 m-1 border border-neutral-500 rounded-sm" 
                    :class="{ ['bg-amber-300'] : forth}"
                    :onClick="()=>level == 4 ? setLevel(3) : setLevel(4)"
            />
            </div>
    </div>
</template>
