<!--
Event/Index Page - Also called Marketing/Landing page

This is still a WIP!
-->

<template>

  <v-container fluid>

    <!--    <v-row>-->
    <!--      <v-col>-->
    <!--          <pre>-->
    <!--            {{ events }}-->
    <!--          </pre>-->
    <!--      </v-col>-->
    <!--    </v-row>-->

    <v-row>
      <v-col>

        <!--
        Venue App - EventsList

        The app is nested inside a "glass" container.
        -->
        <v-sheet width="100%"
                 height="100%"
                 elevation="1"
                 rounded="lg"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
          <v-container fluid class="fill-height">

            <v-row>
              <v-col>
                <v-list class="pa-0" color="transparent" rounded>
                  <event-list-item v-for="(event, index) in events"
                                   :event-id="event.eventId"
                                   :key="event.eventId"
                                   :class="{'mb-4': events.length -1 !== index}"
                  />
                </v-list>

              </v-col>
            </v-row>

          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

<!--  <div>-->
<!--&lt;!&ndash;      <pre>&ndash;&gt;-->
<!--&lt;!&ndash;        {{ event }}&ndash;&gt;-->
<!--&lt;!&ndash;      </pre>&ndash;&gt;-->
<!--&lt;!&ndash;    <div>&ndash;&gt;-->
<!--&lt;!&ndash;      {{ landingAreaId }}&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--    <area-container v-if="landingAreaId" :area-id="landingAreaId"/>-->


<!--    <v-container v-else fluid>-->
<!--      <v-row justify="center" no-gutters>-->
<!--        <v-col cols="12" sm="12" md="9" :lg="(sideNavigationOpen || sideActivityNavigationOpen) ? 10: 7" :xl="(sideNavigationOpen || sideActivityNavigationOpen) ? 9: 6" >-->

<!--          &lt;!&ndash; for a lobby with a backgroundImage as area instead of backgroundColour &ndash;&gt;-->
<!--          &lt;!&ndash;        <v-card class="glass-effect" :color="vTheme.color" style="border-radius: 20px">&ndash;&gt;-->
<!--          &lt;!&ndash;          <v-card-title></v-card-title>&ndash;&gt;-->
<!--          &lt;!&ndash;          <v-card-text></v-card-text>&ndash;&gt;-->
<!--          &lt;!&ndash;        </v-card>&ndash;&gt;-->

<!--          <v-sheet elevation="1" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">-->

<!--            <v-container fluid>-->
<!--              <v-row>-->
<!--                <v-col>-->
<!--               <pre>-->
<!--                 {{ event }}-->
<!--               </pre>-->
<!--                </v-col>-->
<!--              </v-row>-->
<!--              <v-row>-->
<!--                <v-col align="center">-->
<!--                  <area-components-mockups-header></area-components-mockups-header>-->
<!--                </v-col>-->
<!--              </v-row>-->

<!--              <v-row no-gutters>-->
<!--                <v-col>-->
<!--                  <area-components-mockups-event-details-->
<!--                    @navigate-to="scrollToComponent"-->
<!--                  ></area-components-mockups-event-details>-->
<!--                </v-col>-->
<!--              </v-row>-->

<!--              <v-row v-if="event && event.startDateTime">-->
<!--                <v-col align="center">-->
<!--                  <area-components-mockups-countdown-->
<!--                    :date="event && event.startDateTime ? new Date(event.startDateTime): null"-->
<!--                  ></area-components-mockups-countdown>-->
<!--                </v-col>-->
<!--              </v-row>-->

<!--              <v-row>-->
<!--                <v-col class="pt-0">-->
<!--                  <area-components-mockups-event-tabs-->
<!--                    @navigate-to="scrollToComponent"-->
<!--                  >-->

<!--                    <template v-slot:tab-items>-->
<!--                      <v-row>-->
<!--                        <v-col>-->
<!--                          <area-components-mockups-text-->
<!--                            ref="about"-->
<!--                            style="scroll-margin-top: 4rem;"-->
<!--                            :text="`What you might have missed: at our launch event, EventHeads Matt Franks from Noonah and Gavin Newman at iVent provided precious insights into today's engagement and gamification landscape and suggested how you can remove friction from your attendee experience in order to better market, sell and delight your virtual or hybrid audience.`"-->
<!--                          ></area-components-mockups-text>-->
<!--                        </v-col>-->
<!--                      </v-row>-->

<!--                      <v-row>-->
<!--                        <v-col class="pt-0">-->
<!--                          <area-components-mockups-sponsors-list-->
<!--                            ref="sponsors-list"-->
<!--                            style="scroll-margin-top: 4rem;"-->
<!--                          ></area-components-mockups-sponsors-list>-->
<!--                        </v-col>-->
<!--                      </v-row>-->

<!--                      <v-row>-->
<!--                        <v-col class="pt-0">-->
<!--                          <area-components-mockups-schedule-list-->
<!--                            ref="schedule-list"-->
<!--                            style="scroll-margin-top: 4rem;"-->
<!--                          ></area-components-mockups-schedule-list>-->
<!--                        </v-col>-->
<!--                      </v-row>-->

<!--                      <v-row>-->
<!--                        <v-col class="pt-0">-->
<!--                          <area-components-mockups-speakers-list-->
<!--                            ref="speakers-list"-->
<!--                            style="scroll-margin-top: 4rem;"-->
<!--                          ></area-components-mockups-speakers-list>-->
<!--                        </v-col>-->
<!--                      </v-row>-->

<!--                      <v-row>-->
<!--                        <v-col class="pt-0">-->
<!--                          <area-components-mockups-exhibitors-list-->
<!--                            ref="exhibitors-list"-->
<!--                            style="scroll-margin-top: 4rem;"-->
<!--                          ></area-components-mockups-exhibitors-list>-->
<!--                        </v-col>-->
<!--                      </v-row>-->

<!--                      <v-row>-->
<!--                        <v-col class="pt-0">-->
<!--                          <area-components-mockups-registration-tickets-->
<!--                            ref="registration-ticket"-->
<!--                            style="scroll-margin-top: 4rem;"-->
<!--                          ></area-components-mockups-registration-tickets>-->
<!--                        </v-col>-->
<!--                      </v-row>-->
<!--                    </template>-->

<!--                  </area-components-mockups-event-tabs>-->
<!--                </v-col>-->
<!--              </v-row>-->


<!--            </v-container>-->

<!--          </v-sheet>-->


<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-container>-->
<!--  </div>-->

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import dayjs from "dayjs";

export default {
  name: "Events",
  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
         await this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'events/load',
    }),

    formatDate(date) {
      return dayjs(date).format("DD/MM/YYYY hh:mm");
    },

  },

  computed: {
    ...mapGetters({
      initialised: 'events/initialised',
      loading: 'events/loading',
      loaded: 'events/loaded',
      events: 'events/events'
    }),

  }
}
</script>
