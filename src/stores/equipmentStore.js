import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useEquipmentStore = defineStore('equipmentStore', () => {
  const url = '/data/equipCards.json';
  const loading = ref(false);
  const error = ref(null);
  const equipList = ref({});
  const equipTypes = ref([]);

  const fetchEquipCards = async () => {
    const hasData = Object.keys(equipList.value).length && equipTypes.value.length;
    if (hasData) {
      return;
    }

    loading.value = true;
    try {
      const response = await axios.get(url);
      const data = response.data;
      equipList.value = data;
      equipTypes.value = Object.keys(data);
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getEquipmentTypes = computed(() => {
    return equipTypes.value;
  });

  const getEquipmentListByType = (type) => {
    return equipList.value[type];
  };

  return {
    error,
    fetchEquipCards,
    getEquipmentTypes,
    getEquipmentListByType,
    loading
  };
});
