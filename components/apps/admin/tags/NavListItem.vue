<template>
  <v-list-item link :to="{name: 'apps-admin-tags'}">
    <v-list-item-avatar>
      <v-icon>mdi-tag-multiple</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('tags') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('tags') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavListItem",
  computed: {
    ...mapGetters({
      // loading: 'apps/admin/themes/loading',
      // loaded: 'apps/admin/themes/loaded',
      // error: 'apps/admin/themes/error',
    })
  },
}
</script>
