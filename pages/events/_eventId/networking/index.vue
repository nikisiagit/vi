<template>
  <!--  <pre>-->
  <!--    {{ event }}-->
  <!--  </pre>-->

  <v-container fluid>
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="9" :lg="(sideNavigationOpen || sideActivityNavigationOpen) ? 10: 7" :xl="(sideNavigationOpen || sideActivityNavigationOpen) ? 9: 6">

        <v-sheet elevation="1" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">

          <v-container fluid>
            <v-row no-gutters>
              <v-col>
                <!-- area name-label OR this could be a heading component that can use a label -->
                <area-components-mockups-heading
                  title="Networking"
                  subtitle="Find and join topical discussions in available networking circles or create your own"
                  button="Create Circle"
                ></area-components-mockups-heading>
                <!-- /area name-label-->
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col>
                <area-components-mockups-networking-rooms-list
                  :show-label="false"
                ></area-components-mockups-networking-rooms-list>
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
  name: "Networking",
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
