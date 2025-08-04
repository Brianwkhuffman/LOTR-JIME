<script setup>
import {ref} from 'vue'
import MenuLink from 'components/MenuLink.vue'

const menuLinksList = [
  {
    title: 'Home',
    caption: 'Home caption',
    icon: 'public',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Card Info',
    caption: 'Card info caption',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Build Deck',
    caption: 'Build deck caption',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Load Deck',
    caption: 'Load deck caption',
    icon: 'code',
    link: 'https://github.com/quasarframework'
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
      <q-toolbar-title>JiME Playmat</q-toolbar-title>
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
      />
    </q-list>
  </q-drawer>
</template>
