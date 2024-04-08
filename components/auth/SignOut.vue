<!--
Auth - Sign Out

This smart component uses Amplify to sign the user out.
-->
<template>
  <div>
    <v-card v-if="! noCard" :loading="loading">
      <template slot="progress">
        <v-progress-linear height="4" indeterminate />
      </template>

      <v-card-title>
        <v-icon left>mdi-account-lock</v-icon>
        <v-fade-transition>
          <span v-if="signingOut">{{ $t('auth-signing-out') }}</span>
          <span v-else>{{ $t('auth-sign-out') }}</span>
        </v-fade-transition>

        <v-spacer />

        <!-- @todo remove the active state from this button -->
        <!-- https://stackoverflow.com/questions/57830767/is-it-default-for-vuetify-to-keep-active-state-on-buttons-after-click-how-do-yo -->
        <v-btn icon @click="showHelp = !showHelp;">
          <v-icon>mdi-help-circle</v-icon>
        </v-btn>
      </v-card-title>

      <v-slide-y-transition>
        <v-container fluid v-if="showHelp">
          <v-row>
            <v-col class="px-4">
            <span>
              {{ $t('auth-sign-out') }}
            </span>
            </v-col>
          </v-row>
        </v-container>
      </v-slide-y-transition>

      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-btn block @click="submit" color="primary">
              {{ $t('auth-sign-out')}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-btn v-else block height="50" text color="error" @click="signOut">
      <h4>{{ 'auth-sign-out' }}</h4>
      <v-spacer></v-spacer>
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SignOut",
  props: {
    noCard: {
      type: Boolean,
      default: false
    }
  },

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  watch: {
    user: {
      immediate: true,
      handler () {
        this.disabled = ! this.user;
      },
    }
  },

  methods: {
    ...mapActions({
      signOut: 'auth/signOut',
      load: 'auth/load',
    }),

    async submit () {
      await this.signOut();
    },
  },

  computed: {
    ...mapGetters({
      loading: 'auth/loading',
      loaded: 'auth/loaded',
      user: 'auth/user',
      error: 'auth/error',
      signingOut: 'auth/signingOut'
    })
  },

  data: () => ({
    disabled: true,
    showHelp: false,
  }),
}
</script>
