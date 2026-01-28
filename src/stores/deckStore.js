import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { db } from '../db/db.js';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

export const useDeckStore = defineStore('deckStore', () => {
  const basicCardsUrl = '/data/basicCards.json';
  const loading = ref(false);
  const errors = ref([]);
  const currentDeck = ref({
    basic: [],
    hero: [],
    role: [],
    weakness: [],
    titles: []
  });
  const currentEquipment = ref({
    armor: {},
    hands: [],
    trinket: {},
    mount: {}
  });

  const initializeDeck = async() => {
    loading.value = true;
    try {
      const response = await axios.get(basicCardsUrl);
      const basicCards = response.data.basicCards;
      currentDeck.value.basic = basicCards;
    }
    catch (e) {
      errors.value.push(e.message);
    }
    finally {
      loading.value = false;
    }
  };

  const savedDecks = useObservable(
    liveQuery(() => db.decks.orderBy('createdAt').toArray())
  );

  const saveDeck = async(deckName) => {
    try {
      const newDeckId = await db.decks.add({
        name: deckName,
        createdAt: Date.now()
      });
      return newDeckId;
    }
    catch (e) {
      console.log(e);
      errors.value.push(e.message);
    }
  };

  const updateDeck = async(id, deck) => {
    console.log(id, deck);
    try {
      await db.decks.update(1, { name: 'Auto updated deck', updatedAt: Date.now() });
    }
    catch (e) {
      console.log(e);
      errors.value.push(e.message);
    }
  };

  const deleteDeck = async(id) => {
    try {
      await db.decks.delete(id);
    }
    catch (e) {
      console.log(e);
      errors.value.push(e.message);
    }
  };


  const addDeckCards = (type, cardList) => {
    loading.value = true;
    const validCardType = currentDeck.value[type];
    try {
      if (!validCardType) {
        throw new Error(`Cannot add "${type}" cards to the deck.`);
      }
      currentDeck.value[type] = cardList;
      return true;
    }
    catch (e) {
      errors.value.push(e.message);
      return false;
    }
    finally {
      loading.value = false;
    }
  };

  const addEquipmentCards = (type, selection) => {
    loading.value = true;
    const validType = currentEquipment.value[type];
    try {
      if (!validType) {
        throw new Error('Cannot add "' + type + '" cards to the deck.');
      };
      currentEquipment.value[type] = selection;
      return true;
    }
    catch (e) {
      errors.value.push(e.message || 'An unknown error occurred.');
      return false;
    }
    finally {
      loading.value = false;
    }
  };

  const validateDeck = () => {
    if (currentDeck.value.basic.length === 0) {
      errors.value.push('Missing basic cards.');
    }
    if (currentDeck.value.hero.length === 0) {
      errors.value.push('No Hero selected.');
    }
    if (currentDeck.value.role.length === 0) {
      errors.value.push('No Role selected.');
    }
    if (currentDeck.value.weakness.length === 0) {
      errors.value.push('No Weakness card(s) selected.');
    }
    return errors.value.length === 0;
  };

  const validateEquipment = () => {
    if (currentEquipment.value.armor.length === 0) {
      errors.value.push('No Armor selected.');
    }
    if (currentEquipment.value.weapon.length === 0) {
      errors.value.push('No Hand(s) equipment selected.');
    }
    if (currentEquipment.value.trinket.length > 1) {
      errors.value.push('Only 1 Trinket allowed.');
    }
    if (currentEquipment.value.mount.length > 1 ) {
      errors.value.push('Only 1 Mount allowed.');
    }
  };

  const clearDeck = () => {
    currentDeck.value = { basic: [], hero: [], role: [], equipment: [], titles: [] };
    currentEquipment.value = { armor: {}, hands: [], trinket: {} };
    return true;
  };

  const clearErrors = () => {
    errors.value = [];
  };

  return {
    errors,
    loading,
    currentDeck,
    currentEquipment,
    initializeDeck,
    savedDecks,
    saveDeck,
    updateDeck,
    deleteDeck,
    addDeckCards,
    addEquipmentCards,
    validateDeck,
    validateEquipment,
    clearDeck,
    clearErrors,
  };
});
