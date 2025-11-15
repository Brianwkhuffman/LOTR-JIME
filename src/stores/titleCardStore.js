import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';


export const useTitleCardStore = defineStore('titleCardStore', () =>{
  const url = '/data/titleCards.json';
  const loading = ref(false);
  const error = ref(null);
  const titleCards = ref([]);

  const fetchTitleCards = async () => {
    const hasData = titleCards.value.length;
    if (hasData) {
      return;
    }

    loading.value = true;
    try {
      const response = await axios.get(url);
      titleCards.value = response.data.titleCards;
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  return {
    error,
    loading,
    titleCards,
    fetchTitleCards
  };
});
