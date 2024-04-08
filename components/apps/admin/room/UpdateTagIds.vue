<!--
Admin - Room - UpdateTagIds

A smart component that enables an Admin to update the Tags associated with the Room.
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
      {{ $t('admin-room-update-tag-ids') }}
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
            <p>{{ $t('admin-room-update-tag-ids-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <apps-admin-tags-select :tag-ids="tagIdsLocal" @change="updateTagIds" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-btn block large color="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('admin-event-update-tag-ids-submit')}}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateTagIds",

  props: {
    roomId: {
      type: String,
      required: true,
    }
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
    },
    tagIds: {
      immediate: true,
      handler () {
        this.tagIdsLocal = this.tagIds;
      }
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

    updateTagIds (tagIds) {
      this.tagIdsLocal = tagIds;
    },

    reset () {
      this.submitting = false;

      this.executionArn = undefined;
      this.startDate = undefined;

      this.tagIdsLocal = this.tagIds;

      this.$refs.form.resetValidation();
      this.valid = true;
    },

    cancel () {
      this.reset();
      this.$emit('close');
    },

    /**
     * Submit the updated tagIds.
     *
     * @returns {Promise<void>}
     */
    async submit () {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      const update = {
        roomId: this.roomId,
        tagIds: this.tagIdsLocal,
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

    tagIds () {
      return this.room?.tagIds;
    },
  },

  data: () => ({
    valid: true,
    submitting: false,
    showHelp: true,
    tagIdsLocal: [],
  }),
}
</script>
