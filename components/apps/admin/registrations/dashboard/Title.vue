<!--
Venue App (Admin) Dashboard - Title | A smart component that renders the Dashboard Title.
-->
<template>
  <v-card rounded>
    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-view-dashboard</v-icon>
      {{ $t('admin-dashboard-title') }}
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-dashboard-subtitle')}}
    </v-card-subtitle>
  </v-card>
</template>

<script>

export default {
  name: "Title",
}
</script>
