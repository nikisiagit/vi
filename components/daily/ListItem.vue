<template>
  <v-list-item link :to="{name: 'daily'}" exact exact-active-class="white--text">

    <v-list-item-avatar>
      <v-icon>mdi-door-sliding</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ $t('Daily_Rooms') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('Daily_Rooms') }}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action v-if="loading">
      <v-btn icon :loading="loading" :disabled="loading">
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-door-sliding</v-icon>
          </span>
        </template>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-list-item-action>

  </v-list-item>
</template>

<script>
export default {
  name: "ListItem",

  data: () => ({
    loading: false,
  }),
}
</script>
