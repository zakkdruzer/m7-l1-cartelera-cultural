import { onMounted, ref, watch } from 'vue'

const THEME_KEY = 'cartelera-cultural-theme'

export function useTheme() {
  const theme = ref('light')

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  function applyTheme(value) {
    document.documentElement.setAttribute('data-theme', value)
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem(THEME_KEY)

    if (savedTheme === 'dark' || savedTheme === 'light') {
      theme.value = savedTheme
    } else {
      theme.value = getSystemTheme()
    }

    applyTheme(theme.value)
  })

  watch(theme, (newTheme) => {
    localStorage.setItem(THEME_KEY, newTheme)
    applyTheme(newTheme)
  })

  return {
    theme,
    toggleTheme
  }
}