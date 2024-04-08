<template>
  <v-list-item link :to="{name: 'apps-admin-contents'}">
    <v-list-item-avatar>
      <v-icon>mdi-animation-play</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('contents') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('contents-subtitle') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavListItem",
  computed: {
    ...mapGetters({
      loading: 'apps/admin/contents/loading',
      loaded: 'apps/admin/contents/loaded',
      error: 'apps/admin/contents/error',
    })
  },
}
</script>
