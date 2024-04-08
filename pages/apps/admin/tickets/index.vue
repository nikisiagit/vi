<!--
Venue App - Tickets Page

The Tickets Page is used by Admins to manage the Tickets in their Partition/Venue.
-->
<template>
  <v-container fluid>

    <v-row>
      <v-col>
        <apps-admin-tickets-list />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <apps-admin-tickets-table />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <apps-admin-tickets-create-ticket />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "index",
  layout: 'admin'
}
</script>

