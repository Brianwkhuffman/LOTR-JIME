<script setup>
import MenuDrawer from 'components/menu/MenuDrawer.vue';
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <menu-drawer />
      <router-view />
    </q-page-container>
  </q-layout>
</template>
