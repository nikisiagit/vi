<!--
Me Debug

A smart component that renders some useful debug information about the Me Store.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account-circle</v-icon>
      {{ $t('me-debug') }}

      <v-spacer />

      <v-btn icon @click="reload" :loading="loading">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-list>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ profileId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('me-profile-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loading }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('me-loading') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ loaded }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('me-loaded') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Debug",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'me/load',
      reload: 'me/reload',
    }),
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      loaded: 'me/loaded',
      loading: 'me/loading',
    }),

    profileId () {
      return (this.me) ? this.me.profileId : undefined;
    },
  },
}
</script>
