<!--
Venue App (Admin) Registrations - Title

A smart component that renders the RegistrationsApp Title.
-->
<template>
  <v-card rounded>

    <!-- title and actions -->
    <v-card-title>
      <v-icon left>mdi-form-select</v-icon>
      {{ $t('admin-daily-title') }}
      <v-spacer />

      <!-- @todo - add actions here -->
      <v-btn icon
             :loading="loading"
             :disabled="loading"
             @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-dialog v-model="createRoomDialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon rounded v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-daily-create-room @close="createRoomDialog = false;"/>
      </v-dialog>

    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-daily-subtitle')}}
    </v-card-subtitle>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Title",

  data: () => ({
    createRoomDialog: false,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/daily/load',
      reload: 'apps/admin/daily/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/daily/loading',

      rooms: 'apps/admin/daily/rooms',
      numberOfRegistrations: 'apps/admin/daily/numberOfRooms',
      loaded: 'apps/admin/daily/loaded',
    })
  },
}
</script>
