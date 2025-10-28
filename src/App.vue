<template>
  <v-app>
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Main Content -->
    <v-main>
      <!-- Hero Section -->
      <HeroSection id="hero" />
      
      <!-- About Section -->
      <AboutSection id="about" />
      
      <!-- Education Section -->
      <EducationSection id="education" />
      
      <!-- Experience Section -->
      <ExperienceSection id="experience" />
      
      <!-- Skills Section -->
      <SkillsSection id="skills" />
      
      <!-- Portfolio Section -->
      <PortfolioSection id="portfolio" />
      
      <!-- Contact Section -->
      <ContactSection id="contact" />
    </v-main>

    <!-- Scroll to Top Button -->
    <v-btn
      v-show="showScrollTop"
      icon
      size="large"
      color="primary"
      position="fixed"
      location="bottom right"
      class="ma-4"
      elevation="4"
      @click="scrollToTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from './stores/theme'

// Componentes
import NavigationBar from './components/NavigationBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import EducationSection from './components/EducationSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import ContactSection from './components/ContactSection.vue'

// Theme & i18n management
const vuetifyTheme = useTheme()
const themeStore = useThemeStore()
const i18n = useI18n()

// Scroll to top button
const showScrollTop = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  // Inicializar tema e idioma desde localStorage
  themeStore.initTheme(vuetifyTheme, i18n)
  
  // Listener para scroll
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Estilos específicos del App si son necesarios */
</style>