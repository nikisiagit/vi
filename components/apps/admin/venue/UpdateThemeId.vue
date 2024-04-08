<!--
Admin Venue Update Theme Id

A smart component that enables an Admin to update the Venue themeId attribute. -->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-update-theme-id')}}
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
            <p>{{ $t('admin-venue-update-theme-id-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col>
          <apps-admin-themes-select :value="themeIdLocal" @change="changeThemeId" />
        </v-col>
      </v-row>
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
            {{ $t('admin-venue-update-theme-id') }}
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
    themeId: {
      immediate: true,
      handler () {
        this.themeIdLocal = this.themeId;
      }
    },
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
      updateVenue: 'apps/admin/venue/updateVenue',
    }),

    /**
     * Change the themeId.
     * @param themeId {string|undefined}
     */
    changeThemeId (themeId = undefined) {
      this.themeIdLocal = themeId;
    },

    /**
     * Submit the update.
     *
     * @returns {Promise<void>}
     */
    async submit () {
      try {
        const venueUpdate = {
          themeId: this.themeIdLocal
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

    themeId () {
      return (this.venue) ? this.venue.themeId : undefined;
    },
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    themeIdLocal: undefined,
  }),
}
</script>
