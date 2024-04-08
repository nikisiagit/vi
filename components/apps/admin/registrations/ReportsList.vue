<template>
  <v-list>
    <apps-admin-registrations-report-list-item
      v-for="(report, index) in reports"
      :key="index"
      :report-name="report.reportName"
      :generated="report.generated"
    />
  </v-list>
</template>

<script>
export default {
  name: "ReportList",
  props: {
    reports: {
      type: Array,
      required: true,
    },
  },
};
</script>
