<script setup>
defineEmits(['back', 'next']);

</script>

<template>
  <div>
    <h1>Step Role</h1>
    <q-btn @click="$emit('back')">
      Back
    </q-btn>
    <q-btn @click="$emit('next')">
      Next
    </q-btn>
  </div>
</template>
