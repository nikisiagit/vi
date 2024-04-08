<!--
Default Layout
-->
<template>
  <v-app app>
    <!-- App side navigation -->
    <template v-if="! $vuetify.breakpoint.mobile">
      <!-- current product/mvp version -->
      <app-side-navigation :logo="isUniProDemo ? 'https://s3.eu-west-2.amazonaws.com/attendees.luis.ivent-pro.com/demo/uni-logo.png': null"/>


      <app-side-activity-panel v-if="$route.name.split('-')[0] === 'events' && $route.name !== 'events-eventId'"/>


      <app-side-temporary-panel />


      <!-- Magics WIP :) -->
<!--      <app-side-nav/>-->
    </template>
    <!-- /app side drawer -->

    <!-- main -->
    <!-- @todo https://5-guys.atlassian.net/browse/PRK-136 -->
<!--            class="background"-->
    <v-main :style="styles">

<!--      <v-alert>{{ $partition }}</v-alert>-->

      <Nuxt />
    </v-main>
    <!-- /main -->

    <!-- bottom navigation -->
    <template v-if="$vuetify.breakpoint.mobile">
      <!-- current product/mvp version -->
      <app-bottom-navigation />
      <!-- Magics WIP :) -->
<!--      <app-bottom-nav />-->
    </template>
    <!-- /bottom navigation -->
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'default',

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  data: ()  => ({}),
  mounted(){
    this.closeSideNavigation()

    this.cleanLastNavigationOpened()
  },
  // watch: {
  //   '$route.name': {
  //     immediate: true,
  //     handler(){
  //       if (this.isUniProDemo) {
  //         this.$nextTick(() => {
  //           this.$vuetify.theme.themes.light.primary = '#22234E'
  //           this.$vuetify.theme.themes.dark.primary = '#22234E'
  //         })
  //
  //       } else {
  //         this.$nextTick(() => {
  //           this.$vuetify.theme.themes.light.primary = '#79D3CA'
  //           this.$vuetify.theme.themes.dark.primary = '#79D3CA'
  //         })
  //       }
  //     }
  //   }
  // },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'venue/load',
      logout: 'auth/logout',

      closeSideNavigation: 'app/closeSideNavigation',

      cleanLastNavigationOpened: 'app/cleanLastNavigationOpened'
    }),
  },

  computed: {
    ...mapGetters({
      venue: 'venue/venue',
      loading: 'venue/loading',
      loaded: 'venue/loaded',
      user: 'auth/user',
      me: 'me/me',
    }),

    qParameters(){
      return this.$route.query
    },

    isUniProDemo(){
      return this.qParameters['d'] && this.qParameters['d'] === 'uni'
    },

    styles () {
      if ( this.$route.name === 'index' ) {
        return {
          // backgroundImage: `url(https://dynamicmedia.livenationinternational.com/Media/m/h/l/3aa789a8-4de2-44e5-b684-e7101d52ebca.jpg)`,
          // backgroundImage: `url(https://unsplash.com/photos/A59lWOrZVnw)`,
          // backgroundImage: `url(https://picsum.photos/1920/1080?random)`,
          // backgroundImage: `url(https://images.unsplash.com/photo-1509557965875-b88c97052f0e?ixlib=rb-1.2.1&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)`,
          // backgroundPosition: 'center center',
          // backgroundSize: 'cover',
          // backgroundAttachment: 'fixed',
          // backgroundColor: 'background',
          backgroundColor: `var(--v-primary-base)`,
          background: `linear-gradient(to right top,  rgba(0,0,0,.1), rgba(0,0,0,.5)), url(${this.isUniProDemo ? 'https://media.licdn.cn/dms/image/C561BAQH2DBJT5H8_-Q/company-background_10000/0/1574774679182?e=2159024400&v=beta&t=eRiAe75z7420RZ9pVasew3l9GKoiegOVidVlmttcvp4': 'https://s3.eu-west-2.amazonaws.com/attendees.luis.ivent-pro.com/demo/iVent+Pro+background.png'}) no-repeat center center fixed`,
          backgroundSize: 'cover',
          height: '100%'
        }
      }

      return {
        // backgroundImage: `url(https://dynamicmedia.livenationinternational.com/Media/m/h/l/3aa789a8-4de2-44e5-b684-e7101d52ebca.jpg)`,
        // backgroundImage: `url(https://unsplash.com/photos/A59lWOrZVnw)`,
        // backgroundImage: `url(https://picsum.photos/1920/1080?random)`,
        // backgroundImage: `url(https://images.unsplash.com/photo-1509557965875-b88c97052f0e?ixlib=rb-1.2.1&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)`,
        // backgroundPosition: 'center center',
        // backgroundSize: 'cover',
        // backgroundAttachment: 'fixed',
        // backgroundColor: 'background',
        backgroundColor: `var(--v-primary-base)`
      }
    },

    /**
     * Return the name of the Venue.
     *
     * @return {*|undefined}
     */
    name() {
      return (this.venue) ? this.venue.name : undefined;
    },

    title () {
      return (this.venue) ? this.venue.title : undefined;
    }
  }
}
</script>
