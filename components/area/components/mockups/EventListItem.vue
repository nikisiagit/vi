<template>
  <v-card :disabled="! joinable && dense" flat rounded="lg"  class="d-flex">

    <v-container fluid style="width: 100px">
      <v-row no-gutters class="fill-height">
        <v-col cols="12">
          <v-card elevation="0" rounded="lg" height="75" width="78" class="text-center" color="primary" dark >

            <v-card-title class="text-h6 pt-2 pb-3 justify-center font-weight-bold">
              {{ dateMonth }}
            </v-card-title>

            <v-card-subtitle class="text-h6 justify-center font-weight-bold">
              {{ dateDay }}
            </v-card-subtitle>

          </v-card>
        </v-col>

        <v-col cols="12" align-self="end" class="d-flex" v-if="! dense">
          <v-btn class="mr-2" text color="primary" icon>
            <v-icon>
              mdi-share-variant
            </v-icon>
          </v-btn>

          <v-btn text color="primary" icon>
            <v-icon>
              mdi-text-box-plus-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-card flat width="100%">
      <v-card-title class="pl-0 pt-2">
        {{ title }}
      </v-card-title>
      <v-card-subtitle class="pl-0 py-1">
        <v-icon small left>
          mdi-clock
        </v-icon>
        {{ timeStart }} - {{ timeEnd }}
      </v-card-subtitle>

      <v-card-subtitle class="pl-0 py-1 text-capitalize">
        <v-icon small left>
          mdi-map-marker
        </v-icon>
        {{ eventType }} <span v-show="address">- {{ address }}</span>
      </v-card-subtitle>

      <v-card-subtitle class="pl-0 pt-1">
        <v-icon small left>
          mdi-calendar
        </v-icon>
        {{ hostName ? `Hosted By ${hostName}`: null }}

        <v-btn absolute right rounded small color="primary" text v-if="joinable" nuxt :to="{ name: 'events-eventId-lobby', params: { eventId: 'event:demo:eventheads-gamification' } }">
          Join
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-subtitle>

      <v-card-text class="pl-0" v-if="! dense">
        <v-row>
          <v-col cols="12" v-if="description" style="white-space: pre-line" v-html="description"></v-col>

          <v-col cols="12" class="text-right">
            <v-btn
              elevation="1"
              fab
              color="primary"
              class="mr-n2"
              style="padding: 1.4rem 1.5rem 1.4rem 1.4rem; zoom: 0.8"
              max-height="35"
              max-width="35"
              v-for="(m, i) in members"
              :key="i"
            >
              <base-avatar
                :avatar="m.src"
                size="xs"
                :status-indicator="false"
              ></base-avatar>
            </v-btn>

            <v-btn
              elevation="1"
              fab
              color="primary"
              class="mr-n2"
              style="padding: 1.4rem 1.5rem 1.4rem 1.4rem; zoom: 0.8"
              max-height="35"
              max-width="35"
            >
              <base-avatar
                icon="mdi-account-group"
                size="xs"
                :status-indicator="false"
              ></base-avatar>

            </v-btn>

            <span class="ml-4">+100 attendees</span>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "EventListItem",
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
    dense: {
      type: Boolean,
      default: false
    },
    joinable: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {}
  }
}
</script>
