<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-tickets-confirmation</v-icon>
      {{ $t('ticket-details') }}

      <v-spacer />

      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>
    </v-card-title>

    <v-card-subtitle>{{ $t('ticket-details-subtitle') }}</v-card-subtitle>

    <v-card-text>
      <v-list two-line>

        <!-- name -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ $t(titleId) }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('title') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ $t(descriptionId) }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('description') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ pricingType }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('ticket-type') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ access }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('ticket-access') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ showQrCode }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('qr-code-generation') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ quantity }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('available-tickets-limit') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ saleStart }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('sale-starts') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ saleEnd }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('sale-ends') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import dayjs from "dayjs";

export default {
  name: "Details",

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
    },

    async reload () {
      return await (this.ticketId) ? this.loadTicketWithTicketId(this.ticketId) : undefined;
    },

    convertDateFormat(date) {
      if (date === null || date === undefined) {
        return "";
      }

      return dayjs(date).format("D MMMM YYYY");
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
      return (this.ticket) ? this.ticket.error : undefined;
    },

    name () {
      return (this.ticket) ? this.ticket.name : undefined;
    },

    label () {
      return (this.ticket) ? this.ticket.label : undefined;
    },

    text () {
      return (this.ticket) ? this.ticket.text : undefined;
    },

    titleId () {
      return (this.ticket) ? this.ticket.titleId : undefined;
    },

    descriptionId () {
      return (this.ticket) ? this.ticket.descriptionId : undefined;
    },

    pricingType () {
      return (this.ticket) ? (this.ticket.pricingType === "paid" ? "Paid" : "Free") : undefined;
    },

    access () {
      return (this.ticket) ? (this.ticket.access === "public" ? "Public" : "Private") : undefined;
    },

    showQrCode () {
      return (this.ticket) ? (this.ticket.showQrCode ? "Include" : "Don't include") : undefined;
    },

    quantity () {
      return (this.ticket) ? this.ticket.quantity : undefined;
    },

    saleStart () {
      return (this.ticket) ? this.convertDateFormat(this.ticket.saleStartDatetime) : undefined;
    },

    saleEnd () {
      return (this.ticket) ? this.convertDateFormat(this.ticket.saleEndDatetime) : undefined;
    },
  }
}
</script>

