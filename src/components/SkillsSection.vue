<template>
  <section class="section-spacing bg-surface">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold mb-4">{{ $t('skills.title') }}</h2>
          <v-divider class="mx-auto" style="max-width: 80px; border-width: 3px" color="primary"></v-divider>
        </v-col>
      </v-row>

      <!-- Filtros de Categoría -->
      <v-row justify="center" class="mb-6">
        <v-col cols="12" md="10" class="text-center">
          <v-chip-group v-model="selectedCategory" mandatory>
            <v-chip
              v-for="category in categories"
              :key="category.value"
              :value="category.value"
              variant="tonal"
              :prepend-icon="category.icon"
            >
              {{ $t(`skills.categories.${category.value}`) }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <!-- Skills Grid -->
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-row>
            <v-col
              v-for="skill in filteredSkills"
              :key="skill.name"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card class="pa-4" height="100%">
                <div class="d-flex align-center mb-3">
                  <v-icon :color="skill.color" size="large" class="mr-3">
                    {{ skill.icon }}
                  </v-icon>
                  <div>
                    <h3 class="text-h6">{{ skill.name }}</h3>
                    <div class="text-caption text-medium-emphasis">{{ $t(`skills.levels.${skill.level}`) }}</div>
                  </div>
                </div>
                
                <v-progress-linear
                  :model-value="skill.percentage"
                  :color="skill.color"
                  height="8"
                  rounded
                  class="mb-2"
                ></v-progress-linear>
                
                <p class="text-body-2 text-medium-emphasis">
                  {{ skill.description }}
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Soft Skills -->
      <v-row justify="center" class="mt-8">
        <v-col cols="12" lg="10">
          <h3 class="text-h4 mb-4 text-center">{{ $t('skills.soft.title') }}</h3>
          <v-row>
            <v-col
              v-for="soft in softSkills"
              :key="soft.key"
              cols="12"
              sm="6"
              md="3"
            >
              <v-card class="text-center pa-4" variant="tonal" :color="soft.color">
                <v-icon size="x-large" :color="soft.color">{{ soft.icon }}</v-icon>
                <h4 class="text-h6 mt-2">{{ $t(`skills.soft.${soft.key}`) }}</h4>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('all')

const categories = [
  { value: 'all', icon: 'mdi-star' },
  { value: 'frontend', icon: 'mdi-monitor' },
  { value: 'backend', icon: 'mdi-server' },
  { value: 'tools', icon: 'mdi-tools' },
  { value: 'ai', icon: 'mdi-brain' }
]

const skills = [
  {
    name: 'Vue.js',
    category: 'frontend',
    level: 'expert',
    percentage: 95,
    color: 'primary',
    icon: 'mdi-vuejs',
    description: 'Framework principal, Composition API'
  },
  {
    name: 'React.js',
    category: 'frontend',
    level: 'advanced',
    percentage: 70,
    color: 'primary',
    icon: 'mdi-react',
    description: 'Desarrollo de SPAs y componentes'
  },
  {
    name: 'React Native',
    category: 'frontend',
    level: 'advanced',
    percentage: 70,
    color: 'primary',
    icon: 'mdi-cellphone',
    description: 'Aplicaciones móviles multiplataforma'
  },
  {
    name: 'HTML5 / CSS3',
    category: 'frontend',
    level: 'expert',
    percentage: 95,
    color: 'primary',
    icon: 'mdi-language-html5',
    description: 'Maquetación y diseño responsive'
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 'expert',
    percentage: 95,
    color: 'primary',
    icon: 'mdi-language-javascript',
    description: 'ES6+, programación funcional'
  },
  {
    name: 'Python',
    category: 'backend',
    level: 'expert',
    percentage: 95,
    color: 'secondary',
    icon: 'mdi-language-python',
    description: 'Desarrollo backend y scripting'
  },
  {
    name: 'Django',
    category: 'backend',
    level: 'expert',
    percentage: 95,
    color: 'secondary',
    icon: 'mdi-language-python',
    description: 'Framework principal para APIs REST'
  },
  {
    name: 'FastAPI',
    category: 'backend',
    level: 'expert',
    percentage: 75,
    color: 'secondary',
    icon: 'mdi-language-python',
    description: 'Framework principal para APIs REST'
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    level: 'advanced',
    percentage: 85,
    color: 'secondary',
    icon: 'mdi-database',
    description: 'Base de datos relacional'
  },
  {
    name: 'Git / GitHub',
    category: 'tools',
    level: 'expert',
    percentage: 95,
    color: 'accent',
    icon: 'mdi-git',
    description: 'Control de versiones'
  },
  {
    name: 'Vite',
    category: 'tools',
    level: 'advanced',
    percentage: 85,
    color: 'accent',
    icon: 'mdi-lightning-bolt',
    description: 'Build tool moderno'
  },
  {
    name: 'Docker',
    category: 'tools',
    level: 'intermediate',
    percentage: 55,
    color: 'accent',
    icon: 'mdi-docker',
    description: 'Containerización'
  },
  {
    name: 'AI Tools',
    category: 'ai',
    level: 'intermediate',
    percentage: 65,
    color: 'secondary',
    icon: 'mdi-brain',
    description: 'Machine Learning y Deep Learning'
  },
]

const softSkills = [
  { key: 'leadership', icon: 'mdi-account-group', color: 'primary' },
  { key: 'communication', icon: 'mdi-forum', color: 'secondary' },
  { key: 'problem_solving', icon: 'mdi-puzzle', color: 'accent' },
  { key: 'adaptability', icon: 'mdi-refresh', color: 'primary' },
  { key: 'mentoring', icon: 'mdi-teach', color: 'secondary' },
  { key: 'teamwork', icon: 'mdi-handshake', color: 'accent' },
  { key: 'time_management', icon: 'mdi-clock-outline', color: 'primary' },
  { key: 'critical_thinking', icon: 'mdi-lightbulb', color: 'secondary' }
]

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'all') {
    return skills
  }
  return skills.filter(skill => skill.category === selectedCategory.value)
})
</script>

<style scoped>
.bg-surface {
  background-color: rgb(var(--v-theme-surface-variant));
}
</style>