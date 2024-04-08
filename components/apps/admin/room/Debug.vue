<!--

Admin - Room Debug

A smart component that renders useful debugging information about the Chats.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-human-male-board</v-icon>
      {{ $t('admin-chat-debug') }}

      <v-spacer />

      <v-btn icon @click="reload" :loading="loading">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ roomId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loading }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-loading') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loaded }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-loaded') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

<!--    <pre>{{ room }}</pre>-->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Debug",

  props: {
    roomId: {
      type: String,
      required: true,
    },
  },

  async created () {
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

    async reload () {
      return await this.load();
    }
  },

  computed: {
    ...mapGetters({
      roomWithRoomId: 'apps/admin/rooms/roomWithRoomId',
    }),

    room () {
      return (this.roomId) ? this.roomWithRoomId(this.roomId) : undefined;
    },

    loaded () {
      return (this.room) ? this.room.loaded : false;
    },

    loading () {
      return (this.room) ? this.room.loading : false;
    },

    error () {
      return (this.room) ? this.room.error : undefined;
    },
  },
}
</script>
