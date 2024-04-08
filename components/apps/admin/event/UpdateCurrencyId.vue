<!--
Admin - Event - Update Currency Id

A smart component that enables an Admin to update the Event currency id.
-->
<template>
  <v-card :loading="loading || updating">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-calendar</v-icon>
      {{ $t('admin-event-update-currency-id') }}
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
            <p>{{ $t('admin-event-update-currency-id-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <apps-admin-region-currencies-select :value="currencyIdLocal"
                                               @change="changeCurrencyId" />
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
          <v-btn large block color="primary"
                 @click="submit"
                 :loading="loading || updating || submitting"
                 :disabled="loading || updating || submitting">
            {{ $t('admin-event-update-currency-id') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateCurrencyId",

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
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    },
    currencyId: {
      immediate: true,
      handler () {
        this.currencyIdLocal = this.currencyId;
      }
    }
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
      updateEvent: 'apps/admin/events/updateEvent',
    }),

    close(){
      this.$emit('close')

    },

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
    changeCurrencyId(currencyId = undefined) {
      this.currencyIdLocal = currencyId;
    },

    async submit() {
      const update = {
        eventId: this.eventId,
        currencyId: this.currencyIdLocal,
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

    currencyId () {
      return (this.event) ? this.event.currencyId : undefined;
    },
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    currencyIdLocal: undefined,
    executionArn: undefined,
  }),
}
</script>
