<template>
  <section class="section-spacing">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold mb-4">{{ $t('about.title') }}</h2>
          <v-divider class="mx-auto" style="max-width: 80px; border-width: 3px" color="primary"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" class="d-flex align-center justify-center">
          <v-avatar size="280" class="elevation-8">
            <v-icon size="200" color="primary">mdi-account-circle</v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="12" md="8">
          <v-card flat class="pa-6">
            <h3 class="text-h5 font-weight-bold mb-4 text-primary">
              {{ $t('about.subtitle') }}
            </h3>

            <div class="text-body-1 text-justify about-text">
              <p class="mb-4">{{ $t('about.paragraphs.intro') }}</p>
              <p class="mb-4">{{ $t('about.paragraphs.mission') }}</p>
              <p class="mb-4">{{ $t('about.paragraphs.leader') }}</p>
              <p class="mb-4">{{ $t('about.paragraphs.ai') }}</p>
              <p>{{ $t('about.paragraphs.personal') }}</p>
            </div>

            <!-- Quick Facts -->
            <v-row class="mt-6">
              <v-col cols="12" sm="6">
                <v-list density="compact">
                  <v-list-item prepend-icon="mdi-map-marker" :title="$t('about.info.location')"></v-list-item>
                  <v-list-item prepend-icon="mdi-email" title="stg.contacto@gmail.com"></v-list-item>
                  <v-list-item prepend-icon="mdi-phone" title="+52 951 123 0180"></v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12" sm="6">
                <v-list density="compact">
                  <v-list-item prepend-icon="mdi-briefcase" :title="$t('about.info.role')"></v-list-item>
                  <v-list-item prepend-icon="mdi-school" :title="$t('about.info.degree')"></v-list-item>
                  <v-list-item prepend-icon="mdi-heart" :title="$t('about.info.interests')"></v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
// No necesita lógica adicional por ahora
</script>

<style scoped>
.about-text {
  line-height: 1.8;
}

@media (max-width: 960px) {
  .text-justify {
    text-align: left;
  }
}
</style>