import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useHeroDetailStore = defineStore('heroDetailStore', () => {
  const url = '/src/data/heroDetails.json';
  const loading = ref(false);
  const error = ref(null);
  const heroDetails = ref({});
  const heroes = ref([]);

  const fetchHeroDetails = async () => {
    const hasData = Object.keys(heroDetails.value).length && heroes.value.length;
    if (hasData) {
      return;
    }

    loading.value = true;
    try {
      const response = await axios.get(url);
      const data = response.data;
      heroDetails.value = data;
      heroes.value = Object.keys(data);
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getAllHeroDetails = computed(() => {
    // console.log(heroDetails.value);
    return heroDetails.value;
  });

  const getHeroes = computed(() => {
    return heroes.value;
  });
  
  const getHeroByName = (name) => {
    console.log(heroDetails.value[name]);
    return heroDetails.value[name];
  };

  return {
    error,
    fetchHeroDetails,
    getAllHeroDetails,
    getHeroes,
    getHeroByName,
    loading
  };
});
