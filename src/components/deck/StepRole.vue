<script setup>
import { computed, ref } from 'vue';
import { useRoleCardStore } from 'stores/roleCardStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import SmallCard from 'components/cards/SmallCard.vue';

const roleCardStore = useRoleCardStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: rolesLoading, getRoleOptions } = storeToRefs(roleCardStore);
const { loading: deckLoading, selectedRole } = storeToRefs(deckStore);

const selectedCardNumbers = ref([]);

const roleCards = computed(() => {
  if (selectedRole.value) {
    const roleName = selectedRole.value.value;
    const cards = roleCardStore.getRoleCardsByName(roleName);
    return cards;
  }
  return null;
});

const cardExpCount = computed(() => {
  if (roleCards.value) {
    const selectedCards = roleCards.value.filter((card) => selectedCardNumbers.value.includes(card.id));
    return selectedCards.reduce((totalExp, card) => {
      return totalExp + card.exp;
    }, 0);
  }
  return 0;
});

const addRoleCards = () => {
  const validRole = hasSelectedRole.value;
  if (!validRole) {
    return;
  }

  const cardsToAdd = roleCards.value.filter((card) => {
    return selectedCardNumbers.value.includes(card.number);
  });

  if (cardsToAdd.length > 0) {
    deckStore.addCards('role', cardsToAdd);
    emit('nextStep');
  }
};

const toggleCardSelection = (cardNumber) => {
  const index = selectedCardNumbers.value.indexOf(cardNumber);
  if (index > -1) {
    selectedCardNumbers.value.splice(index, 1);
  } else {
    selectedCardNumbers.value.push(cardNumber);
  }
};

const hasSelectedRole = computed(() => {
  return selectedRole.value && selectedCardNumbers.value.length > 0;
});

</script>

<template>
  <div v-if="rolesLoading && deckLoading" class="row justify-center">
    <q-spinner-oval color="primary" size="10rem" />
  </div>

  <div v-else style="display: grid; place-items: center;">

    <div>
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

      <p class="q-pa-xs">Exp spent: {{ cardExpCount }}</p>
    </div>

    <div class="q-pa-md col q-gutter-sm">
      <q-btn class="test" color="primary" @click="addRoleCards" :disable="!hasSelectedRole">
        Select Role
      </q-btn>
    </div>

    <div
      v-for="card in roleCards"
      :key="card.number"
      class="q-pa-sm"
    >
      <small-card
        :card="card"
        @click="toggleCardSelection(card.number)"
        :is-selected="selectedCardNumbers.includes(card.number)"
      />
    </div>
  </div>
</template>
