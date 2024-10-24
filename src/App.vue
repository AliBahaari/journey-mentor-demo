<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { themeStore } from './stores/theme'
</script>

<template>
  <div
    :class="`
      min-h-screen ${themeStore.darkMode ? 'bg-veryDarkBlueDarkMode' : 'bg-veryLightGray'}
    `"
  >
    <NavbarComponent />
    <RouterView />
  </div>
</template>
