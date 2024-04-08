<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-view-grid</v-icon>

      <v-toolbar-title>
        {{ $t('label:region:app:admin:components-details') }} ({{ numberOfAreas }})
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-dialog v-model="createAreaDialog" overlay-color="accent">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="ml-3" v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-areas-create-area @close="createAreaDialog = false;"/>
      </v-dialog>

    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-list>
            <apps-admin-area-nav-list-item
              v-for="area in areas"
              :key="area.areaId"
              :areaId="area.areaId" />
          </v-list>
        </v-col>
      </v-row>
    </v-container>

  </v-card>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

  data: () => ({
    createAreaDialog: false,
  }),

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/areas/load',
      reload: 'apps/admin/areas/reload',
    })
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/areas/loading',
      loaded: 'apps/admin/areas/loaded',
      areas: 'apps/admin/areas/areas',
      numberOfAreas: 'apps/admin/areas/numberOfAreas'
    })
  },
}
</script>

