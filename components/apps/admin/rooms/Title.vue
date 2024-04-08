<!--
Venue App (Admin) Rooms - Title

A smart component that renders the RoomsApp Title.
-->
<template>
  <v-card rounded>

    <!-- title and actions -->
    <v-card-title>
      <v-icon left>mdi-human-male-board</v-icon>
      {{ $t('admin-rooms-title') }}
      <v-spacer />

      <v-dialog v-model="createRoomDialog"
                hide-overlay
                max-width="800px"
                transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <!-- create room button -->
          <v-btn v-bind="attrs" v-on="on" medium color="primary">
            Create Room
            <v-icon right>mdi-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-rooms-create-room @close="createRoomDialog = false;"/>
      </v-dialog>

    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-rooms-subtitle')}}
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
      load: 'apps/admin/rooms/load',
      reload: 'apps/admin/rooms/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/rooms/loading',

      rooms: 'apps/admin/rooms/rooms',
      numberOfRooms: 'apps/admin/rooms/numberOfRooms',
      loaded: 'apps/admin/rooms/loaded',
    })
  },
}
</script>
