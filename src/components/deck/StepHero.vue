<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import SmallCard from 'components/cards/SmallCard.vue';

const heroDetailStore = useHeroDetailStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: detailsLoading, getHeroOptions } = storeToRefs(heroDetailStore);
const { loading: deckLoading } = storeToRefs(deckStore);

onBeforeMount(() => {
  heroDetailStore.fetchHeroDetails();
  deckStore.initializeDeck();
});

const selectedHero = ref('');
const heroDetails = computed(() => {
  if (selectedHero.value) {
    return heroDetailStore.getHeroByOptionValue(selectedHero.value);
  }
  return null;
});

// Build Deck
const selectHero = () => {
  const validate = validateHeroSelection();
  if (!validate) {
    return;
  }
  deckStore.addHeroCards(heroDetails.value.cards);
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

    <div class="q-pa-md row justify-between">
      <q-btn color="primary" @click="selectHero">
        Next
      </q-btn>
    </div>

    <div
      v-for="card in heroDetails?.cards"
      :key="card.number"
      class="q-pa-sm"
    >
      <small-card  :card="card"/>
    </div>
  </div>
</template>
