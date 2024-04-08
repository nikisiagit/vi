<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            {{ $t('closed') }}
          </v-card-title>
          <v-card-text>
            <h1>{{ $t('closed') }}</h1>
          </v-card-text>
          <v-card-actions>
            <v-btn nuxt :to="{ name: 'sign-in'}">{{ $t('sign-in') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "closed"
}
</script>
