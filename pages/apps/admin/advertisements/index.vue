<!--
Renders the main entry point to `Venue (Admin) - Advertisements`
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <apps-admin-advertisements-list />
      </v-col>

      <v-col cols="12" md="4">
        <apps-admin-advertisements-table />
      </v-col>

      <v-col cols="12" md="4">
        <apps-admin-advertisements-create-advertisement />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "index",
  layout: 'default',

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    createAdvertisementDialog: false,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/advertisements/load',
      reload: 'apps/admin/advertisements/reload',
    })
  },
  computed: {
    ...mapGetters({
      loading: 'apps/admin/advertisements/loading',
      loaded: 'apps/admin/advertisements/loaded',
    })
  },
}
</script>
