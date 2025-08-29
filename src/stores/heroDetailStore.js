import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useHeroDetailStore = defineStore('heroDetailStore', () => {
  const url = '/src/data/heroDetails.json';
  const loading = ref(false);
  const error = ref(null);
  const heroDetails = ref({});
  const heroNames = ref([]);

  const fetchHeroDetails = async () => {
    const hasData = Object.keys(heroDetails.value).length && heroNames.value.length;
    if (hasData) {
      return;
    }

    loading.value = true;
    try {
      const response = await axios.get(url);
      const data = response.data;
      heroDetails.value = data;
      heroNames.value = Object.keys(data);
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  // Getters-------------------
  const getAllHeroDetails = computed(() => {
    return heroDetails.value;
  });

  const getHeroNames = computed(() => {
    return heroNames.value;
  });

  // List of objects for q-select dropdown
  const getHeroOptions = computed(() => {
    const options = [];
    for (const hero of Object.values(heroDetails.value)) {
      options.push({
        label: hero.name,
        value: hero.id,
      });
    }
    return options;
  });

  // Actions-------------------

  // Get Hero object using hero.id
  const getHeroByOptionValue = (option) => {
    for (const hero of Object.values(heroDetails.value)) {
      if (hero.id === option.value) {
        return hero;
      }
    }
    return null;
  };

  return {
    error,
    fetchHeroDetails,
    getAllHeroDetails,
    getHeroNames,
    getHeroOptions,
    getHeroByOptionValue,
    loading
  };
});
