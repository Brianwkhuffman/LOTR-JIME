<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useRoleCardStore } from 'stores/roleCardStore.js';
import { useDeckStore } from 'stores/deckStore';
import { storeToRefs } from 'pinia';
import SmallCard from 'components/cards/SmallCard.vue';

const roleCardStore = useRoleCardStore();
const deckStore = useDeckStore();

const emit = defineEmits(['nextStep']);
const { loading: rolesLoading, getRoleOptions } = storeToRefs(roleCardStore);
const { loading: deckLoading, currentDeck } = storeToRefs(deckStore);

const selectedRole = ref({ label: '', value: '' });
const selectedCardNumbers = ref([]);

onBeforeMount(() => {
  const hasRoleCards = currentDeck.value.role.length;
  if (hasRoleCards) {
    const roleType = currentDeck.value.role[0].role;
    const roleOption = getRoleOptions.value.find((option) => option.label === roleType);
    selectedRole.value = roleOption;

    let roleCards = [];
    for (const roleCard of currentDeck.value.role) {
      roleCards.push(roleCard.number);
    }
    selectedCardNumbers.value = roleCards;
  }
});

const roleCards = computed(() => {
  if (selectedRole.value) {
    const roleName = selectedRole.value.value;
    return roleCardStore.getRoleCardsByName(roleName);
  }
  return null;
});

const cardExpCount = computed(() => {
  if (!roleCards.value) {
    return 0;
  }
  return roleCards.value.reduce((totalExp, card) => {
    if (selectedCardNumbers.value.includes(card.number)) {
      return totalExp + (card.exp || 0);
    }
    return totalExp;
  }, 0);
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
