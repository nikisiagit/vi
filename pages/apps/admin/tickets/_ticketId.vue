<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-ticket-details :ticket-id="ticketId"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Ticket",
  layout: 'admin',

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadTicketWithTicketId: 'apps/admin/tickets/loadTicketWithTicketId',
    }),

    async load() {
      return await (this.ticketId) ? this.loadTicketWithTicketId(this.ticketId) : undefined;
    }
  },

  computed: {
    ...mapGetters({
      ticketWithTicketId: 'apps/admin/tickets/ticketWithTicketId',
    }),

    ticketId () {
      return this.$route.params.ticketId || undefined;
    },


    ticket () {
      return (this.ticketId) ? this.ticketWithTicketId(this.ticketId) : undefined;
    },


    loaded () {
      return (this.ticket) ? this.ticket.loaded : false;
    },

    loading () {
      return (this.ticket) ? this.ticket.loading : false;
    },

    error () {
      return (this.ticket) ? this.ticket.error : false;
    },
  }
}
</script>
