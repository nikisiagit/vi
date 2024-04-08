<template>
  <v-card rounded>
    <apps-admin-registrations-alerts-list v-if="$vuetify.breakpoint.mobile" :alerts="alerts" />
    <apps-admin-registrations-alerts-table v-else :alerts="alerts" :headers="headers" @view-alert="viewAlertDialog" />

    <v-dialog v-model="viewAlert" max-width="800px" transition="dialog-bottom-transition">
      <apps-admin-registrations-alert-view :alert="selected" @close="viewAlert = false;" />
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Alerts",

  async created() {
    if (!this.loaded && !this.loading) {
      await this.load();
    }
  },
  data: () => ({
    viewAlert: false,
    selected: {},
    headers: [
      {
        text: '',
        align: 'start',
        value: 'type',
        sortable: true,
        width: '5%',
      },
      {
        text: 'alerts',
        align: 'start',
        value: 'alerts',
        sortable: true,
        width: '40%',
      },
      {
        text: 'generated',
        align: 'start',
        value: 'generated',
        sortable: true,
        width: '40%',
      },
      {
        text: 'actions',
        align: 'start',
        value: 'actions',
        sortable: false,
        width: '15%',
      }
    ],
  }),
  computed: {
    ...mapGetters({
      alerts: "apps/admin/registrations/alerts",
      numberOfAlerts: "apps/admin/registrations/numberOfAlerts",
    }),
  },
  methods: {
    ...mapActions({
      load: "apps/admin/registrations/load",
      clearAlerts: "apps/admin/registrations/clearAlerts",
    }),
    viewAlertDialog(alert) {
      this.selected = alert;
      this.viewAlert = true;
    },
  },
};
</script>
