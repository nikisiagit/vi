<template>
  <v-card>
<!--    <template slot="progress">-->
<!--      <v-progress-linear height="4" indeterminate />-->
<!--    </template>-->

<!--    &lt;!&ndash; title &ndash;&gt;-->
<!--    <v-card-title>-->
<!--      <v-icon left>mdi-page-layout-header</v-icon>-->
<!--      {{ $t('admin-venue-areas-title') }} ({{ numberOfAreas }})-->

<!--      <v-spacer />-->

<!--      <v-btn icon :loading="loading" :disabled="loading" @click="reload">-->
<!--        <v-icon>mdi-refresh</v-icon>-->
<!--      </v-btn>-->

<!--    </v-card-title>-->

    <v-container fluid>
      <v-row>
        <v-col>
          <v-list v-if="$vuetify.breakpoint.mobile">
            <apps-admin-area-nav-list-item
              v-for="area in areas"
              :key="area.areaId"
              :areaId="area.areaId" />
          </v-list>

          <v-data-table
            v-else
            :items="areas"
            :headers="headers"
            :loading="loading"
          >
            <!-- item - titleId -->
            <template v-slot:item.areaId="{ item }">
              <nuxt-link :to="{name: 'apps-admin-venue-areas-areaId', params: {areaId: item.areaId}}">
                {{ item.areaId }}
              </nuxt-link>
            </template>

            <!-- item - actions -->
            <template v-slot:item.actions="{ item }">
              <v-btn icon nuxt :to="{name: 'apps-admin-venue-areas-areaId', params: {areaId: item.areaId}}">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
          </v-data-table>
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
    headers: [
      // {
      //   text: 'name',
      //   align: 'start',
      //   value: 'name',
      //   sortable: true,
      // },
      {
        text: 'areaId',
        align: 'start',
        value: 'areaId',
        sortable: true,
      },
      {
        text: 'actions',
        align: 'right',
        value: 'actions',
        sortable: false,
      }
    ],
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

