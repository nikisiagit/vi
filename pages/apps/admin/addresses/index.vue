<!--
Renders the main entry point to `Venue (Admin) - Addresses`
-->
<template>
  <v-container fluid>


    <v-row>
      <v-col cols="12" md="4">
        <apps-admin-addresses-list />
      </v-col>

      <v-col cols="12" md="4">
        <apps-admin-addresses-create-address />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "index",
  layout: 'default',
}
</script>
