<template>
<!--  <pre>-->
<!--    {{ event }}-->
<!--  </pre>-->


  <v-container fluid>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="9" :lg="(sideNavigationOpen || sideActivityNavigationOpen) ? 10: 7" :xl="(sideNavigationOpen || sideActivityNavigationOpen) ? 9: 6">

        <!-- for a lobby with a backgroundImage as area instead of backgroundColour -->
<!--        <v-card class="glass-effect" :color="vTheme.color" style="border-radius: 20px">-->
<!--          <v-card-title></v-card-title>-->
<!--          <v-card-text></v-card-text>-->
<!--        </v-card>-->

        <v-sheet elevation="1" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">

         <v-container fluid>
           <v-row v-if="event">
             <v-col >
               <area-components-mockups-event-list-item
                 :date-day="dateDay(event.startDateTime)"
                 :date-month="dateMonth(event.startDateTime)"
                 :time-start="time(event.startDateTime)"
                 :time-end="time(event.endDateTime)"
                 :host-name="'Ash Kibir'"
                 :title="'The Engagement value of Gamification with Noonah'"

                 :event-type="event.format"
                 :members="[
                    {
                      src: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    },
                    {
                      src: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    },
                    {
                      src: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    }
                 ]"
               />
             </v-col>
           </v-row>

           <v-row>
             <v-col>
               <area-components-mockups-header
                 media-type="video"

                 video-src="https://www.youtube.com/embed/EmI-iUadHOs"
               ></area-components-mockups-header>
             </v-col>
           </v-row>

           <v-row>
             <v-col>
               <area-components-mockups-text
                 :text="`<b>A jam-packed session of insights on how to leverage hybrid for maximum growth.</b>

                  Other fellow #eventheads asked the questions they never got to ask before

                  We presented real-life case studies, dove deep into budgets, logistics and set-up, connecting in-person and online attendees and much, much more.

                  <b>Housekeeping:</b>

                  <ul style='white-space: normal'>
                    <li>Use Support icon on the left if you are in trouble 🚑</li>
                    <li>Tweet at @eventheads during live event using the bird app 🐣</li>
                    <li>Find new people using the Activity icon on the right, no harassment or sales spam 🙏</li>
                  </ul>`"
               ></area-components-mockups-text>
             </v-col>
           </v-row>

           <v-row v-if="event && event.startDateTime">
             <v-col align="center">
               <area-components-mockups-countdown
                 :date="event && event.startDateTime ? new Date(event.startDateTime): null"
               ></area-components-mockups-countdown>
             </v-col>
           </v-row>


         </v-container>

        </v-sheet>


      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import colors from "~/mixins/colors";
import dayjs from "dayjs";
export default {
  name: "Lobby",
  mixins: [colors],

  async created () {
    // if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        return await this.load();
      }
    // }
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
    }),

    async load() {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    time(date) {
      return dayjs(date).format("hh:mm A");
    },

    dateMonth(date){
      return dayjs(date).format("MMMM")?.slice(0, 3).toUpperCase();
    },

    dateDay(date){
      return dayjs(date).format("DD");
    },

    scrollToComponent(componentRef) {
      const el = this.$refs[componentRef]?.$el;

      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    },
  },

  computed: {
    ...mapGetters({
      eventWithEventId: 'apps/admin/events/eventWithEventId',
      // initialised: 'events/initialised',

      sideNavigationOpen: 'app/sideNavigationOpen',
      sideActivityNavigationOpen: 'app/sideActivityNavigationOpen',
    }),

    vTheme(){
      return this.getComponentVTheme('primary', '', true)
    },

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

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },
  }
}
</script>
