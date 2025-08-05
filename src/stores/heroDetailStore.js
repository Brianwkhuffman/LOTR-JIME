import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import heroDetails from '/src/data/heroDetails.json';

export const useHeroDetailStore = defineStore('heroDetail', () => {
  const heroes = ref(heroDetails);

  const getHeroList = computed(() => {
    return Object.values(heroes.value);
  })

  const getHeroDetailsByName = (name) => {
    return heroes.value[name];
  }

  return {
    heroes,
    getHeroList,
    getHeroDetailsByName,
  }
});
