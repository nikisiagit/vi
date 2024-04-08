<!--
Venue Admin - Events - Table Component/Mini Application

This is a smart component - its connected to the Events Store.

This card component renders a table of the Events in the Partition.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-calendar-multiple</v-icon>
      {{ $t('admin-events-table-title') }}
      ({{ numberOfEvents }})

      <v-spacer />

      <!-- reload  -->
      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <!-- help -->
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-data-table :items="events"
                        :headers="headers"
                        :loading="loading"
          >

            <!-- item - titleId -->
            <template v-slot:item.titleId="{ item }">
              <nuxt-link :to="{name: 'apps-admin-events-eventId', params: {eventId: item.eventId}}">
                {{ item.titleId }}
              </nuxt-link>
            </template>

            <!-- item - actions -->
            <template v-slot:item.actions="{ item }">
              <v-btn icon nuxt :to="{name: 'apps-admin-events-eventId', params: {eventId: item.eventId}}">
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
  name: "Table",

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({

    /**
     * The list of headers.
     */
    headers: [
      {
        text: 'title-id',
        align: 'start',
        value: 'titleId',
        sortable: true,
      },
      {
        text: 'name',
        align: 'start',
        value: 'name',
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

  methods: {
    ...mapActions({
      load: 'apps/admin/events/load',
      reload: 'apps/admin/events/reload',
    })
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/events/loading',
      loaded: 'apps/admin/events/loaded',
      events: 'apps/admin/events/events',
      numberOfEvents: 'apps/admin/events/numberOfEvents'
    })
  },

}
</script>
