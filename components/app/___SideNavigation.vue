<!--
App Side Navigation

This smart component handles the Venue App Navigation in a side bar.

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-157

@link https://vuetifyjs.com/en/api/v-navigation-drawer/#props
-->
<template>
  <v-navigation-drawer app

                       :temporary="!mini && sideActivityNavigationOpen"

                       :clipped="clipped"
                       :permanent="permanent"
                       :floating="floating"
                       :mini-variant="mini || lastNavigationOpened[lastNavigationOpened.length - 1] !== 'main'"
                       :width="drawer === 'me'? 460 : drawer === 'event' ? 340: width"
                       :mini-variant-width="miniVariantWidth"
                       @update:mini-variant="updateMiniVariant"

                       :style="isAccessibilityEnabled ? { maxHeight: 'calc(100% - 60px)', marginTop: '3.7rem' }: null"
                       :class="mini ? 'elevation-3': 'elevation-10'"> <!-- @transitionend="transitionEnd" -->

    <!-- the inner mini navigation -->
    <v-navigation-drawer mini-variant
                         permanent
                         absolute
                         floating

                         class="elevation-3"
                         :mini-variant-width="miniVariantWidth">

      <!-- the navigation item avatars -->
      <div class="fill-height d-flex flex-column justify-start"> <!-- pa-3  -->

        <v-list flat v-show="showLogo" class="py-0 px-1">
          <v-list-item nuxt :to="{name: 'index'}" class="pa-0" link>
            <v-list-item-avatar tile class="ma-auto d-flex justify-center" width="100%">
              <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-img v-bind="attrs"
                         v-on="on"  v-if="logo" :src="logo" contain />

                  <v-img v-bind="attrs"
                         v-on="on"  v-else :src="require('~/assets/ivent-pro-teal.png')"  max-width="30" class="text-center" contain />


                  <!--                  <v-img v-bind="attrs"-->
