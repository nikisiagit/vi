<template>
  <v-container fluid>

    <!-- table / list -->
    <v-row>
      <v-col cols="12" md="6">
        <apps-admin-email-identities-list />
      </v-col>

    </v-row>

    <!-- form -->
    <v-row>
      <v-col cols="12" md="4">
        <apps-admin-email-identities-create-email-identity />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "index"
}
</script>
