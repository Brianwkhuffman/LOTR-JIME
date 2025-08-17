import { defineStore } from 'pinia';
import { ref } from 'vue';
import weaknessCardData from '/src/data/weaknessCards.json';

export const useWeaknessCardStore = defineStore('weaknessStore', () => {
  const weaknessCardList = ref(weaknessCardData);

  const getWeaknessCards = () => {
    return weaknessCardList.value.weaknessCards;
  };

  return {
    weaknessCardList,
    getWeaknessCards
  };
});
