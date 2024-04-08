<!--
[PRO-239] Venue App - User

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-239
-->
<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" no-gutters class="fill-height">
      <v-col class="fill-height" cols="12" sm="12" md="9" :lg="(sideNavigationOpen || sideActivityNavigationOpen) ? 10: 7" :xl="(sideNavigationOpen || sideActivityNavigationOpen) ? 9: 6">


        <!--
        Venue App - User

        This is the component that handles rendering the publicly available "profile" for the User identified by
        the supplied url param (_id).

        @todo - rename _id to _userId
        -->
        <v-sheet width="100%" height="100%" elevation="1" rounded="lg" :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
          <v-container fluid class="fill-height">
            <v-card rounded="lg" flat height="100%" width="100%" class="pa-4">
              <v-row no-gutters>
                <v-col cols="3" align-self="center" align="center">
                  <base-avatar
                    size="lg"
                    :label="fullname"
                    :avatar="avatarImage"
                    :color="avatarColour"
                    :icon="avatarIcon"></base-avatar>
                  <!-- social links -->
                  <v-container class="pa-2">
                    <div style="display: flex; align-items: center; justify-content: center">
                      <v-btn small v-for="btn in socialLinks" :key="btn.name" icon plain @click="redirect(btn.url)" >
                        <v-icon small>{{'mdi-'+btn.name}}</v-icon>
                      </v-btn>
                    </div>
                  </v-container>
                </v-col>
                <v-col cols="9">
                  <v-list two-line class="rounded-lg">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-medium">{{ fullname}}</v-list-item-title>
                        <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <!-- biography -->
                  <v-list two-line subheader class="rounded-lg">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-subtitle  class="mt-1">{{headline}}</v-list-item-subtitle>
                        <v-list-item-title class="text-pre-line">{{ biography }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-sheet>


      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import colors from "~/mixins/colors";
import dayjs from "dayjs";

export default {
  name: "User",
  mixins: [colors],
  data() {
    return {
      avatarColour: null,
      avatarIcon: null,
      avatarImage: null,
    }
  },
  created() {
    this.loadUser(this.$route.params.id)
  },

  watch: {
      me: {
        immediate: true,
        handler(){
          const loggedInUserId = this.me?.userId;
          const visitedId = this.$route.params.id;
          if(loggedInUserId === visitedId){
            this.$router.push('/me/profile')
          }
        }
      },
    avatar: {
      immediate: true,
      handler(){
        this.avatarColour = this.avatar?.colour || 'primary'
        this.avatarIcon = this.avatar?.icon
        this.avatarImage = this.avatar?.image
      }
    },
  },

  computed: {
    ...mapGetters({
      loading: 'users/loading',
      loaded: 'users/loaded',
      user: 'users/user',
      me:"me/me",
    }),
    sideNavigationOpen() {
      return this.$store.state.sideNavigationOpen
    },
    sideActivityNavigationOpen() {
      return this.$store.state.sideActivityNavigationOpen
    },
    avatar () {
      return (this.user) ? this.user.avatar : undefined;
    },
    email () {
      return (this.user) ? this.user.email : undefined;
    },
    fullname () {
      return (this.user) ? this.user.fullname : undefined;
    },
    biography () {
      return (this.user) ? this.user.biography : undefined;
    },
    headline () {
      return (this.user) ? this.user.headline : undefined;
    },
    socialLinks() {
      return (this.user) ? this.user.socialLinks : undefined;
    },
  },
  methods: {
    ...mapActions({
      loadUser: 'users/load',
    }),
    redirect(url) {
      window.open(url, "_blank");
    },
  },
}

</script>
