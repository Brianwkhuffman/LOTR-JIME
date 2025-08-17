<script setup>
import { ref } from 'vue';

const dialog = ref(false);

</script>

<template>
  <q-btn label="Filter" @click="dialog = true"/>
  <q-dialog v-model="dialog">
    <q-card>
      <h4>Filter stuff here</h4>
    </q-card>
  </q-dialog>
</template>
