<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const finalizeDeck = () => {
  router.push('/play');
};
</script>

<template>
  <div>
    <h3>Step Final</h3>
    <q-btn @click="finalizeDeck">
      Finish
    </q-btn>
  </div>
</template>
