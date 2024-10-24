<script setup lang="ts">
import { themeStore } from '@/stores/theme'

const handleDarkMode = () => {
  themeStore.switch()
}
</script>

<template>
  <nav
    :class="`flex flex-row justify-between px-5 gap-2 lg:px-20 py-6 shadow-md ${themeStore.darkMode ? 'bg-darkBlue text-white' : 'bg-white text-black'}`"
  >
    <span class="lg:text-2xl font-bold">Where in the world?</span>
    <div
      @click="handleDarkMode"
      class="cursor-pointer flex flex-row items-center gap-2"
    >
      <i class="pi pi-moon" />
      <span class="font-medium">Dark Mode</span>
    </div>
  </nav>
</template>

<style lang="css" scoped></style>
