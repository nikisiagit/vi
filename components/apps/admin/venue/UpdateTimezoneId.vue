<!--
Admin - Venue Update Timezone Id

A smart component that enables the Admin to update the Venue timezoneId attribute.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-update-timezone-id')}}
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
            <p>{{ $t('admin-venue-update-timezone-id-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <apps-admin-region-timezones-select :value="timezoneIdLocal"
                                              @change="changeTimezoneId" />
        </v-col>
      </v-row>
    </v-container>

    <!-- submit -->
    <v-container>
      <v-row>
        <v-col class="px-4">
          <v-btn large block color="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('admin-venue-update-timezone-id') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Update",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    timezoneId: {
      immediate: true,
      handler () {
        this.timezoneIdLocal = this.timezoneId;
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
      updateVenue: 'apps/admin/venue/updateVenue',
    }),

    /**
     * Change the timezone Id.
     *
     * @param timezoneId {string|undefined}
     */
    changeTimezoneId (timezoneId = undefined) {
      this.timezoneIdLocal = timezoneId;
    },

    /**
     * Submit the update.
     *
     * @returns {Promise<void>}
     */
    async submit () {
      try {
        const venueUpdate = {
          timezoneId: this.timezoneIdLocal,
        };

        this.submitting = true;
        const updatingVenue = await this.updateVenue(venueUpdate);
        this.submitting = false;

      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      venue: 'apps/admin/venue/venue',
      loaded: 'apps/admin/venue/loaded',
      loading: 'apps/admin/venue/loading',
    }),

    timezoneId () {
      return (this.venue) ? this.venue.timezoneId : undefined;
    },
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    timezoneIdLocal: undefined,
  }),
}
</script>
