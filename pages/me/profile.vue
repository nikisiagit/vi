<!--
[PRO-99] Venue App - Me

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/2625652?selectedIssue=PRO-99


This smart component

-->
<template>

  <v-container fluid>
    <v-row no-gutters>
      <v-col>
        <v-sheet elevation="1"
                 rounded="lg"
                 class="glass-effect"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'"
        >

          <v-card rounded="lg" flat height="100%" width="100%" class="pa-4">
            <v-row no-gutters>
              <v-col cols="12"
                     sm="12"
                     md="3"
                     align-self="center"
                     align="center">
                <v-badge
                  @click.native="() => openAvatarModal()"
                  icon="mdi-pencil"
                  avatar
                  bordered
                  overlap>
                  <base-avatar
                    size="lg"
                    :label="fullname"
                    :avatar="avatarImage"
                    :color="avatarColour"
                    :icon="avatarIcon"></base-avatar>
                </v-badge>
                <v-dialog
                  v-model="avatarModal"
                  width="500px">
                  <v-card>
                    <v-card-title>
                      Update Avatar
                    </v-card-title>
                    <update-avatar
                      v-if="avatarModal"
                      @close="avatarModal = false;"></update-avatar>
                  </v-card>
                </v-dialog>
                <!-- social links -->
                <v-container class="pa-2">
                  <div style="display: flex; align-items: center; justify-content: center">
                    <v-btn small v-for="btn in socialLinks" :key="btn.name" icon plain @click="redirect(btn.url)" >
                      <v-icon small>{{'mdi-'+btn.name}}</v-icon>
                    </v-btn>
                    <p v-if="!socialLinks">Add Social Links</p>
                    <v-btn small color="primary" @click="() => openSocialLinks()" icon><v-icon small>mdi-pencil</v-icon></v-btn>
                  </div>
                </v-container>
                <v-dialog
                  v-model="socialLinksModal"
                  width="500px">
                  <v-card>
                    <v-card-title>
                      Update Social Links
                    </v-card-title>
                    <update-social-links
                      v-if="socialLinksModal"
                      @close="socialLinksModal = false;"></update-social-links>
                  </v-card>
                </v-dialog>
                <!-- details -->


                <!-- @todo:
     me-profile tabs,
     replace smoke and mirrow,
     add 3 ME stores/repo: me-bookmarks-users, me-tickets, me-library, me-chats?
     -->

                <v-dialog v-model="detailsModal" width="500px">
                  <update-details
                    v-if="detailsModal"
                    @close="detailsModal = false;"
                  ></update-details>
                </v-dialog>


              </v-col>
              <v-col cols="12" sm="12" md="9" >
                <v-list class="align-self-md-center,rounded-lg" two-line>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium">{{ fullname}}</v-list-item-title>
                      <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <!--  update details-->
                    <v-list-item-action>
                      <v-btn @click="() => openDetailsModal()" plain icon>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
                <v-list two-line subheader class="rounded-lg">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle class="mt-1">{{headline}}</v-list-item-subtitle>
                      <v-list-item-title class="text-pre-line">{{ biography }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>


            <!--
            Me Tabs

            @luis - could you extract this into a component.
            -->
            <v-row no-gutters >
              <v-col>
                <me-tabs @show-tab-item="onShowItem" />
              </v-col>
            </v-row>


            <!--
            Me sub sections

            - Events / Tickets // tickets
            - // events
                            - Library ? The list of Resources the User/Me has "starred" //
            - People - the other Users the User/Me has connected with
            - Chats - the list of Chats the User/Me has joined
            -->
            <v-row no-gutters>
              <v-col>

                <v-container fluid>
                  <v-row no-gutters>
                    <v-col>


                      <!-- SHOW ME EVENTS/TICKETS -->
                      <base-render-component :show="showMeTickets">
                        <!-- Me/Events

                          @link PRO-99
                          @link PRK-731
                          Me - Tickets / Me - Events

                          -->
                        <v-container>

                          <v-row>
                            <v-col>

                              <!-- a smart component that renders the list of Tickets that Me has -->
                              <me-tickets-list />


<!--                              <v-subheader>-->
<!--                                <h4>Upcoming</h4>-->
<!--                              </v-subheader>-->

<!--                              <v-card outlined rounded="lg">-->

<!--                                <area-components-mockups-event-list-item-->
<!--                                  :date-day="'28'"-->
<!--                                  :date-month="'NOV'"-->
<!--                                  :time-start="'6:45 AM'"-->
<!--                                  :time-end="'9:42 AM'"-->
<!--                                  :host-name="'Ash Kibir'"-->
<!--                                  :title="'The Engagement value of Gamification with Noonah'"-->
<!--                                  :event-type="'Virtual'"-->
<!--                                  dense-->
<!--                                  :joinable="true"-->
<!--                                />-->
<!--                              </v-card>-->

                            </v-col>
                          </v-row>

                        </v-container>
                      </base-render-component>

                      <!-- SHOW ME LIBRARY -->
                      <base-render-component :show="showMeLibrary">
                        <area-components-mockups-content-hub-resources-list :show-label="false" no-filters />
                      </base-render-component>

                      <!-- SHOW ME PEOPLE -->
                      <base-render-component :show="showMeBookmarksUsers">

                        <me-bookmarks-users-list></me-bookmarks-users-list>

<!--                        <v-container>-->
<!--                          <area-components-mockups-people-list no-filters contact-added />-->
<!--                        </v-container>-->

                      </base-render-component>

                      <!-- SHOW ME CHATS -->
                      <base-render-component :show="showMeChats">
                        <!--                            we need a chat mockup @todo: TBD? -->
                      </base-render-component>


                    </v-col>
                  </v-row>
                </v-container>

              </v-col>
            </v-row>


          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import colors from "~/mixins/colors";
import dayjs from "dayjs";
import UpdateAvatar from "@/components/me/UpdateAvatar.vue";
import UpdateSocialLinks from "@/components/me/UpdateSocialLinks.vue";
import UpdateDetails from "@/components/me/UpdateDetails.vue";

export default {
  name: "Profile",
  components: {UpdateDetails, UpdateSocialLinks, UpdateAvatar},
  mixins: [colors],

  async created () {
    if (! this.loaded && ! this.loading) {
      return await this.load();
    }
  },

  data(){
    return {
      tab: null,
      avatarModal: false,
      socialLinksModal: false,
      detailsModal:false,
      avatarColour: null,
      avatarIcon: null,
      avatarImage: null,

      showMeTickets: false,
      showMeBookmarksUsers: false,
      showMeChats: false,
      showMeLibrary: false,
    }
  },

  watch: {
    avatar: {
      immediate: true,
      handler(){
        this.avatarColour = this.avatar?.colour || 'primary'
        this.avatarIcon = this.avatar?.icon
        this.avatarImage = this.avatar?.image
      }
    },
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
      updateMe: 'me/updateMe',
    }),

    resetShowItems(){
      this.showMeBookmarksUsers = false
      this.showMeTickets = false
      this.showMeLibrary = false
      this.showMeChats = false

    },

    onShowItem(tabType){
      this.resetShowItems()

      switch (tabType) {
        case 'me-tickets':
          this.showMeTickets = true
          console.log('me-tickets clicked')
          break;

        case 'me-bookmarks-users':
          this.showMeBookmarksUsers = true
          console.log('me-bookmarks-users clicked')
          break;

        case 'me-chats':
          this.showMeChats = true
          console.log('me-chats clicked')
          break;

        case 'me-library':
          this.showMeLibrary = true
          console.log('me-library clicked')
          break;

        default:
          console.log('tabType not found')
      }

    },

    openAvatarModal() {
      this.avatarModal = true;
    },

    openSocialLinks() {
      this.socialLinksModal = true;
    },

    openDetailsModal() {
      this.detailsModal = true;
    },

    redirect(url) {
      window.open(url, "_blank");
    },

    async load() {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    time(date) {
      return dayjs(date).format("hh:mm A");
    },

    dateMonth(date){
      return dayjs(date).format("MMMM")?.slice(0, 3).toUpperCase();
    },

    dateDay(date){
      return dayjs(date).format("DD");
    },

    scrollToComponent(componentRef) {
      const el = this.$refs[componentRef]?.$el;

      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    },
  },

  computed: {
    ...mapGetters({
      eventWithEventId: 'apps/admin/events/eventWithEventId',
      // initialised: 'events/initialised',
      sideNavigationOpen: 'app/sideNavigationOpen',
      sideActivityNavigationOpen: 'app/sideActivityNavigationOpen',
      me: 'me/me',
      loading: 'me/loading',
      loaded: 'me/loaded',
    }),

    avatar () {
      return (this.me) ? this.me.avatar : undefined;
    },

    email () {
      return (this.me) ? this.me.email : undefined;
    },

    fullname () {
      return (this.me) ? this.me.fullname : undefined;
    },

    languageId () {
      return (this.me) ? this.me.languageId : undefined;
    },

    timezoneId () {
      return (this.me) ? this.me.timezoneId : undefined;
    },

    themeMode () {
      return (this.me) ? this.me.themeMode : undefined;
    },

    timeFormat () {
      return (this.me) ? this.me.timeFormat : undefined;
    },

    userId () {
      return (this.me) ? this.me.userId : undefined;
    },

    name () {
      return (this.me) ? this.me.name : undefined;
    },

    biography () {
      return (this.me) ? this.me.biography?.text : undefined;
    },
    headline () {
      return (this.me) ? this.me.headline?.text : undefined;
    },
    socialLinks() {
      return (this.me) ? this.me.socialLinks : undefined;
    },

    tickets () {
      return (this.me) ? this.me.tickets : undefined;
    },

    library () {
      return (this.me) ? this.me.library : undefined;
    },

    vTheme(){
      return this.getComponentVTheme('primary', '', true)
    },

    eventId () {
      return this.$route.params.eventId || undefined;
    },

    /**
     * The Event.
     *
     * @returns {*|undefined}
     */
    event() {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },
  }
}
</script>

<style scoped>
.v-list-item__content {
  padding: 0 !important;
}
.avatar-badge .v-badge__wrapper {
  left: -20px !important;
  top: 10px !important;
  pointer-events: auto !important;
  cursor: pointer !important;
}
.v-icon.v-icon::after {
 pointer-events: auto !important;
}
.v-application p {
  margin: 0px !important;
}

.v-badge >>> .v-badge__badge {
  inset: auto auto calc(100% - 17px) calc(100% - 45px) !important;
  cursor: pointer !important;
}

</style>
