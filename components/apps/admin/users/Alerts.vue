<!--
[PRO-129] Venue App (Admin) Users - Title

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-129

A smart component that renders the UsersApp errors, alerts, warnings etc.

-->
<template>
  <v-card rounded>
    <v-card-title>
      <v-icon left>mdi-alert-circle</v-icon>
      {{ $t('admin-users-alerts-title') }} ({{ numberOfAlerts || 0 }})
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="clearAlerts">
        <v-icon left>mdi-delete</v-icon>
        {{ $t('clear') }}
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      {{ $t('admin-users-alerts-subtitle') }}
    </v-card-subtitle>
    <v-list v-if="$vuetify.breakpoint.mobile">
      <apps-admin-users-alert-list-item
        v-for="(alert, index) in alerts"
        :key="index"
        :message="alert.message"
        :time="alert.time"
        :type="alert.type"/>
    </v-list>
    <v-data-table v-else :items="alerts" :headers="headers">
      <template v-slot:item.message="{item}">{{ item.message }}</template>
      <template v-slot:item.type="{item}">
        <v-icon v-if="item.type === 'success'" color="primary">mdi-check-circle</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Alerts",
  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },
  data: () => ({
    headers: [
      {
        text: 'message',
        align: 'start',
        value: 'message',
        sortable: true,
      },
      {
        text: 'type',
        align: 'start',
        value: 'type',
        sortable: true,
      },
      {
        text: 'changed at',
        align: 'start',
        value: 'time',
        sortable: true,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      alerts: 'apps/admin/users/alerts',
      numberOfAlerts: 'apps/admin/users/numberOfAlerts',
    })
  },
  methods: {
    ...mapActions({
      load: 'apps/admin/users/load',
      clearAlerts: 'apps/admin/users/clearAlerts',
    }),
  },
}
</script>

