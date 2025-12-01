<script setup>
import { useWeaknessCardStore } from 'stores/weaknessCardStore.js';
import { useTitleCardStore } from 'stores/titleCardStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import SmallCard from 'components/cards/SmallCard.vue';

const deckStore = useDeckStore();
const weaknessStore = useWeaknessCardStore();
const titleStore = useTitleCardStore();
const { loading: weaknessLoading, weaknessCards, getWeaknessCardOptions } = storeToRefs(weaknessStore);
const { loading: titlesLoading, getTitleCardOptions, titleCards } = storeToRefs(titleStore);
const { loading: deckLoading, selectedWeakness, selectedTitles } = storeToRefs(deckStore);

const getTitlesDisplay = computed(() => {
  if (selectedTitles.value?.length > 0) {
    const titleIds = selectedTitles.value.map(selectedOption => selectedOption.value);
    const chosenTitleCards = titleCards.value.filter(obj => titleIds.includes(obj.id));
    return chosenTitleCards;
  }
  return [];
});

const finalizeDeck = () => {
  // Note: Player can obtain more weakness cards during a chapter
  // Weakness cards reset to 1 after every chapter

  if (selectedWeakness.value) {
    const weaknessIds = selectedWeakness.value.map(selectedOption => selectedOption.value);
    const weaknessCardsToAdd = weaknessCards.value.filter(obj => weaknessIds.includes(obj.id));
    deckStore.addCards('weakness', weaknessCardsToAdd);
  }
  if (selectedTitles.value) {
    const titleIds = selectedTitles.value.map(selectedOption => selectedOption.value);
    const titleCardsToAdd = titleCards.value.filter(obj => titleIds.includes(obj.id));
    deckStore.addCards('titles', titleCardsToAdd);
  }
};

</script>

<template>
  <div v-if="weaknessLoading || deckLoading || titlesLoading"
       class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center; width: 100%;">

    <q-list padding bordered class="rounded-borders">

      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="perm_identity"
        label="Weakness Card"
      >
        <q-select
          :options="getWeaknessCardOptions"
          v-model="selectedWeakness"
          label="Cards"
          :rules="[val => val || 'You must select one Weakness card.']"
          multiple
          outlined
          dense
          clearable
          use-chips
          color="primary"
          class="q-pa-lg"
        />
      </q-expansion-item>

      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="perm_identity"
        label="Title Cards"
      >
        <q-select
          :options="getTitleCardOptions"
          v-model="selectedTitles"
          label="Cards"
          multiple
          outlined
          dense
          clearable
          use-chips
          color="primary"
          class="q-pa-lg"
        />
      </q-expansion-item>

      <div v-for="card in getTitlesDisplay" :key="card.id" class="q-pa-sm">
        <small-card :card="card"/>
      </div>
    </q-list>

    <div class="q-pa-md row justify-between">
      <q-btn type="submit" color="primary" @click="finalizeDeck">
        Finalize
      </q-btn>
    </div>
  </div>
</template>
