<script setup lang="ts">
import { themeStore } from '@/stores/theme'
import CountryCard from '@/components/CountryCard.vue'
import { ref, onMounted, computed, type Ref } from 'vue'
import axios from 'axios'
import type { CountryType } from '@/types/Country.type'

const filterItems = ['All', 'Africa', 'America', 'Asia', 'Europe', 'Oceania']
const sortItems = ['Population', 'Country Name']
const isVisible = ref(false)
const countries: Ref<
  Required<Pick<CountryType['data'], 'name' | 'region' | 'population'>>[]
> = ref([])
const searchInput = ref('')
const whichFilter = ref('')
const sortBy = ref('')

const searchResults = computed(() => {
  let refactoredData = []
  if (
    searchInput.value.length > 0 &&
    whichFilter.value.length > 0 &&
    whichFilter.value !== 'All'
  ) {
    refactoredData = countries.value.filter(
      i =>
        i?.name?.common?.toLowerCase().includes(searchInput.value) &&
        i?.region === whichFilter.value,
    )
  } else if (
    searchInput.value.length > 0 &&
    (whichFilter.value === 'All' || whichFilter.value.length === 0)
  ) {
    refactoredData = countries.value.filter(i =>
      i?.name?.common?.toLowerCase().includes(searchInput.value),
    )
  } else if (
    searchInput.value.length === 0 &&
    whichFilter.value.length > 0 &&
    whichFilter.value !== 'All'
  ) {
    refactoredData = countries.value.filter(
      i => i?.region === whichFilter.value,
    )
  } else {
    refactoredData = countries.value
  }

  if (sortBy.value === 'Population') {
    return refactoredData.sort((a, b) => b.population - a.population)
  } else if (sortBy.value === 'Country Name') {
    return refactoredData.sort((a, b) =>
      a.name.common.localeCompare(b.name.common),
    )
  }

  return refactoredData
})

onMounted(async () => {
  try {
    const countriesData = await axios.get('https://restcountries.com/v3.1/all')
    countries.value = countriesData.data.slice(10, 20)
  } catch {
    throw new Error('Failed to Fetch Data!')
  }
})
</script>

<template>
  <div
    class="flex flex-col gap-10 lg:flex-row justify-between lg:items-center mt-10 px-5 lg:px-20"
  >
    <div
      :class="`flex flex-row items-center shadow-lg px-8 py-4 rounded-md gap-8 lg:w-[500px] ${themeStore.darkMode ? 'bg-darkBlue text-white' : 'bg-white text-black'}`"
    >
      <i class="pi pi-search" />
      <input
        type="text"
        placeholder="Search for a country..."
        class="text-sm w-full bg-transparent"
        v-model="searchInput"
      />
    </div>

    <div class="flex flex-row gap-4 items-center">
      <span class="font-bold">Sort by:</span>

      <button
        v-for="(i, index) in sortItems"
        :key="index"
        @click="sortBy = i"
        :class="`px-4 flex flex-row gap-2 items-center py-2 rounded-md ${themeStore.darkMode ? 'bg-darkBlue text-white' : 'bg-white text-black'}`"
      >
        <i v-if="i === sortBy" class="pi pi-check" />
        <span>{{ i }}</span>
      </button>
    </div>

    <div class="relative cursor-pointer">
      <div
        @click="isVisible = !isVisible"
        :class="`flex flex-row justify-between items-center shadow-lg px-6 py-4 rounded-md gap-1 w-[200px] text-sm ${themeStore.darkMode ? 'bg-darkBlue text-white' : 'bg-white text-black'}`"
      >
        <span class="font-medium">Filter by Region</span>
        <i class="pi pi-caret-down" />
      </div>

      <div
        v-if="isVisible"
        :class="`flex flex-col absolute z-10 top-[56px] left-0 shadow-lg px-6 py-4 rounded-md gap-2 w-[200px] ${themeStore.darkMode ? 'bg-darkBlue text-white' : 'bg-white text-black'}`"
      >
        <div
          v-for="(i, index) in filterItems"
          :key="index"
          @click="whichFilter = i"
          class="flex flex-row items-center justify-between"
        >
          <span class="text-sm font-medium">{{ i }}</span>
          <i v-if="whichFilter === i" class="pi pi-check text-[14px]" />
        </div>
      </div>
    </div>
  </div>

  <div class="px-5 lg:px-20 mt-10">
    <div
      v-if="searchResults?.length > 0"
      class="grid grid-cols-1 lg:grid-cols-4 gap-x-10 gap-y-10"
    >
      <CountryCard v-for="(i, index) in searchResults" :key="index" :data="i" />
    </div>
    <p v-else :class="`${themeStore.darkMode ? 'text-white' : 'text-black'}`">
      No Data!
    </p>
  </div>
</template>

<style lang="css" scoped></style>
