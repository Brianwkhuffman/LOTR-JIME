import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import heroDetailData from '/src/data/heroDetails.json';

export const useHeroDetailStore = defineStore('heroDetailStore', () => {
  const heroes = ref(heroDetailData);

  const getHeroList = computed(() => {
    return Object.values(heroes.value);
  });

  const getHeroNames = computed(() =>
    Object.values(heroes.value).map(hero => hero.name)
  );

  const getHeroDetailsByName = (name) => {
    return heroes.value[name];
  };

  const getHeroCards = (heroName) => {
    const hero = Object.values(heroes.value).find(h => h.name === heroName);
    if (!hero) {
      return [];
    }
    return hero;
  };

  return {
    heroes,
    getHeroList,
    getHeroNames,
    getHeroDetailsByName,
    getHeroCards
  };
});
