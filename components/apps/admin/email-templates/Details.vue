<!--
Venue App Admin - Templates Details

This smart component renders the main UI for the Templates module.
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('admin-email-templates') }} ({{ numberOfTemplates }})
      <v-spacer />
      <v-btn icon @click="reload" :loading="loading" :disabled="loading">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle>{{ $t('admin-email-templates-subtitle')}}</v-card-subtitle>

    <v-container fluid class="px-4">

      <v-row>
        <v-col>
          <v-alert type="error" v-show="error">{{ error }}</v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <template v-if="this.$vuetify.breakpoint.name === 'xs'">
            <apps-admin-templates-list />
          </template>
          <template v-else>
            <apps-admin-templates-table />
          </template>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  data: () => ({
    createTemplateDialog: false,
  }),

  methods: {
    ...mapActions({
      reload: 'apps/admin/templates/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/templates/loading',
      loaded: 'apps/admin/templates/loaded',
      error: 'apps/admin/templates/error',
      numberOfTemplates: 'apps/admin/templates/numberOfTemplates',
    })
  },
}
</script>

