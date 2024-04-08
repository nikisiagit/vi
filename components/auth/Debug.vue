<!--
Auth Debug

This smart component renders some useful debug information about the Auth Store and the User object.
-->
<template>
  <v-card :loading="loading" :disabled="disabled">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account-lock</v-icon>
      {{ $t('auth-debug') }}

      <v-spacer />

      <v-btn icon @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

    </v-card-title>

    <v-list>

      <!-- username -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ username }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('username') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- loaded -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loaded }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('auth-loaded') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- loading -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loading }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('auth-loading') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- signing in -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ signingIn }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('auth-signing-in') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- signing out -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ signingOut }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('auth-signing-out') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-list>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Debug",

  methods: {
    ...mapActions({
      load: 'auth/load',
      reload: 'auth/reload',
    }),
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',

      loaded: 'auth/loaded',
      loading: 'auth/loading',
      signingIn: 'auth/signingIn',
      signingOut: 'auth/signingOut',
    }),

    /**
     * The Users username attribute.
     *
     * @returns {*|undefined}
     */
    username () {
      return (this.user) ? this.user.username : undefined;
    },
  },

  data: () => ({
    disabled: false,
  }),
}
</script>

