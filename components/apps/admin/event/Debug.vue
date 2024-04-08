<!--
Admin - Event Debug

A smart component that renders useful debugging information about the Event.
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-calendar</v-icon>
      {{ $t('admin-event-debug') }}
      <v-spacer />
      <v-btn icon @click="reload" :loading="loading">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ eventId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loading }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-loading') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loaded }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-loaded') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

<!--    <pre>{{ event }}</pre>-->
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Debug",

  props: {
    eventId: {
      type: String,
      required: true,
    },
  },

  created () {
    if (! this.loaded && ! this.loading) {
      this.load();
    }
  },

  watch: {
    eventId: {
      handler() {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    },
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
    }),

    async load() {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    async reload() {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      eventWithEventId: 'apps/admin/events/eventWithEventId',
    }),

    event () {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },
  },
}
</script>