<!--                         v-on="on"  v-else :src="$vuetify.theme.dark ? require('~/assets/White.svg'): require('~/assets/Black.svg')" contain />-->

                </template>

                <span>Home</span>
              </v-tooltip>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <!-- home -->
        <!-- take the user to the actual home page -->
        <v-list flat v-show="showHome" class="pa-0">
          <v-list-item nuxt :to="{name: 'index'}" exact class="pa-0">
            <v-list-item-avatar class="ma-auto ">

              <v-hover v-slot="{ hover }">
                <v-icon class="scale-icon" :color="hover ? 'primary': null">mdi-home-outline</v-icon>
              </v-hover>

            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <!-- explore event -->
        <!-- open the navigation with the event component -->
        <v-list flat class="pa-0" v-show="showEvent">
          <!-- open (or close)  the drawer with the event component -->
          <v-list-item class="pa-0">
            <v-list-item-avatar class="ma-auto">
              <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on" icon
                         @click="toggleDrawer('event')"
                         :color="drawer === 'event' ? 'primary' : undefined"
                  >
                    <v-hover v-slot="{ hover }">

                      <v-icon v-if="drawer === 'event'" class="scale-icon" :color="hover ? 'primary': null">mdi-compass</v-icon>
                      <v-icon v-else class="scale-icon" :color="hover ? 'primary': null">mdi-compass-outline</v-icon>
                    </v-hover>
                  </v-btn>
                </template>

                <span>Explore Event</span>
              </v-tooltip>

            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <!-- search -->
        <!-- open the navigation with the search component -->
        <v-list flat class="pa-0">
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
                      <v-icon v-if="drawer === 'search'" class="scale-icon" :color="hover ? 'primary': null">mdi-magnify</v-icon>
                      <v-icon v-else class="scale-icon" :color="hover ? 'primary': null">mdi-magnify</v-icon>
                    </v-hover>
                  </v-btn>
                </template>

                <span>Search</span>
              </v-tooltip>

            </v-list-item-avatar>
          </v-list-item>

          <!-- support -->
          <!-- open the navigation and show the support? component -->
          <v-list-item class="pa-0">
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

                <span>Support</span>
              </v-tooltip>

            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <v-spacer />


        <template v-if="isAuthenticated">
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
                          <v-icon v-if="drawer === 'admin'" class="scale-icon" :color="hover ? 'primary': null">mdi-shield-account</v-icon>
                          <v-icon v-else class="scale-icon" :color="hover ? 'primary': null">mdi-shield-account-outline</v-icon>
                        </v-hover>
                      </v-btn>
                    </template>

                    <span>Admin</span>
                  </v-tooltip>

                </v-list-item-avatar>
              </v-list-item>
            </v-list>
          </v-fade-transition>

          <v-divider class="mx-2"></v-divider>
        </template>

        <!-- the me nav items -->
        <!-- open the navigation with the relevant me component -->


        <v-fade-transition mode="out-in">
          <v-list flat v-if="isAuthenticated">

            <!-- me calendar -->
            <v-list-item class="pa-0">
              <v-list-item-icon class="ma-auto">
                <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             @click="toggleDrawer('calendar')"
                             :color="drawer === 'calendar' ? 'primary' : undefined"
                    >
                      <v-hover v-slot="{ hover }">
                        <v-badge

                          color="error"

                          class="badge"
                          dot
                        >
                          <v-icon v-if="drawer === 'calendar'" class=" scale-icon" :color="hover ? 'primary': null">mdi-calendar</v-icon>
                          <v-icon v-else class=" scale-icon" :color="hover ? 'primary': null">mdi-calendar-outline</v-icon>

                        </v-badge>
                      </v-hover>
                    </v-btn>
                  </template>

                  <span>My Schedule</span>
                </v-tooltip>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item class="pa-0">
              <v-list-item-icon class="ma-auto">
                <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                           @click="toggleDrawer('notifications')"
                           :color="drawer === 'notifications' ? 'primary' : undefined"
                    >
                      <v-hover v-slot="{ hover }">
                        <v-badge

                          color="error"
                          dot
                          class="badge"
                        >
                          <v-icon v-if="drawer === 'notifications'" class="badge-bell scale-icon" :color="hover ? 'primary': null">mdi-bell</v-icon>
                          <v-icon v-else class="badge-bell scale-icon" :color="hover ? 'primary': null">mdi-bell-outline</v-icon>
                        </v-badge>

                      </v-hover>
                    </v-btn>
                  </template>

                  <span>Notifications</span>
                </v-tooltip>
              </v-list-item-icon>
            </v-list-item>


            <!-- chats -->
            <v-list-item class="pa-0">
              <v-list-item-avatar class="ma-auto">
                <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                           @click="toggleDrawer('chat')"
                           :color="drawer === 'chat' ? 'primary' : undefined"
                    >
                      <v-hover v-slot="{ hover }">
                        <v-icon v-if="drawer === 'chat'" class="scale-icon" :color="hover ? 'primary': null">mdi-message</v-icon>
                        <v-icon v-else class="scale-icon" :color="hover ? 'primary': null">mdi-message-outline</v-icon>
                      </v-hover>
                    </v-btn>
                  </template>

                  <span>My Chats</span>
                </v-tooltip>

              </v-list-item-avatar>
            </v-list-item>

            <v-list-item class="pa-0">
              <v-list-item-icon class="ma-auto">
                <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-hover v-slot="{ hover }">
                      <v-btn   v-bind="attrs"
                               v-on="on" icon
                               @click="toggleDrawer('me')"
                               :color="hover || drawer === 'me' ? 'primary' : undefined"
                      >
                        <me-avatar class="scale-icon" size="xs"></me-avatar>
                      </v-btn>
                    </v-hover>

                  </template>

                  <span>My Profile</span>
                </v-tooltip>
              </v-list-item-icon>
            </v-list-item>

          </v-list>

          <v-list flat v-else>
            <v-list-item class="pa-0">
              <v-list-item-icon class="ma-auto">
                <v-tooltip right open-on-hover nudge-right="10" open-delay="300"  transition="slide-x-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             nuxt
                             :to="{ name: 'sign-in' }"
                    >
                      <v-hover v-slot="{ hover }">
                        <v-icon :color="hover ? 'primary': null">mdi-login</v-icon>
                      </v-hover>
                    </v-btn>

                  </template>

                  <span>Sign in</span>
                </v-tooltip>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-fade-transition>


        <!--        <v-divider />-->

        <!-- auth nav items -->
        <!-- show the relevant sign-in/sign-out button -->
