<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useHeroDetailStore } from 'stores/heroDetailStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia'; 
import HeroDetailCard from 'components/cards/HeroDetailCard.vue';
import BasicCard from '../cards/BasicCard.vue';

const heroDetailStore = useHeroDetailStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: detailsLoading, getHeroOptions } = storeToRefs(heroDetailStore);
const { loading: deckLoading, currentDeck } = storeToRefs(deckStore);

const selectedHero = ref({ label: '', value: '' });

onBeforeMount(() => {
  const hasHeroCards = currentDeck.value.hero.length;
  if (hasHeroCards) {
    const heroId = currentDeck.value.hero[0].heroId;
    selectedHero.value = getHeroOptions.value[heroId - 1];
  }
});

const selectedHeroDetails = computed(() => {
  if (selectedHero.value) {
    const heroDetails = heroDetailStore.getHeroByName(selectedHero.value.label);
    return heroDetails;
  }
  return null;
});

const addHeroCards = () => {
  const validHero = hasSelectedHero.value;
  if (!validHero) {
    return;
  }
  deckStore.addCards('hero', selectedHeroDetails.value.cards);
  emit('nextStep');
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
      <q-btn color="primary" @click="addHeroCards" :disable="!hasSelectedHero">
        Select Hero
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
            class="card"
            tabindex="0">
          <basic-card :card="card" />
        </li>
      </ul>
    </div>
  </div>
</template>
