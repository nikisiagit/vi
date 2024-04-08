<template>
  <v-card
    color="primary"
    dark
    outlined
    class="card-ticket"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title
          class="text-h5"
        >
          <strong>{{ title }}</strong>
        </v-card-title>

        <v-card-subtitle v-text="date"></v-card-subtitle>

        <v-card-text>

          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title class="text-h5">
                {{ price || 'Free'}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ holder }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        </v-card-text>
      </div>

      <v-divider vertical class="text--transparent ml-auto" style=" border-left: 2px dashed;"></v-divider>

      <div class="align-self-center">
        <v-avatar
          class="mx-3"
          size="125"
          tile
        >
          <qrcode v-if="showQRCode" :value="name" size="100" level="H"></qrcode>
          <v-icon v-else x-large>mdi-ticket-confirmation</v-icon>
        </v-avatar>

        <h4 class="text-center">
          #{{ id }}
        </h4>
      </div>

    </div>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "TicketListItem",
  props: {
    title: {
      type: String,
    },
    date: {
      type: String,
    },
    holder: { // person
      type: String,
    },
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    price: {
      type: String,
    },
    showQRCode: {
      type: Boolean,
      default: true
    },
  }
}
</script>

<style lang="scss" scoped>
.card-ticket:after {
  right: -1.5rem;
}

.card-ticket:before {
  left: -1.5rem;
}

.card-ticket:before, .card-ticket:after {
  background: #eceff4;
  border-radius: 50%;
  box-shadow: inset 0 2px 0 0 #dce1eb;
  content: "";
  height: 2.5rem;
  position: absolute;
  top: calc(50% - 1.3rem);
  width: 2.3rem;
}
</style>
