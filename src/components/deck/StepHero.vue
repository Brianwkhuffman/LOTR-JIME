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
  <div>
    <div v-if="detailsLoading && deckLoading" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>

    <q-select
      :options="getHeroOptions"
      v-model="selectedHero"
      clearable
    />
    <q-btn @click="selectHero">
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
