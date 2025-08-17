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
 * @typedef {Object} HeroCards
 * @property {string} cardType
 * @property {number} number
 * @property {string} name
 * @property {string} traot
 * @property {string} icon
 * @property {string} description
 * @property {string} collection
 */

/**
 * @typedef {Object} Hero
 * @property {number} id
 * @property {string} name
 * @property {string} race
 * @property {string} suggestedRole
 * @property {Array} suggestedEquip
 * @property {HeroStats} stats
 * @property {number} maxInspiration
 * @property {number} maxFear
 * @property {number} maxDamage
 * @property {string} ability
 * @property {string} collection
 * @property {HeroCards} cards
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

  const getHeroNames = computed(() => {
    return Object.keys(heroes.value);
  });

  const getHeroDetailsByName = (name) => {
    return heroes.value[name];
  };

  const getHeroCardsByName = (name) => {
    return heroes.value[name].cards;
  };

  return {
    heroes,
    getHeroList,
    getHeroNames,
    getHeroDetailsByName,
    getHeroCardsByName
  };
});
