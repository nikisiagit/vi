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
          <v-list>
            <apps-admin-ticket-nav-list-item
              v-for="ticket in tickets"
              :key="ticket.ticketId"
              :ticket-id="ticket.ticketId" />
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

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    createTicketDialog: false,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/tickets/load',
      reload: 'apps/admin/tickets/reload',
    })
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/tickets/loading',
      loaded: 'apps/admin/tickets/loaded',
      tickets: 'apps/admin/tickets/tickets',
      numberOfTickets: 'apps/admin/tickets/numberOfTickets'
    })
  },
}
</script>

