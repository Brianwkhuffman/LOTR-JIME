import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useInfoCardStore = defineStore('infoCardStore', () => {
  const url = '/src/data/infoCards.json';
  const loading = ref(false);
  const error = ref(null);
  const infoCards = ref({});

  const fetchInfoCards = async () => {
    const hasData = Object.keys(infoCards.value).length;
    if (hasData) {
      return;
    }
    loading.value = true;
    try {
      const response = await axios.get(url);
      infoCards.value = response.data;
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getInfoTypes = computed(() => {
    return Object.keys(infoCards.value);
  });

  const getInfoCardsByType = (type) => {
    return infoCards.value[type];
  };

  return {
    error,
    fetchInfoCards,
    getInfoTypes,
    getInfoCardsByType,
    loading
  };
});
