<!--
Venue App Events - Title

A smart component that renders the EventsApp errors, alerts, warnings etc.

-->
<template>
  <v-card rounded>

    <v-card-title>
      <v-icon left>mdi-alert-circle</v-icon>
      {{ $t('admin-events-alerts-title') }} ({{ numberOfAlerts || 0 }})
    </v-card-title>

    <v-card-subtitle>
      {{ $t('admin-events-alerts-subtitle') }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Alerts",

  computed: {
    ...mapGetters({
      numberOfAlerts: 'apps/admin/events/numberOfAlerts',
    })

  }
}
</script>

