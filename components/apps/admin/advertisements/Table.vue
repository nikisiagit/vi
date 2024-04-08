<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-advertisements</v-icon>
      {{ $t('advertisements') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('advertisements') }}</v-card-subtitle>

    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>{{ $t('all') }} ({{ numberOfAdvertisements }})</v-tab>
      </v-tabs>

      <v-data-table :search="search" :headers="headers" :items="advertisements" :loading="loading">
        <template v-slot:top>
          <v-container fluid class="px-0 pt-6">
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <v-text-field v-model="search" dense hide-details="auto"
                              rounded filled prepend-inner-icon="mdi-magnify"
                              :placeholder="placeholder"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <!-- headers -->
        <template v-slot:header.advertisement="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.numberOfViews="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.numberOfClicks="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.ctr="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.actions="{ header }">
          {{ $t(header.text) }}
        </template>

        <!-- items -->
        <template v-slot:item.name="{ item }">
          <v-avatar rounded>
            <img :src="item.imageUrl" />
          </v-avatar>
          {{ item.name }}
        </template>

        <!-- item actions -->
        <template v-slot:item.actions="{ item }">
          <template>
            <v-btn icon nuxt :to="{name: 'apps-admin-advertisements-name', params: {name: item.name}}">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>

          <template>
            <v-btn icon color="error">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>

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
    </v-card-text>

    <v-card-actions>
      <!--      <v-tooltip right>-->
      <!--        <template v-slot:activator="{ on, attrs }">-->
      <!--          <v-btn icon v-bind="attrs" v-on="on">-->
      <!--            <v-icon>mdi-help-circle</v-icon>-->
      <!--          </v-btn>-->
      <!--        </template>-->
      <!--        {{ $t('labels-tooltip') }}-->
      <!--      </v-tooltip>-->

      <v-spacer />

      <v-btn :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('Reload') }}
      </v-btn>

      <v-dialog v-model="addAdvertisementDialog" max-width="1000px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-2" v-bind="attrs" v-on="on">
            <v-icon left>mdi-advertisements</v-icon>
            {{ $t('add-advertisement') }}
          </v-btn>
        </template>
        <apps-admin-advertisements-create-advertisement @close="addAdvertisementDialog = false;"/>
      </v-dialog>
    </v-card-actions>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Table",
  computed: {
    ...mapGetters({
      loading: 'apps/admin/advertisements/loading',
      loaded: 'apps/admin/advertisements/loaded',
      advertisements: 'apps/admin/advertisements/advertisements',
    }),

    placeholder () {
      return this.$i18n.t('search');
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/advertisements/load',
      reload: 'apps/admin/advertisements/reload',
    }),
  },

  data: () => ({
    search: '',
    addAdvertisementDialog: false,
    loading: false,
    // numberOfAdvertisements: 2,
    // advertisements: [
    //   {
    //     advertisementId: 'advertisement:eventheads:coca-cola',
    //     type: 'advertisement',
    //     partition: 'eventheads',
    //     name: 'coca-cola',
    //
    //
    //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg',
    //     //
    //     // // Advertisement Text Label
    //     // text: {
    //     //   // this will be a Label
    //     // },
    //     // textLabelId: 'label:advertisement:eventheads:coca-cola:text',
    //     // numberOfViews: 34,
    //     // numberOfClicks: 10,
    //     // ctr: 30
    //   }
    // ],
    headers: [
      {
        text: 'advertisement',
        align: 'start',
        value: 'name',
        sortable: true,
      },
      {
        text: 'numberOfViews',
        align: 'start',
        value: 'numberOfViews',
        sortable: true,
      },
      {
        text: 'numberOfClicks',
        align: 'start',
        value: 'numberOfClicks',
        sortable: true,
      },
      {
        text: 'ctr',
        align: 'right',
        value: 'ctr',
        sortable: false,
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
