<template>
    <apexchart ref="chart" :options="chartOptions" :series="chartSeries" type="bar" height="250"  />
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'ColumnChart',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    chartOptions: {
      type: Object,
      default: () => {},
    },
    chartSeries: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
