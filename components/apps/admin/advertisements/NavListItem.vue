<template>
  <v-list-item link :to="{name: 'apps-admin-advertisements'}">
    <v-list-item-avatar>
      <v-icon>mdi-advertisements</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('advertisements') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('advertisements') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavListItem",
  computed: {
    ...mapGetters({
      loading: 'apps/admin/advertisements/loading',
      loaded: 'apps/admin/advertisements/loaded',
      error: 'apps/admin/advertisements/error',
    })
  },
}
</script>
