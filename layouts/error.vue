<template>
  <v-app dark>
    <v-card :color="error.statusCode !== 404 ? 'error': null">
      <v-card-title>
        {{ error.statusCode === 404 ? pageNotFound: otherError }}
      </v-card-title>
      <v-card-text v-if="error.message">
        <p v-text="error.message"></p>
      </v-card-text>

      <v-card-actions>
        <NuxtLink to="/">
          Home page
        </NuxtLink>
      </v-card-actions>
    </v-card>

  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
