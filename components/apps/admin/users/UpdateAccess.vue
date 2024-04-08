<!--
Apps Admin - Users Settings Update Access

A smart component that enables the Admin to change the Users Settings access attribute.
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account</v-icon>
      {{ $t('admin-users-update-access') }}
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
            <p>{{ $t('admin-users-update-access-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <apps-admin-users-access-select :value="accessLocal" @change="changeAccess" />
        </v-col>
      </v-row>
    </v-container>

    <!-- submit -->
    <v-container>
      <v-row>
        <v-col class="px-4">
          <v-btn large block color="primary"
                 :loading="submitting"
                 :disabled="submitting"
                 @click="submit">
            {{ $t('admin-users-update-access') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateAccess",

  async created () {
    if (! this.loaded &&! this.loaded) {
      await this.load();
    }
  },

  watch: {
    access: {
      immediate: true,
      handler () {
        this.accessLocal = this.access;
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/users-settings/load',
      updateUsersSettings: 'apps/admin/users-settings/updateUsersSettings',
    }),

    /**
     * Change the access.
     *
     * @param access
     * @returns {Promise<void>}
     */
    async changeAccess (access = undefined) {
      this.accessLocal = access;
    },

    /**
     * Submit the update
     *
     * @returns {Promise<void>}
     */
    async submit () {
      try {
        const userSettingsUpdate = {
          access: this.accessLocal,
        };
        this.submitting = true;
        await this.updateUsersSettings(userSettingsUpdate);
        this.submitting = false;
        this.$emit('close')
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      usersSettings: 'apps/admin/users-settings/usersSettings',
      loaded: 'apps/admin/users-settings/loaded',
      loading: 'apps/admin/users-settings/loading',
    }),

    access () {
      return (this.usersSettings) ? this.usersSettings.access : undefined;
    },
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    accessLocal: undefined,
  }),
}
</script>
