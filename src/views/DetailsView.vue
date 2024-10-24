<script setup lang="ts">
import { themeStore } from '@/stores/theme'
import type { CountryType } from '@/types/Country.type'
import axios from 'axios'
import { onMounted, onUpdated, reactive } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const route = useRoute()
const country: CountryType = reactive({
  data: {},
  isLoading: true,
})

const handleErrorToast = () => {
  toast.error('No Such a Country Found!', {
    autoClose: 3000,
  })
}

onUpdated(async () => {
  try {
    const countryData = await axios.get(
      `https://restcountries.com/v3.1/name/${route.params.name}`,
    )
    country.data = countryData.data[0]
    country.isLoading = false
  } catch {
    handleErrorToast()
  }
})

onMounted(async () => {
  try {
    const countryData = await axios.get(
      `https://restcountries.com/v3.1/name/${route.params.name}`,
    )
    country.data = countryData.data[0]
    country.isLoading = false
  } catch {
    handleErrorToast()
  }
})
</script>

<template>
  <div class="px-5 lg:px-20">
    <RouterLink to="/">
      <button
        :class="`py-2 mt-10 px-10 rounded-md shadow-lg items-center flex flex-row gap-2 ${themeStore.darkMode ? 'bg-darkBlue text-white' : 'bg-white text-black'}`"
      >
        <i class="pi pi-arrow-left text-[14px]" />
        <span>Back</span>
      </button>
    </RouterLink>

    <div class="mt-10">
      <div
        v-if="country?.isLoading"
        :class="`${themeStore.darkMode ? 'text-white' : 'text-black'}`"
      >
        Loading...
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div class="w-full aspect-[4/3] relative overflow-hidden">
          <img
            :src="country?.data?.flags?.png"
            :alt="country?.data?.name?.common"
            class="object-cover absolute w-full h-full"
          />
        </div>

        <div :class="`${themeStore.darkMode ? 'text-white' : 'text-black'}`">
          <span class="text-3xl font-bold">{{
            country?.data?.name?.common
          }}</span>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-4 mt-8">
            <div>
              <span class="font-bold mr-1">Native Name: </span>
              <span>{{ country?.data?.name?.official }}</span>
            </div>
            <div>
              <span class="font-bold mr-1">Top Level Domain: </span>
              <span>{{ country?.data?.tld?.[0] }}</span>
            </div>
            <div>
              <span class="font-bold mr-1">Population: </span>
              <span>{{ country?.data?.population }}</span>
            </div>
            <div>
              <span class="font-bold mr-1">Currencies: </span>
              <span
                v-for="(i, index) in Object.values(country?.data?.currencies!)"
                :key="index"
              >
                {{ i?.name }}
              </span>
            </div>
            <div>
              <span class="font-bold mr-1">Region: </span>
              <span>{{ country?.data?.region }}</span>
            </div>
            <div>
              <span class="font-bold mr-1">Languages: </span>
              <span
                v-for="(i, index) in Object.values(country?.data?.languages!)"
                :key="index"
              >
                {{
                  index + 1 === Object.values(country?.data?.languages!)?.length
                    ? i
                    : `${i}, `
                }}
              </span>
            </div>
            <div>
              <span class="font-bold mr-1">Sub Region: </span>
              <span>{{ country?.data?.subregion }}</span>
            </div>
            <div />
            <div>
              <span class="font-bold mr-1">Capital: </span>
              <span>{{ country?.data?.capital?.[0] }}</span>
            </div>
          </div>

          <div
            class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0 mt-8"
          >
            <span class="font-bold mr-4">Border Countries:</span>
            <div class="flex flex-row items-center gap-2">
              <div v-for="(i, index) in country?.data?.borders" :key="index">
                <RouterLink :to="`/details/${i}`">
                  <div
                    :class="`py-1 px-5 rounded-md shadow-lg items-center flex flex-row gap-2 ${themeStore.darkMode ? 'bg-darkBlue text-white' : 'bg-white text-black'}`"
                  >
                    <span>{{ i }}</span>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
