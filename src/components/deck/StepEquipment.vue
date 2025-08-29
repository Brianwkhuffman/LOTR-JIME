<script setup>

const emit = defineEmits(['nextStep']);
const selectEquips = () => {
  emit('nextStep');
};
</script>

<template>
  <div>
    <h3>Step Equip</h3>
    <q-btn @click="selectEquips">
      Select Equip
    </q-btn>
  </div>
</template>
