<script setup lang="ts">
import { themeStore } from '@/stores/theme'
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

defineProps({
  data: Object,
})
</script>

<template>
  <RouterLink :to="`/details/${data?.name?.common}`">
    <div
      :class="`shadow-md rounded-md overflow-hidden ${themeStore.darkMode ? 'bg-darkBlue text-white' : 'bg-white text-black'}`"
    >
      <div class="w-full aspect-[4/3] relative overflow-hidden">
        <img
          :src="data?.flags?.png"
          :alt="data?.name?.common"
          class="object-cover absolute w-full h-full"
        />
      </div>

      <div class="p-6">
        <span class="font-bold text-xl mb-5 block">{{
          data?.name?.common
        }}</span>
        <div>
          <span class="font-bold mr-1">Population:</span>
          <span>{{ data?.population?.toLocaleString() }}</span>
        </div>
        <div>
          <span class="font-bold mr-1">Region:</span>
          <span>{{ data?.region }}</span>
        </div>
        <div>
          <span class="font-bold mr-1">Capital:</span>
          <span>{{ data?.capital?.[0] }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="css" scoped></style>
