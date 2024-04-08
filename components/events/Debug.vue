<!--
Events Debug

A smart component used for showing debug info about the Events.
-->
<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-calendar</v-icon>
      {{ $t('events-debug') }}
    </v-card-title>

    <v-container fluid>
      <v-row>
        <v-col>
          <pre>
            {{ events }}
          </pre>
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
      if (! this.loaded && ! this.loading) {
        return await this.load();
      }
    }
  },

  watch: {
    initialised: {
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading) {
            this.load();
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'events/load',
    })
  },

  computed: {
    ...mapGetters({
      initialised: 'events/initialised',
      events: 'events/events',
      loaded: 'events/loaded',
      loading: 'events/loading',
      error: 'events/error',
    }),
  },
}
</script>
