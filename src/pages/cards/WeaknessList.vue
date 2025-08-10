<script setup>
import { useWeaknessCardStore } from '/src/stores/weaknessCardStore.js';
import BackButton from 'src/components/button/BackButton.vue';

const weaknessCardStore = useWeaknessCardStore();
const weaknessCards = weaknessCardStore.getWeaknessCards;

</script>

<template>
  <back-button />
  <section class="q-pa-md">
    <div class="card-grid" role="list">
      <li v-for="card in weaknessCards"
          :key="card.id"
          class="card"
          tabindex="0">
        <q-img
          src="/assets/weaknessPh.png"
          alt="Role image"
          style="width: 80px; height: auto"
          class="rounded-borders"
        />
        <header class="card-name">
          {{ card.name }}
        </header>
      </li>
    </div>
  </section>
</template>

<style scoped>
.card {
  justify-content: center;
  align-items: center;
}
</style>
