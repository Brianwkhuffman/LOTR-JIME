import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import titleCardData from '/src/data/titleCards.json'

export const useTitleCardStore = defineStore('titleCardStore', () =>{
  const titleList = ref(titleCardData);

  const getTitleList = computed(() => {
    return Object.values(titleList.value.titleCards);
  });

  const getTitleCardByName = (name) => {
    return titleList.value[name];
  };

  return {
    titleList,
    getTitleList,
    getTitleCardByName
  };
});
