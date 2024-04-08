<!--
Admin - Event - Update Address Id

A smart component that enables the Admin to update the Event addressId attribute.
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-calendar</v-icon>
      {{ $t('admin-room-update-title-id')}}
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
            <p>{{ $t('admin-room-update-name-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-text-field
            v-model="titleLocal"
            persistent-hint
            clearable
            required
            :value="titleLocal"
            @change="changeTitle"
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
                 @click="close"
          >
            {{ $t('close') }}
          </v-btn>


        </v-col>

        <v-col class="px-4">
          <v-btn large
                 block
                 color="primary"
                 @click="submit"
                 :loading="loading || updating || submitting"
                 :disabled="loading || updating || submitting">
            {{ $t('admin-room-update-title') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateTitle",

  props: {
    roomId: {
      type: String,
      required: true,
    },
  },

  created () {
    if (! this.loaded && ! this.loading) {
      this.load();
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
    name: {
      immediate: true,
      handler () {
        this.titleLocal = this.title
      }
    }
  },

  methods: {
    ...mapActions({
      loadRoomWithRoomId: 'apps/admin/rooms/loadRoomWithRoomId',
      updateRoom: 'apps/admin/rooms/updateRoom',
    }),

    close(){
      this.$emit('close')

    },

    load () {
      return (this.roomId) ? this.loadRoomWithRoomId(this.roomId) : undefined;
    },

    reload() {
      return this.load();
    },

    /**
     * Change the title
     *
     * @param title {string|undefined}
     */
    changeTitle (title = undefined) {
      this.titleLocal = title;
    },

    /**
     * Submit the update
     *
     * @returns {Promise<void>}
     */
    async submit () {
      try {
        const roomUpdate = {
          roomId: this.roomId,
          title: this.titleLocal,
        };

        this.submitting = true;
        const {executionArn} = await this.updateRoom(roomUpdate);

        this.executionArn = executionArn;
        this.submitting = false;

      } catch (error) {
        this.submitting = false;
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      roomWithId: 'apps/admin/rooms/roomWithRoomId',
      updatingRoomWithExecutionArn: 'apps/admin/rooms/updatingRoomWithExecutionArn',
    }),

    updatingRoom () {
      return (this.executionArn) ? this.updatingRoomWithExecutionArn(this.executionArn) : undefined;
    },

    updating () {
      return this.updatingEvent?.updating;
    },

    room () {
      return  (this.roomId) ? this.loadRoomWithRoomId(this.roomId) : undefined;
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

  data: () => ({
    submitting: false,
    showHelp: true,
    titleLocal: undefined,
    executionArn: undefined,
  }),
}
</script>
