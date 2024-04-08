<!--
Admin - Room - UpdateThemeId

A smart component that enables an Admin to update the Room themeId.
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-human-male-board</v-icon>
      {{ $t('admin-room-update-theme-id')}}
      <v-spacer />
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-room-update-theme-id-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col>
          <apps-admin-themes-select :value="themeIdLocal"
                                    @change="changeThemeId" />
        </v-col>
      </v-row>
    </v-container>

    <!-- submit -->
    <v-container>
      <v-row>
        <v-col class="px-4">
          <v-btn large
                 block
                 color="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('admin-room-update-theme-id') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateThemeId",

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
    themeId: {
      immediate: true,
      handler () {
        this.themeIdLocal = this.themeId;
      }
    }
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

    /**
     * Change the themeId.
     * @param themeId {string|undefined}
     */
    changeThemeId(themeId = undefined) {
      this.themeIdLocal = themeId;
    },

    /**
     * Submit the update.
     *
     * @returns {Promise<void>}
     */
    async submit() {
      const update = {
        roomId: this.roomId,
        themeId: this.themeIdLocal,
      };

      this.submitting = true;
      const updatingRoom = await this.updateRoom(update);
      this.submitting = false;

      const {executionArn, startDate} = updatingRoom;

      this.executionArn = executionArn;
      this.startDate = startDate;
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

    themeId () {
      return (this.room) ? this.room.themeId : undefined;
    },
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    themeIdLocal: undefined,
  }),
}
</script>
