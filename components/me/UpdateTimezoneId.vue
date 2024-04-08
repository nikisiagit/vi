<!--
Me - Update Timezone Id

A smart component that enables the Me Profile to update their timezoneId attribute.
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account-circle</v-icon>
      {{ $t('me-update-timezone-id') }}
    </v-card-title>

    <!-- form -->
    <v-form ref="form" v-model="valid">
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <timezones-select @change="changeTimezoneId"
                              :timezone-id="timezoneIdLocal" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-btn large block
                 class="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('me-update-timezone-id')}}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateTimezoneId",

  data: () => ({
    submitting: false,
    valid: true,
    timezoneIdLocal: undefined,
  }),

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
      },
    },
  },

  methods: {
    ...mapActions({
      load: 'me/load',
      updateMe: 'me/updateMe',
    }),

    async changeTimezoneId (timezoneId = undefined) {
      this.timezoneIdLocal = timezoneId;
    },

    async submit () {
      try {
        const update = {
          timezoneId: this.timezoneIdLocal,
        };
        this.submitting = true;
        this.updatingMe = await this.updateMe(update);
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
     * The timezoneId attribute.
     *
     * @returns {*|undefined}
     */
    timezoneId () {
      return (this.me) ? this.me.timezoneId : undefined;
    },
  }
}
</script>
