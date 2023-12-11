<script lang="ts">
    import items from '../data/items.json';
    export default {
        setup(){
            return {items};
        }
    }
</script>

<template>
    <h1 class="text-xl mb-4 font-bold">Common Items</h1>
    <div class="grid grid-cols-12 gap-y-2">
        <div class="col-span-1 font-bold">Load</div>
        <div class="col-span-3 font-bold">Name</div>
        <div class="col-span-8 font-bold">Description</div>
        <div class="col-span-12 font-bold"></div>
        <template v-for="(item, index) in items" :key="index">
            <div class="col-span-1">{{item.load}}</div>
            <div class="col-span-3">{{item.name}}</div>
            <div class="col-span-8">{{item.description}}</div>
        </template>
    </div>
</template>

