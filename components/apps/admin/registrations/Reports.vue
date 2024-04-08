<template>
  <v-card rounded>
    <apps-admin-registrations-reports-list v-if="$vuetify.breakpoint.mobile" :reports="reports" />

    <apps-admin-registrations-reports-table
      v-else :reports="reports"
      :headers="headers"
      :single-select="singleSelect"
      @view-report="viewReportDialog" />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Reports",

  async created() {
    if (!this.loaded && !this.loading) {
      await this.load();
    }
  },
  data: () => ({
    viewReport: false,
    singleSelect: false,
    selected: [],
    reports: [
      {
        reportName: "Event Registrations",
        generated: "Sep 23, 2023",
      },
      {
        reportName: "Event Attendance",
        generated: "Oct 06, 2023",
      },
      {
        reportName: "Booth Engagement ",
        generated: "Feb 24, 2024",
      },
      {
        reportName: "Presentation Engagement",
        generated: "Feb 24, 2024",
      }
    ],
    headers: [
      {
        text: 'report-name',
        align: 'start',
        value: 'reportName',
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
      reports: "apps/admin/registrations/reports",
      numberOfReports: "apps/admin/registrations/numberOfReports",
    }),
  },
  methods: {
    ...mapActions({
      load: "apps/admin/registrations/load",
    }),
    viewReportDialog(report) {
      this.selected = report;
      this.viewReport = true;
    },
  },
};
</script>
