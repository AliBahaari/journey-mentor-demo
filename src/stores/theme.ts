import { reactive } from 'vue'

export const themeStore = reactive({
  darkMode: false,
  switch() {
    this.darkMode = !this.darkMode
  },
})
