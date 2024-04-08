<template>
  <v-card rounded>
    <apps-admin-rooms-reports-list v-if="$vuetify.breakpoint.mobile" :reports="reports" />
    <apps-admin-rooms-reports-table
      v-else :reports="reports"
      :headers="headers"
      :single-select="singleSelect"
      @view-report="viewReportDialog" />

<!--    <v-dialog v-model="viewReport" max-width="800px" hide-overlay transition="dialog-bottom-transition">-->
<!--      <apps-admin-rooms-report-view :report="selectedReport" @close="viewReportDialog = false;" />-->
<!--    </v-dialog>-->
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
        reportName: "Room 1",
        generated: "Sep 23, 2023",
      },
      {
        reportName: "Room Attendance",
        generated: "Oct 06, 2023",
      },
      {
        reportName: "Room Booth Engagement ",
        generated: "Feb 24, 2024",
      },
      {
        reportName: "Room Presentation Engagement",
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
      reports: "apps/admin/rooms/reports",
      numberOfReports: "apps/admin/rooms/numberOfReports",
    }),
  },
  methods: {
    ...mapActions({
      load: "apps/admin/rooms/load",
    }),
    viewReportDialog(report) {
      this.selected = report;
      this.viewReport = true;
    },
  },
};
</script>
