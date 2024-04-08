<template>
<!--  <pre>-->
<!--    {{ event }}-->
<!--  </pre>-->


  <v-container fluid>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="9" :lg="(sideNavigationOpen || sideActivityNavigationOpen) ? 10: 7" :xl="(sideNavigationOpen || sideActivityNavigationOpen) ? 9: 6">

        <v-sheet elevation="1" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">

         <v-container fluid>

           <v-row>
             <v-col>
               <area-components-mockups-schedule-list

               ></area-components-mockups-schedule-list>
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
  name: "Schedule",
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
