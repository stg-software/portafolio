<template>
  <section class="hero-section">
    <v-container class="fill-height">
      <v-row align="center" justify="center" class="text-center">
        <v-col cols="12" md="10" lg="8">
          <!-- Avatar/Image (opcional) -->
          <v-avatar size="180" class="mb-6 elevation-8">
            <v-img
              :width="'100%'"
              :src="favicon"
            ></v-img>
          </v-avatar>

          <!-- Título Principal -->
          <h1 class="text-h2 text-md-h1 font-weight-bold mb-4">
            {{ $t('hero.name') }}
          </h1>

          <!-- Subtítulo Rotativo -->
          <div class="subtitle-container mb-6">
            <h2 class="text-h5 text-md-h4 text-primary">
              <transition name="fade" mode="out-in">
                <span :key="currentSubtitle">{{ currentSubtitleText }}</span>
              </transition>
            </h2>
          </div>

          <!-- Descripción -->
          <p class="text-h6 text-md-h5 mb-8 text-medium-emphasis">
            {{ $t('hero.description') }}
          </p>

          <!-- Stats -->
          <v-row class="mb-8" justify="center">
            <v-col cols="6" sm="3" v-for="stat in stats" :key="stat.key">
              <v-card variant="tonal" class="pa-4">
                <div class="text-h4 text-primary font-weight-bold">{{ stat.value }}</div>
                <div class="text-body-2 text-medium-emphasis mt-1">{{ $t(`hero.stats.${stat.key}`) }}</div>
              </v-card>
            </v-col>
          </v-row>

          <!-- CTAs -->
          <div class="d-flex flex-wrap justify-center gap-3">
            <v-btn
              size="x-large"
              color="primary"
              prepend-icon="mdi-folder-multiple"
              @click="scrollToSection('portfolio')"
            >
              {{ $t('hero.buttons.projects') }}
            </v-btn>

            <v-btn
              size="x-large"
              variant="outlined"
              color="primary"
              prepend-icon="mdi-email"
              @click="scrollToSection('contact')"
            >
              {{ $t('hero.buttons.contact') }}
            </v-btn>

            <v-btn
              size="x-large"
              variant="tonal"
              color="secondary"
              prepend-icon="mdi-download"
              @click="scrollToSection('contact')"
            >
              {{ $t('hero.buttons.download') }}
            </v-btn>
          </div>

          <!-- Social Links -->
          <div class="social-links mt-8">
            <v-btn
              icon
              variant="text"
              size="large"
              href="https://github.com/stg-software"
              target="_blank"
            >
              <v-icon>mdi-github</v-icon>
            </v-btn>
            
            <v-btn
              icon
              variant="text"
              size="large"
              href="https://www.linkedin.com/in/stgmx/"
              target="_blank"
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            
            <v-btn
              icon
              variant="text"
              size="large"
              href="mailto:stg.contacto@gmail.com"
            >
              <v-icon>mdi-email</v-icon>
            </v-btn>
          </div>

          <!-- Scroll Indicator -->
          <div class="scroll-indicator mt-12">
            <v-btn
              icon
              variant="text"
              size="small"
              class="scroll-down"
              @click="scrollToSection('about')"
            >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import favicon from '../assets/images/favicon.png'

const { t } = useI18n()

const currentSubtitle = ref(0)
const subtitleKeys = ['creator', 'leader', 'developer']

const currentSubtitleText = computed(() => {
  return t(`hero.subtitles.${subtitleKeys[currentSubtitle.value]}`)
})

const stats = [
  { value: '3+', key: 'years' },
  { value: '25+', key: 'tech' },
  { value: '20+', key: 'experience' },
  { value: '4-20', key: 'team' }
]

let intervalId = null

const rotateSubtitle = () => {
  intervalId = setInterval(() => {
    currentSubtitle.value = (currentSubtitle.value + 1) % subtitleKeys.length
  }, 3000)
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 64
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  rotateSubtitle()
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
}

.subtitle-container {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.gap-3 {
  gap: 12px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.scroll-indicator {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 600px) {
  .subtitle-container {
    height: 60px;
  }
}
</style>