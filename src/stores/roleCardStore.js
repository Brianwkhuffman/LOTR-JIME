import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { formatCamelCase } from 'src/utils/formatDisplay.js';

export const useRoleCardStore = defineStore('roleCardStore', () => {
  const url = '/data/roleCards.json';
  const loading = ref(false);
  const error = ref(null);
  const roleCardsMap = ref({});
  const roles = ref([]);

  const fetchRoleCards = async () => {
    const hasData = Object.keys(roleCardsMap.value).length && roles.value.length;
    if (hasData) {
      return;
    }

    loading.value = true;
    try {
      const response = await axios.get(url);
      const data = response.data;
      roleCardsMap.value = data;
      roles.value = Object.keys(data);
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getRoleCardsByType = (type) => {
    return roleCardsMap.value[type];
  };

  /**
   * Method to create Role objects formatted for q-select dropdown.
   *
   * @returns An array of objects with keys: label (role name using camelCase) and value (role)
   */
  const getRoleOptions = computed(() => {
    const options = [];
    for (const role of roles.value) {
      options.push({
        label: formatCamelCase(role),
        value: role,
      });
    }
    return options;
  });

  return {
    error,
    loading,
    roleCardsMap,
    roles,
    fetchRoleCards,
    getRoleCardsByType,
    getRoleOptions
  };
});
