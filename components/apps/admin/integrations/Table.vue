<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-server</v-icon>
      {{ $t('integrations') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('integrations') }}</v-card-subtitle>
    <v-card-text>
      <v-data-table :items="integrations">

      </v-data-table>

    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Table",
  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },
  methods: {
    ...mapActions({
      load: 'apps/admin/integrations/load',
    })
  },
  computed: {
    ...mapGetters({
      integrations: 'apps/admin/integrations/integrations',
      loading: 'apps/admin/integrations/loading',
      loaded: 'apps/admin/integrations/loaded',
    }),
  },
  data: () => ({
    headers: [
      {
        text: 'integration-id',
        align: 'start',
        value: 'integrationId',
        sortable: true,
      },
      {
        text: 'partition',
        align: 'start',
        value: 'partition',
        sortable: true,
      },
      {
        text: 'type',
        align: 'start',
        value: 'type',
        sortable: true,
      },
      {
        text: 'name',
        align: 'start',
        value: 'name',
        sortable: true,
      },
    ],
  }),
}
</script>
