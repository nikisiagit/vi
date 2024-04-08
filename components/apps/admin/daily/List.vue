<!--
 Admin - Registrations - List Component/Mini Application

This is a smart component - its connected to the Registrations Store.

This card component renders a list of the Registrations in the Partition.
-->
<template>
  <v-card rounded :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-form-select</v-icon>
      {{ $t('admin-daily-list-title') }}
      ({{ numberOfRooms }})

    </v-card-title>

    <!-- the list -->
    <v-container fluid>
      <v-row>
        <v-col>
          <v-list v-if="$vuetify.breakpoint.mobile">
            <apps-admin-daily-nav-list-item
              v-for="room in rooms"
              :key="room.registrationId"
              :registration-id="room.registrationId"
            />
          </v-list>

          <v-data-table
            v-else
            :items="rooms"
            :headers="headers"
            :loading="loading"
          >
            <!-- item - titleId -->
            <template v-slot:item.titleId="{ item }">
              <nuxt-link :to="{name: 'apps-admin-daily-roomId', params: {registrationId: item.registrationId}}">
                {{ item.name }}
              </nuxt-link>
            </template>

            <!-- item - actions -->
            <template v-slot:item.actions="{ item }">
              <v-btn icon nuxt :to="{name: 'apps-admin-daily-roomId', params: {registrationId: item.registrationId}}">
                <v-icon>mdi-login</v-icon>
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
      load: 'apps/admin/daily/load',
      reload: 'apps/admin/daily/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/daily/loading',
      loaded: 'apps/admin/daily/loaded',
      rooms: 'apps/admin/daily/rooms',
      numberOfRooms: 'apps/admin/daily/numberOfRooms'
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

