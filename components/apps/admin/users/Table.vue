<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon>mdi-badge-account-outline</v-icon>
      {{ $t('users') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('users') }}</v-card-subtitle>
    <v-card-text>
      <v-data-table :items="users" :headers="headers">

      </v-data-table>

    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Table",
  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({

    addLanguageDialog: false,

    headers: [
      {
        text: 'user-id',
        align: 'start',
        value: 'userId',
        sortable: true,
      },

      {
        text: 'email',
        align: 'start',
        value: 'email',
        sortable: true,
      },

      {
        text: 'is-admin',
        align: 'start',
        value: 'isAdmin',
        sortable: true,
      },
    ],
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/users/load',
    })
  },

  computed: {
    ...mapGetters({
      users: 'apps/admin/users/users',
      numberOfUsers: 'apps/admin/users/numberOfUsers',
      loading: 'apps/admin/users/loading',
      loaded: 'apps/admin/users/loaded',
    })
  },
}
</script>


<!--
email: "david+ucas@ivent-pro.com"
name: "0b379f1e-c1ed-49ee-8e68-e1f888fdd83a"
partition: "ucas"
profileId: "profile:ucas:0b379f1e-c1ed-49ee-8e68-e1f888fdd83a"
userId: "user:0b379f1e-c1ed-49ee-8e68-e1f888fdd83a"
-->
