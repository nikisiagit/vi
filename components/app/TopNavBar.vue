<!--
Top Navigation Bar / Header. (IT JUST DISPLAYS WHEN LAYOUT IS MOBILE)

This smart component handles the Venue App Navigation in a top bar for mobile devices.

-->
<template>

  <v-app-bar clipped-left fixed app>

    <!-- app icon -->
    <template v-show="showHome" >

      <!-- home -->
      <!-- take the user to the actual home page -->
     <app-venue-logo></app-venue-logo>

    </template>
    <!-- /app icon -->


    <template>
<!--      &lt;!&ndash; support &ndash;&gt;-->
<!--      <v-btn v-show="showSupport" icon>-->
<!--        <v-icon>mdi-lifebuoy</v-icon>-->
<!--      </v-btn>-->
<!--      &lt;!&ndash; /support &ndash;&gt;-->

      <v-divider vertical class="pl-1" />
      <!-- admin -->
      <v-btn v-show="showAdmin" icon :plain="$route.name.includes('apps-admin')" :to="{name: 'apps-admin'}" :color="$route.name.includes('apps-admin') ? 'primary': null">
        <v-icon>mdi-shield-account</v-icon>
      </v-btn>
      <!--/ admin -->

      <v-spacer />

      <!-- me-schedule -->
      <v-btn v-show="showMeSchedule" icon @click.native="toggleMenu('calendar')" :color="isCalendarActive ? 'primary':null" class="btn-top-bar">
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
      <!-- /me-schedule -->

      <!-- me-notifications -->
      <v-btn v-show="showMeNotifications" icon @click.native="toggleMenu('notifications')" :color="isNotificationActive ? 'primary':null" class="btn-top-bar">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <!-- /me-notifications -->

      <!-- me-chats -->
      <v-btn v-show="showMeChats" icon @click.native="toggleMenu('chat')" :color="isChatActive ? 'primary':null" class="btn-top-bar">
        <v-icon>mdi-message</v-icon>
      </v-btn>
      <!-- /me-chats -->

      <!-- me avatar -->
      <v-btn icon v-if="user" @click.native="toggleMenu('me')" :color="isMeActive ? 'primary':null" class="btn-top-bar">
        <v-icon>mdi-account-circle</v-icon>
        <!--          <me-avatar size="xs" />-->
      </v-btn>
      <!-- /me avatar -->

      <!-- sign in -->
      <v-btn icon v-else @click.native="toggleMenu('auth')" :color="isAuthActive ? 'primary':null" class="btn-top-bar">
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <!-- / sign in -->

    </template>


    <v-menu
      v-model="isMenuOpen"
      :close-on-content-click="false"
      :close-on-click="false"
      min-width="100%"
      offset-x
      position-y="56"
      transition="slide-y-transition"
      allow-overflow
    >

      <!-- the me agenda -->
      <v-card :height="isFullscreen ? '90vh': '50vh'" v-if="menu === 'calendar'" key="calendar">
        <v-card-title>
          <v-icon left>mdi-calendar</v-icon>
          {{ $t('my-schedule') }}
        </v-card-title>
        <v-divider></v-divider>
      </v-card>

      <!-- the me agenda -->
      <v-card :height="isFullscreen ? '90vh': '50vh'" v-if="menu === 'chat'" key="chat">
        <v-card-title>
          <v-icon left>mdi-message</v-icon>
          {{ $t('my-chats') }}
        </v-card-title>
        <v-divider></v-divider>
      </v-card>

      <!-- the me notifications -->
      <v-card :height="isFullscreen ? '90vh': '50vh'" v-if="menu === 'notifications'" key="notifications">
        <v-card-title>
          <v-icon left>mdi-bell</v-icon>
          {{ $t('my-notifications') }}
        </v-card-title>
        <v-divider></v-divider>
      </v-card>

      <!-- the auth -->
      <auth-container class="fill-height" v-if="menu === 'auth' && ! user" key="auth"></auth-container>

      <!-- the me  -->
      <me-details v-if="menu === 'me' && user" key="me" class="fill-height" />

<!--      &lt;!&ndash; the auth &ndash;&gt;-->
<!--      <v-card :height="isFullscreen ? '90vh': '50vh'" v-if="menu === 'auth'" key="auth">-->
<!--        <v-card-title>-->
<!--          <v-icon left>mdi-bell</v-icon>-->
<!--          {{ $t('my-notifications') }}-->
<!--        </v-card-title>-->
<!--        <v-divider></v-divider>-->
<!--      </v-card>-->

    </v-menu>

  </v-app-bar>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TopNavBar",

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    isAuthenticated: {
      immediate: true,
      handler(isAuthenticated){
        this.showMeSchedule = isAuthenticated === true
        this.showMeNotifications = isAuthenticated === true
        this.showMeChats = isAuthenticated === true

      }
    },


    isAdmin: {
      immediate: true,
      handler(isAdmin){
        //@todo: check user is an Admin
        this.showAdmin = isAdmin === true

      }

    }

  },

  methods: {
    ...mapActions({
      load: 'venue/load',
    }),

    toggleMenu(type){
      if (this.menu !== type || ! this.menu) {
        this.isMenuOpen = true
        this.menu = type
      } else {
        this.isMenuOpen = false
        this.menu = ''
      }

      this.isFullscreen = type === 'chat' || type === 'auth' || type === 'me'
    },
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      user: 'auth/user',
      signedOut: 'auth/signedOut',
      signedIn: 'auth/signedIn',

      venue: 'venue/venue',
      loading: 'venue/loading',
      loaded: 'venue/loaded',
    }),

    isAdmin(){
      return this.me?.isAdmin
    },

    isAuthenticated(){
      return this.user?.hasOwnProperty('username')
    //  return this.user //@todo: Check has 'me' object with the user information (&& this.me)
    },

    isCalendarActive(){
      return this.menu === 'calendar'
    },

    isChatActive(){
      return this.menu === 'chat'
    },

    isAuthActive(){
      return this.menu === 'auth'
    },

    isNotificationActive(){
      return this.menu === 'notifications'
    },

    isMeActive(){
      return this.menu === 'me'
    }
  },

  data: () => ({
    // show the home button (s)
    showHome: true, // this could appear as a home icon or as venue app logo

    // show the support button (s)
    showSupport: true,

    // show the admin (buttons)
    showAdmin: false,

    // show the me-schedule (buttons)
    showMeSchedule: true,

    // show the me-notifications (buttons)
    showMeNotifications: true,

    // show the me-chat (buttons)
    showMeChats: true,

    // show the auth (buttons for sign in/out)
    showAuth: true,

    isMenuOpen: false,
    menu: '',
    isFullscreen: '',

  }),

}
</script>


<style>
.btn-top-bar:hover:before {
  opacity: 0 !important;
}
</style>
