<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-human-male-board</v-icon>
      {{ $t('admin-room-chat') }}
      <v-spacer />
      <v-btn icon
             :loading="loading"
             :disabled="loading"
             @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-room-chat-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Chat",

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
      handler() {
        if (!this.loaded && !this.loading) {
          this.load();
        }
      },
    },
  },

  methods: {
    ...mapActions({
      loadRoomWithRoomId: 'apps/admin/rooms/loadRoomWithRoomId',
    }),

    async load() {
      return await (this.roomId) ? this.loadRoomWithRoomId(this.roomId) : undefined;
    },

    async reload() {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      roomWithRoomId: 'apps/admin/rooms/roomWithRoomId',
    }),

    room() {
      return (this.roomId) ? this.roomWithRoomId(this.roomId) : undefined;
    },

    loaded() {
      return (this.room) ? this.room.loaded : false;
    },

    loading() {
      return (this.room) ? this.room.loading : false;
    },

    chat () {
      return (this.room) ? this.room.chat : undefined;
    },
  },

  data: () => ({
    showHelp: true,
  }),
}
</script>

