import { defineStore } from 'pinia';
import { ref } from 'vue';
import damageFearCardData from '/src/data/damageFearCards.json';

/**
 * @typedef {Object} DamageFearCard
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} amount
 */

/**
 * @typedef {Object} DamageFearCardData
 * @property {DamageFearCard[]} damage
 * @property {DamageFearCard[]} fear
 */

export const useDamageFearCardStore = defineStore('damageFearCardStore', () => {
  /** @type {import('vue').Ref<DamageFearCardData>} */
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
