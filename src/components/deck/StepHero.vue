<script setup>
defineEmits(['back', 'next']);

</script>

<template>
  <div>
    <h1>Step Hero</h1>
    <q-btn @click="$emit('next')">
      Next
    </q-btn>
  </div>
</template>
