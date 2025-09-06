import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import heroCardData from '/public/data/heroCards.json';

export const useHeroCardStore = defineStore('heroCardStore', () => {
  const heroCardList = ref(heroCardData);

  const getHeroCardsByName = (name) => {
    return computed(() => heroCardList.value[name]);
  };

  return {
    heroCardList,
    getHeroCardsByName
  };
});
