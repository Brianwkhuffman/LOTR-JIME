import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import heroCards from '/src/data/heroCards.json';

/**
 * @typedef {Object} HeroCard
 * @property {number} id
 * @property {string} cardType
 * @property {string} character
 * @property {number} number
 * @property {string} name
 * @property {string|null} trait
 * @property {string} icon
 * @property {string} description
 * @property {string} collection
 */

/**
 * @typedef {Object.<string, HeroCard[]>} HeroCardsMap
 */

export const useEquipStore = defineStore('heroCard', () => {
  /** @type {import('vue').Ref<HeroCardsMap>} */
  const heroCardList = ref(heroCards);

  const getHeroCardsByName = (name) => {
    return computed(() => heroCardList.value[name]);
  };

  return {
    heroCardList,
    getHeroCardsByName
  };
});
