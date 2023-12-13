<script lang="ts">
    export default {
        props:['value', 'onChange', 'placeholder', 'editing', 'textArea', 'noBorder', 'rows', ],
        setup(props: {
                value: string,
                onChange: Function,
                placeholder: string,
                editing: boolean,
                textArea?: boolean,
                noBorder?: boolean,
                rows?: number
            }){ }
    }
</script>

<template>
    <input 
        v-if="editing && !textArea" 
        class="mb-1 w-full h-8 dark:bg-neutral-700 p-2 text-center" 
        :value="value" 
        :placeholder="placeholder" 
        @input="e => onChange(e.target.value)"
    />
    <textarea 
        v-if="editing && textArea" 
        :rows="rows ?? 3" 
        class="mb-1 w-full dark:bg-neutral-700 p-2 text-center " 
        :value="value" 
        :placeholder="placeholder" 
        @input="e => onChange(e.target.value)"
    />
    <div 
        v-if="!editing" 
        class="p-1 pb-2 text-neutral-900 dark:text-neutral-100 text-base" 
        :class="{['border-b border-neutral-200 dark:border-neutral-600']:!noBorder }"
    >
        <div class="text-neutral-400 text-xs">
            {{placeholder}}
        </div>
        <div>
            {{value}}
        </div>
    </div>
</template>
