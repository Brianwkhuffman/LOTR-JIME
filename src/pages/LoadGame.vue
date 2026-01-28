<script setup>
import { ref } from 'vue';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';

const status = ref('');
const deckName = ref('');

const deckStore = useDeckStore();
const { savedDecks } = storeToRefs(deckStore);

const deletingId = ref(null);

const addDeck = async() => {
  return await deckStore.saveDeck(deckName.value);
};

const update = async() => {
  await deckStore.updateDeck(1, { name: 'updated deck' });
};

const deleteDeck = async(deckId) => {
  deletingId.value = deckId;
  await delay();
  await deckStore.deleteDeck(deckId);
  deletingId.value = null;
};

// For testing load messages/logic
const delay = () => {
  return new Promise(resolve => setTimeout(resolve, 2000));
};
</script>

<template>
  <div>
    <div class="q-pa-md">
      <fieldset>
        <legend>Add new deck</legend>
        <label>
          Name:
          <input v-model="deckName" type="text" >
        </label>
        <button @click="addDeck">Add</button>
        <button @click="update">Update</button>
        <p>{{ status }}</p>
      </fieldset>
    </div>

    <div v-if="savedDecks.length === 0" class="text-center text-grey q-pa-lg">
      No saved decks found.
    </div>

    <div v-if="deletingId">
      <p>Performing DB function..</p>
    </div>
    <div class="q-pa-md" v-if="savedDecks && savedDecks.length">
      <q-card class="row" v-for="deck in savedDecks" :key="deck.id">
        <q-card-section>
          <p>{{deck.name}}</p>
          <p>Created: {{ new Date(deck.createdAt).toLocaleString() }}</p>
          <p v-if="deck.updatedAt">Last updated: {{ new Date(deck.updatedAt).toLocaleString() }}</p>

        </q-card-section>
        <q-card-actions>
          <q-btn
            :icon="deletingId ? 'star' : 'delete'"
            :loading="deletingId === deck.id"
            :disable="deletingId !== null"
            @click="deleteDeck(deck.id)"
          />
        </q-card-actions>
      </q-card>
    </div>

  </div>
</template>
