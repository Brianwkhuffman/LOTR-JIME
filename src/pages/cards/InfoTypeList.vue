<script setup>
import { useInfoCardStore } from 'stores/infoCardStore.js';
import { useRouter } from 'vue-router';
import BackButton from 'src/components/button/BackButton.vue';

const router = useRouter();
const infoCardStore = useInfoCardStore();
const infoCardList = infoCardStore.getInfoCardList;

const goToCardList = (type) => {
  router.push('/cards/info/' + type);
};
</script>

<template>
  <back-button />
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-card
        v-for="infoType in infoCardList"
        :key="infoType"
        @click="goToCardList(infoType)"
        class="cursor-pointer hoverable"
        flat
        bordered
      >
        <q-card-section class="text-center">
          <div class="text-h6 text-capitalize">{{ infoType }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
