<template>
  <v-list-item link :to="{name: 'apps-admin-themes'}">
    <v-list-item-avatar>
      <v-icon>mdi-palette</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('themes') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('themes') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavListItem",
  computed: {
    ...mapGetters({
      loading: 'apps/admin/themes/loading',
      loaded: 'apps/admin/themes/loaded',
      error: 'apps/admin/themes/error',
    })
  },
}
</script>
