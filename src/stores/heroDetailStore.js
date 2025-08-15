import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import heroDetailData from '/src/data/heroDetails.json';

/**
 * @typedef {Object} HeroStats
 * @property {number} might
 * @property {number} wisdom
 * @property {number} agility
 * @property {number} spirit
 * @property {number} wit
 */

/**
 * @typedef {Object} Hero
 * @property {number} id
 * @property {string} name
 * @property {string} race
 * @property {string} suggestedRole
 * @property {Array} suggestedEquip
 * @property {HeroStats} stats - Hero's stats
 * @property {number} maxInspiration
 * @property {number} maxFear
 * @property {number} maxDamage
 * @property {string} ability - Hero special ability description
 * @property {string} collection - Collection source (e.g., "Base")
 */

/**
 * @typedef {Object.<string, Hero>} HeroesMap
 */

export const useHeroDetailStore = defineStore('heroDetailStore', () => {
  /** @type {import('vue').Ref<HeroesMap>} */
  const heroes = ref(heroDetailData);

  const getHeroList = computed(() => {
    return Object.values(heroes.value);
  });

  const getHeroDetailsByName = (name) => {
    return heroes.value[name];
  };

  return {
    heroes,
    getHeroList,
    getHeroDetailsByName
  };
});
