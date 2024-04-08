<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-file-multiple</v-icon>

      <v-toolbar-title>
        {{ $t('resources') }} ({{ numberOfResources }})
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon :loading="loading"
             :disabled="loading"
             @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>


      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>
      <v-row>
        <v-col>
          <apps-admin-resources-nav-list />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",


  computed: {
    ...mapGetters({
      resources: 'apps/admin/resources/resources',
      numberOfResources: 'apps/admin/resources/numberOfResources',

      loading: 'apps/admin/resources/loading',
      loaded: 'apps/admin/resources/loaded',
      error: 'apps/admin/resources/error',
    })
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/resources/load',
      reload: 'apps/admin/resources/reload',
    }),
  },
}
</script>
