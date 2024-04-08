<!--
Me - Update Theme Mode

This smart component enables the Me Profile to update their ThemeMode attribute.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account-circle</v-icon>
      {{ $t('me-update-theme-mode') }}
    </v-card-title>

    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ themeMode }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('theme-mode') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn-toggle class="ml-auto"
                        :value="themeModeLocal"
                        @change="changeThemeMode"
                        mandatory>

            <v-btn value="dark"
                   :loading="submitting"
                   :disabled="submitting">
              <v-icon>mdi-weather-night</v-icon>
            </v-btn>

            <v-btn value="light"
                   :loading="submitting"
                   :disabled="submitting">
              <v-icon>mdi-white-balance-sunny</v-icon>
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
  name: "UpdateThemeMode",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    themeMode: {
      immediate: true,
      handler () {
        this.themeModeLocal = this.themeMode;
      },
    },
  },

  methods: {
    ...mapActions({
      load: 'me/load',
      updateMe: 'me/updateMe',
    }),

    /**
     * Update the themeMode and submit.
     *
     * @param themeMode {undefined|string}
     * @returns {Promise<void>}
     */
    async changeThemeMode (themeMode = undefined) {
      this.themeModeLocal = themeMode;
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
          themeMode: this.themeModeLocal,
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
     * Return the themeMode attribute.
     *
     * @returns {string|undefined}
     */
    themeMode () {
      return (this.me) ? this.me.themeMode : undefined;
    }
  },

  data: () => ({
    valid: true,
    submitting: false,
    themeModeLocal: undefined,
  }),
}
</script>
