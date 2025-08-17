<script setup>
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
// import { useDeckStore } from 'stores/deckStore';
import { computed, ref } from 'vue';

const heroDetailStore = useHeroDetailStore();
const heroList = heroDetailStore.getHeroNames;
// const deckStore = useDeckStore();

const selectedHero = ref(null);

const heroDetails = computed(() => {
  if (!selectedHero.value) {
    return [];
  }
  console.log(heroDetailStore.getHeroCards(selectedHero.value));
  return heroDetailStore.getHeroCards(selectedHero.value);
});

const addHero = () => {
  console.log('test', heroList);
};

</script>

<template>
  <div>
    <q-select
      :options="heroList"
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
