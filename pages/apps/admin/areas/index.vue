<!--
Renders the main entry point to `Venue (Admin) - Areas`
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-areas-list />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <apps-admin-areas-table />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "index",
}
</script>
