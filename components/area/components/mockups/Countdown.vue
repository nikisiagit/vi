<template>
  <v-card rounded="lg" elevation="1">
    <v-container class="d-flex align-center">
      <v-card-title>Event starts in</v-card-title>

      <v-spacer></v-spacer>

      <div class="d-flex justify-end text-body-1">
        <!--        <v-sheet outlined width="70" class="text-center" rounded>-->
        <!--          <h2 class="primary&#45;&#45;text">-->
        <!--            {{ years }}-->
        <!--          </h2>-->
        <!--          <v-divider></v-divider>-->
        <!--          <h5 class="primary&#45;&#45;text lighten-1">-->
        <!--            Years-->
        <!--          </h5>-->
        <!--        </v-sheet>-->

        <v-sheet outlined width="70" height="70" class="text-center mr-1" rounded>
          <h2 class="primary--text py-1">
            {{ days % 365  }}
          </h2>
          <v-divider></v-divider>
          <h5 class="primary--text lighten-1 mt-1">
            Days
          </h5>
        </v-sheet>

        <v-sheet outlined width="70" height="70" class="text-center mr-1" rounded>
          <h2 class="primary--text py-1">
            {{ hours % 24 }}
          </h2>
          <v-divider></v-divider>
          <h5 class="primary--text lighten-1 mt-1">
            Hours
          </h5>
        </v-sheet>

        <v-sheet outlined width="70" height="70" class="text-center mr-1" rounded>
          <h2 class="primary--text py-1">
            {{ minutes % 60 }}
          </h2>
          <v-divider></v-divider>
          <h5 class="primary--text lighten-1 mt-1">
            Minutes
          </h5>
        </v-sheet>

        <v-sheet outlined width="70" height="70" class="text-center" rounded>
          <h2 class="primary--text py-1">
            {{ seconds % 60 }}
          </h2>
          <v-divider></v-divider>
          <h5 class="primary--text lighten-1 mt-1">
            Seconds
          </h5>
        </v-sheet>
      </div>
    </v-container>
  </v-card>
</template>


<script>
import {mapGetters} from "vuex";
import dayjs from "dayjs";

export default {
  name: "Countdown",
  // props: {
  //   date: {
  //     type: [String, Date],
  //     required: true
  //   }
  // },
  data(){
    return {
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
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

    /**
     * The Event.
     *
     * @returns {*|undefined}
     */
    event() {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    startDateTime() {
      return (this.event) ? this.event?.startDateTime : undefined;
    },

    endDateTime() {
      return (this.event) ? this.event?.endDateTime : undefined;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },
  },
  watch: {
    startDateTime: {
      immediate: true,
      handler(){
        if ( ! this.startDateTime ) return

        setInterval(() => {
          const currentDate = new Date();
          const time = new Date(this.startDateTime) - currentDate;
          this.seconds = parseInt(time / 1000);
          this.minutes = parseInt(this.seconds / 60);
          this.hours = parseInt(this.minutes / 60);
          this.days = parseInt(this.hours / 24);
          this.years = parseInt(this.days / 365);
        }, 1000);
      }
    }
  },
};
</script>
