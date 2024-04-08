<!--
Default Layout
-->
<template>
  <v-app app>
    <!-- App side navigation -->
    <template v-if="! $vuetify.breakpoint.mobile">
      <!-- current product/mvp version -->
      <app-side-navigation />


      <app-side-activity-panel layout="exhibit" />

      <app-side-temporary-panel />

      <!-- Magics WIP :) -->
<!--      <app-side-nav/>-->
    </template>
    <!-- /app side drawer -->

    <!-- main -->
    <!-- @todo https://5-guys.atlassian.net/browse/PRK-136 -->
<!--            class="background"-->

    <video-background
      v-if="exhibitorId === 'exhibitor:noonah'"
      src="https://noonah.com/wp-content/uploads/2021/08/Desktop_Showreel_Compressed.mp4"
      style=" height: 100vh; "
    >
      <v-responsive max-height="100vh" class="overflow-y-auto">
        <v-main >
          <Nuxt />
        </v-main>

      </v-responsive>

    </video-background>

    <v-main :style="styles" v-else>
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
  name: 'default-exhibit',

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  data: ()  => ({}),
  mounted(){
    if (this.$route.params?.exhibitorId === 'exhibitor:ivent') {
      // change theme to Exhibit
      this.$nextTick(() => {
        this.$vuetify.theme.themes.light.primary = '#AAB6EB'
        this.$vuetify.theme.themes.dark.primary = '#AAB6EB'
      })
    } else if (this.$route.params?.exhibitorId === 'exhibitor:noonah') {
      this.$nextTick(() => {
        this.$vuetify.theme.themes.light.primary = '#3a3939'
        this.$vuetify.theme.themes.dark.primary = '#3a3939'
      })
    }


    this.closeSideNavigation()

    this.cleanLastNavigationOpened()
  },

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

    exhibitorId () {
      return this.$route.params.exhibitorId || undefined;
    },

    styles () {
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

        // https://ivent-hq.com/wp-content/uploads/2021/06/image-hero-homepage@2x.jpg
        background: 'url(https://ivent-hq.com/wp-content/themes/iVent/images/image-eventFormat@2x.jpg) no-repeat center center fixed',
        backgroundSize: 'cover',
        height: '100%',
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
