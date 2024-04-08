<template>
  <v-card elevation="1" class="text-center rounded-lg">

    <v-card-title class="justify-center primary--text">
      <h4>{{ eventDates }}</h4>

      <v-icon right color="primary">mdi-share-variant</v-icon>

    </v-card-title>

    <v-card-title class="justify-center">
      <h3> {{ retrieveLabel(titleId) }}</h3>
    </v-card-title>

    <v-card-text class="text-body-1">
      <span class="text-capitalize">
        {{ format }}
      </span>


      <v-container fluid>
        <v-row justify="center">
          <v-col lg="auto" cols="12">
            <v-btn
              width="200"
              height="45"
              elevation="0"
              color="primary"
              class="rounded-lg"
              @click="$emit('navigate-to', registrationTicketComponentId)"
            >
              Register
            </v-btn>
          </v-col>

          <v-col lg="auto" cols="12">
            <v-btn width="200" height="45" color="primary" class="rounded-lg" outlined>
              <v-icon left>mdi-calendar-plus</v-icon>
              Add to calendar
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="center" v-if="totalRegistrations">
          <v-col cols="6" align="end">
            <v-btn
              elevation="1"
              fab
              color="primary"
              class="mr-n2"
              style="padding: 1.4rem 1.5rem 1.4rem 1.4rem; zoom: 0.8"
              max-height="35"
              max-width="35"
              v-for="(avatar, i) in avatars"
              :key="i"
            >
              <base-avatar
                :avatar="avatar.src"
                :label="avatar.label"
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
          </v-col>

          <v-col class="body-1" align="start" align-self="center">
            +{{ totalRegistrations }} attendees
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

  </v-card>
</template>

<script>
import dayjs from "dayjs";
import {mapGetters} from "vuex";

export default {
  name: 'EventDetails',
  data(){
    return {
      avatars: [
        {
          src: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          label: 'Random 1'
        },
        // {
        //   src: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        //   label: 'Random 2'
        // },
        {
          src: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          label: 'Random 3'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          label: 'Luis Carbajal'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      // eventWithEventId: 'apps/admin/events/eventWithEventId',
      eventWithEventId: 'events/eventWithEventId',
    }),

    eventId () {
      return this.$route.params.eventId || undefined;
    },

    registrationTicketComponentId(){
      return 'component:registration-tickets'
    },

    /**
     * The Event.
     *
     * @returns {*|undefined}
     */
    event() {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    format() {
      return (this.event) ? this.event?.format : undefined;
    },

    totalRegistrations() {
      return (this.event) ? this.event?.totalRegistrations : undefined;
    },

    startDateTime() {
      return (this.event) ? this.event?.startDateTime : undefined;
    },

    endDateTime() {
      return (this.event) ? this.event?.endDateTime : undefined;
    },

    eventDates(){
      if ( this.startDateTime ) {
        const startMonth = this.dateMonth(this.startDateTime)
        const endMonth = this.dateMonth(this.endDateTime)

        const startDay = dayjs(this.startDateTime).format("DD")
        const endDay = dayjs(this.endDateTime).format("DD")

        const year = dayjs(this.startDateTime).format("YYYY")
        const endDayFormat = startDay !== endDay ? `-${endDay} `: ''
        const endMonthFormat = `${startMonth !== endMonth ? endMonth: ''}`

        return `${startMonth} ${startDay}${endDayFormat}${endMonthFormat}, ${year}`
      }

      return ''
    },

    titleId() {
      return (this.event) ? this.event?.titleId : undefined;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },
  },
  methods: {
    dateMonth(date){
      return dayjs(date).format("MMMM")?.slice(0, 3)
    },

    retrieveLabel(labelId){
      switch(labelId){
        case 'label:demo:event:demo:eventheads-gamification:title':
          return 'The Engagement value of Gamification with Noonah'

        case 'label:demo:event:demo:eventheads-gamification:description':
          return 'What you might have missed: at our launch event, EventHeads Matt Franks from Noonah and Gavin Newman at iVent provided precious insights into today\'s engagement and gamification landscape and suggested how you can remove friction from your attendee experience in order to better market, sell and delight your virtual or hybrid audience.'

        case 'label:demo:event:demo:virtual-open-day:title':
          return 'Virtual Open Day'

        case 'label:demo:event:demo:virtual-open-day:description':
          return `
          Join our Postgraduate Virtual Open Days on 01st April. Meet academics and students, ask your questions and learn more about life at Warwick. Top 10 UK University. Campus Experience. Scholarships Available.
          `

      }
    },
  }
}
</script>
