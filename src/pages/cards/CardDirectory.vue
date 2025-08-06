<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();
const cardTypes = ['heroes', 'equipment', 'roles', 'titles', 'weakness', 'damageFear', 'info'];

const goToType = (type) => {
  router.push('/cards/' + type);
};
</script>

<template>
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
