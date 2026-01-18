<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useRoleCardStore } from '/src/stores/roleCardStore.js';
import { formatCamelCaseWithDash } from '/src/utils/formatDisplay.js';
import BackButton from 'src/components/button/BackButton.vue';

const router = useRouter();
const roleCardStore = useRoleCardStore();
const { loading, roles } = storeToRefs(roleCardStore);

const goToRoleList = (role) => {
  router.push('/cards/roles/' + role);
};
</script>

<template>
  <back-button/>
  <div class="q-pa-md">
    <div v-if="loading" class="row justify-center">
      <q-spinner-oval color="primary" size="10rem" />
    </div>

    <div v-else class="q-gutter-sm">
      <q-card
        v-for="role in roles"
        :key="role"
        @click="goToRoleList(role)"
        class="cursor-pointer hoverable"
        flat
        bordered
      >
        <q-card-section class="text-center">
          <div class="text-h6 text-capitalize">{{ formatCamelCaseWithDash(role) }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
