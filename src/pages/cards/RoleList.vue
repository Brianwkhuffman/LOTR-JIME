<script setup>
import { useRoleCardStore } from '/src/stores/roleCardStore.js';
import { useRouter } from 'vue-router';
import { formatCamelCase } from '/src/utils/formatDisplay.js';
import BackButton from 'src/components/button/BackButton.vue';

const router = useRouter();
const roleCardStore = useRoleCardStore();
const roleList = roleCardStore.getRoles;

const formattedRoles = roleList.map(role => ({
  raw: role,
  label: formatCamelCase(role)
}));

const goToType = (role) => {
  router.push('/cards/roles/' + role);
};
</script>

<template>
  <BackButton/>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-card
        v-for="role in formattedRoles"
        :key="role.raw"
        @click="goToType(role.raw)"
        class="cursor-pointer hoverable"
        flat
        bordered
      >
        <q-card-section class="text-center">
          <div class="text-h6 text-capitalize">{{ role.label }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
