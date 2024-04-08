<!--
Venue App (Admin) Events - Title

A smart component that renders the EventsApp Title.
-->
<template>
  <v-card rounded>

    <!-- title and actions -->
    <v-card-title>
      <v-icon left>mdi-calendar-multiple</v-icon>
      {{ $t('admin-events-title') }}
      <v-spacer />

      <!-- @todo - add actions here -->
      <v-btn icon
             :loading="loading"
             :disabled="loading"
             @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-dialog v-model="createEventDialog" >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon rounded v-bind="attrs" v-on="on">
            <v-icon>mdi-calendar-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-events-create-event @close="createEventDialog = false;"/>
      </v-dialog>

    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-events-subtitle')}}
    </v-card-subtitle>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Title",

  data: () => ({
    createEventDialog: false,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/events/load',
      reload: 'apps/admin/events/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/events/loading',

      events: 'apps/admin/events/events',
      numberOfEvents: 'apps/admin/events/numberOfEvents',
      loaded: 'apps/admin/events/loaded',
    })
  },
}
</script>
