import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useWeaknessCardStore = defineStore('weaknessStore', () => {
  const url = '/data/weaknessCards.json';
  const loading = ref(false);
  const error = ref(null);
  const weaknessCards = ref([]);

  const fetchWeaknessCards = async () => {
    const hasData = weaknessCards.value.length;
    if (hasData) {
      return;
    }

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

  /**
   * Method to create Weakness Card objects formatted for q-select dropdown.
   *
   * @returns An array of objects with keys: label (card name) and value (card id)
   */
  const getWeaknessCardOptions = computed(() => {
    return weaknessCards.value.map((card) => {
      return { label: card.name, value: card.id };
    });
  });

  return {
    error,
    loading,
    weaknessCards,
    fetchWeaknessCards,
    getWeaknessCardOptions
  };
});
