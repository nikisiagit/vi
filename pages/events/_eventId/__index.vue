<!--
Event/Index Page - Also called Marketing/Landing page

This is still a WIP!
-->

<template>
<!--  <pre>-->
<!--    {{ event }}-->
<!--  </pre>-->

  <div>
<!--      <pre>-->
<!--        {{ event }}-->
<!--      </pre>-->
<!--    <div>-->
<!--      {{ landingAreaId }}-->
<!--    </div>-->
    <area-container v-if="landingAreaId" :area-id="landingAreaId"/>


    <v-container v-else fluid>
      <v-row justify="center" no-gutters>
        <v-col cols="12" sm="12" md="9" :lg="(sideNavigationOpen || sideActivityNavigationOpen) ? 10: 7" :xl="(sideNavigationOpen || sideActivityNavigationOpen) ? 9: 6" >

          <!-- for a lobby with a backgroundImage as area instead of backgroundColour -->
          <!--        <v-card class="glass-effect" :color="vTheme.color" style="border-radius: 20px">-->
          <!--          <v-card-title></v-card-title>-->
          <!--          <v-card-text></v-card-text>-->
          <!--        </v-card>-->

          <v-sheet elevation="1" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">

            <v-container fluid>
              <v-row>
                <v-col>
               <pre>
                 {{ event }}
               </pre>
                </v-col>
              </v-row>
              <v-row>
                <v-col align="center">
                  <area-components-mockups-header></area-components-mockups-header>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col>
                  <area-components-mockups-event-details
                    @navigate-to="scrollToComponent"
                  ></area-components-mockups-event-details>
                </v-col>
              </v-row>

              <v-row v-if="event && event.startDateTime">
                <v-col align="center">
                  <area-components-mockups-countdown
                    :date="event && event.startDateTime ? new Date(event.startDateTime): null"
                  ></area-components-mockups-countdown>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="pt-0">
                  <area-components-mockups-event-tabs
                    @navigate-to="scrollToComponent"
                  >

                    <template v-slot:tab-items>
                      <v-row>
                        <v-col>
                          <area-components-mockups-text
                            ref="about"
                            style="scroll-margin-top: 4rem;"
                            :text="`What you might have missed: at our launch event, EventHeads Matt Franks from Noonah and Gavin Newman at iVent provided precious insights into today's engagement and gamification landscape and suggested how you can remove friction from your attendee experience in order to better market, sell and delight your virtual or hybrid audience.`"
                          ></area-components-mockups-text>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col class="pt-0">
                          <area-components-mockups-sponsors-list
                            ref="sponsors-list"
                            style="scroll-margin-top: 4rem;"
                          ></area-components-mockups-sponsors-list>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col class="pt-0">
                          <area-components-mockups-schedule-list
                            ref="schedule-list"
                            style="scroll-margin-top: 4rem;"
                          ></area-components-mockups-schedule-list>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col class="pt-0">
                          <area-components-mockups-speakers-list
                            ref="speakers-list"
                            style="scroll-margin-top: 4rem;"
                          ></area-components-mockups-speakers-list>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col class="pt-0">
                          <area-components-mockups-exhibitors-list
                            ref="exhibitors-list"
                            style="scroll-margin-top: 4rem;"
                          ></area-components-mockups-exhibitors-list>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col class="pt-0">
                          <area-components-mockups-registration-tickets
                            ref="registration-ticket"
                            style="scroll-margin-top: 4rem;"
                          ></area-components-mockups-registration-tickets>
                        </v-col>
                      </v-row>
                    </template>

                  </area-components-mockups-event-tabs>
                </v-col>
              </v-row>


            </v-container>

          </v-sheet>


        </v-col>
      </v-row>
    </v-container>
  </div>




<!--  <div class="d-flex flex-column justify-space-between align-center">-->



<!--  </div>-->

<!--  <v-container fluid v-if="false">-->
<!--    -->
<!--    -->
<!--    -->
<!--    <v-row justify="space-around" no-gutters>-->
<!--      <v-col lg="auto" class=" green" cols="12">-->

<!--        <v-sheet color="primary darken-4 " width="300">-->
<!--          <v-img-->
<!--            lazy-src="https://eventheads.ivent-hq.com/hubfs/The%20Engagement%20value%20of%20Gamification.png"-->
<!--            src="https://eventheads.ivent-hq.com/hubfs/The%20Engagement%20value%20of%20Gamification.png"-->


<!--            aspect-ratio="1.8"-->
<!--            contain-->
<!--            width="300"-->

<!--          >-->
<!--          </v-img>-->
<!--        </v-sheet>-->

<!--      </v-col>-->
<!--    </v-row>-->

<!--    <v-row justify="space-around" class="mt-6" no-gutters>-->
<!--      <v-col lg="5" cols="12" class="green ">-->
<!--        <v-card>-->
<!--          <v-card-text>-->
<!--            about-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--  </v-container>-->

<!--  <v-img  width="600"  :aspect-ratio="16/9" src="https://eventheads.ivent-hq.com/hubfs/The%20Engagement%20value%20of%20Gamification.png" />-->

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import colors from "~/mixins/colors";
import dayjs from "dayjs";

export default {
  name: "EventMarketing",
  mixins: [colors],

  asyncData({ $venueConfig, route }){
    return {
      landingAreaId: `area:${$venueConfig.partition}:${route.params.eventId}:landing`
    }
  },
  async created () {
    // if (this.initialised) {
    //   if (! this.loaded && ! this.loading) {
    //     return await this.load();
    //   }
    // }
  },

  watch: {
    primaryColourTheme: {
      immediate: true,
      handler(){
        // alert(this.primaryColourTheme)
        // change theme to the Event theme
        this.$nextTick(() => {
          //@todo: UniPro stuff
          if (! this.isUniProDemo) {
            this.$vuetify.theme.themes.light.primary = this.primaryColourTheme
            this.$vuetify.theme.themes.dark.primary = this.primaryColourTheme
          }

        })
      }
    }
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
    }),

    async load() {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    formatDate(date) {
      return dayjs(date).format("DD/MM/YYYY hh:mm");
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
      // eventWithEventId: 'apps/admin/events/eventWithEventId',
      eventWithEventId: 'events/eventWithEventId',
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

    qParameters(){
      return this.$route.query
    },

    isUniProDemo(){
      return this.qParameters['d'] && this.qParameters['d'] === 'uni'
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

    theme() {
      return (this.event) ? this.event?.theme : undefined;
    },

    primaryColourTheme() {
      return (this.event) ? this.event?.theme?.light?.primary : undefined;
    },

  }
}
</script>
