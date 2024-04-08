<!--
Venue Admin - Themes Page
-->
<template>
  <v-container fluid>

    <v-row>
      <v-col>
        <apps-admin-themes-list />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <apps-admin-themes-table />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <apps-admin-themes-create-theme />
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
      load: 'apps/admin/themes/load',
      reload: 'apps/admin/themes/reload',
    })
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/themes/loading',
      loaded: 'apps/admin/themes/loaded',
      error: 'apps/admin/themes/error',
      numberOfThemes: 'apps/admin/themes/numberOfThemes'
    }),
  },

  data: () => ({
    createThemeDialog: false,
  })
}
</script>
