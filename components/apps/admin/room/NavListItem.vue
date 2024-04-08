<template>
  <v-list-item two-line :to="{name: 'apps-admin-rooms-roomId', params: {roomId: roomId}}">

    <v-list-item-avatar>
      <apps-admin-room-avatar :room-id="roomId" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ roomId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('room-id') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    roomId: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    roomId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadRoomWithRoomId: 'apps/admin/rooms/loadRoomWithRoomId',
    }),

    async load () {
      return await (this.roomId) ? this.loadRoomWithRoomId(this.roomId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      roomWithId: 'apps/admin/rooms/roomWithRoomId',
    }),

    room () {
      return (this.roomId) ? this.roomWithId(this.roomId) : undefined;
    },

    loaded () {
      return (this.room) ? this.room.loaded : false;
    },

    loading () {
      return (this.room) ? this.room.loading : false;
    },

    name () {
      return (this.room) ? this.room.name : undefined;
    },
  },
}
</script>
