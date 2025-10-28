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
            
            <v-form ref="form" v-model="valid" @submit.prevent="sendEmail">
              <v-text-field
                v-model="formData.from_name"
                :label="$t('contact.form.name') + ' *'"
                :rules="[rules.required]"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="formData.from_email"
                :label="$t('contact.form.email') + ' *'"
                :rules="[rules.required, rules.email]"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                type="email"
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="formData.subject"
                :label="$t('contact.form.subject') + ' *'"
                :rules="[rules.required]"
                variant="outlined"
                prepend-inner-icon="mdi-text"
                class="mb-2"
              ></v-text-field>

              <v-textarea
                v-model="formData.message"
                :label="$t('contact.form.message') + ' *'"
                :rules="[rules.required]"
                variant="outlined"
                prepend-inner-icon="mdi-message-text"
                rows="5"
                class="mb-2"
              ></v-textarea>

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                :disabled="!valid"
              >
                <v-icon start>mdi-send</v-icon>
                {{ loading ? $t('contact.form.sending') : $t('contact.form.send') }}
              </v-btn>
            </v-form>

            <!-- Status Messages -->
            <v-alert
              v-if="alertMessage"
              :type="alertType"
              class="mt-4"
              closable
              @click:close="alertMessage = ''"
            >
              {{ alertMessage }}
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
                href="https://github.com/stg-software"
                target="_blank"
              >
                <v-icon>mdi-github</v-icon>
              </v-btn>
              
              <v-btn
                icon
                size="large"
                variant="tonal"
                color="primary"
                href="https://www.linkedin.com/in/stgmx/"
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
              href="https://www.dropbox.com/scl/fi/nee1r0q8pue967kd8orqb/CV_IA.pdf?rlkey=9wxjd39ge4vfxe6adpyk9n1mx&st=7bouyfn2&dl=0"
            >
              {{ $t('contact.cv.developer') }}
            </v-btn>
            
            <v-btn
              block
              variant="tonal"
              color="secondary"
              class="mb-2"
              prepend-icon="mdi-download"
              href="https://www.dropbox.com/scl/fi/w786tgpfqgan4ez77j99g/CV_IFS_Santiago_Torres_SRM.pdf?rlkey=c430xfclu6vpa6bk3iz7wx9ed&st=q5rye3fu&dl=0"
            >
              {{ $t('contact.cv.field') }}
            </v-btn>
            
            <v-btn
              block
              variant="tonal"
              color="accent"
              prepend-icon="mdi-download"
              href="https://www.dropbox.com/scl/fi/z1woy5mzymximl3fc64f0/CV_Maestro.pdf?rlkey=7zdka8dxspnm6z7mkkgfvfeif&st=hmiv9pno&dl=0"
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import emailjs from '@emailjs/browser'

const { t } = useI18n()

// ⬇️ CONFIGURA ESTOS VALORES CON LOS TUYOS DE EMAILJS
const EMAILJS_SERVICE_ID = 'service_fvyuej6'
const EMAILJS_TEMPLATE_ID = 'template_kkwb9l2'
const EMAILJS_PUBLIC_KEY = 'cuaK0Qp9izeYvr1Fy'

const form = ref(null)
const valid = ref(false)
const loading = ref(false)
const alertMessage = ref('')
const alertType = ref('success')

const formData = ref({
  from_name: '',
  from_email: '',
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

const sendEmail = async () => {
  if (!valid.value) return

  loading.value = true
  alertMessage.value = ''

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formData.value,
      EMAILJS_PUBLIC_KEY
    )

    alertType.value = 'success'
    alertMessage.value = t('contact.alerts.success')

    // Limpiar formulario
    formData.value = {
      from_name: '',
      from_email: '',
      subject: '',
      message: ''
    }
    form.value.reset()
  } catch (error) {
    console.error('EmailJS Error:', error)
    alertType.value = 'error'
    alertMessage.value = t('contact.alerts.error')
  } finally {
    loading.value = false
  }
}
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