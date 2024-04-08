<!--
Admin - Event - Update Theme Id

A smart component that enables an Admin to update the Event themeId attribute.
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
      {{ $t('admin-event-update-theme-id')}}
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
            <p>{{ $t('admin-event-update-theme-id-help') }}</p>
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
            {{ $t('admin-event-update-theme-id') }}
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
    eventId: {
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
    eventId: {
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
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
      updateEvent: 'apps/admin/events/updateEvent',
    }),

    async load() {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
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

    close(){
      this.$emit('close')

    },

    async submit() {
      const update = {
        eventId: this.eventId,
        themeId: this.themeIdLocal,
      };

      this.submitting = true;
      const updatingEvent = await this.updateEvent(update);
      this.submitting = false;

      const {executionArn, startDate} = updatingEvent;

      this.executionArn = executionArn;
      this.startDate = startDate;
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

    themeId () {
      return (this.event) ? this.event.themeId : undefined;
    },
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    themeIdLocal: undefined,
    executionArn: undefined,
  }),
}
</script>
