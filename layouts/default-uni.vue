<!--
Default Layout
-->
<template>
  <v-app app>
    <!-- App side navigation -->
    <template v-if="! $vuetify.breakpoint.mobile">
      <!-- current product/mvp version -->
      <app-side-navigation logo="data:image/jpeg;base64,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"/>


      <app-side-activity-panel />

      <app-side-temporary-panel />

      <!-- Magics WIP :) -->
<!--      <app-side-nav/>-->
    </template>
    <!-- /app side drawer -->

    <!-- main -->
    <!-- @todo https://5-guys.atlassian.net/browse/PRK-136 -->
<!--            class="background"-->
    <v-main :style="styles">
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
  name: 'default-uni',

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  data: ()  => ({}),
  mounted(){
    // change theme to University Lobby
    this.$nextTick(() => {
      this.$vuetify.theme.themes.light.primary = '#29B37D'
      this.$vuetify.theme.themes.dark.primary = '#29B37D'

      this.closeSideNavigation()

      this.cleanLastNavigationOpened()
    })
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

        background: 'url('+ require('~/assets/bath-bg.jpg') + ') no-repeat center center fixed',
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
