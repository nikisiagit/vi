<!--
Venue App (Admin) Profile Page

The Profile Page is used by Admins to view and manage a Profile.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-user-details :userId="userId"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "User",
  layout: 'admin',

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadUserWithUserId: 'apps/admin/users/loadUserWithUserId',
    }),

    async load () {
      return await (this.userId) ? this.loadUserWithUserId(this.userId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      userWithUserId: 'apps/admin/users/userWithUserId',
    }),

    userId () {
      return this.$route.params.userId || undefined;
    },

    user () {
      return (this.userId) ? this.userWithUserId(this.userId) : undefined;
    },

    loaded () {
      return (this.user) ? this.user.loaded : false;
    },

    loading () {
      return (this.user) ? this.user.loading : false;
    },
  },
}
</script>
