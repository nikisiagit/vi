<!--
Me Details

A smart component that shows the details of the Me Profiles.
This is a top-level app-like composite component.
-->
<template>
  <v-card rounded="0" :loading="loading" :disabled="disabled">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar elevation="0" class="pa-0 ma-0">
      <v-toolbar-title class="font-weight-medium">
        <v-icon left>mdi-account</v-icon>
        {{ $t('My Profile') }}
      </v-toolbar-title>

    </v-toolbar>

   <div class="d-flex flex-column justify-space-between" style="height: 92%">


     <div>
       <v-list  class="pa-0">

         <!-- avatar -->
         <v-list-item>
           <v-list-item-avatar>
             <me-avatar />
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


     <!-- headling and biography -->
     <!--    <v-list two-line subheader>-->
     <!--      <v-subheader >-->
     <!--        <h4>About me</h4>-->
     <!--        <v-divider inset></v-divider>-->
     <!--      </v-subheader>-->
     <!--      <v-list-item>-->
     <!--        <v-list-item-content>-->
     <!--          <v-list-item-title>-->
     <!--            🤘 Master of Puppets-->
     <!--          </v-list-item-title>-->
     <!--          <v-list-item-subtitle>{{ $t('Headline') }}</v-list-item-subtitle>-->
     <!--        </v-list-item-content>-->
     <!--      </v-list-item>-->

     <!--&lt;!&ndash;      <v-list-item>&ndash;&gt;-->
     <!--&lt;!&ndash;        <v-list-item-content>&ndash;&gt;-->
     <!--&lt;!&ndash;          <v-list-item-title class="text-pre-line">&ndash;&gt;-->
     <!--&lt;!&ndash;            Leading specialist in virtual events, CEO at Ivent.&ndash;&gt;-->

     <!--&lt;!&ndash;            University lecturer in online events and listener of Iron Maiden.&ndash;&gt;-->
     <!--&lt;!&ndash;          </v-list-item-title>&ndash;&gt;-->
     <!--&lt;!&ndash;          <v-list-item-subtitle>{{ $t('Bio') }}</v-list-item-subtitle>&ndash;&gt;-->
     <!--&lt;!&ndash;        </v-list-item-content>&ndash;&gt;-->
     <!--&lt;!&ndash;      </v-list-item>&ndash;&gt;-->

     <!--    </v-list>-->


     <v-container>
       <v-row align="end" justify="end">
         <v-col >
           <v-list outlined subheader class="py-1 rounded-lg">
             <v-subheader class="mt-1">
               <h4>My Preferences</h4>
               <!--              <v-divider inset></v-divider>-->
             </v-subheader>

             <!--        &lt;!&ndash; email &ndash;&gt;-->
             <!--        <v-list-item>-->
             <!--          <v-list-item-content>-->
             <!--            <v-list-item-title>{{ email }}</v-list-item-title>-->
             <!--            <v-list-item-subtitle>{{ $t('Email') }}</v-list-item-subtitle>-->
             <!--          </v-list-item-content>-->
             <!--        </v-list-item>-->

             <!--      &lt;!&ndash; fullname &ndash;&gt;-->
             <!--      <v-list-item>-->
             <!--        <v-list-item-content>-->
             <!--          <v-list-item-title>{{ fullname }}</v-list-item-title>-->
             <!--          <v-list-item-subtitle>{{ $t('fullname') }}</v-list-item-subtitle>-->
             <!--        </v-list-item-content>-->
             <!--      </v-list-item>-->

             <!-- language id -->
             <v-list-item>
               <v-list-item-content>
                 <v-list-item-title>{{ 'English' }}</v-list-item-title>
                 <v-list-item-subtitle>{{ $t('Language') }}</v-list-item-subtitle>
               </v-list-item-content>
             </v-list-item>

             <!-- timezone-id -->
             <v-list-item>
               <v-list-item-content>
                 <v-list-item-title>{{ 'Europe London (+01:00)' }}</v-list-item-title>
                 <v-list-item-subtitle>{{ $t('Timezone') }}</v-list-item-subtitle>
               </v-list-item-content>
             </v-list-item>

             <!-- time-format -->
             <v-list-item two-line>
               <v-list-item-content>
                 <v-list-item-title>24h</v-list-item-title>
                 <v-list-item-subtitle>{{ $t('Time Format') }}</v-list-item-subtitle>
               </v-list-item-content>
               <v-list-item-action>
                 <v-btn-toggle color="primary" class="ml-auto" :value="timeFormatLocal"

                               mandatory>
                   <v-btn value="12h" height="40" width="10" @change="timeFormatLocal = '12h'">
                     <strong :class="{'primary--text': timeFormatLocal === '12h'}">12h</strong>
                   </v-btn>
                   <v-btn value="24h" height="40" width="10" @change="timeFormatLocal = '24h'">
                     <strong :class="{'primary--text': timeFormatLocal === '24h'}">24h</strong>
                   </v-btn>
                 </v-btn-toggle>
               </v-list-item-action>
             </v-list-item>
             <!--      <v-list-item>-->
             <!--        <v-list-item-content>-->
             <!--          <v-list-item-title>{{ timeFormat }}</v-list-item-title>-->
             <!--          <v-list-item-subtitle>{{ $t('me-time-format') }}</v-list-item-subtitle>-->
             <!--        </v-list-item-content>-->
             <!--      </v-list-item>-->

             <!-- themeMode -->

             <v-list-item class="">
               <v-list-item-content>
                 <v-list-item-title>{{ $vuetify.theme.themes.isDark ? 'Dark':'Light' }}</v-list-item-title>
                 <v-list-item-subtitle>{{ $t('Theme Mode') }}</v-list-item-subtitle>
               </v-list-item-content>
               <v-list-item-action>
                 <v-btn-toggle color="primary" class="ml-auto" :value="$vuetify.theme.dark ? 'dark': 'light'"

                               mandatory>
                   <v-btn value="light" height="40" width="10" @change="$vuetify.theme.dark = false">
                     <v-icon :class="{'primary--text': !$vuetify.theme.dark}">mdi-white-balance-sunny</v-icon>
                   </v-btn>
                   <v-btn value="dark" height="40" width="10" @change="$vuetify.theme.dark = true">
                     <v-icon :class="{'primary--text': $vuetify.theme.dark}">mdi-weather-night</v-icon>
                   </v-btn>
                 </v-btn-toggle>
               </v-list-item-action>
             </v-list-item>

             <v-list-item>
               <v-list-item-content>
                 <v-list-item-title>{{ accessibilityEnabled ? 'On': 'Off' }}</v-list-item-title>
                 <v-list-item-subtitle>{{ $t('Accessibility') }}</v-list-item-subtitle>
               </v-list-item-content>

               <v-list-item-action>
                 <v-switch color="primary" hide-details inset v-model="accessibilityEnabled"></v-switch>
               </v-list-item-action>
             </v-list-item>

             <!--      <v-list-item>-->
             <!--        <v-list-item-content>-->
             <!--          <v-list-item-title>{{ themeMode }}</v-list-item-title>-->
             <!--          <v-list-item-subtitle>{{ $t('me-theme-mode') }}</v-list-item-subtitle>-->
             <!--        </v-list-item-content>-->
             <!--      </v-list-item>-->

           </v-list>

         </v-col>
       </v-row>

       <v-row dense>
         <v-col>
           <v-list class="pb-0">

             <v-list-item class="error--text pr-0" >
               <v-list-item-content>
                 <v-list-item-title>
                   <h4>Sign out</h4>
                 </v-list-item-title>
               </v-list-item-content>
               <v-list-item-action class="mb-0">
                 <v-btn plain color="error" @click="signOut">
                   <v-icon>mdi-logout</v-icon>
                 </v-btn>
               </v-list-item-action>
             </v-list-item>
           </v-list>
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
    accessibilityEnabled: false,

    timeFormatLocal: '24h'
  }),

  watch: {
    accessibilityEnabled(){
      this.$emit('accessibility-enabled', this.accessibilityEnabled)
    }
  },

  methods: {
    ...mapActions({
      load: 'me/load',

      signOut: 'auth/signOut',
    })
  },

  computed: {
    ...mapGetters({
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

    roleIds () {
      return (this.me) ? this.me.roleIds : undefined;
    },
  },
}
</script>
