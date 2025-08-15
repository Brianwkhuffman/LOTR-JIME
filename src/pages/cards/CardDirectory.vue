<script setup>
import { useRouter } from 'vue-router';
import BackButton from 'components/button/BackButton.vue';

const router = useRouter();
const cardTypes = ['heroes', 'equipment', 'roles', 'titles', 'damage', 'fear', 'weakness', 'info'];

const goToType = (type) => {
  router.push('/cards/' + type);
};
</script>

<template>
  <back-button />
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-card
        v-for="type in cardTypes"
        :key="type"
        class="cursor-pointer hoverable"
        @click="goToType(type)"
        flat
        bordered
      >
        <q-card-section class="text-center">
          <div class="text-h6 text-capitalize">{{ type }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
