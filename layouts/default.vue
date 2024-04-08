<!--
[PRO-157] Venue App - Layout

@link  https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-157
-->
<template>
  <v-app app>

    <!-- update venue object with logo/icon -->
    <!-- top navigation - mobile only -->
    <app-top-nav-bar v-if="$vuetify.breakpoint.mobile"></app-top-nav-bar>


      <!-- left -->
    <!-- venue avatar - fallback to mdi-home icon -->

    <app-side-navigation v-if="! $vuetify.breakpoint.mobile"/>
    <!-- venue logo/icon - fallback to mdi-home -->

      <!-- right -->
    <app-side-activity-panel v-if="! $vuetify.breakpoint.mobile && showActivityPanel"/>

      <!-- support -->
      <!-- search -->
    <!-- /top navigation -->

    <!-- left (main) navigation - desktop only -->
      <!-- top -->
      <!-- venue avatar - fallback to mdi-home icon -->
      <!-- context -->
      <!-- support -->
      <!-- search -->

      <!-- spacer -->

      <!-- bottom -->
      <!-- admin -->
      <!-- me notifications, chat etc -->
      <!-- auth (sign-in)/me (avatar) -->
    <!-- /left navigation -->

    <!-- left navigation sub (slide out) menu -->
    <!-- hide/show based on nav -->

    <!-- /left navigation sub (slide out)menu -->

    <!-- main -->
    <!-- styles could contain properties to change the background color and/or image -->
    <v-main>
      <app-background>

<!--        <v-container>-->
<!--          <v-row>-->
<!--            <v-col>-->
<!--&lt;!&ndash;              <h1 class="white&#45;&#45;text"> {{ $t('label:eventheads:venue:eventheads:title') }}</h1>&ndash;&gt;-->

<!--&lt;!&ndash;              <nuxt-link  class="white&#45;&#45;text" :to="{ name: 'events-eventId', params: { eventId: 1 }}">Go to Event (Event-1)</nuxt-link>&ndash;&gt;-->

<!--              <br>-->
<!--              <br>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-container>-->

        <Nuxt />
      </app-background>
    </v-main>

    <!-- left activities - mobile only contextual - ignore this for now-->
      <!-- @todo -->
    <!-- /left navigation -->

    <!-- bottom navigation - mobile only -->
      <app-bottom-nav v-if="$vuetify.breakpoint.mobile"/>
      <!-- me/user avatar -->
      <!-- me/user notifications -->
      <!-- me/user chat -->
      <!-- me/user admin -->
    <!-- /bottom navigation -->

  </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Default",
  data(){
    return {
      showActivityPanel: false,

    }

  },

  // watch: {
  //   routeName: {
  //     immediate: true,
  //     handler(routeName){
  //       // When user is inside the Event show Event Navigation.
  //       this.showActivityPanel = routeName === 'events-eventId' || routeName === 'rooms-roomId'
  //     }
  //   }
  //
  // },

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'venue/load',
    }),
  },

  computed: {
    ...mapGetters({
      initialised: 'venue/initialised',
      loading: 'venue/loading',
      loaded: 'venue/loaded',
      venue: 'venue/venue',
    }),

    routeName () {
      return this.$route.name
    },
  },
}
</script>

