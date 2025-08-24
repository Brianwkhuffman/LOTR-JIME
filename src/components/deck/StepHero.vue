<script setup>
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
// import { useDeckStore } from 'stores/deckStore';
import { computed, onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';

const heroDetailStore = useHeroDetailStore();

onBeforeMount(() => {
  console.log('before mount fetching...');
  heroDetailStore.fetchHeroDetails();
});

const { getHeroes, loading } = storeToRefs(heroDetailStore);

const selectedHero = ref(null);

const heroDetails = computed(() => {
  if (!selectedHero.value) {
    return [];
  }
  console.log(heroDetailStore.getHeroCards(selectedHero.value));
  return heroDetailStore.getHeroCards(selectedHero.value);
});

const addHero = () => {
  console.log('test');
};

</script>

<template>
  <div>
    <div v-if="loading" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>

    <q-select
      :options="getHeroes"
      v-model="selectedHero"
      label="Select a Hero"
      clearable
    />
    <q-btn @click="addHero">
      Select Hero
    </q-btn>

    <div v-if="heroDetails.length > 0">
      <div v-for="details in heroDetails" :key="details.name">
        <p>{{ details.name }} - {{ details.description }}</p>
      </div>
    </div>
  </div>
</template>
