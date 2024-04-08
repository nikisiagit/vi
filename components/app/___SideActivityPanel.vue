<!--
App Side Activity Panel Nav

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
                         color="primary darken-1"
                         :mini-variant-width="miniVariantWidth">

      <!-- the navigation item avatars -->
      <div class="fill-height d-flex flex-column justify-start"> <!-- pa-3  -->

<!--        <v-divider></v-divider>-->

        <!-- open/close the navigation -->
<!--        <v-fade-transition mode="out-in">-->
<!--          <v-list class="pa-0" flat v-show="showToggle">-->
<!--            <v-list-item :disabled="! drawer" @click="showDrawer = !showDrawer">-->
<!--              <v-list-item-icon class="my-auto">-->
<!--                <v-fade-transition mode="out-in">-->
<!--                  <v-icon color="primary lighten-3" key="left" v-if="! showDrawer">mdi-chevron-left</v-icon>-->
<!--                  <v-icon color="primary lighten-3" key="right" v-else>mdi-chevron-right</v-icon>-->
<!--                </v-fade-transition>-->
<!--              </v-list-item-icon>-->

<!--              <v-list-item-content>-->
<!--                <v-list-item-title>{{ $t('close') }}</v-list-item-title>-->
<!--                <v-list-item-subtitle>{{ $t('close') }}</v-list-item-subtitle>-->
<!--              </v-list-item-content>-->
<!--            </v-list-item>-->
<!--          </v-list>-->
<!--        </v-fade-transition>-->

        <v-hover v-slot="{ hover }">
          <v-list :color="hover || drawer === 'event' ? 'primary' : undefined" flat v-show="showEvent">
            <!-- open (or close)  the drawer with the event event component -->
            <v-list-item class="pa-0">
              <v-list-item-icon class="ma-auto">
                <v-tooltip  open-on-focus left nudge-right="10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             @click="toggleDrawer('event')"
                             :color="hover || drawer === 'event' ? 'primary darken-3': 'primary lighten-3'"
                    >
                      <v-badge

                        color="primary lighten-2"
                        dot

                        class="badge badge-dot-important"
                      >

                        <v-icon v-if="drawer === 'event'" class="badge-important scale-icon" >mdi-shape</v-icon>
                        <v-icon v-else class="badge-important scale-icon" >mdi-shape-outline</v-icon>


                      </v-badge>
                      <!--                <v-hover v-slot="{ hover }">-->

                      <!--                </v-hover>-->
                    </v-btn>
                  </template>

                  <span>Event Activities</span>
                </v-tooltip>

              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-hover>

        <!--        <v-list :color="drawer === 'meetings' ? 'primary' : undefined" flat v-show="layout === 'exhibit' && showMeetings">-->
        <!--          &lt;!&ndash; open (or close)  the drawer with the event meetings component &ndash;&gt;-->
        <!--          <v-list-item class="pa-0">-->
        <!--            <v-list-item-avatar class="ma-auto">-->
        <!--              <v-btn icon-->
        <!--                     @click="toggleDrawer('meetings')"-->
        <!--                     :color="drawer === 'meetings' ? 'primary darken-3': 'primary lighten-3'"-->
        <!--              >-->
        <!--&lt;!&ndash;                <v-hover v-slot="{ hover }">&ndash;&gt;-->
        <!--                  <v-icon>mdi-calendar</v-icon>-->
        <!--&lt;!&ndash;                </v-hover>&ndash;&gt;-->
        <!--              </v-btn>-->
        <!--            </v-list-item-avatar>-->
        <!--          </v-list-item>-->
        <!--        </v-list>-->

        <v-divider></v-divider>

        <v-hover v-slot="{ hover }">
          <v-list v-if="['events-eventId-stage-stageId', 'events-eventId-exhibitors-exhibitorId', 'events-eventId-networking-networkingId'].includes(routeName)" :color="hover || drawer === 'people' ? 'primary' : undefined" flat v-show="showPeople">
            <!-- open (or close)  the drawer with the event people component -->
            <v-list-item class="pa-0">
              <v-list-item-avatar class="ma-auto">
                <v-tooltip  open-on-focus left nudge-right="10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             @click="toggleDrawer('people')"
                             :color="hover || drawer === 'people' ? 'primary darken-3': 'primary lighten-3'"
                    >
                      <!--                <v-hover v-slot="{ hover }">-->
                      <v-icon v-if="drawer === 'people'" class="scale-icon" >mdi-account-multiple</v-icon>
                      <v-icon v-else class="scale-icon" >mdi-account-multiple-outline</v-icon>

                      <!--                </v-hover>-->
                    </v-btn>
                  </template>

                  <span>People</span>
                </v-tooltip>

              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-hover>

        <!-- event chat -->
        <!-- open the navigation with the event chat component -->
        <v-hover v-slot="{ hover }">
          <v-list v-if="['events-eventId-stage-stageId', 'events-eventId-exhibitors-exhibitorId', 'events-eventId-networking-networkingId'].includes(routeName)" :color="hover || drawer === 'chat' ? 'primary' : undefined" flat v-show="showChat">
            <!-- open (or close)  the drawer with the event chat component -->
            <v-list-item class="pa-0">
              <v-list-item-avatar class="ma-auto">
                <v-tooltip  open-on-focus left nudge-right="10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             @click="toggleDrawer('chat')"
                             :color="hover || drawer === 'chat' ? 'primary darken-3': 'primary lighten-3'"
                    >
                      <!--                <v-hover v-slot="{ hover }">-->
                      <v-icon v-if="drawer === 'chat'" class="scale-icon" >mdi-forum</v-icon>
                      <v-icon v-else class="scale-icon" >mdi-forum-outline</v-icon>
                      <!--                </v-hover>-->
                    </v-btn>
                  </template>

                  <span>Chat</span>
                </v-tooltip>
              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-hover>

        <v-hover v-slot="{ hover }">
          <v-list v-if="['events-eventId-stage-stageId'].includes(routeName)" :color="hover || drawer === 'resources' ? 'primary' : undefined" flat v-show="showResources">
            <!-- open (or close)  the drawer with the event resource component -->
            <v-list-item class="pa-0">
              <v-list-item-avatar class="ma-auto">
                <v-tooltip  open-on-focus left nudge-right="10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             @click="toggleDrawer('resources')"
                             :color="hover || drawer === 'resources' ? 'primary darken-3': 'primary lighten-3'"
                    >
                      <v-icon>mdi-tray-arrow-down</v-icon>

                    </v-btn>
                  </template>

                  <span>Downloads</span>
                </v-tooltip>
              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-hover>

        <v-hover v-slot="{ hover }">
          <v-list :color="hover || drawer === 'engagement' ? 'primary' : undefined" flat v-show="layout === 'exhibit' && showEngagement">
            <!-- open (or close)  the drawer with the event engagement component -->
            <v-list-item class="pa-0">
              <v-list-item-avatar class="ma-auto">
                <v-tooltip  open-on-focus left nudge-right="10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             @click="toggleDrawer('engagement')"
                             :color="hover || drawer === 'engagement' ? 'primary darken-3': 'primary lighten-3'"
                    >
                      <!--                <v-hover v-slot="{ hover }">-->
                      <v-icon v-if="drawer === 'camera'" class="scale-icon" >mdi-camera</v-icon>
                      <v-icon v-else class="scale-icon" >mdi-camera-outline</v-icon>
                      <!--                </v-hover>-->
                    </v-btn>
                  </template>

                  <span>Engagement</span>
                </v-tooltip>

              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-hover>

        <v-hover v-slot="{ hover }">
          <v-list v-if="$route.params.stageId === 'stage-3'" :color="hover || drawer === 'video-streaming' ? 'primary' : undefined" flat v-show="showVideoStreaming">
            <!-- open (or close)  the drawer with the event video-streaming component -->
            <v-list-item class="pa-0">
              <v-list-item-avatar class="ma-auto">
                <v-tooltip  open-on-focus left nudge-right="10">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn   v-bind="attrs"
                             v-on="on" icon
                             @click="toggleDrawer('video-streaming')"
                             :color="hover || drawer === 'video-streaming' ? 'primary darken-3': 'primary lighten-3'"
                    >
                      <!--                <v-hover v-slot="{ hover }">-->
                      <v-icon class="scale-icon">mdi-television-classic</v-icon>
                      <!--                </v-hover>-->
                    </v-btn>
                  </template>

                  <span>Live streaming</span>
                </v-tooltip>

              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-hover>

      </div>
    </v-navigation-drawer>

    <!-- the content drawer -->
    <v-navigation-drawer v-show="(! sideNavigationOpen && showDrawer) || lastNavigationOpened[lastNavigationOpened.length - 1] === 'activity'"

                         :temporary="sideNavigationOpen && showDrawer"

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

              <v-card class="fill-height" v-if="drawer === 'people'" key="people">
                <v-card-title>
                  <v-icon left>mdi-account-multiple</v-icon>
                  {{ $t('People') }}
                </v-card-title>
                <v-divider></v-divider>

                <v-container fluid>
                  <v-row>
                    <v-col>
                      <area-components-mockups-people-list></area-components-mockups-people-list>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>

              <div class="fill-height" v-show="drawer === 'video-streaming'" key="video-streaming">
                <daily-call-live-stream></daily-call-live-stream>
              </div>

              <v-card class="fill-height" v-if="drawer === 'resources'" key="people">
                <v-card-title>
                  {{ $t('Downloads') }}
                </v-card-title>
                <v-divider></v-divider>

                <v-container fluid>
                  <v-row>
                    <v-col>
                      <area-components-mockups-resources-downloads-list></area-components-mockups-resources-downloads-list>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>

              <v-sheet style="height: calc(100% - 123px)" v-if="drawer === 'event'" key="event">
                <v-card-title>
                  <v-icon left>mdi-shape</v-icon>
                  {{ $t('Event Activities') }}
                </v-card-title>
                <v-divider></v-divider>

                <v-tabs
                  centered
                  class="mb-2"
                >
                  <v-tabs-slider></v-tabs-slider>

                  <v-tabs v-model="tab">
                    <v-tab>
                      Chat
                    </v-tab>
                    <v-tab>
                      Q&A
                    </v-tab>
                    <v-tab>
                      People
                    </v-tab>
                    <v-tab>
                      Twitter
                    </v-tab>

