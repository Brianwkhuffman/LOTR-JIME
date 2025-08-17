<script setup>
import MenuDrawer from 'components/menu/MenuDrawer.vue';
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <menu-drawer/>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
