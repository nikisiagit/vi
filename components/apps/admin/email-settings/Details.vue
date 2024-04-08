<!--
Admin - EmailSettings Details

A smart component that renders the details of the EmailSettings.
-->
<template>
  <v-card :loading="loading" rounded>

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('admin-admin-settings') }}
      <v-spacer />
      <!-- reload -->
      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <!-- help -->
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <!-- sub title -->
    <v-card-subtitle>{{ $t('admin-email-settings') }}</v-card-subtitle>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-email-settings-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

<!--    {{ emailSettings }}-->

    <v-list>

      <!-- emailSettingsId -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ emailSettingsId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-settings-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ partition }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-settings-partition') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ type }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-settings-type') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ createdAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-settings-created-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ lastModifiedAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-settings-last-modified-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-list>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  data: () => ({
    showHelp: false,
  }),

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/email-settings/load',
      reload: 'apps/admin/email-settings/reload',
    }),
  },

  computed: {
    ...mapGetters({
      emailSettings: 'apps/admin/email-settings/emailSettings',
      loaded: 'apps/admin/email-settings/loaded',
      loading: 'apps/admin/email-settings/loading',
      error: 'apps/admin/email-settings/error',
    }),

    // loading () {
    //   return (this.emailSettings) ? this.emailSettings.loading : false;
    // },
    //
    // loaded () {
    //   return (this.emailSettings) ? this.emailSettings.loaded : false;
    // },

    // error () {
    //   return (this.emailSettings) ? this.emailSettings.error : undefined;
    // },

    emailSettingsId () {
      return (this.emailSettings) ? this.emailSettings.emailSettingsId : undefined;
    },

    partition () {
      return (this.emailSettings) ? this.emailSettings.partition : undefined;
    },

    type () {
      return (this.emailSettings) ? this.emailSettings.type : undefined;
    },

    createdAt () {
      return (this.emailSettings) ? this.emailSettings.createdAt : undefined;
    },

    lastModifiedAt () {
      return (this.emailSettings) ? this.emailSettings.lastModifiedAt : undefined;
    },
  }
}
</script>
