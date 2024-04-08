<template>
  <v-list>
    <apps-admin-rooms-report-list-item
      v-for="(report, index) in reports"
      :key="index"
      :reports="report.reports"
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
