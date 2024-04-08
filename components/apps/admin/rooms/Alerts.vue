<template>
  <v-card rounded>
    <apps-admin-rooms-alerts-list v-if="$vuetify.breakpoint.mobile" :alerts="alerts" />
    <apps-admin-rooms-alerts-table v-else :alerts="alerts" :headers="headers" @view-alert="viewAlertDialog" />

    <v-dialog v-model="viewAlert" max-width="800px" hide-overlay transition="dialog-bottom-transition">
      <apps-admin-rooms-alert-view :alert="selected" @close="viewAlert = false;" />
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
      alerts: "apps/admin/rooms/alerts",
      numberOfAlerts: "apps/admin/rooms/numberOfAlerts",
    }),
  },
  methods: {
    ...mapActions({
      load: "apps/admin/rooms/load",
      clearAlerts: "apps/admin/rooms/clearAlerts",
    }),
    viewAlertDialog(alert) {
      this.selected = alert;
      this.viewAlert = true;
    },
  },
};
</script>