<!--        <v-fade-transition mode="out-in">-->
<!--          <v-list flat v-show="showAuth">-->
<!--            &lt;!&ndash; fade the relevant button in or out&ndash;&gt;-->
<!--            <v-fade-transition mode="out-in">-->

<!--              <v-list-item v-if="user" key="authenticated" class="pa-0">-->
<!--                <v-list-item-avatar class="ma-auto">-->
<!--                  <v-btn icon-->
<!--                         @click="toggleDrawer('auth')"-->
<!--                         :color="drawer === 'auth' ? 'primary' : undefined"-->
<!--                  >-->
<!--                    <v-hover v-slot="{ hover }">-->
<!--                      <v-icon :color="hover ? 'primary': null">mdi-logout</v-icon>-->
<!--                    </v-hover>-->
<!--                  </v-btn>-->
<!--                </v-list-item-avatar>-->
<!--              </v-list-item>-->

<!--              <v-list-item v-else key="unauthenticated" class="pa-0">-->
<!--                <v-list-item-avatar class="ma-auto">-->
<!--                  <v-btn icon-->
<!--                         @click="toggleDrawer('auth')"-->
<!--                         :color="drawer === 'auth' ? 'primary' : undefined"-->
<!--                  >-->
<!--                    <v-hover v-slot="{ hover }">-->
<!--                      <v-icon :color="hover ? 'primary': null">mdi-login</v-icon>-->
<!--                    </v-hover>-->
<!--                  </v-btn>-->
<!--                </v-list-item-avatar>-->
<!--              </v-list-item>-->
<!--            </v-fade-transition>-->

<!--          </v-list>-->
<!--        </v-fade-transition>-->

      </div>
    </v-navigation-drawer>

    <v-container fluid class="fill-height align-start transparent pa-0">

      <!-- this needs the padding setting -->
      <v-row no-gutters style="padding-left:58px;" class="fill-height">

        <v-fade-transition mode="out-in" @after-leave="afterLeave">
          <v-col v-if="showDrawer" class="grow">

            <!-- the search drawer -->
            <v-slide-y-transition mode="out-in">

              <v-card v-if="drawer === 'search'" key="search">
<!--                <v-card-title>-->
<!--                  <v-icon left>mdi-magnify</v-icon>-->
<!--                  {{ $t('search') }}-->
<!--                </v-card-title>-->
              </v-card>

              <!-- the event nav list -->
              <v-card rounded="0" height="100%" v-if="drawer === 'event'" key="event">

                <event-nav-list/>
              </v-card>

              <!-- the admin nav list -->
              <apps-admin-nav-list v-if="drawer === 'admin'" key="admin"/>
              <!--              <v-card v-if="drawer === 'admin'" key="admin">-->
              <!--                <v-card-title>-->
              <!--                  <v-icon left>mdi-shield-account</v-icon>-->
              <!--                  {{ $t('admin') }}-->
              <!--                </v-card-title>-->
              <!--              </v-card>-->

              <!-- the me  -->
              <me-details @accessibility-enabled="accessibilityEnabled" v-if="drawer === 'me'" key="me" class="fill-height" />

              <!--              <v-card v-if="drawer === 'me'" key="me">-->
              <!--                <v-card-title>-->
              <!--                  <v-icon left>mdi-account</v-icon>-->
              <!--                  {{ $t('me') }}-->
              <!--                </v-card-title>-->
              <!--              </v-card>-->

              <!-- the me agenda -->

              <area-components-mockups-my-schedule-list
                class="fill-height"
                v-if="drawer === 'calendar'"
              ></area-components-mockups-my-schedule-list>

