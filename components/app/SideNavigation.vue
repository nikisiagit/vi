<!--
App Side Navigation

This smart component handles the Venue App Navigation in a side bar.

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-157

@link https://vuetifyjs.com/en/api/v-navigation-drawer/#props
-->
<template>
  <v-navigation-drawer app
                       :clipped="clipped"
                       :permanent="permanent"
                       :floating="floating"
                       :mini-variant="mini"
                       :width="width"
                       class="elevation-3"
                       :mini-variant-width="miniVariantWidth"
                       @update:mini-variant="updateMiniVariant"
  > <!-- @transitionend="transitionEnd" -->

    <!-- the inner mini navigation -->
    <v-navigation-drawer mini-variant
                         permanent
                         absolute
                         floating

                         class="elevation-3"
                         :mini-variant-width="miniVariantWidth">

      <!-- the navigation item avatars -->
      <div class="fill-height d-flex flex-column justify-start"> <!-- pa-3  -->

        <!-- home -->
        <!-- take the user to the actual home page -->
        <v-list flat v-show="showHome" class="py-0">
          <v-list-item class="pa-0">
            <v-list-item-avatar tile width="100%">

              <app-venue-logo @open-nav="openVenueNav"></app-venue-logo>

            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <!-- explore eventNav -->
        <!-- open the navigation with the event component -->
        <v-list flat class="pa-0" v-show="showEventNav">
          <!-- open (or close)  the drawer with the event component -->
          <v-list-item class="pa-0">
            <v-list-item-avatar class="ma-auto">
              <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on" icon
                    @click="toggleDrawer('eventNav')"
                    :color="drawer === 'eventNav' ? 'primary' : undefined"
                  >
                    <v-hover v-slot="{ hover }">

                      <v-icon class="scale-icon" :color="hover ? 'primary': null">mdi-compass</v-icon>

                    </v-hover>
                  </v-btn>
                </template>

                <span>{{ $t('explore-event') }}</span>
              </v-tooltip>

            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <!-- search -->
        <!-- open the navigation with the search component -->
        <v-list flat class="pa-0">
          <v-list-item nuxt :to="{ name: 'rooms' }" class="pa-0" v-show="showRooms">
            <v-list-item-avatar class="ma-auto">
              <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn   v-bind="attrs"
                           v-on="on"
                           icon
                  >
                    <v-hover v-slot="{ hover }">
                      <v-icon class="scale-icon" :color="hover ? 'primary': null">mdi-google-classroom</v-icon>
                    </v-hover>
                  </v-btn>
                </template>

                <span>{{ $t('rooms') }}</span>
              </v-tooltip>

            </v-list-item-avatar>
          </v-list-item>

          <!-- open (or close)  the drawer with the search component -->
          <v-list-item class="pa-0" v-show="showSearch">
            <v-list-item-avatar class="ma-auto">
              <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn   v-bind="attrs"
                           v-on="on" icon
                           @click="toggleDrawer('search')"
                           :color="drawer === 'search' ? 'primary' : undefined"
                  >
                    <v-hover v-slot="{ hover }">
                      <v-icon class="scale-icon" :color="hover ? 'primary': null">mdi-magnify</v-icon>
                    </v-hover>
                  </v-btn>
                </template>

                <span>{{ $t('search') }}</span>
              </v-tooltip>

            </v-list-item-avatar>
          </v-list-item>

          <!-- support -->
          <!-- open the navigation and show the support? component -->
          <v-list-item class="pa-0" v-show="showSupport">
            <v-list-item-avatar class="ma-auto">
              <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn   v-bind="attrs"
                           v-on="on" icon
                           @click="toggleDrawer('support')"
                           :color="drawer === 'support' ? 'primary' : undefined"
                  >
                    <v-hover v-slot="{ hover }">
                      <v-icon class="scale-icon" :color="hover ? 'primary': null">mdi-lifebuoy</v-icon>
                    </v-hover>
                  </v-btn>
                </template>

                <span>{{ $t('support') }}</span>
              </v-tooltip>

            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <v-spacer />


        <template>
          <!-- admin -->
          <!-- open the navigation with the admin nav list -->
          <v-fade-transition mode="out-in">
            <v-list flat v-show="showAdmin" class="pa-0">
              <v-list-item class="pa-0">
                <v-list-item-avatar class="ma-auto">
                  <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn   v-bind="attrs"
                               v-on="on" icon
                               @click="toggleDrawer('admin')"
                               :color="drawer === 'admin' ? 'primary' : undefined"
                      >
                        <v-hover v-slot="{ hover }">
                          <v-icon class="scale-icon" :color="hover ? 'primary': null">mdi-shield-account-outline</v-icon>
                        </v-hover>
                      </v-btn>
                    </template>

                    <span>{{ $t('admin') }}</span>
                  </v-tooltip>

                </v-list-item-avatar>
              </v-list-item>
            </v-list>
          </v-fade-transition>

          <v-divider class="mx-2"></v-divider>
        </template>


        <v-fade-transition mode="out-in">

          <v-list flat>

            <template v-if="isAuthenticated">
              <!-- me calendar -->
              <v-list-item class="pa-0" v-show="showMeSchedule">
                <v-list-item-icon class="ma-auto">
                  <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn   v-bind="attrs"
                               v-on="on" icon
                               @click="toggleDrawer('calendar')"
                               :color="drawer === 'calendar' ? 'primary' : undefined"
                      >
                        <v-hover v-slot="{ hover }">
                          <v-icon class=" scale-icon" :color="hover ? 'primary': null">mdi-calendar</v-icon>
                        </v-hover>
                      </v-btn>
                    </template>

                    <span>{{ $t('my-schedule') }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item class="pa-0"  v-show="showMeNotifications">
                <v-list-item-icon class="ma-auto">
                  <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn   v-bind="attrs"
                               v-on="on" icon
                               @click="toggleDrawer('notifications')"
                               :color="drawer === 'notifications' ? 'primary' : undefined"
                      >
                        <v-hover v-slot="{ hover }">
                          <v-icon class="badge-bell scale-icon" :color="hover ? 'primary': null">mdi-bell</v-icon>
                        </v-hover>
                      </v-btn>
                    </template>

                    <span>{{ $t('notifications') }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>


              <!-- chats -->
              <v-list-item class="pa-0"  v-show="showMeChats">
                <v-list-item-avatar class="ma-auto">
                  <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn   v-bind="attrs"
                               v-on="on" icon
                               @click="toggleDrawer('chat')"
                               :color="drawer === 'chat' ? 'primary' : undefined"
                      >
                        <v-hover v-slot="{ hover }">
                          <v-icon class="scale-icon" :color="hover ? 'primary': null">mdi-message</v-icon>
                        </v-hover>
                      </v-btn>
                    </template>

                    <span>{{ $t('my-chats') }}</span>
                  </v-tooltip>

                </v-list-item-avatar>
              </v-list-item>
            </template>


            <template v-if="showAuth">
              <!-- auth-sign-in -->
              <v-list-item class="pa-0" v-if="! isAuthenticated">
                <v-list-item-icon class="ma-auto">
                  <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn   v-bind="attrs"
                               v-on="on"
                               icon
                               @click="toggleDrawer('auth')"
                               :color="drawer === 'auth' ? 'primary' : undefined"
                      >
                        <v-hover v-slot="{ hover }">
                          <v-icon :color="hover ? 'primary': null" >mdi-login</v-icon>
                        </v-hover>
                      </v-btn>

                    </template>

                    <span>{{ $t('sign-in') }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>
              <!-- /auth-sign-in -->

              <!-- me-details / profile -->
              <v-list-item class="pa-0" v-else>
                <v-list-item-icon class="ma-auto">
                  <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn   v-bind="attrs"
                               v-on="on"
                               icon
                               @click="toggleDrawer('me')"
                               :color="drawer === 'me' ? 'primary' : undefined"
                      >
                        <v-hover v-slot="{ hover }">
                          <v-icon :color="hover ? 'primary': null">mdi-account-circle</v-icon>
                        </v-hover>
                      </v-btn>

                    </template>

                    <span>{{ $t('me-profile') }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </v-list-item>
              <!-- /me-details / profile -->
            </template>


<!--            <v-list-item class="pa-0">-->
<!--              <v-list-item-icon class="ma-auto">-->
<!--                <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">-->
<!--                  <template v-slot:activator="{ on, attrs }">-->
<!--                    <v-hover v-slot="{ hover }">-->
<!--                      <v-btn   v-bind="attrs"-->
<!--                               v-on="on" icon-->
<!--                               @click="toggleDrawer('me')"-->
<!--                               :color="hover || drawer === 'me' ? 'primary' : undefined"-->
<!--                      >-->
<!--                        <me-avatar class="scale-icon" size="xs"></me-avatar>-->
<!--                      </v-btn>-->
<!--                    </v-hover>-->

<!--                  </template>-->

<!--                  <span>{{ $t('my-profile') }}</span>-->
<!--                </v-tooltip>-->
<!--              </v-list-item-icon>-->
<!--            </v-list-item>-->

          </v-list>


        </v-fade-transition>

      </div>
    </v-navigation-drawer>


    <!-- the me nav items -->
    <!-- open the navigation with the relevant component(s) pa-0 -->
<!--    <v-container fluid class="fill-height align-start transparent">-->
    <v-container fluid class="align-start">

      <!-- padding left is required  -->
      <v-row no-gutters style="padding-left:58px;" class="fill-height">
        <v-fade-transition mode="out-in" @after-leave="afterLeave">
          <v-col v-if="showDrawer" class="orange grow" cols="12">

            <v-slide-y-transition mode="out-in">

              <!--
              Venue Areas
              Render a list of the Areas that have been added to the Venue.
              -->
              <app-venue-nav-areas v-if="drawer === 'venueNav'" key="venueNav" />


              <!--
              Search
              Render the App Search.
              -->
              <app-search v-if="drawer === 'search'" key="search" />


              <!--
              Event Areas
              Render the Areas that have been added to the (current) Event.
              -->
              <v-card rounded="0" height="100%" v-if="drawer === 'eventNav'" key="eventNav">
                <v-card-title>
                  <v-icon left>mdi-compass</v-icon>
                  {{ $t('explore-event') }}
                </v-card-title>
              </v-card>

              <!--
              Admin Nav List
              Lists links to the Admin sections.
              NOTE - Only displayed IF the Me/User is an admin.
              -->
              <apps-admin-nav-list v-if="drawer === 'admin'" key="admin"/>


              <!--
              Me - Schedule/Calendar
              Render the Me schedule/calendar
              -->
              <v-card v-if="drawer === 'calendar'" key="calendar">
                <v-card-title>
                  <v-icon left>mdi-calendar</v-icon>
                  {{ $t('my-schedule') }}
                </v-card-title>
              </v-card>


              <!--
              Me - Chat
              Render the Me/User Chat summary
              -->
              <v-card v-if="drawer === 'chat'" key="chat">
                <v-card-title>
                  <v-icon left>mdi-message</v-icon>
                  {{ $t('my-chats') }}
                </v-card-title>
              </v-card>

              <!--
              Me - Notifications
              Render the Me/User notifications
              -->
              <v-card v-if="drawer === 'notifications'" key="notifications">
                <v-card-title>
                  <v-icon left>mdi-bell</v-icon>
                  {{ $t('my-notifications') }}
                </v-card-title>
              </v-card>

              <!--
              User Support
              Support that the Partition offers to its Users
              -->
              <app-support v-if="drawer === 'support'" key="support" />

              <!--
              Auth (sign in, sign out, etc)
              -->
              <auth-container class="fill-height" v-if="drawer === 'auth' && ! user" key="auth" />

              <!--
              Me/User
              -->
              <me-details v-if="drawer === 'me' && user" key="me" class="fill-height" />

            </v-slide-y-transition>
          </v-col>
        </v-fade-transition>


      </v-row>
    </v-container>

  </v-navigation-drawer>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SideNavigation",
  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    signedOut(){
      this.mini = true;
      this.drawer = undefined;

      this.showDrawer = false;
    },

    signedIn(){
      this.mini = true;
      this.drawer = undefined;

      this.showDrawer = false;
    },

    routeName: {
      immediate: true,
      handler(routeName){
        // When user is inside the Event show Event Navigation.
        this.showEventNav = routeName === 'events-eventId'
      }
    },

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
      signOut: 'auth/signOut',
      load: 'venue/load',
    }),

    openVenueNav(){
      this.toggleDrawer('venueNav')

    },

    /**
     * Listen to the update mini variant event
     * @param event
     */
    updateMiniVariant (event) {
      console.log('## UPDATE MINI VARIANT');
      console.log(event);
    },

    /**
     * Event triggered once the drawer has left
     */
    afterLeave () {
      console.log('## DRAWER - AFTER LEAVE');
      this.mini = true;
      this.drawer = undefined;
    },

    // onEnter () {
    //   console.log('onEnter');
    //   console.log(this.drawer);
    // },

    /**
     * Event triggered once the nav has opened or closed.
     *
     * @param event
     */
    transitionEnd (event) {
      console.log(`## TRANSITION END ${this.mini}`);
      console.log(event);

      if (this.mini) {
        // the navigation is now in mini
      } else {
        // the navigation is now NOT in mini
        // so open the drawer
        this.showDrawer = true;
      }
    },

    /**
     * Open or show the drawer based on the supplied parameter.
     *
     * @param drawer
     */
    toggleDrawer (drawer = undefined) {
      console.log(`## TOGGLE DRAWER ${drawer}`);

      if ( ! drawer) {
        console.log(`## CLOSE THE DRAWER`);
        this.showDrawer = false;
        return;
      }

      if ( this.drawer === drawer) {
        console.log(`## DRAW IS THE SAME - CLOSE THE DRAWER`);
        this.showDrawer = false;
        return;
      }

      if (this.showDrawer) {
        this.drawer = drawer;
        return;
      }

      if (this.mini) {
        this.mini = false; // opens the drawer
        this.drawer = drawer;
        this.showDrawer = true

      } else {
        this.showDrawer = false; // closes the drawer
      }
    },
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      user: 'auth/user',
      signedIn: 'auth/signedIn',
      signedOut: 'auth/signedOut',

      venue: 'venue/venue',
      loading: 'venue/loading',
      loaded: 'venue/loaded',
    }),

    isAdmin(){
      return this.me?.isAdmin
    },

    routeName () {
      return this.$route.name
    },

    isAuthenticated(){
      return this.user?.hasOwnProperty('username')
      //  return this.user //@todo: Check has 'me' object with the user information (&& this.me)
    },
  },

  data: () => ({
    // show the home list button (s)
    showHome: true,

    // show the eventNav list button (s)
    showEventNav: false,

    // show the search list button (s)
    showSearch: true,

    showRooms: true,

    // show the support list button (s)
    showSupport: true,

    // show the admin navigation list (buttons)
    showAdmin: false,

    // show the my schedule navigation list (buttons)
    showMeSchedule: true,

    // show my notifications admin navigation list (buttons)
    showMeNotifications: true,

    // show the my chats navigation list (buttons)
    showMeChats: true,

    // show the me navigation list (buttons)
    // showMe: true,

    // show the auth nav list (buttons for sign in/out)
    showAuth: true,

    // is the menu in mini mode
    mini: true,

    // show (hide) the drawer
    showDrawer: false,

    // which drawer are we showing
    drawer: undefined,

    // width of the navigation
    width: 460,
    // width: 512,

    // width of the mini navigation
    miniVariantWidth: 56,
    // miniVariantWidth: 80,
    // miniVariantWidth: 92,

    clipped: false,
    permanent: true,
    floating: true,
  }),

}
</script>
