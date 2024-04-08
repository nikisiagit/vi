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
                 :date-day="'4'"
                 :date-month="'OCT'"
                 :time-start="'3:30 PM'"
                 :time-end="'4:30 PM'"
                 :host-name="'Leonor Bridges'"
                 :title="'Applying to university: supporting your child\'s UCAS application'"
                 :event-type="'Virtual'"
                 :members="[
                   {
                     src: 'https://silicon.createx.studio/assets/img/team/24.jpg'
                   },
                   {
                     src: 'https://silicon.createx.studio/assets/img/team/27.jpg'
                   },
                   {
                     src: 'https://silicon.createx.studio/assets/img/team/28.jpg'
                   },
                 ]"
               />
             </v-col>
           </v-row>

           <v-row>
             <v-col>
               <!-- vimeo - video: https://player.vimeo.com/video/766824796?h=8d1e813c03 -->
               <!-- youtube - video: https://www.youtube.com/embed/EmI-iUadHOs -->
               <!-- image: https://blogs.bath.ac.uk/students/wp-content/uploads/sites/81/2018/12/29569-0207.t5ad9ceaf.m1200.xKFx5Kxw8-002.jpg-->
               <area-components-mockups-header
                 media-type="video"
                 video-embed
                 video-src="https://www.youtube.com/embed/i6fNfC1mSwI"
               ></area-components-mockups-header>
             </v-col>
           </v-row>

           <v-row>
             <v-col>
               <area-components-mockups-text
                 :text="`This session will provide an overview of the university application process for parents of students looking to apply for 2023 entry. It will provide advice on how to support your child throughout their application and guidance on applying for competitive courses.

                  You will hear from our Admissions & Outreach team and will be able to ask them any questions you have.

                  While this session will be beneficial if your child is considering applying to Bath, we hope it will be relevant to everyone.
                  `"
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
  name: "Lobby-2",
  layout: "default-uni",
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
