<template >
  <v-card class="pa-8 fill-height landing-background">
    <v-card-title>
      <h2>{{ $t('Woah, looks like you are an explorer.') }}</h2>
    </v-card-title>
    <v-card-text class="landing-content mt-4 white--text">
      <p>{{ $t('You landed on a Digital Venue that doesn\'t belong to anyone, and you can make it yours.') }}</p>
    </v-card-text>
    <v-card-actions class="landing-content landing-actions px-4">
      <v-btn color="secondary" class="landing-button" outlined @click="$router.push({ path: `/landing/learn-more` })">{{ $t('Learn more') }}</v-btn>
      <v-btn color="primary" class="landing-button black--text" @click="$router.push({ path: `/landing/purchase` })">{{ $t('Own it') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style>
.fill-height {
  min-height: 95vh; /* Fall back */
  min-height: calc(100vh - 24px);
}
.landing-content {
  max-width: 300px;
  font-size: 1em;
}
.landing-background {
  background: url('~/assets/landing.jpg');
  background-size: cover;
}
.landing-actions {
  gap: 5%;
}
.landing-button {
  width: 50%;
  border-radius: 0.75em;
  text-transform: none;
}
</style>

<script>
export default {
  name: "Landing",
  layout: "blank"
}
</script>
