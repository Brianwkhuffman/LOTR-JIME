<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useDamageFearCardStore } from '/src/stores/damageFearCardStore.js';
import { useWeaknessCardStore } from '/src/stores/weaknessCardStore.js';
import BackButton from 'src/components/button/BackButton.vue';

const route = useRoute();
const damageFearCardStore = useDamageFearCardStore();
const weaknessCardStore = useWeaknessCardStore();
const { loading: loadingDmgFear, damageCards, fearCards } = storeToRefs(damageFearCardStore);
const { loading: loadingWeakness, weaknessCards } = storeToRefs(weaknessCardStore);

const cards = computed(() => {
  if (route.path.includes('/damage')) {
    return damageCards.value;
  }
  if (route.path.includes('/fear')) {
    return fearCards.value;
  }
  if (route.path.includes('/weakness')) {
    return weaknessCards.value;
  }
  return [];
});
</script>

<template>
  <back-button />

  <section class="q-pa-md">
    <div v-if="loadingDmgFear || loadingWeakness" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>

    <ul v-else class="card-grid">
      <li v-for="card in cards"
          :key="card.id"
          class="card"
          tabindex="0"
      >
        <q-img
          v-if="!card.description"
          src="/assets/weaknessPh.png"
          alt="Role image"
          style="width: 80px; height: auto"
          class="rounded-borders"
        />
        <header class="card-name">
          {{ card.name }}
        </header>
        <p v-if="card.description">{{ card.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.card {
  justify-content: center;
  align-items: center;
}
</style>
