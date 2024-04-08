<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-delete</v-icon>
      {{ $t('remove-ticket')}}
    </v-card-title>
    <v-card-subtitle>{{ $t('remove-ticket') }}</v-card-subtitle>

    <v-card-text>
      <v-container fluid>
        <v-list two-line>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="removingTicketInProgress" @click="cancel()">{{ $t('cancel') }}</v-btn>
      <v-spacer />
      <v-btn :loading="removingTicketInProgress" @click="confirm">{{ $t('remove') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RemoveTicket",
  props: {
    ticketId: {
      type: String,
    }
  },

  data: () => ({
    executionArn: undefined
  }),

  async created() {
    if (! this.loaded && !this.loading) {
      await this.load();
    }
  },

  watch: {
    ticketId() {
      if (! this.loaded && !this.loading) {
        this.load();
      }
    },
    async removingTicket(removingTicket) {
      console.log("removingTicketInWatch", removingTicket);

      // if the ticket has been removed, then close the component
      if (removingTicket && removingTicket.removing === false) {
        this.reset();
        await this.$router.push({
          name: 'apps-admin-tickets'
        });
        this.$emit('close');
      }
    }
  },

  methods: {
    ...mapActions({
      loadTicketWithTicketId: 'apps/admin/tickets/loadTicketWithTicketId',
      removeTicketWithTicketId: 'apps/admin/tickets/removeTicketWithTicketId'
    }),

    load () {
      console.log("load");
      if (this.ticketId) {
        console.log("loadTicket");
        this.loadTicketWithTicketId(this.ticketId);
      }
    },

    reload () {
      if (this.ticketId) {
        this.loadTicketWithTicketId(this.ticketId);
      }
    },

    reset() {
      this.executionArn = undefined;
    },

    cancel() {
      this.reset();
      this.$emit('close');
    },

    async confirm() {
      try {
        const {ticketId} = this.ticket;
        console.log("ticketId", ticketId);

        // await this.removeTicketWithTicketId(ticketId);

        const {executionArn} = await this.removeTicketWithTicketId(ticketId);
        console.log("executionArn", executionArn);
        this.executionArn = executionArn;
      } catch (error) {
        console.log(error);
        const removingTicket = undefined;
      }
    }
  },

  computed: {
    ...mapGetters({
      ticketWithTicketId: 'apps/admin/tickets/ticketWithTicketId',
      removingTicketWithExecutionArn: 'apps/admin/tickets/removingTicketWithExecutionArn'
    }),

    /**
     * Return the removingTicket.
     *
     * @return {*|undefined}
     */
    removingTicket() {
      return (this.executionArn) ? this.removingTicketWithExecutionArn(this.executionArn) : undefined;
    },

    removingTicketInProgress() {
      return this.removingTicket && this.removingTicket.removing;
    },

    ticket () {
      if (this.ticketId) {
        return this.ticketWithTicketId(this.ticketId);
      }
    },

    name () {
      return (this.ticket) ? this.ticket.name : undefined;
    },

    loaded () {
      if (this.ticket) {
        return this.ticket.loaded || false;
      }
      return false;
    },

    loading () {
      if (this.ticket) {
        return this.ticket.loading || false;
      }
      return false;
    },

    removing () {
      return (this.ticket) ? this.ticket.removing : false;
    },

    removed () {
      return (this.ticket) ? this.ticket.removed : false;
    }
  },
}
</script>
