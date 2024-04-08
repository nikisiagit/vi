<!--
Venue Details

This smart component is used to render details about the Venue.
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('venue-details')}}
      <v-spacer />
      <v-btn icon disabled>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-title>

    <v-list>
      <!-- name -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('venue-name') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- other attributes -->
    </v-list>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Details",

  computed: {
    ...mapGetters({
      loading: 'venue/loading',
      loaded: 'venue/loaded',
      venue: 'venue/venue',
    }),

    /**
     * Return the Venue name.
     *
     * @returns {*|undefined}
     */
    name () {
      return (this.venue) ? this.venue.name : undefined;
    },
  },
}
</script>
