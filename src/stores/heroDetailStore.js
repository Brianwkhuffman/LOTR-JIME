import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useHeroDetailStore = defineStore('heroDetailStore', () => {
  const url = '/data/heroDetails.json';
  const loading = ref(false);
  const error = ref(null);
  const heroes = ref({});
  const heroNames = ref([]);

  const fetchHeroDetails = async () => {
    const hasData = Object.keys(heroes.value).length && heroNames.value.length;
    if (hasData) {
      return;
    }

    loading.value = true;
    try {
      const response = await axios.get(url);
      const data = response.data;
      heroes.value = data;
      heroNames.value = Object.keys(data);
    }
    catch (e) {
      error.value = e.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getHeroByName = (name) => {
    const heroesArray = Object.values(heroes.value);
    const hero = heroesArray.find(hero => hero.name === name);
    return hero ? hero : null;
  };

  const getHeroCardsByHeroId = (id) => {
    const heroesArray = Object.values(heroes.value);
    const hero = heroesArray.find(hero => hero.id === id);
    return hero ? hero.cards : null;
  };

  /**
   * Method to create Hero objects formatted for q-select dropdown.
   *
   * @returns {Array<{label: string, value: string}>}
   * An array of objects, each containing the hero's name (label) and ID (value).
   */
  const getHeroOptions = computed(() => {
    const options = [];
    for (const hero of Object.values(heroes.value)) {
      options.push({
        label: hero.name,
        value: hero.id,
      });
    }
    return options;
  });

  return {
    error,
    loading,
    heroes,
    heroNames,
    fetchHeroDetails,
    getHeroByName,
    getHeroCardsByHeroId,
    getHeroOptions
  };
});
