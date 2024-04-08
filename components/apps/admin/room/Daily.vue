<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-human-male-board</v-icon>
      {{ $t('admin-room-daily') }}
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
            <p>{{ $t('admin-room-daily-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <v-list>
      <!-- name -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-name') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- privacy -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ privacy }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-privacy') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- created at -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ createdAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-created-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- id -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ id }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- api created -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ apiCreated }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-api-created') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- config -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ config }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-api-config') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- url -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ url }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-room-daily-url') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Daily",

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
      updateRoom: 'apps/admin/rooms/updateRoom',
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

    daily () {
      return (this.room) ? this.room.daily : undefined;
    },

    // daily
    name () {
      return (this.daily) ? this.daily.name : undefined;
    },

    privacy () {
      return (this.daily) ? this.daily.privacy : undefined;
    },

    createdAt () {
      return (this.daily) ? this.daily.created_at : undefined;
    },

    id () {
      return (this.daily) ? this.daily.id : undefined;
    },

    apiCreated () {
      return (this.daily) ? this.daily.api_created : undefined;
    },

    config () {
      return (this.daily) ? this.daily.config : undefined;
    },

    url () {
      return (this.daily) ? this.daily.url : undefined;
    },
  },

  data: () => ({
    showHelp: false,
  }),
}
</script>
