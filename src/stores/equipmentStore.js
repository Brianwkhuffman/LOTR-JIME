import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import equips from '/src/data/equipCards.json'

export const useEquipStore = defineStore('equip', () => {
  const equipList = ref(equips);

  const getEquipmentTypesList = () => {
   return computed(() => Object.key(equipList));
  };

  const getEquipmentListByType = (type) => {
    return computed(() => equipList.value[type] ?? []);
  };

  return {
    equipList,
    getEquipmentTypesList,
    getEquipmentListByType
  };
});
