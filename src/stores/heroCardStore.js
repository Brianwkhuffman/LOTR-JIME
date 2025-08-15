import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import heroCardData from '/src/data/heroCards.json';

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

export const useHeroCardStore = defineStore('heroCardStore', () => {
  /** @type {import('vue').Ref<HeroCardsMap>} */
  const heroCardList = ref(heroCardData);

  const getHeroCardsByName = (name) => {
    return computed(() => heroCardList.value[name]);
  };

  return {
    heroCardList,
    getHeroCardsByName
  };
});
