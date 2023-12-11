<script setup lang="ts">
    import DiceBox from "@3d-dice/dice-box";
    import { onMounted } from "vue";
    import DiceLog from '../components/DiceLog.vue';

    let diceBox: DiceBox;
    onMounted(() => {
        diceBox = new DiceBox("#dice-box", {
          assetPath: "/dice-box/", // required
          themeColor: '#ffffff'
        });

        diceBox.init().then(() => {
          //diceBox.roll("2d6");

        });
    });

</script>

<template>
  <div class="p-2">
      <DiceLog :alwaysDisplay="true" />
  </div>
  <div class="pointer-events-none absolute top-10 left-20 right-20 ">
      <div class=" flex h-80 w-full" id="dice-box"/>
  </div>
</template>

