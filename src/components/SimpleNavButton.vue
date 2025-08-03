<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  targetPage: {
    type: String,
    required: true,
    validator: (value) => ['home', 'heroes', 'equipment'].includes(value)
  }
});

const router = useRouter();

const routes = {
  home: '/',
  heroes: '/heroes',
  equipment: '/equipment'
};

const goToPage = () => {
  router.push(routes[props.targetPage]);
};
</script>

<template>
  <div>
    <q-btn
      @click="goToPage"
      :aria-label="`Go to ${targetPage}`"
    >
      {{ targetPage }}
    </q-btn>
  </div>
</template>
