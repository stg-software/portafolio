<template>
  <section class="section-spacing bg-surface">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold mb-4">{{ $t('contact.title') }}</h2>
          <p class="text-h6 text-medium-emphasis">
            {{ $t('contact.subtitle') }}
          </p>
          <v-divider class="mx-auto mt-4" style="max-width: 80px; border-width: 3px" color="primary"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <!-- Contact Form -->
        <v-col cols="12" md="7">
          <v-card class="pa-6">
            <v-card-title class="text-h5 mb-4">{{ $t('contact.form.title') }}</v-card-title>
            
            <!-- FormSubmit Form -->
            <form action="https://formsubmit.co/stg.contacto@gmail.com" method="POST">
              <!-- FormSubmit Configuration -->
              <input type="hidden" name="_captcha" value="false">
              <input type="hidden" name="_next" value="/?success=true">
              <input type="hidden" name="_subject" value="Nuevo mensaje desde el portafolio">
              <input type="hidden" name="_template" value="table">
              
              <v-text-field
                v-model="formData.name"
                :label="$t('contact.form.name') + ' *'"
                :rules="[rules.required]"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                class="mb-2"
                name="name"
                required
              ></v-text-field>

              <v-text-field
                v-model="formData.email"
                :label="$t('contact.form.email') + ' *'"
                :rules="[rules.required, rules.email]"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                type="email"
                class="mb-2"
                name="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="formData.subject"
                :label="$t('contact.form.subject') + ' *'"
                :rules="[rules.required]"
                variant="outlined"
                prepend-inner-icon="mdi-text"
                class="mb-2"
                name="subject"
                required
              ></v-text-field>

              <v-textarea
                v-model="formData.message"
                :label="$t('contact.form.message') + ' *'"
                :rules="[rules.required]"
                variant="outlined"
                prepend-inner-icon="mdi-message-text"
                rows="5"
                class="mb-2"
                name="message"
                required
              ></v-textarea>

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
              >
                <v-icon start>mdi-send</v-icon>
                {{ $t('contact.form.send') }}
              </v-btn>
            </form>

            <!-- Success Alert (mostrar si hay parámetro ?success=true en URL) -->
            <v-alert
              v-if="showSuccessAlert"
              type="success"
              class="mt-4"
              closable
              @click:close="showSuccessAlert = false"
            >
              {{ $t('contact.alerts.success') }}
            </v-alert>
          </v-card>
        </v-col>

        <!-- Contact Info -->
        <v-col cols="12" md="5">
          <v-card class="pa-6 mb-4">
            <v-card-title class="text-h5 mb-4">{{ $t('contact.info.title') }}</v-card-title>
            
            <v-list>
              <v-list-item prepend-icon="mdi-email" class="mb-2">
                <v-list-item-title>{{ $t('contact.info.email') }}</v-list-item-title>
                <v-list-item-subtitle>
                  <a href="mailto:stg.contacto@gmail.com">stg.contacto@gmail.com</a>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item prepend-icon="mdi-phone" class="mb-2">
                <v-list-item-title>{{ $t('contact.info.phone') }}</v-list-item-title>
                <v-list-item-subtitle>
                  <a href="tel:+529511230180">+52 951 123 0180</a>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item prepend-icon="mdi-map-marker">
                <v-list-item-title>{{ $t('contact.info.location') }}</v-list-item-title>
                <v-list-item-subtitle>Oaxaca, México</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>

          <!-- Social Links -->
          <v-card class="pa-6 mb-4">
            <v-card-title class="text-h6 mb-4">{{ $t('contact.social.title') }}</v-card-title>
            
            <div class="d-flex justify-center gap-2">
              <v-btn
                icon
                size="large"
                variant="tonal"
                color="primary"
                href="https://github.com/yourusername"
                target="_blank"
              >
                <v-icon>mdi-github</v-icon>
              </v-btn>
              
              <v-btn
                icon
                size="large"
                variant="tonal"
                color="primary"
                href="https://linkedin.com/in/yourusername"
                target="_blank"
              >
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>
            </div>
          </v-card>

          <!-- Download CVs -->
          <v-card class="pa-6">
            <v-card-title class="text-h6 mb-4">{{ $t('contact.cv.title') }}</v-card-title>
            
            <v-btn
              block
              variant="tonal"
              color="primary"
              class="mb-2"
              prepend-icon="mdi-download"
              href="#"
            >
              {{ $t('contact.cv.developer') }}
            </v-btn>
            
            <v-btn
              block
              variant="tonal"
              color="secondary"
              class="mb-2"
              prepend-icon="mdi-download"
              href="#"
            >
              {{ $t('contact.cv.field') }}
            </v-btn>
            
            <v-btn
              block
              variant="tonal"
              color="accent"
              prepend-icon="mdi-download"
              href="#"
            >
              {{ $t('contact.cv.teacher') }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Footer Quote -->
      <v-row class="mt-8">
        <v-col cols="12" class="text-center">
          <v-card variant="tonal" class="pa-6">
            <p class="text-h6 text-medium-emphasis font-italic">
              {{ $t('contact.quote') }}
            </p>
            <p class="text-body-1 mt-2">- Santiago Torres González</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showSuccessAlert = ref(false)

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const rules = computed(() => ({
  required: value => !!value || t('contact.form.required'),
  email: value => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || t('contact.form.invalid_email')
  }
}))

onMounted(() => {
  // Detectar si hay parámetro ?success=true en URL
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('success') === 'true') {
    showSuccessAlert.value = true
    // Limpiar URL después de 3 segundos
    setTimeout(() => {
      window.history.replaceState({}, document.title, window.location.pathname)
    }, 3000)
  }
})
</script>

<style scoped>
.bg-surface {
  background-color: rgb(var(--v-theme-surface-variant));
}

.gap-2 {
  gap: 8px;
}

a {
  text-decoration: none;
  color: rgb(var(--v-theme-primary));
}

a:hover {
  text-decoration: underline;
}
</style>