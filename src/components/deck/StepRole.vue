<script setup>
import { computed, ref } from 'vue';
import { useRoleCardStore } from 'stores/roleCardStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import BasicCard from '../cards/BasicCard.vue';
import ErrorBanner from '../ErrorBanner.vue';

const roleCardStore = useRoleCardStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: rolesLoading, getRoleOptions } = storeToRefs(roleCardStore);
const { loading: deckLoading, errors } = storeToRefs(deckStore);

const selectedRole = ref({ label: '', value: '' });
const selectedCardNumbers = ref([]);

const resetSelection = () => {
  return selectedCardNumbers.value = [];
};

const roleCards = computed(() => {
  if (selectedRole.value) {
    const roleName = selectedRole.value.value;
    resetSelection();
    return roleCardStore.getRoleCardsByName(roleName);
  }
  return null;
});

const roleExpLabel = computed(() => {
  if (!roleCards.value) {
    return 'Select a role';
  }
  const totalExpCost = roleCards.value.reduce((totalExp, card) => {
    if (selectedCardNumbers.value.includes(card.number)) {
      return totalExp + (card.exp || 0);
    }
    return totalExp;
  }, 0);
  return 'EXP Spent: ' + totalExpCost;
});

const hasSelectedRole = computed(() => {
  return selectedRole.value && selectedCardNumbers.value.length > 0;
});

const addRoleCards = () => {
  const validRole = hasSelectedRole.value;
  if (!validRole) {
    return;
  }

  const cardsToAdd = roleCards.value.filter((card) => selectedCardNumbers.value.includes(card.number));

  if (cardsToAdd.length > 0) {
    const roleCardsAdded = deckStore.addDeckCards('role', cardsToAdd);
    if (roleCardsAdded) {
      emit('nextStep');
    }
  }
};

const getCardClass = (cardNumber) => {
  if (selectedCardNumbers?.value.includes(cardNumber)) {
    return 'card-list selected-card-border';
  }
  return 'card-list';
};

const toggleMultiCardSelection = (cardNumber) => {
  const index = selectedCardNumbers.value.indexOf(cardNumber);
  if (index > -1) {
    selectedCardNumbers.value.splice(index, 1);
  } else {
    selectedCardNumbers.value.push(cardNumber);
  }
};

</script>

<template>
  <div v-if="rolesLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">
    <template v-if="errors.length">
      <error-banner :errors="errors" />
    </template>

    <div>
      <q-select
        :options="getRoleOptions"
        v-model="selectedRole"
        :popup-content-style="{ height: '40vh' }"
        :label="roleExpLabel"
        clearable
        outlined
        stack-label
        color="primary"
        style="width: 18rem;"
      />
    </div>

    <div class="q-pa-md col q-gutter-sm">
      <q-btn class="test" color="primary" @click="addRoleCards" :disable="!hasSelectedRole">
        Confirm Role Cards
      </q-btn>
    </div>

    <ul class="card-grid" role="list">
      <li v-for="card in roleCards"
          :key="card.number"
          :class="getCardClass(card.number)"
          tabindex="0"
      >
        <basic-card
          :card="card"
          @click="toggleMultiCardSelection(card.number)"
        />
      </li>
    </ul>
  </div>
</template>
