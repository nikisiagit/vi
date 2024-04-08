<template>
  <v-list>
    <apps-admin-integration-nav-list-item
      v-for="integration in integrations"
      :key="integration.integrationId"
      :name="integration.integrationType" />
  </v-list>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

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
      loading: 'apps/admin/integrations/loading',
      loaded: 'apps/admin/integrations/loaded',
      integrations: 'apps/admin/integrations/integrations',
      numberOfIntegrations: 'apps/admin/integrations/numberOfIntegrations'
    })
  },
}
</script>

