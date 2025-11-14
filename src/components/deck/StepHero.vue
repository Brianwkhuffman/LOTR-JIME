<script setup>
import { computed } from 'vue';
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import SmallCard from 'components/cards/SmallCard.vue';

const heroDetailStore = useHeroDetailStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: detailsLoading, getHeroOptions } = storeToRefs(heroDetailStore);
const { loading: deckLoading, selectedHero } = storeToRefs(deckStore);

const heroCards = computed(() => {
  if (selectedHero.value) {
    const cards = heroDetailStore.getHeroCardsByHeroId(selectedHero.value.value);
    return cards;
  }
  return null;
});

const addHeroCards = () => {
  const validHero = validateHeroSelection();
  if (!validHero) {
    return;
  }
  deckStore.addCards('hero', heroCards);
  emit('nextStep');
};

const validateHeroSelection = () => {
  return heroCards.value;
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
      <q-btn color="primary" @click="addHeroCards">
        Next
      </q-btn>
    </div>

    <div
      v-for="card in heroCards"
      :key="card.number"
      class="q-pa-sm"
    >
      <small-card :card="card"/>
    </div>
  </div>
</template>
