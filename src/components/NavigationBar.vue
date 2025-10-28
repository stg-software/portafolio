<template>
  <v-app-bar app elevation="2" :color="scrolled ? 'surface' : 'transparent'" :flat="!scrolled">
    <v-container class="d-flex align-center py-0">
      <!-- Logo/Name -->
      <v-app-bar-title class="font-weight-bold text-h6" @click="scrollToSection('hero')" style="cursor: pointer">
        <span class="text-primary">S</span>TG
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <div class="d-none d-md-flex align-center">
        <v-btn
          v-for="item in menuItems"
          :key="item.id"
          variant="text"
          class="mx-1"
          @click="scrollToSection(item.id)"
        >
          {{ $t(`nav.${item.key}`) }}
        </v-btn>

        <!-- Language Selector -->
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              variant="text"
              v-bind="props"
              class="ml-2"
            >
              <span class="text-h6">{{ currentFlag }}</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="locale in themeStore.locales"
              :key="locale.value"
              @click="changeLocale(locale.value)"
              :active="locale.value === themeStore.currentLocale"
            >
              <template v-slot:prepend>
                <span class="mr-2">{{ locale.flag }}</span>
              </template>
              <v-list-item-title>{{ locale.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Theme Toggle -->
        <v-btn
          icon
          variant="text"
          class="ml-2"
          @click="toggleTheme"
          :title="themeStore.isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
        >
          <v-icon>{{ themeStore.isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>
      </div>

      <!-- Mobile Menu Button -->
      <div class="d-flex d-md-none">
        <!-- Mobile Language Menu -->
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon variant="text" v-bind="props" class="mr-1">
              <span>{{ currentFlag }}</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="locale in themeStore.locales"
              :key="locale.value"
              @click="changeLocale(locale.value)"
              :active="locale.value === themeStore.currentLocale"
            >
              <template v-slot:prepend>
                <span class="mr-2">{{ locale.flag }}</span>
              </template>
              <v-list-item-title>{{ locale.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn icon variant="text" @click="toggleTheme" class="mr-2">
          <v-icon>{{ themeStore.isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>
        
        <v-btn icon variant="text" @click="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>

  <!-- Mobile Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="right">
    <v-list>
      <v-list-item
        prepend-icon="mdi-account-circle"
        title="Santiago Torres"
        subtitle="Full Stack Developer"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="comfortable" nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.id"
        :prepend-icon="item.icon"
        :title="$t(`nav.${item.key}`)"
        @click="scrollToSection(item.id); drawer = false"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-4">
        <v-btn block color="primary" href="mailto:stg.contacto@gmail.com">
          <v-icon start>mdi-email</v-icon>
          Contactar
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
const vuetifyTheme = useTheme()
const { locale } = useI18n()

const drawer = ref(false)
const scrolled = ref(false)

const menuItems = [
  { id: 'about', key: 'about', icon: 'mdi-account' },
  { id: 'education', key: 'education', icon: 'mdi-school' },
  { id: 'experience', key: 'experience', icon: 'mdi-briefcase' },
  { id: 'skills', key: 'skills', icon: 'mdi-brain' },
  { id: 'portfolio', key: 'portfolio', icon: 'mdi-folder-multiple' },
  { id: 'contact', key: 'contact', icon: 'mdi-email' },
]

const currentFlag = computed(() => {
  const current = themeStore.locales.find(l => l.value === themeStore.currentLocale)
  return current ? current.flag : '🇺🇸'
})

const toggleTheme = () => {
  themeStore.toggleTheme(vuetifyTheme)
}

const changeLocale = (newLocale) => {
  themeStore.switchLocale(newLocale, { locale })
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 64 // altura del navbar
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.v-app-bar {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}
</style>