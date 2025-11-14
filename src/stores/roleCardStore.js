import axios from 'axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { formatCamelCase } from 'src/utils/formatDisplay.js';

export const useRoleCardStore = defineStore('roleCardStore', () => {
  const url = '/data/roleCards.json';
  const loading = ref(false);
  const error = ref(null);
  const roleCards = ref({});
  const roles = ref([]);

  const fetchRoleCards = async () => {
    const hasData = Object.keys(roleCards.value).length && roles.value.length;
    if (hasData) {
      return;
    }

    loading.value = true;
    try {
      const response = await axios.get(url);
      const data = response.data;
      roleCards.value = data;
      roles.value = Object.keys(data);
    }
    catch (error) {
      error.value = error.message;
    }
    finally {
      loading.value = false;
    }
  };

  const getRoles = computed(() => {
    return roles.value;
  });

  const getRoleCardsByType = (type) => {
    return roleCards.value[type];
  };

  // List of objects for q-select dropdown
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
    fetchRoleCards,
    getRoles,
    getRoleCardsByType,
    getRoleOptions,
    loading
  };
});
