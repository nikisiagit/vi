<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-licence') }}
      <v-spacer />
    </v-card-title>

    <v-list two-line>
      <!-- start date -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ startDate }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-licence-start-date')}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- expiry date -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ expiryDate }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-licence-expiry-date')}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
    }),
  },

  computed: {
    ...mapGetters({
      venue: 'apps/admin/venue/venue',
      loading: 'apps/admin/venue/loading',
      loaded: 'apps/admin/venue/loaded',
    }),

    licence () {
      return (this.venue) ? this.venue.licence : undefined;
    },

    startDate () {
      return (this.licence) ? this.licence.startDate : undefined;
    },

    expiryDate () {
      return (this.licence) ? this.licence.expiryDate : undefined;
    },
  },
}
</script>
