import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import infoCardData from '/src/data/infoCards.json';

export const useInfoCardStore = defineStore('infoCardStore', () => {
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
