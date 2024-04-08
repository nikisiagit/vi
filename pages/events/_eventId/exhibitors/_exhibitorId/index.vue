<template>
  <!--  <pre>-->
  <!--    {{ event }}-->
  <!--  </pre>-->


  <v-container fluid>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="9" :lg="(sideNavigationOpen || sideActivityNavigationOpen) ? 10: 7" :xl="(sideNavigationOpen || sideActivityNavigationOpen) ? 9: 6">

        <v-sheet elevation="1" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">

          <v-container fluid>

            <v-row >
              <v-col>
                <area-components-mockups-header
                  :media-type="headerExhibitor.mediaType"
                  :video-src="headerExhibitor.videoSrc"
                  :img-src="headerExhibitor.imgSrc"
                  :height="headerExhibitor.height"
                ></area-components-mockups-header>

              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col class="pt-0">
                <area-components-mockups-exhibitor-summary
                  @navigate-to="scrollToComponent"
                ></area-components-mockups-exhibitor-summary>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <area-components-mockups-representatives-list
                  ref="booth-reps"
                  style="scroll-margin-top: 4rem;"
                ></area-components-mockups-representatives-list>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="pt-0">
                <area-components-mockups-exhibitor-tabs
                  @navigate-to="scrollToComponent"
                >

                  <template v-slot:tab-items>
                    <v-row>
                      <v-col>
                        <area-components-mockups-text
                          ref="about"
                          style="scroll-margin-top: 4rem;"
                          :text="text"
                        ></area-components-mockups-text>
                      </v-col>
                    </v-row>

                    <v-row v-if="exhibitorId === 'exhibitor:ivent'">
                      <v-col>
                        <area-components-mockups-content-hub-resources-list
                          ref="resources"
                          style="scroll-margin-top: 4rem;"
                        ></area-components-mockups-content-hub-resources-list>
                      </v-col>
                    </v-row>

                    <v-row v-if="exhibitorId === 'exhibitor:ivent'">
                      <v-col>
                        <area-components-mockups-faqs-list
                          ref="faqs"
                          style="scroll-margin-top: 4rem;"
                        ></area-components-mockups-faqs-list>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <area-components-mockups-meetings
                          ref="book-meeting"
                          style="scroll-margin-top: 4rem;"
                        ></area-components-mockups-meetings>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col>
                        <area-components-mockups-call-action
                          ref="get-demo"
                          style="scroll-margin-top: 4rem;"
                        ></area-components-mockups-call-action>
                      </v-col>
                    </v-row>

                  </template>

                </area-components-mockups-exhibitor-tabs>
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
  name: "exhibitorId",
  layout: 'default-exhibit',
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

    exhibitorId () {
      return this.$route.params.exhibitorId || undefined;
    },

    text(){
      switch (this.exhibitorId) {
        case 'exhibitor:ivent':
          return `
          Partner with the experts in online events. At iVent, we believe that each virtual event requires a dedicated approach. That's why with every event that you host with us, you will be supported from beginning to end by a team of Event Project Managers, Design Consultants, Account Managers and Live Support on the day. Our personalised approach means you can create a custom-built platform complete with your own branding and features, hosting virtual events that reach those who matter.
          `
        case 'exhibitor:noonah':
          return `
          We source globally and develop in-house to provide new, innovative interactive tech. We’ve opened showrooms to demonstrate our technology to clients and, most importantly, we’ve recruited and trained a team filled with awesome people. We might have changed in size, but the values we founded the company with haven’t budged.

          We are innovative, straight talking and honest. We believe in value, service, and attention to detail.
          `
      }
    },

    headerExhibitor(){
      switch (this.exhibitorId) {
        case 'exhibitor:ivent':
          return {
            mediaType: 'video',
            videoSrc: "https://ivent-hq.com/wp-content/uploads/2021/10/IVent-final.mp4",
            imgSrc: "https://ivent-hq.com/wp-content/uploads/2021/12/ivent-still2-optimised.png",
          }
        case 'exhibitor:noonah':
          return {
            mediaType: 'image',
            imgSrc: "https://s3.eu-west-2.amazonaws.com/attendees.luis.ivent-pro.com/demo/noonah.png",
            height: "400px"
          }
        default: return {}
      }
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
