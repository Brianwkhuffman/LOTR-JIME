<script setup>
import {useRoleCardStore} from '/src/stores/roleCardStore.js';
import {useRouter} from 'vue-router';
import BackButton from 'src/components/button/BackButton.vue';

const router = useRouter();
const roleCardStore = useRoleCardStore();
const roleList = roleCardStore.getRoles;

const goToType = (role) => {
  router.push('/cards/roles/' + role);
};
</script>

<template>
  <BackButton/>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-card
        v-for="role in roleList"
        :key="role"
        @click="goToType(role)"
        class="cursor-pointer hoverable"
        flat
        bordered
      >
        <q-card-section class="text-center">
          <div class="text-h6 text-capitalize">{{ role }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
