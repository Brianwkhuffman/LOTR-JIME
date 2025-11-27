<script setup>
import { useRouter } from 'vue-router';
import { useWeaknessCardStore } from 'stores/weaknessCardStore.js';
import { useTitleCardStore } from 'stores/titleCardStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';

const router = useRouter();

const deckStore = useDeckStore();
const weaknessStore = useWeaknessCardStore();
const titleStore = useTitleCardStore();
const { loading: weaknessLoading, getWeaknessCardOptions } = storeToRefs(weaknessStore);
const { loading: titlesLoading, getTitleCardOptions } = storeToRefs(titleStore);
const { loading: deckLoading, selectedWeakness, selectedTitles } = storeToRefs(deckStore);

const finalizeDeck = () => {
  // Note: Player can obtain more weakness cards during a chapter
  // Weakness cards reset to 1 after every chapter
  router.push('/play');
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
          multiple
          outlined
          dense
          clearable
          use-chips
          color="primary"
          class="q-pa-md"
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
          class="q-pa-md"
        />
      </q-expansion-item>
    </q-list>

    <div class="q-pa-md row justify-between">
      <q-btn color="primary" @click="finalizeDeck">
        Finalize
      </q-btn>
    </div>
  </div>
</template>
