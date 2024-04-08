<template>
  <v-list-item link :to="{name: 'apps-admin-addresses'}">
    <v-list-item-avatar>
      <v-icon>mdi-map-marker</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('addresses') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('addresses') }}</v-list-item-subtitle>
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
