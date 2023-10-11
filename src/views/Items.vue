<script setup lang="ts">
import items from '../data/items.json';
</script>

<template>
  <div class="w-full md:w-3/4 lg:w-1/2 p-8">
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
  </div>
</template>

