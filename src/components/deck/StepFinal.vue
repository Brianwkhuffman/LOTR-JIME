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

const getChosenCardsByIds = (selectedOptions, allCards) => {
  const optionIds = selectedOptions.map(selectedOption => selectedOption.value);
  const chosenCards = allCards.filter(card => optionIds.includes(card.id));
  return chosenCards;
};

const getTitlesDisplay = computed(() => {
  if (selectedTitles.value?.length > 0) {
    return getChosenCardsByIds(selectedTitles.value, titleCards.value);
  }
  return [];
});

const finalizeDeck = () => {
  // Note: Player can obtain more weakness cards during a chapter
  // Weakness cards reset to 1 after every chapter

  if (selectedWeakness.value) {
    const weaknessCardsToAdd = getChosenCardsByIds(selectedWeakness.value, weaknessCards.value);
    deckStore.addCards('weakness', weaknessCardsToAdd);
  }
  if (selectedTitles.value) {
    const titleCardsToAdd = getChosenCardsByIds(selectedTitles.value, titleCards.value);
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

      <!-- Mounts TODO -->
      <q-expansion-item
        icon="img:assets/mount.png"
        label="Mounts"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      />

      <!-- Titles -->
      <div>
        <q-expansion-item
          icon="img:assets/scroll.png"
          label="Titles"
          header-class="text-primary text-h6"
          dense
          dense-toggle
          expand-separator
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
          <div v-for="card in getTitlesDisplay" :key="card.id" class="q-pa-sm">
            <small-card :card="card"/>
          </div>
        </q-expansion-item>
      </div>

      <!-- Weakness -->
      <q-expansion-item
        icon="img:assets/bane.png"
        label="Weakness"
        header-class="text-primary text-h6"
        dense
        dense-toggle
        expand-separator
      >
        <q-select
          :options="getWeaknessCardOptions"
          v-model="selectedWeakness"
          label="Cards"
          :error="selectedWeakness?.length === 0"
          error-message="Must select at least one Weakness card."
          multiple
          outlined
          dense
          use-chips
          color="primary"
          class="q-pa-lg"
        />
      </q-expansion-item>
    </q-list>

    <div class="q-pa-md row justify-between">
      <q-btn type="submit" color="primary" @click="finalizeDeck">
        Finalize
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.q-list {
  width: 100%;
  border-color: $primary;
}
</style>
