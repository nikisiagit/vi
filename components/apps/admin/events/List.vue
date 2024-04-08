<!--
 Admin - Events - List Component/Mini Application

This is a smart component - its connected to the Events Store.

This card component renders a list of the Events in the Partition.
-->
<template>
  <v-card rounded :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-calendar-multiple</v-icon>
      {{ $t('admin-events-list-title') }}
      ({{ numberOfEvents }})

    </v-card-title>

    <!-- the list -->
    <v-container fluid>
      <v-row>
        <v-col>
          <v-list v-if="$vuetify.breakpoint.mobile">
            <apps-admin-event-nav-list-item
              v-for="event in events"
              :key="event.eventId"
              :event-id="event.eventId"
            />
          </v-list>

          <v-data-table
            v-else
            :items="events"
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
  name: "List",

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

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

  data: () => ({
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
}
</script>

