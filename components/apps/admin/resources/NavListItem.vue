<!-- a link back to the admin resources index page -->
<template>
  <v-list-item link :to="{name: 'apps-admin-resources'}">
    <v-list-item-avatar>
      <v-icon>mdi-file-multiple</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('resources') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('resources') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavListItem",
  computed: {
    ...mapGetters({
      loading: 'apps/admin/resources/loading',
      loaded: 'apps/admin/resources/loaded',
      error: 'apps/admin/resources/error',
    })
  },
}
</script>
