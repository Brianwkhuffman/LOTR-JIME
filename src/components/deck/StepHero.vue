<script setup>
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
import { useDeckStore } from 'stores/deckStore';
import { computed, onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';

const heroDetailStore = useHeroDetailStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: detailsLoading, getHeroOptions } = storeToRefs(heroDetailStore);
const { loading: deckLoading } = storeToRefs(deckStore);

onBeforeMount(() => {
  heroDetailStore.fetchHeroDetails();
  deckStore.initializeDeck();
});


const selectedHero = ref(null);
const heroDetails = computed(() => {
  if (selectedHero.value) {
    return heroDetailStore.getHeroByOptionValue(selectedHero.value);
  }
  return null;
});

const selectHero = () => {
  const validate = validateHeroSelection();
  if (!validate) {
    return;
  }
  // Add hero to deck
  console.log('hero detail: ', heroDetails.value.cards);
  deckStore.addHeroCards(heroDetails.value.cards);
  console.log(deckStore.getDeck());
  emit('nextStep');
};

const validateHeroSelection = () => {
  if (!heroDetails.value) {
    return false;
  }
  return true;
};
</script>

<template>
  <div v-if="detailsLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">
    <q-select
      :options="getHeroOptions"
      v-model="selectedHero"
      label="Hero:"
      clearable
      outlined
      stack-label
      color="primary"
      style="width: 18rem;"
    />

    <div class="q-pa-md">
      <q-btn color="primary" @click="selectHero">
        Next
      </q-btn>
    </div>

    <div v-if="heroDetails?.cards.length">
      <h6>{{ heroDetails.name }} cards:</h6>
      <div
        v-for="card in heroDetails.cards"
        :key="card.number"
        class="hero-card-preview q-pa-sm"
        style="border: 1px solid black;"
      >
        <i>{{ card.name }}</i>
        <p>{{ card.description }}</p>
      </div>
    </div>
  </div>
</template>
