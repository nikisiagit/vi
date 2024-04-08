<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ reportName }}</v-list-item-title>
      <v-list-item-subtitle>{{generated}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn @click="downloadReport(item)" icon>
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "ReportListItem",
  props: {
    reportName: {
      type: String,
      required: true,
    },
    generated: {
      type: String,
      required: true,
    },
  },
  methods: {
    downloadReport(report) {
      this.$emit('download-report', report);
    },
  },
}
</script>
