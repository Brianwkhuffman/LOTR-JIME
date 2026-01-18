<script setup>
import { useDeckStore } from 'stores/deckStore';

const deckStore = useDeckStore();

defineProps({
  error: {
    type: String,
    required: true
  }
});
</script>

<template>
  <transition
    appear
    enter-active-class="animated shake-box"
  >
    <q-banner class="bg-dark text-white q-mb-md rounded-borders">
      <template v-slot:avatar>
        <q-img src="assets/fear.png" style="width: 40px;" />
      </template>
      {{ error }}
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss" @click="deckStore.clearError" />
      </template>
    </q-banner>
  </transition>
</template>

<style scoped>
.q-img {
  filter: invert(88%);
}
</style>
