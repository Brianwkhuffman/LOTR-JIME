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

  const getEquipmentOptionsByType = (type) => {
    const options = [];
    const equipTypeList = getEquipmentListByType(type);
    let filteredList;

    if (type === 'mounts') {
      // Mounts have no tiers
      filteredList = equipTypeList;
    } else {
      filteredList = equipTypeList.filter(equip => equip.tier === 'I');
    }

    for (const equip of filteredList) {
      options.push({
        label: equip.name,
        value: equip.family
      });
    }
    return options;
  };

  const getEquipCardsByTypeAndFamily = (type, family) => {
    console.log(type, family);
    const equipTypeList = getEquipmentListByType(type);
    const final = equipTypeList.filter(equip => equip.family === family);
    console.log(final);
    return final;
  };

  return {
    error,
    loading,
    equipmentMap,
    equipTypes,
    fetchEquipCards,
    getEquipmentListByType,
    getEquipmentOptionsByType,
    getEquipCardsByTypeAndFamily
  };
});
