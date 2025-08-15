import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import infoCardData from '/src/data/infoCards.json';

/**
 * @typedef {Object} Infocard
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} collection
 */

/**
 * @typedef {Object.<string, InfoCard[]>} InfoCardsMap
 */

export const useInfoCardStore = defineStore('infoCardStore', () => {
  /** @type {import('vue').Ref<InfoCardsMap>} */
  const infoCardList = ref(infoCardData);

  const getInfoCardList = computed(() => {
    return Object.keys(infoCardList.value);
  });

  const getInfoCardsByType = (type) => {
    return infoCardList.value[type];
  };

  return {
    infoCardList,
    getInfoCardList,
    getInfoCardsByType
  };
});
