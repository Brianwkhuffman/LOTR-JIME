<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <q-btn @click="goBack">
    Back
  </q-btn>
</template>
