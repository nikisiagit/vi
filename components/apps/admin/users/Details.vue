<!--
[PRO-129] Venue App (Admin) Users - Title

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-129

A smart component that renders the UsersApp Details/settings.
-->
<template>
  <v-card>
    <!-- title and actions -->
    <v-card-title>
      <v-icon left>mdi-account</v-icon>
      {{ $t('admin-users-settings-title') }}
      <v-spacer />
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-users-settings-subtitle')}}
    </v-card-subtitle>

    <v-list>
      <!-- access -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ access }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-users-access') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="openUpdateAccessDialog('admin-users-access')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- mfa -->
      <!-- https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-mfa.html -->

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ mfa }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-users-mfa') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="openUpdateAccessDialog('admin-users-mfa')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- social sign in providers -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>
            <template v-if="socialSignInProviders && socialSignInProviders.google != undefined">
              <v-icon class="social-icon" size="medium" color="primary">mdi-google</v-icon>
            </template>
            <template v-if="socialSignInProviders && socialSignInProviders.facebook != undefined">
              <v-icon class="social-icon" size="medium" color="primary">mdi-facebook</v-icon>
            </template>
            <template v-if="socialSignInProviders && socialSignInProviders.apple != undefined">
              <v-icon class="social-icon" size="medium" color="primary">mdi-apple</v-icon>
            </template>
          </v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-users-social-sign-in-providers') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="openUpdateAccessDialog('admin-users-social-sign-in-providers')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-dialog
      v-model="updateAccessDialog"
      width="800px">
      <template v-if="updateAccessDialog && updateUserAccessProperty === 'admin-users-access'">
        <apps-admin-users-update-access  @close="onClose" />
      </template>
      <template v-if="updateAccessDialog && updateUserAccessProperty === 'admin-users-social-sign-in-providers'">
        <apps-admin-users-update-social-sign-in @close="onClose"/>
      </template>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",
  data () {
    return {
      updateAccessDialog: false,
      updateUserAccessProperty: undefined,
      accessLocal: undefined,
    }
  },

  async created () {
    if (! this.loaded &&! this.loaded) {
      await this.load();
      await this.createUsersSettings();
    }
  },

  watch: {
    access: {
      immediate: true,
      handler () {
        this.accessLocal = this.access;
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/users-settings/load',
      createUsersSettings: 'apps/admin/users-settings/createUsersSettings',
    }),

    openUpdateAccessDialog(property){
      this.updateUserAccessProperty = property
      this.updateAccessDialog = true;
    },

    onClose(){
      this.updateAccessDialog = false;
      this.updateUserAccessProperty = ''
    }
  },
  computed: {
    ...mapGetters({
      usersSettings: 'apps/admin/users-settings/usersSettings',
      webClientId: 'apps/admin/users/access/webClientId',
      userPoolId: 'apps/admin/users/access/userPoolId',
      userPoolRegion: 'apps/admin/users/access/userPoolRegion',
    }),

    access () {
      return (this.usersSettings) ? this.usersSettings.access : undefined;
    },

    mfa () {
      return true;
    },

    socialSignInProviders () {
      return (this.usersSettings) ? this.usersSettings.socialSignInProviders : undefined;
    },
  },
}
</script>
