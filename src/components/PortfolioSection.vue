<template>
  <section class="section-spacing">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold mb-4">{{ $t('portfolio.title') }}</h2>
          <v-divider class="mx-auto" style="max-width: 80px; border-width: 3px" color="primary"></v-divider>
        </v-col>
      </v-row>

      <!-- Filtros -->
      <v-row justify="center" class="mb-6">
        <v-col cols="12" md="8" class="text-center">
          <v-chip-group v-model="selectedTech" mandatory>
            <v-chip
              v-for="tech in techFilters"
              :key="tech.value"
              :value="tech.value"
              variant="tonal"
            >
              {{ tech.value === 'all' ? $t('portfolio.filters.all') : tech.label }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <!-- Projects Grid -->
      <v-row>
        <v-col
          v-for="project in filteredProjects"
          :key="project.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card height="100%" class="d-flex flex-column">
            <!-- Video de YouTube o Imagen -->
            <div v-if="project.youtube" class="video-container">
              <iframe
                :src="getYoutubeEmbedUrl(project.youtube)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="youtube-iframe"
              ></iframe>
              <div class="video-overlay">
                <v-card-title class="text-white">
                  {{ $t(`portfolio.projects.${project.key}.title`) }}
                </v-card-title>
              </div>
            </div>
            
            <v-img
              v-else
              :src="project.image"
              height="200"
              cover
              class="text-white"
            >
              <v-card-title class="align-end fill-height" style="background: linear-gradient(transparent, rgba(0,0,0,0.7))">
                {{ $t(`portfolio.projects.${project.key}.title`) }}
              </v-card-title>
            </v-img>

            <v-card-text class="flex-grow-1">
              <div class="mb-3">
                <v-chip
                  v-for="tag in project.tags"
                  :key="tag"
                  size="small"
                  class="mr-2 mb-2"
                  variant="tonal"
                  :color="project.color"
                >
                  {{ tag }}
                </v-chip>
              </div>
              
              <p class="text-body-2">{{ $t(`portfolio.projects.${project.key}.description`) }}</p>
              
              <div class="mt-3">
                <strong class="text-primary">{{ $t('portfolio.characteristics') }}</strong>
                <ul class="text-body-2 mt-2">
                  <li v-for="(feature, i) in $tm(`portfolio.projects.${project.key}.features`)" :key="i">
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                v-if="project.github"
                variant="tonal"
                :color="project.color"
                prepend-icon="mdi-github"
                :href="project.github"
                target="_blank"
              >
                {{ $t('portfolio.buttons.code') }}
              </v-btn>
              <v-btn
                v-if="project.demo"
                variant="tonal"
                :color="project.color"
                prepend-icon="mdi-open-in-new"
                :href="project.demo"
                target="_blank"
              >
                {{ $t('portfolio.buttons.demo') }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                icon
                variant="text"
                @click="openProjectDialog(project)"
              >
                <v-icon>mdi-information</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Project Detail Dialog -->
    <v-dialog v-model="dialog" max-width="800">
      <v-card v-if="selectedProject">
        <!-- Video de YouTube o Imagen en el modal -->
        <div v-if="selectedProject.youtube" class="video-container-modal">
          <iframe
            :src="getYoutubeEmbedUrl(selectedProject.youtube)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="youtube-iframe"
          ></iframe>
        </div>
        
        <v-img
          v-else
          :src="selectedProject.image"
          height="300"
          cover
        ></v-img>
        
        <v-card-title class="text-h4">{{ $t(`portfolio.projects.${selectedProject.key}.title`) }}</v-card-title>
        
        <v-card-text>
          <p class="text-body-1 mb-4">{{ $t(`portfolio.projects.${selectedProject.key}.fullDescription`) }}</p>
          
          <h3 class="text-h6 mb-2">{{ $t('portfolio.tech_stack') }}</h3>
          <v-chip
            v-for="tag in selectedProject.tags"
            :key="tag"
            class="mr-2 mb-2"
            :color="selectedProject.color"
          >
            {{ tag }}
          </v-chip>
        </v-card-text>
        
        <v-card-actions>
          <v-btn
            v-if="selectedProject.github"
            variant="tonal"
            color="primary"
            prepend-icon="mdi-github"
            :href="selectedProject.github"
            target="_blank"
          >
            {{ $t('portfolio.view_github') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="dialog = false">{{ $t('portfolio.close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedTech = ref('all')
const dialog = ref(false)
const selectedProject = ref(null)

const techFilters = [
  { value: 'all', label: 'Todos' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'django', label: 'Django' },
  { value: 'ai', label: 'IA/ML' }
]

const projects = [
  {
    id: 1,
    key: 'tasks',
    image: 'https://via.placeholder.com/400x200/2563EB/FFFFFF?text=Task+Manager',
    youtube: 'https://youtu.be/FhA7OgBOOVw',
    color: 'primary',
    category: ['react', 'fastapi', 'postgresql', 'react_native'],
    tags: ['React', 'React Native', 'FastAPI', 'PostgreSQL'],
    github: '#',
    demo: '#'
  },
  {
    id: 2,
    key: 'ai_vision',
    image: 'https://via.placeholder.com/400x200/10B981/FFFFFF?text=AI+Vision',
    youtube: 'https://youtu.be/-TTTPCefS0M',
    color: 'secondary',
    category: ['ai', 'django', 'vue', 'face_recognition', 'anpr'],
    tags: ['Python', 'OpenCV', 'Deepface', 'FastAPI', 'Yolov5', 'React'],
    github: '#'
  },
  {
    id: 3,
    key: 'migration',
    image: 'https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Migration',
    youtube: 'https://youtu.be/b2tXexXjK7k',
    color: 'accent',
    category: ['aspx', 'css', 'javascript', 'bootstrap'],
    tags: ['aspx', 'CSS', 'JavaScript', 'Bootstrap'],
    github: '#'
  },
  {
    id: 4,
    key: 'nom',
    image: 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=NOM+Reports',
    youtube: '',
    color: 'info',
    category: ['vue', 'fastapi', 'postgresql', 'chartjs'],
    tags: ['Vue.js', 'FastAPI', 'PostgreSQL', 'Chart.js'],
    github: '#'
  }
]

const filteredProjects = computed(() => {
  if (selectedTech.value === 'all') {
    return projects
  }
  return projects.filter(project => project.category.includes(selectedTech.value))
})

// Función para convertir URL de YouTube a formato embed
const getYoutubeEmbedUrl = (url) => {
  if (!url) return ''
  
  // Extraer el ID del video de diferentes formatos de URL
  let videoId = ''
  
  // Formato: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0]
  }
  // Formato: https://youtu.be/VIDEO_ID
  else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0]
  }
  // Formato: https://www.youtube.com/embed/VIDEO_ID
  else if (url.includes('embed/')) {
    videoId = url.split('embed/')[1].split('?')[0]
  }
  
  return `https://www.youtube.com/embed/${videoId}`
}

const openProjectDialog = (project) => {
  selectedProject.value = project
  dialog.value = true
}
</script>

<style scoped>
ul {
  padding-left: 20px;
}

li {
  margin: 4px 0;
}

/* Video Container con aspect ratio 16:9 para cards */
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio (9/16 = 0.5625) */
  height: 0;
  overflow: hidden;
  background-color: #000;
}

/* Video Container para modal (altura fija) */
.video-container-modal {
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
  background-color: #000;
}

.youtube-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  padding: 16px;
  pointer-events: none;
}

.video-overlay .v-card-title {
  padding: 0;
}

/* Responsive para modal en móvil */
@media (max-width: 600px) {
  .video-container-modal {
    height: 250px;
  }
}
</style>