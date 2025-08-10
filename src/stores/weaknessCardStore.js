import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import weaknessCardData from '/src/data/weaknessCards.json';

/**
 * @typedef {Object} WeaknessCard
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object.<string, WeaknessCard[]>} WeaknessCardsMap
 */

export const useWeaknessCardStore = defineStore('weakness', () => {
  /** @type {import('vue').Ref<WeaknessCardsMap>} */
  const weaknessCardList = ref(weaknessCardData);

  const getWeaknessCards = computed(() => {
    return Object.values(weaknessCardList.value.weaknessCards);
  });

  return {
    weaknessCardList,
    getWeaknessCards
  };
});
