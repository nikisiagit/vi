<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-update-status')}}
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
            <p>{{ $t('admin-venue-update-status-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ status }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-status') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn-toggle :value="statusLocal"
                        @change="changeStatus"
                        class="ml-auto"
                        mandatory>
            <v-btn value="open"
                   :loading="submitting"
                   :disabled="submitting">
              <v-icon>mdi-door-open</v-icon>
            </v-btn>

            <v-btn value="closed"
                   :loading="submitting"
                   :disabled="submitting">
              <v-icon>mdi-door-closed</v-icon>
            </v-btn>

          </v-btn-toggle>
        </v-list-item-action>
      </v-list-item>
    </v-list>

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
    status: {
      immediate: true,
      handler () {
        this.statusLocal = this.status;
      },
    },
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
      updateVenue: 'apps/admin/venue/updateVenue',
    }),

    /**
     * Change the status.
     *
     * @param status {string|undefined}
     */
    async changeStatus (status = undefined) {
      this.statusLocal = status;
      await this.submit();
    },

    /**
     * Submit the update.
     *
     * @returns {Promise<void>}
     */
    async submit () {
      try {
        const venueUpdate = {
          status: this.statusLocal
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
      loading: 'apps/admin/venue/loading',
      loaded: 'apps/admin/venue/loaded',
      venue: 'apps/admin/venue/venue',
    }),

    /**
     * Return the status attribute.
     *
     * @returns {string|undefined}
     */
    status () {
      return (this.venue) ? this.venue.status : undefined;
    }
  },

  data: () => ({
    showHelp: true,
    submitting: false,
    statusLocal: undefined,
  }),
}
</script>
