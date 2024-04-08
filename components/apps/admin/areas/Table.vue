<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-page-layout-header</v-icon>

      <v-toolbar-title>{{ $t('areas') }} ({{ numberOfAreas }})</v-toolbar-title>

      <v-spacer />

      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>
      </v-btn>

<!--      <v-dialog v-model="createAreaDialog" max-width="1000px">-->
<!--        <template v-slot:activator="{ on, attrs }">-->
<!--          <v-btn icon v-bind="attrs" v-on="on">-->
<!--            <v-icon>mdi-plus</v-icon>-->
<!--          </v-btn>-->
<!--        </template>-->
<!--        <apps-admin-areas-create-area @close="createAreaDialog = false;"/>-->
<!--      </v-dialog>-->

    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-data-table :search="search" :headers="headers" :items="areas" :loading="loading">
            <template v-slot:top>
              <v-container fluid class="px-0 pt-6">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field v-model="search" dense hide-details="auto"
                                  rounded filled prepend-inner-icon="mdi-magnify"
                                  :placeholder="placeholder"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </template>

            <!-- headers -->
            <template v-slot:header.name="{ header }">
              {{ $t(header.text) }}
            </template>

            <template v-slot:header.areaId="{ header }">
              {{ $t(header.text) }}
            </template>
            <template v-slot:header.actions="{ header }">
              {{ $t(header.text) }}
            </template>

            <!-- items -->
            <template v-slot:item.name="{ item }">
              <v-icon left>{{ item.icon }}</v-icon> {{ item.name }}
            </template>

            <!-- item actions -->
            <template v-slot:item.actions="{ item }">
              <template>
                <v-btn icon nuxt :to="{name: 'apps-admin-areas-areaId', params: {areaId: item.areaId}}">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>

<!--              <template>-->
<!--                <v-btn icon color="error">-->
<!--                  <v-icon>mdi-delete</v-icon>-->
<!--                </v-btn>-->
<!--              </template>-->

              <template v-if="item.error">
                <v-btn icon :loading="loading" :disabled="loading" color="error">
                  <v-icon>mdi-alert</v-icon>
                </v-btn>
              </template>

              <template v-if="item.loaded">
                <v-btn icon :loading="loading">
                  <v-icon color="success">mdi-check-circle</v-icon>
                </v-btn>
              </template>
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
  name: "Table",
  computed: {
    ...mapGetters({
      loading: 'apps/admin/areas/loading',
      loaded: 'apps/admin/areas/loaded',
      areas: 'apps/admin/areas/areas',
      numberOfAreas: 'apps/admin/areas/numberOfAreas',
    }),

    placeholder () {
      return this.$i18n.t('search');
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/areas/load',
      reload: 'apps/admin/areas/reload',
    }),
  },

  data: () => ({
    search: '',
    createAreaDialog: false,

    headers: [
      {
        text: 'name',
        align: 'start',
        value: 'name',
        sortable: true,
      },
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
  })
}
</script>
