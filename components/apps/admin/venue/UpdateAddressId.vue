<!--
Admin - Venue Update Address Id

A smart component that enables the Admin to update the Venue addressId.
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-update-address-id')}}
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
            <p>{{ $t('admin-venue-update-address-id-help') }}</p>
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
          <v-btn large block color="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('admin-venue-update-address-id') }}
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

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    addressId: {
      immediate: true,
      handler () {
        this.addressIdLocal = this.addressId;
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
      updateVenue: 'apps/admin/venue/updateVenue',
    }),

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
        const venueUpdate = {
          addressId: this.addressIdLocal,
        };

        this.submitting = true;
        const updatingVenue = await this.updateVenue(venueUpdate);
        this.submitting = false;

      } catch (error) {
        this.submitting = false;
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

    addressId () {
      return (this.venue) ? this.venue.addressId : undefined;
    },
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    addressIdLocal: undefined,
  }),
}
</script>