<!--                    <v-tab>-->
<!--                      Polls-->
<!--                    </v-tab>-->

<!--                    <v-tab>-->
<!--                      Q&A-->
<!--                    </v-tab>-->
                  </v-tabs>
                </v-tabs>


                <v-tabs-items class="fill-height" v-model="tab">
                  <v-tab-item> <!-- chat:demo:TRRkh99YnbyjF5dJkuQqA -->
                    <chats-view-chat public-chat chat-id="chat:demo:Ig05jOGaNQTP8Asx2TY8J" @close="viewChatDialog = false;"/>

                    <!--                        <chats-details />-->
                  </v-tab-item>
                  <v-tab-item> <!-- chat:demo:gRCTmyxSUfssnMwTovpYo -->
                    <chats-view-QA chat-id="chat:demo:Ij_523vnug-L6dSx77fc3" @close="viewChatDialog = false;"/>

                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <area-components-mockups-people-list></area-components-mockups-people-list>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item class="fill-height">
                    <iframe scrolling="yes" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 100%; height: calc(100% - 60px); display: block; flex-grow: 1;" title="Twitter Timeline" src="https://syndication.twitter.com/srv/timeline-profile/screen-name/iventhq?dnt=false&amp;embedId=twitter-widget-1&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOlsibGlua3RyLmVlIiwidHIuZWUiLCJ0ZXJyYS5jb20uYnIiLCJ3d3cubGlua3RyLmVlIiwid3d3LnRyLmVlIiwid3d3LnRlcnJhLmNvbS5iciJdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2hvcml6b25fdGltZWxpbmVfMTIwMzQiOnsiYnVja2V0IjoidHJlYXRtZW50IiwidmVyc2lvbiI6bnVsbH0sInRmd190d2VldF9lZGl0X2JhY2tlbmQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3JlZnNyY19zZXNzaW9uIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19jaGluX3BpbGxzXzE0NzQxIjp7ImJ1Y2tldCI6ImNvbG9yX2ljb25zIiwidmVyc2lvbiI6bnVsbH0sInRmd190d2VldF9yZXN1bHRfbWlncmF0aW9uXzEzOTc5Ijp7ImJ1Y2tldCI6InR3ZWV0X3Jlc3VsdCIsInZlcnNpb24iOm51bGx9LCJ0Zndfc2Vuc2l0aXZlX21lZGlhX2ludGVyc3RpdGlhbF8xMzk2MyI6eyJidWNrZXQiOiJpbnRlcnN0aXRpYWwiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2V4cGVyaW1lbnRzX2Nvb2tpZV9leHBpcmF0aW9uIjp7ImJ1Y2tldCI6MTIwOTYwMCwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0Zndfc2hvd19ibHVlX3ZlcmlmaWVkX2JhZGdlIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd190d2VldF9lZGl0X2Zyb250ZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH19&amp;frame=false&amp;hideBorder=false&amp;hideFooter=false&amp;hideHeader=false&amp;hideScrollBar=false&amp;lang=en&amp;origin=https%3A%2F%2Fapp.hopin.com%2Fevents%2Fthe-glow-conference%2Freception&amp;sessionId=3b18591ea10b0b34cc91cc75095e7639140c51a5&amp;showHeader=true&amp;showReplies=false&amp;transparent=false&amp;widgetsVersion=a3525f077c700%3A1667415560940"></iframe>


                    <!--                  <v-card>-->
                    <!--                    <v-card-text>-->

                    <!--                    </v-card-text>-->
                    <!--                  </v-card>-->
                  </v-tab-item>
                </v-tabs-items>


              </v-sheet>

              <v-sheet style="height: calc(100% - 65px)" v-if="drawer === 'chat'" key="chat">
                <v-card-title>
                  <v-icon left>mdi-forum</v-icon>
                  {{ $t('Chat') }}
                </v-card-title>
                <v-divider></v-divider>

                <!-- chat:demo:TRRkh99YnbyjF5dJkuQqA -->
                <chats-view-chat public-chat chat-id="chat:demo:Ig05jOGaNQTP8Asx2TY8J" @close="viewChatDialog = false;"/>

                <!--                        <chats-details />-->
              </v-sheet>

