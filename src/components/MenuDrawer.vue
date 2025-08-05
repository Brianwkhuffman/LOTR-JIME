<script setup>
import {ref} from 'vue'
import MenuLink from 'components/MenuLink.vue'

const menuLinksList = [
  {
    title: 'Home',
    caption: 'Home caption',
    icon: 'public',
    link: '/'
  },
  {
    title: 'Browse cards',
    caption: '',
    icon: 'book',
    link: '/cards'
  },
  {
    title: 'Build Deck',
    caption: 'Build deck caption',
    icon: 'school',
    link: '/start'
  },
  {
    title: 'Load Deck',
    caption: 'Load deck caption',
    icon: 'code',
    link: '/load'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-header elevated>
   <q-toolbar>
      <q-btn
        flat
        dense
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
      <q-toolbar-title>LoTR JiME Companion</q-toolbar-title>
      <div>Qv{{ $q.version }}</div>
   </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
  >
    <q-list>
      <q-item-label header>
        Menu
      </q-item-label>

      <MenuLink
        v-for="link in menuLinksList"
        :key="link.title"
        v-bind="link"
        @toggle-drawer="toggleLeftDrawer"
      />
    </q-list>
  </q-drawer>
</template>
