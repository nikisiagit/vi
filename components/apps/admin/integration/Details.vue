<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-server</v-icon>
      {{ $t('integration-details') }}

      <v-spacer />

      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>
    </v-card-title>

    <v-card-subtitle>{{ $t('integration-details-subtitle') }}</v-card-subtitle>

    <v-card-text>
      <v-list two-line>

        <!-- name -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!-- other attributes -->

      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadIntegrationWithName: 'apps/admin/integrations/loadIntegrationWithName',
    }),

    async load () {
      return await (this.name) ? this.loadIntegrationWithName(this.name) : undefined;
    },

    async reload () {
      return await (this.name) ? this.loadIntegrationWithName(this.name) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      integrationWithName: 'apps/admin/integrations/integrationWithName',
    }),

    name () {
      return this.$route.params.name || undefined;
    },

    integration () {
      return (this.name) ? this.integrationWithName(this.name) : undefined;
    },

    loaded () {
      return (this.integration) ? this.integration.loaded : false;
    },

    loading () {
      return (this.integration) ? this.integration.loading : false;
    },
  },
}
</script>
