import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useInfoCardStore = defineStore('infoCardStore', () => {
  const url = '/data/infoCards.json';
  const loading = ref(false);
  const error = ref(null);
  const infoCards = ref({});
  const infoTypes = ref([]);

  const fetchInfoCards = async () => {
    const hasData = Object.keys(infoCards.value).length;
    if (hasData) {
      return;
    }

    loading.value = true;
    try {
      const response = await axios.get(url);
      const data = response.data;
      infoCards.value = data;
      infoTypes.value = Object.keys(data);
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getInfoCardsByType = (type) => {
    return infoCards.value[type];
  };

  return {
    error,
    loading,
    infoTypes,
    fetchInfoCards,
    getInfoCardsByType
  };
});
