<!--
Admin - Venue Update Currency Id

A smart component that enables the Admin to update the Venue currency id -->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-update-currency-id') }}
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
            <p>{{ $t('admin-venue-update-currency-id-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <apps-admin-region-currencies-select :value="currencyIdLocal" @change="changeCurrencyId"/>
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
            {{ $t('admin-venue-update-currency-id') }}
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

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    currencyId: {
      immediate: true,
      handler () {
        this.currencyIdLocal = this.currencyId;
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
      updateVenue: 'apps/admin/venue/updateVenue',
    }),

    /**
     * Change the currencyId.
     *
     * @param currencyId
     * @returns {Promise<void>}
     */
    async changeCurrencyId (currencyId = undefined) {
      this.currencyIdLocal = currencyId;
    },

    /**
     * Submit the update
     *
     * @returns {Promise<void>}
     */
    async submit () {
      try {
        const venueUpdate = {
          currencyId: this.currencyIdLocal,
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

    currencyId () {
      return (this.venue) ? this.venue.currencyId : undefined;
    },
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    currencyIdLocal: undefined,
  }),
}
</script>
