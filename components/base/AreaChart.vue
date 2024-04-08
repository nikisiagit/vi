<template>
    <apexchart ref="chart" :options="chartOptions" :series="chartSeries" type="area" height="250" />
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'AreaChart',
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

