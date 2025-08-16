<script setup>
defineEmits(['back', 'next']);

const finalizeDeck = () => {
  alert('finished');
};
</script>

<template>
  <div>
    <h1>Step Review</h1>
    <q-btn @click="$emit('back')">
      Back
    </q-btn>
    <q-btn @click="finalizeDeck">
      Start
    </q-btn>
  </div>
</template>
