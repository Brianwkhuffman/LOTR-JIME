<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useInfoCardStore } from 'stores/infoCardStore.js';
import BackButton from 'src/components/button/BackButton.vue';

const router = useRouter();
const infoCardStore = useInfoCardStore();
const { loading, infoTypes } = storeToRefs(infoCardStore);

const goToCardList = (type) => {
  router.push('/cards/info/' + type);
};
</script>

<template>
  <back-button />
  <div class="q-pa-md">
    <div v-if="loading" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>

    <div v-else class="q-gutter-sm">
      <q-card
        v-for="type in infoTypes"
        :key="type"
        @click="goToCardList(type)"
        class="cursor-pointer hoverable"
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
