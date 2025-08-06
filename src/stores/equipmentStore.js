import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import equipData from '/src/data/equipCards.json'

export const useEquipmentStore = defineStore('equipment', () => {
  const equipList = ref(equipData);

  const getEquipmentTypes = computed(() => {
   return Object.keys(equipList.value);
  });

  const getEquipmentListByType = (type) => {
    return computed(() => equipList.value[type] ?? []);
  };

  return {
    equipList,
    getEquipmentTypes,
    getEquipmentListByType
  };
});
