<template>

  <v-list-item link :to="{name: 'apps-admin-tickets'}">
    <v-list-item-avatar>
      <v-icon>mdi-ticket-confirmation</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('tickets') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('tickets-subtitle') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavListItem",
  computed: {
    ...mapGetters({
      // loading: 'apps/admin/advertisements/loading',
      // loaded: 'apps/admin/advertisements/loaded',
      // error: 'apps/admin/advertisements/error',
    })
  },
}
</script>
