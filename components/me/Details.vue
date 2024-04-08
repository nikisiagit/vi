<!--
Me Details

A smart component that shows the details of the Me Profiles.
This is a top-level app-like composite component.
-->
<template>
  <v-card style="overflow-y:hidden" height="100vh" :loading="loading" :disabled="disabled">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account-circle</v-icon>
      {{ $t('me-details') }}
      <v-spacer />
    </v-card-title>
    <v-divider></v-divider>

    <div class="d-flex flex-column justify-space-between" style="height: 92%">

      <div>
        <v-list  class="pa-0">
          <!-- avatar -->
          <v-list-item>
            <v-list-item-avatar>
              <base-avatar
                size="sm"
                :label="fullname"
                :avatar="avatarImage"
                :color="avatarColour"
                :icon="avatarIcon"></base-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-if="fullname">{{ fullname }}</v-list-item-title>
              <v-list-item-title v-else>{{ email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-btn color="primary" block text class="justify-start" nuxt :to="{ name: 'me-profile' }">
          <v-icon left >mdi-open-in-new</v-icon>
          detailed view
        </v-btn>
      </div>


    <v-container>
      <v-row align="end" justify="end">
        <!--preferences-->
        <v-col>
          <v-list outlined subheader class="py-1 rounded-lg">
                  <v-subheader class="mt-1">
                    <h4>My Preferences</h4>
                  </v-subheader>
                  <!-- language id -->
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ languageId }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('me-language-id') }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <!--locale/language changer-->
                      <app-language-picker></app-language-picker>
                      <!-- locale changer -->
                    </v-list-item-action>
                  </v-list-item>

                  <!-- timezone-id -->
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ timezoneId }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('me-timezone-id') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <!-- time-format -->
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>{{ timeFormatLocal }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('me-time-format') }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn-toggle
                        color="primary"
                        class="ml-auto"
                        v-model="timeFormatLocal"
                        @change="changeTimeFormat"
                        mandatory>
                        <v-btn value="12h"
                               height="40"
                               width="10">
                          <strong :class="{'primary--text': timeFormatLocal === '12h'}">12h</strong>
                        </v-btn>
                        <v-btn
                          value="24h"
                          height="40"
                          width="10">
                          <strong :class="{'primary--text': timeFormatLocal === '24h'}">24h</strong>
                        </v-btn>
                      </v-btn-toggle>
                    </v-list-item-action>
                  </v-list-item>

                  <!-- themeMode -->
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{capitalize(themeModeLocal)}}</v-list-item-title>
                      <v-list-item-subtitle>{{$t('me-theme-mode')}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn-toggle
                        color="primary"
                        class="ml-auto"
                        v-model="themeModeLocal"
                        @change="changeThemeMode"
                        mandatory
                      >
                        <v-btn
                          value="light"
                          height="40"
                          width="10"
                          @change="$vuetify.theme.dark = false">
                          <v-icon :class="{'primary--text': !$vuetify.theme.dark}">mdi-white-balance-sunny</v-icon>
                        </v-btn>
                        <v-btn
                          value="dark"
                          height="40" width="10"
                          @change="$vuetify.theme.dark = true">
                          <v-icon :class="{'primary--text': $vuetify.theme.dark}">mdi-weather-night</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </v-list-item-action>
                  </v-list-item>

                  <!-- accessibility -->
<!--                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ accessibilityText }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('Accessibility') }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-switch
                        color="primary"
                        hide-details
                        inset
                        @change="changeAccessibility"
                        v-model="accessibilityLocal">
                      </v-switch>
                    </v-list-item-action>
                  </v-list-item>-->
                </v-list>
          <!-- auth-sign-out -->
            <auth-sign-out no-card></auth-sign-out>
          <!-- /auth-sign-out -->
        </v-col>
      </v-row>
    </v-container>
    </div>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    disabled: false,
    timeFormatLocal: undefined,
    themeModeLocal: undefined,
    avatarColour: null,
    avatarIcon: null,
    avatarImage: null,
  }),

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

  mounted() {
      this.timeFormatLocal = this.timeFormat;
      this.themeModeLocal = this.themeMode;
    },

  methods: {
    ...mapActions({
      load: 'me/load',
      updateMe: 'me/updateMe',
    }),
    capitalize(string) {
      return string?.charAt(0).toUpperCase() + string?.slice(1)
    },
    /*saving time format*/
    async changeTimeFormat() {
      try {
        await this.updateMe({ timeFormat: this.timeFormatLocal });
      } catch (error) {
        console.log("error", error);
      }
    },

    /*saving theme mode*/
    async changeThemeMode() {
      try {
        await this.updateMe({ themeMode: this.themeModeLocal });
      } catch (error) {
        console.log("error", error);
      }
    },

  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      user: 'auth/user',
      loading: 'me/loading',
      loaded: 'me/loaded',
    }),


    /**
     * The Users username attribute.
     *
     * @returns {*|undefined}
     */
    username () {
      return (this.user) ? this.user.username : undefined;
    },

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

    profileId () {
      return (this.me) ? this.me.profileId : undefined;
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
  },
}
</script>

<style>
.v-list-item__subtitle {
  font-size: 0.7rem !important;
}

.v-list-item__title {
  font-size: 0.9rem !important;
}

.v-application--is-ltr .v-list-item__avatar:first-child {
  margin-right: 0.6rem !important;
}

.v-btn__content .v-icon.v-icon--left, .v-btn__content .v-icon.v-icon--right {
  margin: 0 !important;
  font-size: 0.8rem !important;
}
.v-btn__content {
  font-size: 0.7rem !important;
}

</style>
