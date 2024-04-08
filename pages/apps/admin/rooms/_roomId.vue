<!--
Venue App (Admin) - Event Page

The Event Page is used by Admins to manage the Event.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <apps-admin-room-details :room-id="roomId" @update-room-property="openUpdateRoomDialog"/>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <apps-admin-room-delete-room :room-id="roomId" />
      </v-col>
    </v-row>

    <v-dialog
      v-model="updateRoomDialog"
      width="800px"
    >

      <template v-if="updateRoomDialog && updateRoomProperty === 'title'">
        <apps-admin-room-update-title
          :room-id="roomId"
          @close="onClose"
        />
      </template>

      <template v-if="updateRoomDialog && updateRoomProperty === 'description'">
        <apps-admin-room-update-description
          :room-id="roomId"
          @close="onClose"
        />
      </template>

    </v-dialog>

  </v-container>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "RoomView",
  layout: 'admin',

  data(){
    return {
      updateRoomDialog: false,
      updateRoomProperty: '',
    }
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadRoomWithRoomId: 'apps/admin/rooms/loadRoomWithRoomId',
    }),

    async load() {
      return await (this.roomId) ? this.loadRoomWithRoomId(this.roomId) : undefined;
    },

    openUpdateRoomDialog(property){
      this.updateRoomProperty = property
      this.updateRoomDialog = true;
    },

    onClose(){
      this.updateRoomProperty = false;
      this.updateRoomDialog = ''

    }
  },

  computed: {
    ...mapGetters({
      roomWithId: 'apps/admin/rooms/roomWithRoomId',
      loading: 'apps/admin/rooms/loading',
    }),

    roomId () {
      return this.$route.params.roomId || undefined;
    },

    room () {
      return (this.roomId) ? this.roomWithId(this.roomId) : undefined;
    },

    loaded () {
      return (this.room) ? this.room.loaded : false;
    },

    error () {
      return (this.room) ? this.room.error : false;
    },
  }
}
</script>
