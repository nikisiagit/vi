<template>
    <!-- the list -->
    <v-card>
          <v-list v-if="$vuetify.breakpoint.mobile">
            <apps-admin-registration-nav-list-item
              v-for="registration in registrations"
              :key="registration.registrationId"
              :registration-id="registration.registrationId"
            />
          </v-list>

          <v-data-table
            v-else
            :items="registrations"
            :headers="headers"
            :loading="loading">

            <!-- item - titleId -->
            <template v-slot:item.title="{ item }">
              <v-list-item class="pa-0" two-line>
                <v-list-item-content>
                  <v-list-item-title>
                    <nuxt-link
                      :to="{ name: 'apps-admin-registrations-registrationId', params: { registrationId: item.registrationId } }"
                      class="text-decoration-none text--primary">
                      {{ item.title || $t(item.titleId) }} <!-- Good work :D -->
                    </nuxt-link>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{  item.description || $t(item.descriptionId) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>

            <!-- item - status -->
            <template v-slot:item.status="{ item }">
              <v-icon :color="item.status === true ? 'success' : 'error'">
                {{ item.status === true ? 'mdi-check' : 'mdi-close' }}
              </v-icon>
            </template>

            <!-- item - actions -->
            <template v-slot:item.actions="{ item }">
              <v-btn icon nuxt :to="{name: 'apps-admin-registrations-registrationId', params: {registrationId: item.registrationId}}">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
          </v-data-table>
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

  methods: {
    ...mapActions({
      load: 'apps/admin/registrations/load',
      reload: 'apps/admin/registrations/reload',
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/registrations/loading',
      loaded: 'apps/admin/registrations/loaded',
      registrations: 'apps/admin/registrations/registrations',
      numberOfRegistrations: 'apps/admin/registrations/numberOfRegistrations',
    }),

  },

  data: () => ({
    headers: [
      {
        text: 'Title',
        align: 'start',
        value: 'title',
        sortable: true,
        width: '55%'
      },
      {
        text: 'Registrants',
        align: 'start',
        value: 'registrants',
        sortable: true,
        width: '15%'
      },
      {
        text: 'Status',
        align: 'start',
        value: 'status',
        sortable: false,
        width: '15%'
      },
      {
        text: 'Actions',
        align: 'start',
        value: 'actions',
        sortable: false,
        width: '15%'
      }
    ],
  }),
}
</script>


