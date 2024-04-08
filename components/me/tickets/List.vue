<template>
  <v-list flat>
    <v-subheader>
      <h4>{{ $t('upcoming') }}</h4>
    </v-subheader>

    <me-ticket-list-item v-for="ticket in tickets"
                     :ticket-id="ticket.ticketId"
                     :key="ticket.ticketId"
    />
  </v-list>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "TicketList",
  data(){
    return {
      tickets: [
        {
          ticketId: 'ticket:ucas:gamification-01'
        },

        {
          ticketId: 'ticket:ucas:gamification-02'
        },

        {
          ticketId: 'ticket:ucas:gamification-03'
        },

      ] //@todo: GET from store

    }
  }
}
</script>
