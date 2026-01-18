import axios from 'axios';
import { computed, ref } from 'vue';
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
    catch (e) {
      error.value = e.message;
    }
    finally {
      loading.value = false;
    }
  };

  /**
   * Method to create Title Card objects formatted for q-select dropdown.
   *
   * @returns {Array<{label: string, value: string}>}
   * An array of objects, each containing the card's name (label) and ID (value).
   */
  const getTitleCardOptions = computed(() => {
    return titleCards.value.map((card) => {
      return { label: card.name, value: card.id };
    });
  });

  return {
    error,
    loading,
    titleCards,
    fetchTitleCards,
    getTitleCardOptions
  };
});
