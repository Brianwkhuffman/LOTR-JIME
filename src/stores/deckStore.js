import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useDeckStore = defineStore('deckStore', () => {
  const basicCardsUrl = '/data/basicCards.json';
  const loading = ref(false);
  const error = ref(null);
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
    trinket: {}
  });

  const selectedWeakness = ref([]);
  const selectedTitles = ref([]);

  const initializeDeck = async() => {
    loading.value = true;
    try {
      const response = await axios.get(basicCardsUrl);
      const basicCards = response.data.basicCards;
      currentDeck.value.basic = basicCards;
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getDeck = () => {
    return currentDeck.value;
  };

  const loadDeck = () => {
    return currentDeck.value;
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
      error.value = e.message;
      return false;
    }
    finally {
      loading.value = false;
    }
  };

  const addEquipmentCards = (type, selection) => {
    loading.value = true;
    try {
      currentEquipment.value[type] = selection;
    }
    catch (e) {
      error.value = e.message;
    }
    finally {
      loading.value = false;
    }
  };

  const removeCards = (type, card) => {
    currentDeck.value[type] = currentDeck.value[type].filter(c => c.id !== card.id);
  };

  const clearDeck = () => {
    currentDeck.value = { basic: [], hero: [], role: [], equipment: [], titles: [] };
    currentEquipment.value = { armor: {}, hands: [], trinket: {} };
    return true;
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    error,
    loading,
    currentDeck,
    currentEquipment,
    selectedWeakness,
    selectedTitles,
    initializeDeck,
    getDeck,
    loadDeck,
    addDeckCards,
    addEquipmentCards,
    removeCards,
    clearDeck,
    clearError
  };
});
