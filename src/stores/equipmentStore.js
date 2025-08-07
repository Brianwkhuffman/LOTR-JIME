import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import equipData from '/src/data/equipCards.json'

export const useEquipmentStore = defineStore('equipment', () => {
  const equipList = ref(equipData);

  const getEquipmentTypes = computed(() => {
   return Object.keys(equipList.value);
  });

  const getEquipmentListByType = (type) => {
    return equipList.value[type];
  };

  const getTier1EquipmentByType = (type, tier) => {
    return equipList.value[type].filter(item => item.tier === tier);
  }

  return {
    equipList,
    getEquipmentTypes,
    getEquipmentListByType,
    getTier1EquipmentByType
  };
});
