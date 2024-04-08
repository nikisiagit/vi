<!--
Admin - Event - UpdateFormat

A smart component that enables an Admin to update the Event format attribute.
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
      {{ $t('admin-event-update-format')}}
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
            <p>{{ $t('admin-event-update-format-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ formatLocal }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-event-format') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn-toggle v-model="formatLocal"
                        @change="changeFormat"
                        class="ml-auto"
                        mandatory>
            <v-btn value="virtual" :disabled="loading || updating || submitting">
              <v-icon>mdi-web</v-icon>
            </v-btn>


            <v-btn value="hybrid" :disabled="loading || updating || submitting">
              <v-icon>mdi-map-marker-distance</v-icon>
            </v-btn>
          </v-btn-toggle>

        </v-list-item-action>
      </v-list-item>
    </v-list>

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
            {{ $t('admin-event-update-format') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateFormat",

  props: {
    eventId: {
      type: String,
      required: true,
    },
  },

  created () {
    if (! this.loaded && ! this.loading) {
      console.log(`## EVENT - UPDATE FORMAT - LOAD`);
      this.load();
    }
  },

  watch: {
    eventId: {
      handler() {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    },
    format: {
      immediate: true,
      handler () {
        this.formatLocal = this.format;
      },
    }
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
     * Change the status.
     *
     * @param format
     */
    async changeFormat (format = undefined) {
      this.formatLocal = format;
    },

    close(){
      this.$emit('close')

    },

    async submit () {
      try {
        const update = {
          eventId: this.eventId,
          format: this.formatLocal
        };

        this.submitting = true;
        const {executionArn} = await this.updateEvent(update);

        this.executionArn = executionArn;

        this.submitting = false;
      } catch (error) {
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

    format () {
      return (this.event) ? this.event.format : undefined;
    },
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    formatLocal: undefined,
    executionArn: undefined,
  }),
}
</script>
