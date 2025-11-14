<script setup>
import { computed } from 'vue';
import { useRoleCardStore } from 'stores/roleCardStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import SmallCard from 'components/cards/SmallCard.vue';

const roleCardStore = useRoleCardStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: rolesLoading, getRoleOptions } = storeToRefs(roleCardStore);
const { loading: deckLoading, selectedRole } = storeToRefs(deckStore);

const roleCards = computed(() => {
  if (selectedRole.value) {
    const cards = roleCardStore.getRoleCardsByType(selectedRole.value.value);
    return cards;
  }
  return null;
});

const addRoleCards = () => {
  const validRole = validateRoleSelection();
  if (!validRole) {
    return;
  }
  deckStore.addCards('role', roleCards);
  emit('nextStep');
};

const validateRoleSelection = () => {
  return selectedRole.value;
};
</script>

<template>
  <div v-if="rolesLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">

    <q-select
      :options="getRoleOptions"
      v-model="selectedRole"
      label="Role:"
      clearable
      outlined
      stack-label
      color="primary"
      style="width: 18rem;"
    />

    <div class="q-pa-md row justify-between">
      <q-btn color="primary" @click="addRoleCards">
        Select Role
      </q-btn>
    </div>

    <div
      v-for="card in roleCards"
      :key="card.number"
      class="q-pa-sm"
    >
      <small-card :card="card"/>
    </div>
  </div>
</template>
