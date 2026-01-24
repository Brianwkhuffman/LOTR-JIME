<script setup>
import { useDeckStore } from 'stores/deckStore';

const deckStore = useDeckStore();

defineProps({
  errors: {
    type: Array,
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
      <template v-for="error in errors" :key="error">
        <p>
          {{ error }}
        </p>
      </template>
      <template v-slot:action>
        <q-btn flat color="white" label="Dismiss" @click="deckStore.clearErrors" />
      </template>
    </q-banner>
  </transition>
</template>

<style scoped>
.q-banner {
  width: 100%;
}
.q-img {
  filter: invert(88%);
}
</style>
