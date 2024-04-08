<template>
  <v-container fluid>

    <v-row>
      <!-- details -->
      <v-col cols="12" md="4">
        <apps-admin-room-details :room-id="roomId" />
      </v-col>

      <!-- daily -->
      <v-col cols="12" md="4">
        <apps-admin-room-daily :room-id="roomId" />
      </v-col>

      <!-- chat -->
      <v-col cols="12" md="4">
        <apps-admin-room-chat :room-id="roomId" />
      </v-col>
    </v-row>

    <v-row>
      <!-- title -->
      <v-col cols="12" md="4">
        <apps-admin-room-update-title :room-id="roomId"/>
      </v-col>

      <!-- description -->
      <v-col cols="12" md="4">
        <apps-admin-room-update-description :room-id="roomId" />
      </v-col>

      <!-- tag ids -->
      <v-col cols="12" md="4">
        <apps-admin-room-update-tag-ids :room-id="roomId" />
      </v-col>

      <!-- update theme id -->
      <v-col cols="12" md="4">
        <apps-admin-room-update-theme-id :room-id="roomId" />
      </v-col>

      <!-- update language id -->
      <v-col cols="12" md="4">
        <apps-admin-room-update-language-id :room-id="roomId" />
      </v-col>

      <!-- update max participants -->
      <v-col cols="12" md="4">
        <apps-admin-room-update-max-participants :room-id="roomId" />
      </v-col>

      <!-- update daily -->
<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-room-update-daily :room-id="roomId" />-->
<!--      </v-col>-->

      <!-- update chat -->
<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-room-update-chat :room-id="roomId" />-->
<!--      </v-col>-->

    </v-row>

    <!-- debug -->
    <v-row>
      <v-col cols="12" md="4">
        <apps-admin-room-debug :room-id="roomId" />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RoomView",
  layout: 'admin',

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
