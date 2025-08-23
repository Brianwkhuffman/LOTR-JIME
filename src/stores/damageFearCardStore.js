import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useDamageFearCardStore = defineStore('damageFearCardStore', () => {
  const url = '/src/data/damageFearCards.json';
  const loading = ref(false);
  const error = ref(null);
  const damageCards = ref([]);
  const fearCards = ref([]);

  const fetchDamageFearCards = async () => {
    loading.value = true;
    const hasData = damageCards.value.length && fearCards.value.length;
    if (hasData) {
      return;
    }
    try {
      const response = await axios.get(url);
      const data = response.data;
      damageCards.value = data.damageCards;
      fearCards.value = data.fearCards;
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getDamageCards = computed(() => {
    return damageCards.value;
  });
  const getFearCards = computed(() => {
    return fearCards.value;
  });

  return {
    error,
    fetchDamageFearCards,
    getDamageCards,
    getFearCards,
    loading
  };
});
