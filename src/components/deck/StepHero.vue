<script setup>
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
// import { useDeckStore } from 'stores/deckStore';
import { computed, onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';

const heroDetailStore = useHeroDetailStore();

onBeforeMount(() => {
  heroDetailStore.fetchHeroDetails();
});

const { loading, getHeroOptions } = storeToRefs(heroDetailStore);

const selectedHero = ref(null);
const heroDetails = computed(() => {
  if (selectedHero.value) {
    return heroDetailStore.getHeroByOptionValue(selectedHero.value);
  }
  return null;
});

const addHero = () => {
  // Add hero to deck
  console.log(heroDetails.value);
  alert('test');
};
</script>

<template>
  <div>
    <div v-if="loading" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>

    <q-select
      :options="getHeroOptions"
      v-model="selectedHero"
      clearable
    />
    <q-btn @click="addHero">
      Select Hero
    </q-btn>

    <div v-if="heroDetails">
      <p>Suggested Role: {{heroDetails.suggestedRole}}</p>
      <p>Suggested Equip: {{heroDetails.suggestedEquip}}</p>
      <div v-if="heroDetails.cards">
        <div
          v-for="card in heroDetails.cards"
          :key="card.name"
          class="hero-card-preview q-pa-sm"
          style="border: 1px solid black;"
        >
          <i>{{ card.name }}</i>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
