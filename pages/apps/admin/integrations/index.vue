<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card :loading="loading">
          <template slot="progress">
            <v-progress-linear height="4" indeterminate />
          </template>

          <v-card-title>
            <v-icon left>mdi-server</v-icon>
            {{ $t('integrations') }}

            <v-spacer />

            <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
              <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
            </v-btn>

            <v-dialog v-model="createIntegrationDialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="ml-3" rounded v-bind="attrs" v-on="on">
                  <v-icon left>mdi-server-plus</v-icon>
                  {{ $t('create-integration') }}
                </v-btn>
              </template>
              <apps-admin-integrations-create-integration @close="createIntegrationDialog = false;"/>
            </v-dialog>
          </v-card-title>

          <v-card-subtitle>{{ $t('integrations-subtitle') }}</v-card-subtitle>

          <v-card-text>
            <apps-admin-integrations-list />
          </v-card-text>

        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "index",
  layout: 'admin',

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/integrations/load',
      reload: 'apps/admin/integrations/reload',
    })
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/integrations/loading',
      loaded: 'apps/admin/integrations/loaded',
      error: 'apps/admin/integrations/error',
    }),
  },

  data: () => ({
    createIntegrationDialog: false,
  })
}
</script>