<!--              <v-card class="fill-height" v-if="drawer === 'meetings'" key="meetings">-->

<!--                <v-container fluid>-->
<!--                  <v-row>-->
<!--                    <v-col >-->
<!--                      <area-components-mockups-meetings-->
<!--                      ></area-components-mockups-meetings>-->
<!--                    </v-col>-->
<!--                  </v-row>-->
<!--                </v-container>-->
<!--              </v-card>-->

              <v-card class="fill-height" v-show="drawer === 'engagement'" key="engagement">

                <v-card-title>
                  <v-icon left>mdi-camera</v-icon>
                  {{ $t('Engagement') }}
                </v-card-title>
                <v-divider></v-divider>
                <v-container fluid>
                  <v-row>
                    <v-col >
                      <iframe id="booth-frame"
                              height="500px"
                              width="100%"
                              src="https://ivent.virtualeventsbooth.com/iventdemo?ondemo=1"
                              frameborder="0"
                              allow="camera; autoplay; encrypted-media;"></iframe>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>

              <!-- the search drawer -->
<!--              <v-slide-y-transition mode="out-in">-->


<!--             -->


<!--              </v-slide-y-transition>-->
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
  props: {
    layout: String,
    default: 'default'
  },
  methods: {
    ...mapActions({
      openSideActivityNavigation: 'app/openSideActivityNavigation',
      closeSideActivityNavigation: 'app/closeSideActivityNavigation',
      setLastNavigationOpened: 'app/setLastNavigationOpened',
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

        // let know at the rest of the app know about the state as global source of truth. (App Store)
        this.closeSideActivityNavigation()

        this.setLastNavigationOpened('activity')

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

      // let know at the rest of the app know about the state as global source of truth. (App Store)
      this.openSideActivityNavigation()

      this.setLastNavigationOpened('activity')
    },
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      user: 'auth/user',

      sideNavigationOpen: 'app/sideNavigationOpen',
      lastNavigationOpened: 'app/lastNavigationOpened'
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

    showPeople: true,
    showEvent: true,
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

<style>
.badge-dot-important .v-badge__wrapper span:after {
  content: '';
  position: absolute;
  /*top: 0.1rem;*/
  /*left: 0.1rem;*/
  top: 0.02rem;
  left: 0.04rem;
  border:2px solid var(--v-primary-base);
  opacity:0;
  border-radius: 50%;
  width:100%;
  height:100%;
  animation: sonar 2s infinite;
}

</style>
