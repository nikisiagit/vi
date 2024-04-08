<!--
Admin - Chat - Update Max Participants

A smart component that enables an Admin to adjust the maximum number of
participants/users allowed in a Room.
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
      {{ $t('admin-room-update-max-participants')}}
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
            <p>{{ $t('admin-room-update-max-participants-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col>
          <v-slider v-model="maxParticipantsLocal"
                    :hint="maxParticipantsHint"
                    persistent-hint
                    max="50"
                    min="0"
                    thumb-label
          />
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
            {{ $t('admin-room-update-max-participants') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateMaxParticipants",

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

    maxParticipants: {
      immediate: true,
      handler () {
        this.maxParticipantsLocal = this.maxParticipants;
      },
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
     * Submit the updated tagIds.
     *
     * @returns {Promise<void>}
     */
    async submit() {
      const update = {
        roomId: this.roomId,
        maxParticipants: this.maxParticipantsLocal,
      };

      this.submitting = true;
      const updatingLabel = await this.updateRoom(update);
      this.submitting = false;

      const {executionArn, startDate} = updatingLabel;

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

    maxParticipants () {
      return (this.room) ? this.room.maxParticipants : undefined;
    },

    maxParticipantsHint () {
      return this.$i18n.t('admin-room-max-participants-hint');
    },
  },

  data: () => ({
    showHelp: true,
    maxParticipantsLocal: undefined,
    submitting: false,
    executionArn: undefined,
    startDate: undefined,
  })
}
</script>
