<template>
  <!--  <pre>-->
  <!--    {{ event }}-->
  <!--  </pre>-->


  <v-container fluid :style="styles" class="elevation-2 fill-height image-container wrapper" >

    <v-row justify="center" no-gutters class="fill-height">
      <v-col class="fill-height" cols="12" sm="12" md="9" :lg="(sideNavigationOpen || sideActivityNavigationOpen) ? 12: 9" :xl="(sideNavigationOpen || sideActivityNavigationOpen) ? 9: 6">

        <!-- url: https://magic-show.daily.co/eventheads-demo / name: eventheads-demo-->
        <v-sheet width="100%" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'" height="100%">

          <v-container fluid>


            <v-row  >
              <v-col>

                <!--                  daily video call-->
                <v-sheet rounded="lg"
                        height="710px" class="ma-auto " style="position: relative">

                  <daily-call-frame
                    :status="status"
                    :url="'https://magic-show.daily.co/demo-1'"
                    :roomName="'demo-1'"
                    @change-status-call="changeStatusCall"
                  />

                  <v-overlay
                    v-if="status === 'home'"
                    absolute
                    overlay
                    opacity="0.9"
                  >
                    <v-card co rounded="lg" height="300">
                      <v-card-title>
                        What are the biggest challenges in hosting events? 🤔
                      </v-card-title>
                      <v-card-subtitle>
                        Created by Organiser
                      </v-card-subtitle>
                      <v-card-text class="text-center mt-14">
                        Networking session ended.

                        <v-spacer></v-spacer>
                        <v-btn rounded class="mt-4" @click="back">
                          <v-icon left>mdi-arrow-left</v-icon>
                          Back to Networking
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-overlay>

                </v-sheet>
                <!--                  daily video call-->


              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <area-components-mockups-networking-summary
                ></area-components-mockups-networking-summary>
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
  name: "NetworkingId",
  mixins: [colors],

  async created () {
    // if (this.initialised) {
    if (! this.loaded && ! this.loading) {
      return await this.load();
    }
    // }
  },

  data(){
    return {
      status: "reception", // status of the call can be: ["home", "call"]
      room: {
        name: '', // name of the room in order to generate user token. "As owner of the room"
        url: '', // url of the room to join.
      }
    }
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
    }),

    back(){
      this.$router.push({
        name: 'events-eventId-networking',
        params: { eventId: this.eventId}
      })
    },

    changeStatusCall(status){
      this.status = status
    },

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

    styles(){
      return {
        // backgroundImage: `url(${this.venue?.backgroundImage})`,
        backgroundImage: `url(https://techstory.in/wp-content/uploads/2017/08/Hosting-An-Unforgettable-Marketing-Event.jpeg)`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        position: 'relative',
      }
    },

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

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
