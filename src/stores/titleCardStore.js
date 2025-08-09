import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import titleCardData from '/src/data/titleCards.json';

/**
 * @typedef {Object} TitleCard
 * @property {number} id
 * @property {string} collection
 * @property {string} name
 * @property {number} number
 * @property {string} trait
 * @property {string} icon
 * @property {string} description
 */

/**
 * @typedef {Object} TitleCardData
 * @property {TitleCard[]} titleCards
 */

export const useTitleCardStore = defineStore('titleCardStore', () =>{
  /** @type {import('vue').Ref<TitleCardData>} */
  const titleList = ref(titleCardData);

  const getTitleList = computed(() => {
    return titleList.value.titleCards;
  });

  const getTitleCardsByName = (name) => {
    return titleList.value[name];
  };

  return {
    titleList,
    getTitleList,
    getTitleCardsByName
  };
});
