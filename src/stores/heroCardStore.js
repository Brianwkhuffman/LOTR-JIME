import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import heroCards from '/src/data/heroCards.json';

export const useEquipStore = defineStore('heroCard', () => {
  const heroCardList = ref(heroCards);

  const getHeroCards = (name) => {
    return computed(() => heroCardList.value[name]);
  };

  return {
    heroCardList,
    getHeroCards
  };
});
