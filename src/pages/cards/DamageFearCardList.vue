<script setup>
import { useDamageFearCardStore } from '/src/stores/damageFearCardStore.js';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import BackButton from 'src/components/button/BackButton.vue';

const route = useRoute();
const damageFearCardStore = useDamageFearCardStore();
const cards = computed(() => {
  if (route.path.includes('/damage')) {
    return damageFearCardStore.getDamageCards();
  }
  if (route.path.includes('/fear')) {
    return damageFearCardStore.getFearCards();
  }
  return [];
});
</script>

<template>
  <back-button />
  <section class="q-pa-md">
    <ul class="card-grid">
      <li v-for="card in cards"
          :key="card.id"
          class="card"
          tabindex="0"
      >
        <header class="card-name">
          {{ card.name }}
        </header>
        <p>{{ card.description }}</p>
      </li>
    </ul>
  </section>
</template>
