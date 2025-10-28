// src/stores/theme.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  const currentFramework = ref('vuetify') // vuetify, bootstrap, tailwind
  const currentLocale = ref('en') // idioma actual
  
  // Lista de frameworks disponibles (para futuras implementaciones)
  const frameworks = [
    { value: 'vuetify', label: 'Vuetify', icon: 'mdi-vuetify' },
    { value: 'bootstrap', label: 'Bootstrap', icon: 'mdi-bootstrap', disabled: true },
    { value: 'tailwind', label: 'Tailwind', icon: 'mdi-tailwind', disabled: true },
  ]

  // Lista de idiomas disponibles
  const locales = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇲🇽' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'pt', label: 'Português', flag: '🇧🇷' }
  ]

  // Toggle dark mode
  const toggleTheme = (vuetifyTheme) => {
    isDark.value = !isDark.value
    if (vuetifyTheme) {
      vuetifyTheme.global.name.value = isDark.value ? 'dark' : 'light'
    }
    // Guardar preferencia en localStorage
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  // Cambiar framework (para futuro)
  const switchFramework = (framework) => {
    currentFramework.value = framework
    localStorage.setItem('framework', framework)
  }

  // Cambiar idioma
  const switchLocale = (locale, i18n) => {
    currentLocale.value = locale
    if (i18n) {
      i18n.locale.value = locale
    }
    localStorage.setItem('locale', locale)
  }

  // Inicializar desde localStorage
  const initTheme = (vuetifyTheme, i18n) => {
    const savedTheme = localStorage.getItem('theme')
    const savedFramework = localStorage.getItem('framework')
    const savedLocale = localStorage.getItem('locale')
    
    if (savedTheme === 'dark') {
      isDark.value = true
      if (vuetifyTheme) {
        vuetifyTheme.global.name.value = 'dark'
      }
    }
    
    if (savedFramework) {
      currentFramework.value = savedFramework
    }

    if (savedLocale && i18n) {
      currentLocale.value = savedLocale
      i18n.locale.value = savedLocale
    }
  }

  return {
    isDark,
    currentFramework,
    currentLocale,
    frameworks,
    locales,
    toggleTheme,
    switchFramework,
    switchLocale,
    initTheme
  }
})