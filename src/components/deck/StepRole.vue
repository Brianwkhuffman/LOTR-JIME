<script setup>
const emit = defineEmits(['nextStep']);

const selectRole = () => {
  emit('nextStep');
};
</script>

<template>
  <div>
    <h3>Step Role</h3>
    <q-btn @click="selectRole">
      Select Role
    </q-btn>
  </div>
</template>
