<!--
App Side Activity Panel Nav

This is like a contextual sidebar (right). Depends on the area/page and would hold different items/actions/menu
-->
<template>
  <div>
    <!-- the mini/bar navigation -->
    <v-navigation-drawer app
                         right
                         permanent
                         floating
                         class="elevation-2"
                         style="z-index: 99"
                         :mini-variant="mini"
                         :mini-variant-width="miniVariantWidth">

      <!-- the navigation item avatars -->
      <div class="fill-height d-flex flex-column justify-start"> <!-- pa-3  -->

        <v-hover v-slot="{ hover }">
          <v-list flat v-show="showEvent">
            <!-- open (or close)  the drawer with the event event component -->
            <v-list-item class="pa-0">
              <v-list-item-icon class="ma-auto">
                <v-tooltip  open-on-focus left nudge-right="10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             @click="toggleDrawer('event')"
                             :color="drawer === 'event' ? 'primary' : undefined"
                    >
                      <v-icon :color="hover ? 'primary': null" class="scale-icon" >mdi-shape</v-icon>

                    </v-btn>
                  </template>

                  <span>{{ $t('event-activities') }}</span>
                </v-tooltip>

              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-hover>


        <v-divider></v-divider>

        <v-hover v-slot="{ hover }">
          <v-list flat v-show="showPeople">
            <!-- open (or close)  the drawer with the people component -->
            <v-list-item class="pa-0">
              <v-list-item-avatar class="ma-auto">
                <v-tooltip  open-on-focus left nudge-right="10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             @click="toggleDrawer('people')"
                             :color="drawer === 'people' ? 'primary' : undefined"
                    >

                      <v-icon class="scale-icon" :color="hover ? 'primary': null">mdi-account-multiple</v-icon>

                    </v-btn>
                  </template>

                  <span>{{ $t('people') }}</span>
                </v-tooltip>

              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-hover>


        <!-- open the navigation with the chat component -->
        <v-hover v-slot="{ hover }">
          <v-list flat v-show="showChat">

            <v-list-item class="pa-0">
              <v-list-item-avatar class="ma-auto">
                <v-tooltip  open-on-focus left nudge-right="10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             @click="toggleDrawer('chat')"
                             :color="drawer === 'chat' ? 'primary' : undefined"
                    >
                      <v-icon :color="hover ? 'primary': null" class="scale-icon" >mdi-forum</v-icon>
                    </v-btn>
                  </template>

                  <span>{{ $t('chat') }}</span>
                </v-tooltip>
              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-hover>

      </div>
    </v-navigation-drawer>

    <!-- the content drawer -->
    <v-navigation-drawer


                         :app="showDrawer"
                         right
                         :clipped="clipped"
                         :permanent="permanent"
                         :floating="floating"
                         :width="width"
                         :mini-variant-width="miniVariantWidth"

                         class="elevation-3 mr-14"
                         >


      <v-container fluid class="fill-height align-start transparent pa-0">

        <!-- this needs the padding setting -->
        <v-row no-gutters class="fill-height">

          <v-fade-transition mode="out-in" @after-leave="afterLeave">
            <v-col v-show="showDrawer" class="grow">

              <v-card flat class="fill-height" v-if="drawer === 'people'" key="people">
                <v-card-title>
                  <v-icon left>mdi-account-multiple</v-icon>
                  {{ $t('people') }}
                </v-card-title>
                <v-divider></v-divider>


              </v-card>

              <v-card flat v-if="drawer === 'event'" key="event">
                <v-card-title>
                  <v-icon left>mdi-shape</v-icon>
                  {{ $t('event-activities') }}
                </v-card-title>
                <v-divider></v-divider>

              </v-card>

              <v-card flat v-if="drawer === 'chat'" key="chat">
                <v-card-title>
                  <v-icon left>mdi-forum</v-icon>
                  {{ $t('chat') }}
                </v-card-title>
                <v-divider></v-divider>

                <!--                        <chats-details />-->
              </v-card>

            </v-col>
          </v-fade-transition>
        </v-row>
      </v-container>

    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SideActivityPanel",
  methods: {
    ...mapActions({

    }),

    /**
     * Event triggered once the drawer has left
     */
    afterLeave () {
      console.log('## DRAWER - AFTER LEAVE');
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
        this.drawer = undefined


        return;
      }

      if (this.showDrawer) {
        this.drawer = drawer;
        return;
      }

      // if (this.mini) {
      //   this.mini = false; // opens the drawer
      this.drawer = drawer;
      this.showDrawer = ! this.showDrawer
      // } else {
      //   this.showDrawer = false; // closes the drawer
      // }

    },
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      user: 'auth/user',

    }),

    routeName () {
      return this.$route.name
    },
  },

  data: () => ({
    //
    tab: 0,

    // show the open/close button (s)
    showToggle: true,

    // show the chat list button (s)
    showChat: true,
    showPeople: false,
    showEvent: false,

    // others (TBD)
    showResources: true,
    showVideoStreaming: true,
    showMeetings: true,
    showEngagement: true,

    // is the menu in mini mode
    mini: true,

    // show (hide) the drawer
    showDrawer: false,

    // which drawer are we showing
    drawer: undefined,

    // width of the navigation
    // width: 360,
    width: 460,

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
