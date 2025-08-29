import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useDeckStore = defineStore('deckStore', () => {
  const basicCardsUrl = '/src/data/basicCards.json';
  const loading = ref(false);
  const error = ref(null);
  const currentDeck = ref({
    basic: [],
    hero: [],
    role: [],
    equipment: []
  });

  const initializeDeck = async() => {
    loading.value = true;
    try {
      const response = await axios.get(basicCardsUrl);
      const basicCards = response.data.basicCards;
      currentDeck.value.basic.push(basicCards);
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

  const addHeroCards = (heroCardList) => {
    currentDeck.value.hero.push(heroCardList);
  };

  const addCards = (type, card) => {
    if (!currentDeck.value[type].includes(card)) {
      currentDeck.value[type].push(card);
    }
  };

  const removeCards = (type, card) => {
    currentDeck.value[type] = currentDeck.value[type].filter(c => c.id !== card.id);
  };

  const clearDeck = () => {
    currentDeck.value = { basic: [], hero: [], role: [], equipment: [] };
  };

  return {
    currentDeck,
    initializeDeck,
    error,
    loading,
    getDeck,
    loadDeck,
    addHeroCards,
    addCards,
    removeCards,
    clearDeck
  };
});
