<!--
Admin - Event - Update Dates

A smart component that enables an Admin to update the Event start/end date attributes.
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
      {{ $t('admin-event-update-dates')}}
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
            <p>{{ $t('admin-event-update-dates-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <v-container fluid>
      <v-form v-model="valid" ref="form" lazy-validation>

        <v-row>
          <!-- start datetime -->
          <!-- @todo: add @clearable event that allow to set startDateTimeLocal = new Date() [Date as NOW] -->
          <v-col cols="12" md="6">
            <base-date-time-picker
              :value="startDateTimeLocal"
              :label="startDateTimeLabel"
              :hint="startDateTimeHint"
              clearable
              @change-DateTime="changeStartDateTime"
              @clear="clearStartDateTime"
            ></base-date-time-picker>
          </v-col>

          <!-- end datetime -->
          <v-col cols="12" md="6">
            <base-date-time-picker
              :value="endDateTimeLocal"
              :label="endDateTimeLabel"
              :hint="endDateTimeHint"
              clearable
              @change-DateTime="changeEndDateTime"
              @clear="clearEndDateTime"
            ></base-date-time-picker>

          </v-col>
        </v-row>

      </v-form>
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
            {{ $t('admin-event-update-dates') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateDates",

  props: {
    eventId: {
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
    eventId: {
      handler() {
        if (!this.loaded && !this.loading) {
          this.load();
        }
      },
    },

    startDateTime: {
      immediate: true,
      handler() {
        this.startDateTimeLocal = this.startDateTime;
      },
    },

    endDateTime: {
      immediate: true,
      handler() {
        this.endDateTimeLocal = this.endDateTime;
      },
    },
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
      updateEvent: 'apps/admin/events/updateEvent',
    }),

    close(){
      this.$emit('close')

    },

    changeStartDateTime(datetime){
      this.startDateTimeLocal = datetime
    },

    changeEndDateTime(datetime){
      this.endDateTimeLocal = datetime
    },

    clearStartDateTime(){
      this.startDateTimeLocal = new Date()
    },

    clearEndDateTime(){
      this.endDateTimeLocal = new Date()
    },

    load() {
      return (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    reload() {
      return this.load();
    },

    /**
     * Submit the update
     *
     * @returns {Promise<void>}
     */
    async submit () {
      try {
        const eventUpdate = {
          eventId: this.eventId,

          startDateTime: this.startDateTimeLocal,
          endDateTime: this.endDateTimeLocal,
        };

        this.submitting = true;
        const {executionArn} = await this.updateEvent(eventUpdate);

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
      eventWithEventId: 'apps/admin/events/eventWithEventId',
      updatingEventWithExecutionArn: 'apps/admin/events/updatingEventWithExecutionArn',
    }),

    updatingEvent () {
      return (this.executionArn) ? this.updatingEventWithExecutionArn(this.executionArn) : undefined;
    },

    updating () {
      return this.updatingEvent?.updating;
    },

    event () {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    startDateTime () {
      return (this.event) ? this.event.startDateTime : undefined;
    },

    endDateTime () {
      return (this.event) ? this.event.endDateTime : undefined;
    },

    startDateTimeLabel () {
      return this.$i18n.t('admin-event-update-start-date-time-label');
    },

    startDateTimeHint () {
      return this.$i18n.t('admin-event-update-start-date-time-hint');
    },

    endDateTimeLabel () {
      return this.$i18n.t('admin-event-update-end-date-time-label');
    },

    endDateTimeHint () {
      return this.$i18n.t('admin-event-update-end-date-time-hint');
    },
  },

  data: () => ({
    submitting: false,
    valid: true,
    showHelp: true,

    startDateTimeLocal: undefined,
    endDateTimeLocal: undefined,
    executionArn: undefined,
  }),
}
</script>
