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
    equipment: [],
    weakness: [],
    titles: []
  });

  // Maybe we should move the refs out to the components
  // then we can have onBeforeMount load them or something...
  const selectedHero = ref({ label: '', value: '' });
  const selectedRole = ref({ label: '', value: '' });
  const selectedArmor = ref({ label: '', value: '' });
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

  const addCards = (type, cardList) => {
    currentDeck.value[type] = cardList;
  };

  const removeCards = (type, card) => {
    currentDeck.value[type] = currentDeck.value[type].filter(c => c.id !== card.id);
  };

  const clearDeck = () => {
    currentDeck.value = { basic: [], hero: [], role: [], equipment: [], weakness: [], titles: [] };
  };

  return {
    error,
    loading,
    currentDeck,
    selectedHero,
    selectedRole,
    selectedArmor,
    selectedWeakness,
    selectedTitles,
    initializeDeck,
    getDeck,
    loadDeck,
    addCards,
    removeCards,
    clearDeck
  };
});
