<script setup>
import { useDamageFearCardStore } from '/src/stores/damageFearCardStore.js';
import BackButton from 'src/components/button/BackButton.vue';

const damageFearCardStore = useDamageFearCardStore();
const damageCards = damageFearCardStore.getDamageCards();

</script>

<template>
  <back-button />
  <section class="q-pa-md">
    <ul class="card-grid">
      <li v-for="card in damageCards"
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
