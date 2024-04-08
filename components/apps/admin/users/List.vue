<template>
  <v-card rounded>

    <v-card-title>
      <v-icon left>mdi-account</v-icon>
      {{ $t('users') }} ({{ numberOfUsers }})
      <v-spacer />

      <!--
      @todo - add action button here to manually flip the view from table to list
      -->
    </v-card-title>

    <v-container fluid>
      <v-row>
        <v-col>

          <v-list v-if="$vuetify.breakpoint.mobile">
            <apps-admin-user-nav-list-item
              v-for="user in users"
              :key="user.userId"
              :userId="user.userId"
            />
          </v-list>

          <v-data-table
            class="users_table"
            v-else :items="users"
            :headers="headers"
            @click:row="onRowClick"/>

        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    createUserDialog: false,

    headers: [
      {
        text: 'fullname',
        align: 'start',
        value: 'fullname',
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
      reload: 'apps/admin/users/reload',
    }),

    /**
     * Handle the table row "click" event.
     *
     * Redirect the Admin to the User detail/view Page/App.
     *
     * @param item
     */
    onRowClick (item) {
      let {userId} = item;
      console.log(`## ON ROW CLICK - REDIRECT TO USER ID: ${userId}`);

      this.$router.push({name: 'apps-admin-users-userId', params: {userId: item.userId}});
    },

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

