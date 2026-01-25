<script setup>
import { useWeaknessCardStore } from 'stores/weaknessCardStore.js';
import { useTitleCardStore } from 'stores/titleCardStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import BasicCard from '../cards/BasicCard.vue';
import ErrorBanner from 'components/ErrorBanner.vue';

const deckStore = useDeckStore();
const weaknessStore = useWeaknessCardStore();
const titleStore = useTitleCardStore();

const { loading: weaknessLoading, weaknessCards, getWeaknessCardOptions } = storeToRefs(weaknessStore);
const { loading: titlesLoading, getTitleCardOptions, titleCards } = storeToRefs(titleStore);
const { loading: deckLoading, errors } = storeToRefs(deckStore);

const selectedTitles = ref([]);
const selectedWeakness = ref([]);

const getConfirmedCardsByIds = (selectedOptions, allCards) => {
  const optionIds = selectedOptions.map(selectedOption => selectedOption.value);
  const chosenCards = allCards.filter(card => optionIds.includes(card.id));
  return chosenCards;
};

const getTitlesDisplay = computed(() => {
  if (selectedTitles.value?.length > 0) {
    return getConfirmedCardsByIds(selectedTitles.value, titleCards.value);
  }
  return [];
});

const finalizeDeck = () => {
  if (selectedWeakness.value) {
    const weaknessCardsToAdd = getConfirmedCardsByIds(selectedWeakness.value, weaknessCards.value);
    deckStore.addDeckCards('weakness', weaknessCardsToAdd);
  }
  if (selectedTitles.value) {
    const titleCardsToAdd = getConfirmedCardsByIds(selectedTitles.value, titleCards.value);
    deckStore.addDeckCards('titles', titleCardsToAdd);
  }
  deckStore.validateDeck();
  deckStore.validateEquipment();
  return;
};

const disableButton = computed(() => {
  if (selectedWeakness.value.length === 0) {
    return true;
  }
  return false;
});

</script>

<template>
  <div v-if="weaknessLoading || deckLoading || titlesLoading"
       class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center; width: 100%;">
    <template v-if="errors.length">
      <error-banner :errors="errors" />
    </template>

    <q-list padding bordered class="rounded-borders">

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
            :popup-content-style="{ height: '40vh' }"
            label="Cards"
            multiple
            outlined
            dense
            clearable
            use-chips
            color="primary"
            class="q-pa-lg"
          />

          <ul class="card-grid" role="list">
            <li v-for="titleCard in getTitlesDisplay"
                :key="titleCard.number"
                class="card-list"
                tabindex="0">
              <basic-card :card="titleCard" />
            </li>
          </ul>
        </q-expansion-item>
      </div>

      <!-- Weakness -->
      <q-expansion-item
        icon="img:assets/bane.png"
        label="Weakness"
        header-class="text-primary text-h6 q-mt-sm"
        dense
        dense-toggle
        expand-separator
      >
        <q-select
          :options="getWeaknessCardOptions"
          v-model="selectedWeakness"
          :popup-content-style="{ maxHeight: '40vh' }"
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
      <q-btn type="submit" color="primary" @click="finalizeDeck" :disable="disableButton">
        Finalize Deck
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
