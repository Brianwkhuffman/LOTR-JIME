<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
});

const isActiveRoute = computed(() => {
  if (props.link !== '/') {
    return route.path.startsWith(props.link);
  }
  return route.path === '/';
});
</script>

<template>
  <q-item
    clickable
    :to="props.link"
    :active="isActiveRoute"
    @click="$emit('toggleDrawer')"
  >
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
