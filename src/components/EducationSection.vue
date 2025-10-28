<template>
  <section class="section-spacing bg-surface">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold mb-4">{{ $t('education.title') }}</h2>
          <v-divider class="mx-auto" style="max-width: 80px; border-width: 3px" color="primary"></v-divider>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-timeline side="end" align="start" truncate-line="both">
            <v-timeline-item
              v-for="(edu, index) in education"
              :key="index"
              :dot-color="edu.color"
              size="large"
            >
              <template v-slot:icon>
                <v-icon>{{ edu.icon }}</v-icon>
              </template>

              <v-card :color="edu.color" variant="tonal" class="elevation-2">
                <v-card-title class="text-h5">
                  {{ $t(`education.degrees.${edu.key}.name`) }}
                </v-card-title>
                <v-card-subtitle class="mt-2">
                  <v-icon size="small" class="mr-1">mdi-school</v-icon>
                  {{ $t(`education.degrees.${edu.key}.institution`) }}
                </v-card-subtitle>
                <v-card-subtitle>
                  <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                  {{ $t(`education.degrees.${edu.key}.period`) }}
                  <v-chip v-if="edu.key === 'master_ai'" size="small" :color="edu.color" class="ml-2">
                    {{ $t('education.degrees.master_ai.status') }}
                  </v-chip>
                </v-card-subtitle>
                <v-card-text class="text-body-1">
                  {{ $t(`education.degrees.${edu.key}.description`) }}
                  <ul class="mt-2">
                    <li v-for="(highlight, i) in $tm(`education.degrees.${edu.key}.highlights`)" :key="i">
                      {{ highlight }}
                    </li>
                  </ul>
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
const education = [
  {
    key: 'master_ai',
    color: 'secondary',
    icon: 'mdi-brain'
  },
  {
    key: 'master_edu',
    color: 'primary',
    icon: 'mdi-teach'
  },
  {
    key: 'bachelor',
    color: 'accent',
    icon: 'mdi-laptop'
  }
]
</script>

<style scoped>
.bg-surface {
  background-color: rgb(var(--v-theme-surface-variant));
}

ul {
  padding-left: 20px;
}

li {
  margin: 4px 0;
}
</style>