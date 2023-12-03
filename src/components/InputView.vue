
<script setup lang="ts">
const props = defineProps<{
    value: string,
    onChange: Function,
    placeholder: string,
    editing: boolean,
    textArea?: boolean,
    noBorder?: boolean,
}>()

</script>
<template>
    <input v-if="editing && !textArea" class="w-full h-8 dark:bg-neutral-700 p-2 text-center" :value="props.value" :placeholder="props.placeholder" @input="e => props.onChange(e.target.value)"/>
    <textarea v-if="editing && textArea" rows=3 class="w-full dark:bg-neutral-700 p-2 text-center " :value="props.value" :placeholder="props.placeholder" @input="e => props.onChange(e.target.value)"/>
        <div v-if="!editing" class="p-1 pb-2 text-neutral-900 dark:text-neutral-100 text-lg" :class="{['border-b border-neutral-200']:!props.noBorder }">
        <div class="text-neutral-400 text-xs">
            {{props.placeholder}}
        </div>
        <div>
            {{props.value}}
        </div>
    </div>
</template>
