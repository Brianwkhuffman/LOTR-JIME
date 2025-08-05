import {defineStore} from 'pinia';
import {ref} from 'vue';
import heroDetails from '/src/data/heroDetails.json';

export const useHeroDetailStore = defineStore('heroDetail', () => {
  const heroes = ref(heroDetails);

  const getHeroList = () => {
    return Object.keys(heroes);
  }

  const getHeroDetailsByName = (name) => {
    return heroes.value[name];
  }

  return {
    heroes,
    getHeroList,
    getHeroDetailsByName,
  }
});
