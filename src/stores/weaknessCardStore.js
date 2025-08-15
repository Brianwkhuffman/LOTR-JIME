import { defineStore } from 'pinia';
import { ref } from 'vue';
import weaknessCardData from '/src/data/weaknessCards.json';

/**
 * @typedef {Object} WeaknessCard
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object.<string, WeaknessCard[]>} WeaknessCardsMap
 */

export const useWeaknessCardStore = defineStore('weaknessStore', () => {
  /** @type {import('vue').Ref<WeaknessCardsMap>} */
  const weaknessCardList = ref(weaknessCardData);

  const getWeaknessCards = () => {
    return weaknessCardList.value.weaknessCards;
  };

  return {
    weaknessCardList,
    getWeaknessCards
  };
});
