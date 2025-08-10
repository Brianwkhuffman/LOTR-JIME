<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const goBack = () => {
  if (window.history.state?.back) {
    return router.back();
  }

  const urlPaths = route.path.split('/').filter(Boolean);
  if (urlPaths.length > 1) {
    urlPaths.pop();
    const fallBackPath = '/' + urlPaths.join('/');
    return router.push(fallBackPath);
  }
  return router.push('/');
};
</script>

<template>
  <q-btn @click="goBack">
    Back
  </q-btn>
</template>
