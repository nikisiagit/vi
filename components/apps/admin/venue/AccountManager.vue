<!--
Apps Admin - Venue Account Manager

A smart component that renders the details of the Venue/Partition Account Manager.
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-account-manager')}}
      <v-spacer />
    </v-card-title>

    <v-list>
      <!-- fullname -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ fullname }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-account-manager-fullname') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- email -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ email }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-venue-account-manager-email') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AccountManager",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
    })
  },

  computed: {
    ...mapGetters({
      venue: 'apps/admin/venue/venue',
      loading: 'apps/admin/venue/loading',
      loaded: 'apps/admin/venue/loaded',
    }),

    accountManager () {
      return (this.venue) ? this.venue.accountManager : undefined;
    },

    fullname () {
      return (this.accountManager) ? this.accountManager.fullname : undefined;
    },

    email () {
      return (this.accountManager) ? this.accountManager.email : undefined;
    },
  },
}
</script>
