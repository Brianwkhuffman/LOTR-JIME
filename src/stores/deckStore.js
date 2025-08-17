import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useDeckStore = defineStore('deckStore', () => {
  const currentDeck = ref({
    basic: [],
    hero: [],
    role: [],
    equipment: []
  });

  // Persist to sessionStorage
  watch(currentDeck, (newDeck) => {
    sessionStorage.setItem('deck', JSON.stringify(newDeck.value));
  }, { deep: true });

  const getDeck = () => {
    return currentDeck.value;
  };

  const loadDeck = () => {
    const saved = JSON.parse(sessionStorage.getItem('deck') || '{}');
    if (saved.basic) currentDeck.value = saved;
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
    getDeck,
    loadDeck,
    addHeroCards,
    addCards,
    removeCards,
    clearDeck
  };
});
