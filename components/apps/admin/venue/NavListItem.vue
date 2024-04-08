<!--
Apps Admin - Venue Nav List Item

A smart component that renders the Venue as a Nav List Item.
-->
<template>
  <v-list-item nuxt :to="{name: 'apps-admin-venue'}" ripple>
    <v-list-item-avatar>
      <v-icon>mdi-store</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('admin-venue-admin-title') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('admin-venue-admin-subtitle') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
    })
  },

  computed: {
    ...mapGetters({
      venue: 'apps/admin/venue/venue',
      loading: 'apps/admin/venue/loading',
      loaded: 'apps/admin/venue/loaded',
    }),
  },
}
</script>

