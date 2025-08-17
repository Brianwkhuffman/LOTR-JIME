import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import titleCardData from '/src/data/titleCards.json';


export const useTitleCardStore = defineStore('titleCardStore', () =>{
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
