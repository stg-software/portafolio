<template>
  <section class="section-spacing">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold mb-4">{{ $t('experience.title') }}</h2>
          <v-divider class="mx-auto" style="max-width: 80px; border-width: 3px" color="primary"></v-divider>
        </v-col>
      </v-row>

      <!-- Filtros -->
      <v-row justify="center" class="mb-6">
        <v-col cols="12" md="8" class="text-center">
          <v-chip-group v-model="selectedFilter" mandatory>
            <v-chip
              v-for="filter in filters"
              :key="filter.value"
              :value="filter.value"
              variant="tonal"
              :prepend-icon="filter.icon"
            >
              {{ $t(`experience.filters.${filter.value}`) }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <!-- Timeline -->
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-timeline side="end" align="start" truncate-line="both">
            <v-timeline-item
              v-for="(exp, index) in filteredExperience"
              :key="index"
              :dot-color="exp.color"
              size="large"
            >
              <template v-slot:icon>
                <v-icon>{{ exp.icon }}</v-icon>
              </template>

              <v-card class="elevation-2">
                <v-card-title class="text-h5 d-flex align-center">
                  {{ $t(`experience.jobs.${exp.key}.title`) }}
                  <v-chip size="small" :color="exp.color" class="ml-2" variant="flat">
                    {{ $t(`experience.jobs.${exp.key}.type`) }}
                  </v-chip>
                </v-card-title>
                <v-card-subtitle class="mt-2">
                  <v-icon size="small" class="mr-1">mdi-domain</v-icon>
                  {{ $t(`experience.jobs.${exp.key}.company`) }}
                  <v-chip v-if="exp.remote" size="x-small" class="ml-2">{{ $t('experience.remote') }}</v-chip>
                </v-card-subtitle>
                <v-card-subtitle>
                  <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                  {{ $t(`experience.jobs.${exp.key}.period`) }}
                </v-card-subtitle>
                
                <v-card-text>
                  <p class="mb-4">{{ $t(`experience.jobs.${exp.key}.description`) }}</p>
                  
                  <div v-if="$tm(`experience.jobs.${exp.key}.achievements`)">
                    <strong class="text-primary">{{ $t('common.achievements') || 'Logros clave:' }}</strong>
                    <ul class="mt-2">
                      <li v-for="(achievement, i) in $tm(`experience.jobs.${exp.key}.achievements`)" :key="i" class="mb-2">
                        {{ achievement }}
                      </li>
                    </ul>
                  </div>

                  <div v-if="exp.stack && exp.stack.length" class="mt-4">
                    <v-chip
                      v-for="tech in exp.stack"
                      :key="tech"
                      size="small"
                      class="mr-2 mb-2"
                      variant="tonal"
                    >
                      {{ tech }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedFilter = ref('all')

const filters = [
  { value: 'all', icon: 'mdi-briefcase' },
  { value: 'development', icon: 'mdi-code-braces' },
  { value: 'field', icon: 'mdi-cog' },
  { value: 'education', icon: 'mdi-school' }
]

const experience = [
  {
    key: 'team_lead',
    category: 'development',
    remote: true,
    color: 'primary',
    icon: 'mdi-rocket-launch',
    stack: ['Vue.js', 'Django', 'Python', 'React.js', 'React Native', 'PostgreSQL', 'Microsoft Dynamics']
  },
  {
    key: 'fullstack',
    category: 'development',
    remote: true,
    color: 'primary',
    icon: 'mdi-code-tags',
    stack: ['Vue.js', 'React.js', 'Django', 'Python', 'HTML5', 'CSS3']
  },
  {
    key: 'teacher_ai',
    category: 'education',
    remote: false,
    color: 'secondary',
    icon: 'mdi-teach',
    stack: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Google Cloud', 'Azure']
  },
  {
    key: 'field_engineer',
    category: 'field',
    remote: false,
    color: 'accent',
    icon: 'mdi-tools',
    stack: ['Sistemas CCTV', 'Redes IP', 'Servidores Lenovo']
  }
]

const filteredExperience = computed(() => {
  if (selectedFilter.value === 'all') {
    return experience
  }
  return experience.filter(exp => exp.category === selectedFilter.value)
})
</script>

<style scoped>
ul {
  padding-left: 20px;
}

li {
  margin: 4px 0;
}
</style>