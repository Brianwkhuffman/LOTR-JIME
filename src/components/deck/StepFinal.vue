<script setup>
defineEmits(['back', 'next']);

const finalizeDeck = () => {
  alert('finished');
};
</script>

<template>
  <div>
    <h3>Step Final</h3>
    <q-btn @click="finalizeDeck">Finish</q-btn>
  </div>
</template>
