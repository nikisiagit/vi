<template>
  <v-card rounded>
    <apps-admin-registrations-dashboard-title />
    <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="3" lg="3">
            <v-card class="fill-height" rounded elevation="4">
              <apps-admin-registrations-dashboard-summary />
            </v-card>
          </v-col>

          <v-col cols="12" sm="12" md="9" lg="9">
            <v-card class="fill-height" rounded elevation="4">
              <v-card-title>
                <span class="headline">Time Spent</span>
              </v-card-title>
              <base-column-chart
                :chart-options="barChartOptions"
                :chart-series="barChartSeries" />
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" >
            <v-card rounded elevation="4">
              <v-card-title>
                <span class="headline">Number of Registrants</span>
              </v-card-title>
              <base-area-chart
                :chart-options="areaChartOptions"
                :chart-series="chartSeries" />
            </v-card>
          </v-col>
        </v-row>

    </v-card-text>
  </v-card>

</template>

<script>

export default {
  name: "Dashboard",
  data: () => ({
    areaChartOptions: {
      xaxis: {
        categories: ['Oct 10', 'Oct 14', 'Oct 18', 'Oct 22', 'Oct 26', 'Oct 30', 'Nov 3', 'Nov 7']
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      colors: ["#8dd2c9"]

    },

    barChartOptions: {
      xaxis: {
        categories: ['10 mins', '20 mins', '30 mins', '40 mins', '50 mins', '60 mins', '70 mins', '80 mins']
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '25%',
          endingShape: 'rounded',
        },
      },
      fill: {
       colors: ["#8dd2c9"]
      },
    },
    chartSeries: [
      {
        name: "series-1",
        data: [90, 112, 205, 280, 324, 210,450, 500]
      }
    ],
    barChartSeries: [
      {
        name: "series-1",
        data: [10, 30,14,20,10,30,45,16,]
      }
    ]
  }),
}

</script>
