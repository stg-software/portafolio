// src/plugins/vuetify.js
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Paleta de colores del portafolio
const lightTheme = {
  dark: false,
  colors: {
    primary: '#2563EB',      // Azul tech
    secondary: '#10B981',    // Verde IA
    accent: '#F59E0B',       // Naranja energía
    background: '#F8FAFC',   // Fondo claro
    surface: '#FFFFFF',
    'surface-variant': '#E2E8F0',
    'on-surface': '#0F172A',
    error: '#EF4444',
    info: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
  }
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#3B82F6',      // Azul más brillante para dark
    secondary: '#10B981',    // Verde IA
    accent: '#FBBF24',       // Naranja más brillante
    background: '#0F172A',   // Fondo oscuro
    surface: '#1E293B',      // Superficie oscura
    'surface-variant': '#334155',
    'on-surface': '#F8FAFC',
    error: '#EF4444',
    info: '#60A5FA',
    success: '#34D399',
    warning: '#FBBF24',
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
  defaults: {
    VBtn: {
      style: 'text-transform: none;', // Botones sin mayúsculas
    },
  },
})