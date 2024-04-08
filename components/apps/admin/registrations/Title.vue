<!--
Venue App (Admin) Registrations - Title

A smart component that renders the RegistrationsApp Title.
-->
<template>
  <v-card rounded>

    <!-- title and actions -->
    <v-card-title>
      <v-icon left>mdi-form-select</v-icon>
      {{ $t('registrations-title') }}
      <v-spacer />

      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-icon class="mr-3" v-if="latestAlert.type === 'success'" color="success" v-on="on">mdi-check-circle</v-icon>
          <v-icon class="mr-3" v-else-if="latestAlert.type === 'error'" color="error" v-on="on">mdi-alert-circle</v-icon>
        </template>
        <span>{{ $t('new-alert') }}</span>
      </v-tooltip>

      <v-dialog v-model="createRegistrationDialog" overlay-color="dark"
                max-width="800px"
                transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">

          <v-btn v-if="$vuetify.breakpoint.mobile" v-bind="attrs" v-on="on" icon color="primary">
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <v-btn v-else v-bind="attrs" v-on="on" medium color="primary">
            Create Registration
            <v-icon right>mdi-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-registrations-create-registration @close="createRegistrationDialog = false;"/>
      </v-dialog>
    </v-card-title>


    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('registrations-subtitle')}}
    </v-card-subtitle>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Title",

  data: () => ({
    createRegistrationDialog: false,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/registrations/load',
      reload: 'apps/admin/registrations/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/registrations/loading',
      alerts: "apps/admin/registrations/alerts",
      registrations: 'apps/admin/registrations/registrations',
      numberOfRegistrations: 'apps/admin/registrations/numberOfRegistrations',
      loaded: 'apps/admin/registrations/loaded',
    }),

    latestAlert() {
      const latestAlert = this.alerts[this.alerts.length - 1];
      if (!latestAlert) return '';
      return latestAlert;
    },
  },
}
</script>
