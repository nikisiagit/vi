<!--
Venue Debug

A smart component that dumps the Venue.
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('venue-debug') }}
      <v-spacer />

      <v-btn icon disabled>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-title>

    <v-list two-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ mode }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('mode') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ initialised }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('initialised') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ initialising }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('initialising') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ loading }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('loading') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ loaded }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('loaded') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-container fluid v-if="false">
      <v-row>
        <v-col>
          <pre>{{ venue }}</pre>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Debug",

  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading ) {
        await this.load();
      }
    }
  },

  watch : {
    initialised: {
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading ) {
            this.load();
          }
        }
      }
    },
  },

  methods: {
    ...mapActions({
      load: 'venue/load',
    }),
  },

  computed: {
    ...mapGetters({
      initialised: 'venue/initialised',
      initialising: 'venue/initialising',

      mode: 'venue/mode',

      venue: 'venue/venue',
      loading: 'venue/loading',
      loaded: 'venue/loaded',
    }),
  },
}
</script>
