// src/plugins/i18n.js
import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import es from '../locales/es'
import fr from '../locales/fr'
import de from '../locales/de'
import pt from '../locales/pt'

const messages = {
  en,
  es,
  fr,
  de,
  pt
}

// Detectar idioma del navegador o usar localStorage
const getBrowserLocale = () => {
  const navigatorLocale = navigator.language.split('-')[0]
  return ['en', 'es', 'fr', 'de', 'pt'].includes(navigatorLocale) 
    ? navigatorLocale 
    : 'en'
}

const savedLocale = localStorage.getItem('locale')
const defaultLocale = savedLocale || getBrowserLocale()

const i18n = createI18n({
  legacy: false, // Usar Composition API
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages,
  globalInjection: true
})

export default i18n