<!--              <v-card v-if="drawer === 'calendar'" key="calendar">-->
<!--                <v-card-title>-->
<!--                  <v-icon left>mdi-calendar</v-icon>-->
<!--                  {{ $t('me-calendar') }}-->
<!--                </v-card-title>-->
<!--              </v-card>-->

              <!-- the me chat summary -->
              <!--              <me-chats-list />-->

              <v-sheet class="fill-height" v-if="drawer === 'chat'" key="chat">
                <v-toolbar elevation="0" class="pa-0 ma-0">
                  <v-toolbar-title class="font-weight-medium">
                    <v-icon left>mdi-message-outline</v-icon>
                    {{ $t('My Chats') }}
                  </v-toolbar-title>

                  <v-spacer></v-spacer>
                  <v-btn text color="primary" class="mr-0">
                    <v-icon left>mdi-message-plus</v-icon>
                    Start a chat
                  </v-btn>
                </v-toolbar>

                <chats-details />
              </v-sheet>

              <!-- the me notifications -->
              <v-sheet v-if="drawer === 'notifications'" key="notifications">
                <v-toolbar elevation="0" class="pa-0 ma-0">
                  <v-toolbar-title class="font-weight-medium">
                    <v-icon left>mdi-bell-outline</v-icon>
                    {{ $t('Notifications') }}
                  </v-toolbar-title>

                  <v-spacer></v-spacer>

<!--                  <v-btn plain icon class="mr-0">-->
<!--                    <v-icon >mdi-bell-off</v-icon>-->
<!--                  </v-btn>-->
                </v-toolbar>

                <v-container>
                  <v-row>
                    <v-col align="end">
                      <v-btn plain color="primary"><v-icon left> mdi-check-all </v-icon>Mark all as read</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container class="pa-0">

                  <v-row no-gutters>
                    <v-col>
                      <chats-chat-list-item-with-menu

                        :is-active="false"

                        icon="mdi-bell"
                        :datetime="'2022-09-27T15:39:31.255Z'"
                        :title="'Upcoming Session'"
                        :text="'5 minutes until Stage goes live'"
                      />
                    </v-col>
                    <v-col>
                      <chats-chat-list-item-with-menu
                        :number-of-unseen-messages="100"
                        :is-active="false"

                        icon="mdi-bell"
                        :datetime="'2022-09-24T10:20:31.255Z'"
                        :title="'Meeting Request'"
                        :text="'Esmeralda has requested a meeting'"
                      />
                    </v-col>
                    <v-col>
                      <chats-chat-list-item-with-menu

                        :is-active="false"

                        icon="mdi-bell"
                        :datetime="'2022-09-27T18:39:31.255Z'"
                        :title="'New Connection'"
                        :text="'Andrej Klun has added you as a Connection'"
                      />
                    </v-col>
                  </v-row>

                </v-container>
              </v-sheet>

              <!-- the me support -->
              <area-components-mockups-support
                v-if="drawer === 'support'" key="support"
              ></area-components-mockups-support>

              <!-- the me support -->
              <v-card class="fill-height" v-if="drawer === 'auth'" key="auth">
                <v-card-title>
                  <v-icon left>mdi-login</v-icon>
