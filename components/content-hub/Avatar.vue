<template>
  <div>
    <v-btn fab icon :to="{ name: 'content-hub' }">
      <v-avatar size="48" color="purple darken-1" >
        <v-icon dark>mdi-file-multiple</v-icon>
      </v-avatar>
    </v-btn>

    <div class="text-subtitle-2">
      <nuxt-link :to="{ name: 'content-hub' }" class="text-decoration-none">
        {{ $t('content-hub') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Avatar"
}
</script>
