<!--
Admin -  Venue Debug

A smart component that renders useful debugging information about the venue.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-debug') }}

      <v-spacer />

      <v-btn icon @click="reload" :loading="loading">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ venueId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loading }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-loading') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loaded }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-loaded') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

<!--    <pre>{{ venue }}</pre>-->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Debug",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
      reload: 'apps/admin/venue/reload',
    }),
  },

  computed: {
    ...mapGetters({
      venue: 'apps/admin/venue/venue',
      loaded: 'apps/admin/venue/loaded',
      loading: 'apps/admin/venue/loading',
    }),

    venueId () {
      return (this.venue) ? this.venue.venueId : undefined;
    },
  },
}
</script>
