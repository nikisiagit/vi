<!--
[PRO-236] Venue App (Admin) - Email - Identities List

@linl https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-236

A smart component that renders the list of EmailIdentities that belong to the Partition and can
be managed by the Admin.
-->
<template>
  <v-card rounded :loading="loading">

    <!-- progress -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>


    <!-- title/actions -->
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('admin-email-identities-list-title')}} ({{ numberOfEmailIdentities }})

      <v-spacer />

      <!-- create email identity dialog -->
      <v-dialog v-model="createEmailIdentityDialog" max-width="1000px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 v-bind="attrs"
                 v-on="on"
                 class="ml-2">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-email-identities-create-email-identity @close="createEmailIdentityDialog = false;" />
      </v-dialog>


      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-email-identities-list-subtitle') }}
    </v-card-subtitle>


    <!-- the list of EmailIdentities -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">

          <v-list v-if="numberOfEmailIdentities > 0">
            <apps-admin-email-identity-nav-list-item
              v-for="emailIdentity in emailIdentities"
              :key="emailIdentity.emailIdentityId"
              :email-identity-id="emailIdentity.emailIdentityId"
            />
          </v-list>

        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

  data: () => ({
    createEmailIdentityDialog: false,
  }),

  async created() {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/email-identities/load',
      reload: 'apps/admin/email-identities/reload',
      initialised: 'apps/admin/email-identities/initialised',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/email-identities/loading',
      loaded: 'apps/admin/email-identities/loaded',
      error: 'apps/admin/email-identities/error',
      emailIdentities: 'apps/admin/email-identities/emailIdentities',
      numberOfEmailIdentities: 'apps/admin/email-identities/numberOfEmailIdentities',
    })
  },
}
</script>
