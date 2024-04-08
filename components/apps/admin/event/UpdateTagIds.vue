<!--
Venue Admin - Event Update TagIds

This smart component is used to manage/update the Event Tags.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-calendar</v-icon>
      {{ $t('admin-event-update-tag-ids') }}
    </v-card-title>

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
          <v-btn large
                 block
                 @click="close"
          >
            {{ $t('close') }}
          </v-btn>


        </v-col>
        <v-col class="px-4">
          <v-btn block large color="primary"
                 @click="submit"
                 :loading="loading || updating || submitting"
                 :disabled="loading || updating || submitting">
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
    eventId: {
      type: String,
      required: true,
    }
  },

  data: () => ({
    valid: true,
    submitting: false,
    tagIdsLocal: [],
    executionArn: undefined,
  }),

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    tagIds: {
      immediate: true,
      handler () {
        this.tagIdsLocal = this.tagIds;
      }
    },
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
      updateEvent: 'apps/admin/events/updateEvent',
    }),

    async load () {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    async reload () {
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

    close () {
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
        eventId: this.eventId,
        tagIds: this.tagIdsLocal,
      };

      this.submitting = true;
      const updatingLabel = await this.updateEvent(update);
      this.submitting = false;

      const {executionArn, startDate} = updatingLabel;

      this.executionArn = executionArn;
      this.startDate = startDate;
    },
  },

  computed: {
    ...mapGetters({
      eventWithEventId: 'apps/admin/events/eventWithEventId',

      updatingEventWithExecutionArn: 'apps/admin/events/updatingEventWithExecutionArn',
    }),

    event() {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },

    tagIds () {
      return this.event?.tagIds;
    },

    hasChanges () {
      return (this.tagIds !== this.tagIdsLocal);
    },

    updatingEvent () {
      return (this.executionArn) ? this.updatingEventWithExecutionArn(this.executionArn) : undefined;
    },

    updating () {
      return (this.updatingEvent) ? this.updatingEvent.updating : false;
    },

    error () {
      return (this.updatingEvent) ? this.updatingEvent.error : undefined;
    },

    updated () {
      return (this.updatingEvent) ? this.updatingEvent.updated : false;
    },
  },
}
</script>

