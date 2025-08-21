import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useWeaknessCardStore = defineStore('weaknessStore', () => {
  const url = '/src/data/weaknessCards.json';
  const loading = ref(false);
  const error = ref(null);
  const weaknessCards = ref([]);

  const fetchWeaknessCards = async () => {
    loading.value = true;
    try {
      const response = await axios.get(url);
      weaknessCards.value = response.data.weaknessCards;
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getWeaknessCards = computed(() => {
    return weaknessCards.value;
  });

  return {
    error,
    fetchWeaknessCards,
    getWeaknessCards,
    loading
  };
});
