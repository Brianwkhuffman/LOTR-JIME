import { defineStore } from 'pinia';
import { ref } from 'vue';
import damageFearCardData from '/src/data/damageFearCards.json';

export const useDamageFearCardStore = defineStore('damageFearCardStore', () => {
  const cards = ref(damageFearCardData);

  const getDamageCards = () => {
    return cards.value.damage;
  };

  const getFearCards = () => {
    return cards.value.fear;
  };

  return {
    cards,
    getDamageCards,
    getFearCards
  };
});
