import axios from 'axios';
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useEquipmentStore = defineStore('equipmentStore', () => {
  const url = '/data/equipCards.json';
  const loading = ref(false);
  const error = ref(null);
  const equipmentMap = ref({});
  const equipTypes = ref([]);

  const fetchEquipCards = async () => {
    const hasData = Object.keys(equipmentMap.value).length && equipTypes.value.length;
    if (hasData) {
      return;
    }

    loading.value = true;
    try {
      const response = await axios.get(url);
      const data = response.data;
      equipmentMap.value = data;
      equipTypes.value = Object.keys(data);
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getEquipmentListByType = (type) => {
    return equipmentMap.value[type];
  };

  return {
    error,
    loading,
    equipmentMap,
    equipTypes,
    fetchEquipCards,
    getEquipmentListByType
  };
});
