<!--
[PRO-129] Venue App (Admin) Users - Title

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-129

A smart component that renders the UsersApp Title.
-->
<template>
  <v-card rounded>

    <!-- title and actions -->
    <v-card-title>
      <v-icon left>mdi-account</v-icon>
      {{ $t('admin-users-title') }}
      <v-spacer />

      <!-- @todo - add actions here -->
      <v-btn icon
             :loading="loading"
             :disabled="loading"
             @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-btn icon disabled>
        <v-icon>mdi-export</v-icon>
      </v-btn>

      <v-dialog v-model="createUserDialog"  overlay-color="accent">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon rounded v-bind="attrs" v-on="on">
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-users-create-user @close="createUserDialog = false;"/>
      </v-dialog>

    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-users-subtitle')}}
    </v-card-subtitle>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Title",

  data: () => ({
    createUserDialog: false,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/users/load',
      reload: 'apps/admin/users/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/users/loading',

      users: 'apps/admin/users/users',
      numberOfUsers: 'apps/admin/users/numberOfUsers',
      loaded: 'apps/admin/users/loaded',
    })
  },
}
</script>
