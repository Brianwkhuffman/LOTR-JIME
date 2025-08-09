import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import roleCardData from '/src/data/roleCards.json';

/**
 * @typedef {Object} RoleCard
 * @property {number} id
 * @property {string} type
 * @property {string} role
 * @property {number} number
 * @property {string} name
 * @property {string} trait
 * @property {string} icon
 * @property {string|null} exp
 * @property {string} description
 * @property {string} collection
 */

/**
 * @typedef {Object.<string, RoleCard[]>} RoleCardsMap
 */

export const useRoleCardStore = defineStore('role', () => {
  /** @type {import('vue').Ref<RoleCardsMap>} */
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
