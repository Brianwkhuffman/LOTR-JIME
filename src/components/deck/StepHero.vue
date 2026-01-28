<script setup>
import { computed, ref } from 'vue';
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import HeroDetailCard from 'components/cards/HeroDetailCard.vue';
import BasicCard from '../cards/BasicCard.vue';
import ErrorBanner from '../ErrorBanner.vue';

const heroDetailStore = useHeroDetailStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: detailsLoading, getHeroOptions } = storeToRefs(heroDetailStore);
const { loading: deckLoading, errors } = storeToRefs(deckStore);

const selectedHero = ref({ label: '', value: '' });

const selectedHeroDetails = computed(() => {
  if (selectedHero.value) {
    return heroDetailStore.getHeroByName(selectedHero.value.label);
  }
  return null;
});

const addHeroCards = () => {
  const optionSelected = hasSelectedHero.value;
  if (!optionSelected) {
    return;
  }
  const cardsAdded = deckStore.addDeckCards('hero', selectedHeroDetails.value.cards);
  if (cardsAdded) {
    emit('nextStep');
  }
};

const hasSelectedHero = computed(() => {
  return selectedHero.value?.label;
});

</script>

<template>
  <div v-if="detailsLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">
    <template v-if="errors.length">
      <error-banner :errors="errors" />
    </template>

    <q-select
      :options="getHeroOptions"
      v-model="selectedHero"
      :popup-content-style="{ maxHeight: '40vh' }"
      label="Hero:"
      clearable
      outlined
      stack-label
      color="primary"
      style="width: 18rem;"
    />

    <div class="q-pa-md row justify-between">
      <q-btn color="primary" @click="addHeroCards" :disable="!hasSelectedHero">
        Confirm Hero
      </q-btn>
    </div>

    <div v-if="selectedHeroDetails">
      <hero-detail-card
        :key="selectedHeroDetails.id"
        :hero="selectedHeroDetails"
      />
      <ul class="card-grid" role="list">
        <li v-for="card in selectedHeroDetails?.cards"
            :key="card.number"
            class="card-list"
            tabindex="0">
          <basic-card :card="card" />
        </li>
      </ul>
    </div>
  </div>
</template>
