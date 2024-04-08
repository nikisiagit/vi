<!--
[PRO-236] Venue App (Admin) - Email - Identities - Table


A smart component that renders the EmailIdentities in a table.
-->
<template>
  <v-card :loading="loading" rounded>

    <!-- progress -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title/actions -->
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('admin-email-identities-table-title')}} ({{ numberOfEmailIdentities }})

      <v-spacer />

      <!-- create email identity dialog -->
      <v-dialog v-model="createEmailIdentityDialog"
                max-width="1000px">
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

      <!-- reload the store -->
      <v-btn icon
             :loading="loading"
             :disabled="loading"
             @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-email-identities-table-subtitle') }}
    </v-card-subtitle>

    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table :items="emailIdentities"
                        :headers="headers"
                        :loading="loading">
            <!-- header -->

            <!-- items -->
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Table",

  data: () => ({
    createEmailIdentityDialog: false,

    headers: [
      {
        text: 'emailIdentityId',
        align: 'start',
        value: 'emailIdentityId',
        sortable: true,
      },
      {
        text: 'emailAddress',
        align: 'start',
        value: 'emailAddress',
        sortable: true,
      },
      {
        text: 'verified',
        align: 'start',
        value: 'verified',
        sortable: true,
      },
      {
        text: 'actions',
        align: 'right',
        value: 'actions',
        sortable: false,
      }
    ],
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
