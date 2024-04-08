<template>

  <v-list-item link :to="{name: 'apps-admin-registrations'}">
    <v-list-item-avatar>
      <v-icon>mdi-form-select</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('admin-registrations-admin-title') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('admin-registrations-admin-subtitle') }}</v-list-item-subtitle>
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
