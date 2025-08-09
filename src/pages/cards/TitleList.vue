<script setup>
import {useTitleCardStore} from '/src/stores/titleCardStore.js';
import BackButton from 'src/components/button/BackButton.vue';

const titleCardStore = useTitleCardStore();
const titleCards = titleCardStore.getTitleList;
console.log(titleCards);

</script>

<template>
  <back-button/>
  <div v-for="title in titleCards" :key="title">
    {{title.name}}
  </div>
</template>
