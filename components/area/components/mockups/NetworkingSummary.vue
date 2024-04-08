<template>
  <v-card height="150" class="d-flex flex-column">
    <v-card-title>
      What are the biggest challenges in hosting events? 🤔
    </v-card-title>

    <v-card-text class="mt-auto text-left">
      Text chat
      <div>
        Created by Organiser
      </div>
    </v-card-text>

  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ExhibitorSummary",
  props: {
    eventId: {
      type: String,
    },
    dateDay: {
      type: String,
    },
    dateMonth: {
      type: String,
    },
    timeStart: {
      type: String,
    },
    timeEnd: {
      type: String,
    },
    title: {
      type: String,
    },
    eventType: {
      type: String,
    },
    address: {
      type: String
    },
    description: {
      type: String,
    },
    hostName: {
      type: String,
    },
    members: {
      type: Array,
    },
  },
  data(){
    return {}
  }
}
</script>
