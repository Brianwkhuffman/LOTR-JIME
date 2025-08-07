import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import roleCardData from '/src/data/roleCards.json';

export const useRoleCardStore = defineStore('role', () => {
  const roleCardList = ref(roleCardData);

  const getRoles = computed(() => {
    return Object.keys(roleCardList.value);
  });

  const getRoleCardListByRole = (role) => {
    return roleCardList.value[role];
  };

  return {
    roleCardList,
    getRoles,
    getRoleCardListByRole
  };
});
