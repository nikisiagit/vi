<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-integration-details :name="name"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "_name",
  layout: 'admin',

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
