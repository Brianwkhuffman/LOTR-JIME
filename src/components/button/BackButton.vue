<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const goBack = () => {
  if (window.history.state?.back) {
    const urlPaths = route.path.split('/').filter(Boolean);
    if (urlPaths.length === 1) {
      return router.push('/');
    }
  }
  return router.back();
};
</script>

<template>
  <q-btn @click="goBack">
    Back
  </q-btn>
</template>
