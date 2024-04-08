<!--
Me - Update TimeFormat

A smart component that enables the Me Profile to update their timeFormat attribute.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account-circle</v-icon>
      {{ $t('me-update-time-format') }}
    </v-card-title>

    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ timeFormat }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('me-time-format') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn-toggle class="ml-auto"
                        :value="timeFormatLocal"
                        @change="changeTimeFormat"
                        mandatory>
            <v-btn value="12h"
                   :loading="submitting"
                   :disabled="submitting">
              <strong>12h</strong>
            </v-btn>
            <v-btn value="24h"
                   :loading="submitting"
                   :disabled="submitting">
              <strong>24h</strong>
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
  name: "UpdateTimeFormat",

  data: () => ({
    valid: true,
    submitting: false,
    timeFormatLocal: undefined,
  }),

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    timeFormat: {
      immediate: true,
      handler () {
        this.timeFormatLocal = this.timeFormat;
      },
    },
  },

  methods: {
    ...mapActions({
      load: 'me/load',
      updateMe: 'me/updateMe',
    }),

    /**
     * Update the timeFormat and submit.
     *
     * @param timeFormat {undefined|string}
     * @returns {Promise<void>}
     */
    async changeTimeFormat (timeFormat = undefined) {
      this.timeFormatLocal = timeFormat;

      await this.submit();
    },

    /**
     * Submit the update.
     *
     * @returns {Promise<void>}
     */
    async submit () {
      try {
        const meUpdate = {
          timeFormat: this.timeFormatLocal,
        }

        this.submitting = true;
        const updatingMe = await this.updateMe(meUpdate);
        console.log(updatingMe);
        this.submitting = false;

      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      loading: 'me/loading',
      loaded: 'me/loaded',
      me: 'me/me',
    }),

    /**
     * Return the timeFormat attribute.
     *
     * @returns {any}
     */
    timeFormat () {
      return (this.me) ? this.me.timeFormat : undefined;
    }
  },
}
</script>