<!--                  {{ $t('me-login') }}-->
                  Confirm Sign out
                </v-card-title>

                <v-card-text>

                  <v-container>
                    <v-row>
                      <v-col>
                        <v-alert type="warning" class="font-weight-bold">Are you sure you want to sign out of the platform?</v-alert>

                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col >
                        <v-btn block @click="signOut">{{ $t('logout') }}</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>

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
  name: "SideNavigationNew",
  props: {
    logo: {
      type: String
    }
  },
  /**
   * Created.
   *
   * @returns {Promise<void>}
   */
  async created() {
    // https://vuetifyjs.com/en/components/application/#application-service
    // {
    //   bar: number
    //   bottom: number
    //   footer: number
    //   insetFooter: number
    //   left: number
    //   right: number
    //   top: number
    // }
    // console.log(this.$vuetify.application.top)
  },

  watch: {
    // '$route.name': {
    //   handler(){
    //     // this.setLastNavigationOpened('main')
    //     // this.closeSideNavigation()
    //     // this.cleanLastNavigationOpened()
    //   }
    // },
    '$route.params': {
      deep: true,
      immediate: true,
      handler(params){
        if (params?.eventId)
          this.showEvent = true
        else if (this.showEvent)
          this.showEvent = false
      }
    }
  },

  methods: {
    ...mapActions({
      signOut: 'auth/signOut',

      openSideNavigation: 'app/openSideNavigation',
      closeSideNavigation: 'app/closeSideNavigation',
      setLastNavigationOpened: 'app/setLastNavigationOpened',
      cleanLastNavigationOpened: 'app/cleanLastNavigationOpened'
    }),

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

      // let know at the rest of the app know about the state as global source of truth. (App Store)
      this.closeSideNavigation()

      this.setLastNavigationOpened('main')
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

        // let know at the rest of the app know about the state as global source of truth. (App Store)
        this.openSideNavigation()

        this.setLastNavigationOpened('main')

      } else {
        this.showDrawer = false; // closes the drawer
      }
    },

    accessibilityEnabled(val){
      if (val) {
        const el = document.getElementById('recite-header')
        if (el) {
          document.getElementById('recite-header').style.display = 'initial'

          this.isAccessibilityEnabled = true
        } else {
          Recite.load();
          Recite.Event.subscribe("Recite:load", function() {
            Recite.enable()
          })

          setTimeout(() => {
            this.isAccessibilityEnabled = true
          }, 500)
        }

      } else {
        document.getElementById('recite-header').style.display = 'none'

        this.isAccessibilityEnabled = false
      }

    }
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      user: 'auth/user',

      sideActivityNavigationOpen: 'app/sideActivityNavigationOpen',
      lastNavigationOpened: 'app/lastNavigationOpened'
    }),

    isAuthenticated(){
      return this.user && this.me
    }
  },

  data: () => ({

    // show the venue logo list button (s)
    showLogo: true,

    // show the home list button (s)
    showHome: false,

    // show the event list button (s)
    showEvent: false,

    // show the search list button (s)
    showSearch: false,

    // show the admin navigation list (buttons)
    showAdmin: true,

    // show the me navigation list (buttons)
    showMe: true,

    // show the auth nav list (buttons for sign in/out)
    showAuth: true,

    // is the menu in mini mode
    mini: true,

    // show (hide) the drawer
    showDrawer: false,

    // which drawer are we showing
    drawer: undefined,

    // width of the navigation
    // width: 460,
    width: 512,

    // width of the mini navigation
    miniVariantWidth: 56,
    // miniVariantWidth: 80,
    // miniVariantWidth: 92,

    clipped: false,
    permanent: true,
    floating: true,

    isAccessibilityEnabled: false
  }),

}
</script>

<style>
.badge-important{
  animation: pulse 1.5s 1;
}
.badge-num-important:after {
  content: '';
  position: absolute;
  top: -0.01rem;
  left: -0.05rem;
  border:2px solid rgba(255,0,0,.5);
  opacity:0;
  border-radius: 50%;
  width:100%;
  height:100%;
  animation: sonar 1.5s infinite;
}

.badge-bell:before{
  animation: bell 2s ease-out;

}

@keyframes sonar {
  0% {transform: scale(.9); opacity:1;}
  100% {transform: scale(2);opacity: 0;}
}
@keyframes pulse {
  0% {transform: scale(1);}
  20% {transform: scale(1.4); }
  50% {transform: scale(.9);}
  80% {transform: scale(1.2);}
  100% {transform: scale(1);}
}

@keyframes bell {
  0% {transform: rotate(35deg);}
  12.5% {transform: rotate(-30deg);}
  25% {transform: rotate(25deg);}
  37.5% {transform: rotate(-20deg);}
  50% {transform: rotate(15deg);}
  62.5% {transform: rotate(-10deg)}
  75% {transform: rotate(5deg)}
  100% {transform: rotate(0);}
}

</style>
