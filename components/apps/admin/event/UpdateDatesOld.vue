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
        <!-- start date -->
        <!-- start time -->
        <v-row>
          <v-col cols="12" md="6">
            <base-date-picker v-model="startDateLocal"
                              :label="startDateLabel"
                              :hint="startDateHint"
                              icon=""
            />
          </v-col>

          <v-col cols="12" md="6">
            <base-time-picker v-model="startTimeLocal"
                              :label="startTimeLabel"
                              :hint="startTimeHint"
                              icon=""
            />
          </v-col>
        </v-row>

        <!-- end date -->
        <!-- end time -->
        <v-row>
          <v-col cols="12" md="6">
            <base-date-picker v-model="endDateLocal"
                              :label="endDateLabel"
                              :hint="endDateHint"
                              icon=""
            />
          </v-col>

          <v-col cols="12" md="6">
            <base-time-picker v-model="endTimeLocal"
                              :label="endTimeLabel"
                              :hint="endTimeHint"
                              icon=""
            />
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
                 color="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
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
  name: "UpdateDatesOld",

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

    startDate: {
      immediate: true,
      handler() {
        this.startDateLocal = this.startDate;
      },
    },

    startTime: {
      immediate: true,
      handler() {
        this.startTimeLocal = this.startTime;
      },
    },

    endDate: {
      immediate: true,
      handler() {
        this.endDateLocal = this.endDate;
      },
    },

    endTime: {
      immediate: true,
      handler() {
        this.endTimeLocal = this.endTime;
      },
    },
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
      updateEvent: 'apps/admin/events/updateEvent',
    }),

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

          startDate: this.startDateLocal,
          startTime: this.startTimeLocal,
          endDate: this.endDateLocal,
          endTime: this.endTimeLocal,
        };

        this.submitting = true;
        const updatingEvent = await this.updateEvent(eventUpdate);
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
    }),

    event () {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },


    startDate () {
      return (this.event) ? this.event.startDate : undefined;
    },

    startTime () {
      return (this.event) ? this.event.startTime : undefined;
    },

    endDate () {
      return (this.event) ? this.event.endDate : undefined;
    },

    endTime () {
      return (this.event) ? this.event.endTime : undefined;
    },



    startDateLabel () {
      return this.$i18n.t('admin-event-update-start-date-label');
    },

    startDateHint () {
      return this.$i18n.t('admin-event-update-start-date-hint');
    },

    startTimeLabel () {
      return this.$i18n.t('admin-event-update-start-time-label');
    },

    startTimeHint () {
      return this.$i18n.t('admin-event-update-start-time-hint');
    },

    endDateLabel () {
      return this.$i18n.t('admin-event-update-end-date-label');
    },

    endDateHint () {
      return this.$i18n.t('admin-event-update-end-date-hint');
    },

    endTimeLabel () {
      return this.$i18n.t('admin-event-update-end-time-label');
    },

    endTimeHint () {
      return this.$i18n.t('admin-event-update-end-time-hint');
    },
  },

  data: () => ({
    submitting: false,
    valid: true,
    showHelp: true,

    startDateLocal: undefined,
    startTimeLocal: undefined,

    endDateLocal: undefined,
    endTimeLocal: undefined,
  }),
}
</script>
