<!--
[PRO-159] Venue App - Auth

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-159

This component provides components that enable a User to authenticate etc.
-->
<template>
  <div>

    <template v-if="showResetPassword && ! localUser">
      <auth-forgot-password />
    </template>

    <template v-else-if="showSignUp && ! localUser">
      <auth-sign-up />
    </template>

   <v-template v-else>
     <auth-sign-in v-show="! localUser || completeNewPassword" />

     <auth-new-password-required v-show="localUser && ! completeNewPassword"/>
   </v-template>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AuthContainer",

  computed: {
    ...mapGetters({
      user: 'auth/user',
      localUser: 'auth/localUser',
      error: 'auth/error',
      loading: 'auth/loading',
      loaded: 'auth/loaded',

      completeNewPassword: 'auth/completeNewPassword',

      showResetPassword: 'auth/showResetPassword',
      showSignUp: 'auth/showSignUp',
    }),
  },

  methods: {
    ...mapActions({

    }),

  },

  data: () => ({

  }),
}
</script>
