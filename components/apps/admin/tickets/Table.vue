<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-ticket</v-icon>

      <v-toolbar-title>{{ $t('tickets')}} ({{ numberOfTickets }})</v-toolbar-title>

      <v-spacer />

      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-dialog v-model="createTicketDialog" overlay-color="accent" max-width="1200px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-tickets-create-ticket @close="createTicketDialog = false;"/>
      </v-dialog>
    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-data-table :search="search" :headers="headers" :items="tickets" :loading="loading">
            <template v-slot:top>

              <v-dialog v-model="removeTicketDialog" max-width="1000px">
                <apps-admin-ticket-remove-ticket :name="ticketNameToRemove" @close="removeTicketDialog = false;"/>
              </v-dialog>

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
            <template v-slot:header.ticket="{ header }">
              {{ $t(header.text) }}
            </template>

            <template v-slot:header.price="{ header }">
              {{ $t(header.text) }}
            </template>

            <template v-slot:header.orders="{ header }">
              {{ $t(header.text) }}
            </template>

            <template v-slot:item.price="{ item }">
              {{ formatPrice(item.price) }}
            </template>

            <template v-slot:item.orders="{ item }">
              {{ item.orders }}/{{ item.quantity }}
            </template>

            <!-- item actions -->
            <template v-slot:item.actions="{ item }">
              <template>
                <v-btn icon nuxt :to="{name: 'apps-admin-tickets-ticketId', params: {ticketId: item.ticketId}}">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>

              <template>
                <v-btn icon color="error" @click="openRemoveTicketDialog(item.name)">
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
      loading: 'apps/admin/tickets/loading',
      loaded: 'apps/admin/tickets/loaded',
      tickets: 'apps/admin/tickets/tickets',
      numberOfTickets: 'apps/admin/tickets/numberOfTickets',
      venueLoading: 'apps/admin/loading',
      venueLoaded: 'apps/admin/loaded',
      venue: 'apps/admin/venue/venue'
    }),

    placeholder () {
      return this.$i18n.t('search');
    },
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/tickets/load',
      reload: 'apps/admin/tickets/reload',
      venueLoad: 'apps/admin/venue/load'
    }),

    formatPrice(price) {
      return new Intl.NumberFormat(this.languageCode, { style: 'currency', currency: this.currencyCode }).format(price);
    },

    openRemoveTicketDialog(ticketId) {
      this.removeTicketDialog = true;
      this.ticketIdToRemove = ticketId;
    }
  },

  created () {
    if (!this.venueLoaded && !this.venueLoading) {
      this.venueLoad();
    }
  },

  data: () => ({
    search: '',
    addTicketDialog: false,
    removeTicketDialog: false,
    ticketIdToRemove: undefined,
    headers: [
      {
        text: 'Ticket Name',
        align: 'start',
        value: 'name',
        sortable: true,
      },
      {
        text: 'Price',
        align: 'start',
        value: 'price',
        sortable: true,
      },
      {
        text: 'Ticket Orders',
        align: 'start',
        value: 'orders',
        sortable: true,
      },
      {
        text: 'Actions',
        align: 'right',
        value: 'actions',
        sortable: false,
      }
    ],
    languageCode: 'en',  //@todo: retrieve from Venue languageId
    currencyCode: 'GBP',  //@todo: retrieve from Venue currencyId
  })
}
</script>
