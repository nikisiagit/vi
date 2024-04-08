<template>
  <v-data-table
    :items="reports"
    :headers="headers"
    :single-select="singleSelect"
    show-select
   >

    <!-- item - actions -->
    <template v-slot:item.actions="{ item }">
      <v-btn @click="downloadReport(item)" icon>
        <v-icon>mdi-download</v-icon>
      </v-btn>
      <v-btn @click="viewReportDialog(item)" icon>
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "ReportsTable",
  props: {
    reports: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    singleSelect: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    viewReportDialog(report) {
      this.$emit('view-report', report);
    },
    downloadReport(report) {
      this.$emit('download-report', report);
    },
  },
};
</script>
