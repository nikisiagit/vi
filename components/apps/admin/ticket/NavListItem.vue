<template>
  <v-list-item two-line :to="{name: 'apps-admin-tickets-ticketId', params: {ticketId: ticketId}}">
    <v-list-item-avatar>
      <apps-admin-ticket-avatar :ticket-id="ticketId" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ ticketId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('ticket-ticket-id') }}</v-list-item-subtitle>
    </v-list-item-content>

  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    ticketId: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    ticketId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadTicketWithTicketId: 'apps/admin/tickets/loadTicketWithTicketId',
    }),

    async load () {
      return await (this.ticketId) ? this.loadTicketWithTicketId(this.ticketId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      ticketWithName: 'apps/admin/tickets/ticketWithTicketName',
    }),

    ticket () {
      return (this.name) ? this.ticketWithName(this.name) : undefined;
    },

    loaded () {
      return (this.ticket) ? this.ticket.loaded : false;
    },

    loading () {
      return (this.ticket) ? this.ticket.loading : false;
    },
  },
}
</script>
