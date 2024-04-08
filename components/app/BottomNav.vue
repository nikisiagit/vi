<template>
  <div>
    <!-- bottom sheet -->
    <v-bottom-sheet
      :fullscreen="isFullscreen"
      overlay-color="transparent"
      content-class="elevation-14 mb-13"
      transition="slide-y-reverse-transition"
      v-model="sheetMenu"
      v-if="$vuetify.breakpoint.mobile"
    >
      <v-card height="400px" flat width="100%">
        <template  v-if="type === 'search'" >
          <app-search></app-search>
        </template>

        <v-toolbar flat v-else>
          <template v-if="type === 'event-nav'">
            <v-icon left>mdi-compass</v-icon>
            <v-toolbar-title>{{ $t('explore-event')}}</v-toolbar-title>
          </template>

          <template  v-if="type === 'event-activities'">
            <v-icon left>mdi-shape</v-icon>
            <v-toolbar-title>{{ $t('event-activities')}}</v-toolbar-title>
          </template>

          <template  v-if="type === 'support'">
            <v-icon left>mdi-lifebuoy</v-icon>
            <v-toolbar-title>{{ $t('support')}}</v-toolbar-title>
          </template>

        </v-toolbar>

      </v-card>


    </v-bottom-sheet>
    <!-- /bottom sheet -->

    <!-- bottom navigation    style="z-index: 999"  -->
    <v-bottom-navigation app grow fixed
                         v-if="$vuetify.breakpoint.mobile"
                         color="primary"

                         >
      <v-btn v-show="showEvent" icon @click.native="toggleMenu('event-nav')">
        <!--        <span>Explore Event</span>-->
        <v-icon>mdi-compass</v-icon>
      </v-btn>

      <v-btn v-show="showSearch" icon @click.native="toggleMenu('search')">
        <!--        <span>Search</span>-->
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn v-show="showSupport" icon @click.native="toggleMenu('support')">
        <!--        <span>Support</span>-->
        <v-icon>mdi-lifebuoy</v-icon>
      </v-btn>
      <v-btn v-show="showEvent" icon @click.native="toggleMenu('event-activities')">
        <!--        <span>Event Activities</span>-->
        <v-icon>mdi-shape</v-icon>
      </v-btn>

    </v-bottom-navigation>
    <!-- /bottom navigation -->
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {},
  data () {
    return {
      // show the event list button (s)
      showEvent: false,

      // show the search list button (s)
      showSearch: true,

      // show the support list button (s)
      showSupport: true,

      sheetMenu: false,

      isFullscreen: false,
      type: ''
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    },

  },

  watch: {
    routeName: {
      immediate: true,
      handler(routeName){
        // When user is inside the Event show Event Navigation.
        this.showEvent = routeName === 'events-eventId'
      }
    },
  },

  created() {
    /**
     * Open menu when navigating between layouts. (home -> admin)
     */
    this.$nextTick(() => {
      if (this.checkHasMenu()) {
        this.sheetMenu = true
      }
    })
  },
  methods: {

    /**
     * Since $slots doesn't have reactivity we cannot use computed property - Just a method that can be called within
     * the template or just the $slots['menu'] inside the template.
     *
     * @returns {VNode[]}
     */
    checkHasMenu(){
      return this.$slots['menu']
    },
    toggleMenu(type){
      if (this.type !== type || ! this.type) {
        this.sheetMenu = true
        this.type = type
      } else {
        this.sheetMenu = false
        this.type = ''
      }

      this.isFullscreen = type === 'event-activities'
    },
    closeMenu(){
      this.type = ''
      this.sheetMenu = false
      this.isFullscreen = false
    }
  }
}
</script>
