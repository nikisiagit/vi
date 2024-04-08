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
      {{ $t('admin-event-update-address-id')}}
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
            <p>{{ $t('admin-event-update-address-id-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <apps-admin-addresses-select :value="addressIdLocal" @change="changeAddressId" />
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
            {{ $t('admin-event-update-address-id') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateAddressId",

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
    addressId: {
      immediate: true,
      handler () {
        this.addressIdLocal = this.addressId;
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

    load () {
      return (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    reload() {
      return this.load();
    },

    /**
     * Change the addressId
     *
     * @param addressId {string|undefined}
     */
    changeAddressId (addressId = undefined) {
      this.addressIdLocal = addressId;
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
          addressId: this.addressIdLocal,
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

    addressId () {
      return (this.event) ? this.event.addressId : undefined;
    },
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    addressIdLocal: undefined,
    executionArn: undefined,
  }),
}
</script>
