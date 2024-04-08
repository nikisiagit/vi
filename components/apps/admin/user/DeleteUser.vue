<template>
  <v-card>

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account-circle</v-icon>
      {{ $t('delete-user') }}
    </v-card-title>

    <v-list>
      <v-list-item>
        <v-list-item-content>

          <v-btn @click="openDialog"
                 class="d-flex justify-space-between"
                 style="background-color: red"
          >
            <span class="mx-1">Delete User</span>
            <v-icon color="white">mdi-delete</v-icon>
          </v-btn>

        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- Dialog component -->
    <v-dialog v-model="dialog" max-width="390">

      <!--
      DeleteUserConfirmation component
      @todo convert this into a component?
      -->
<!--      <v-card style="background-color: whitesmoke; color: black">-->
      <v-card>
        <v-card-title>{{ $t('admin-user-confirm-delete') }}</v-card-title>

        <v-card-text>{{ $t('Are you sure you want to delete this user?') }}</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog = false">{{ $t('Cancel') }}</v-btn>
          <v-btn color="red darken-1" text @click="deleteUserConfirmed">{{ $t('Delete') }}</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DeleteUser",
  props: {
    userId: {
      type: String,
      required: true,
    }
  },
  data: () => ({
    dialog: false,
  }),

  methods: {
    ...mapActions({
      removeUser: 'apps/admin/users/removeUser',
    }),

    async deleteUserConfirmed () {
      await this.deleteUser();
      this.dialog = false;
    },

    openDialog () {
      this.dialog = true;
    },
    async deleteUser () {
      // @todo we'll need to rename removeUser to deleteUser
     const response = await this.removeUser(this.userId);

     if (response) {
       await this.$router.push({name: 'apps-admin-users'});
     }
    },
  },
}
</script>
