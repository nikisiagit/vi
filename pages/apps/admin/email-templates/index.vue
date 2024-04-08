<template>

  <v-container fluid>

    <!-- table / list -->
    <v-row>
      <v-col cols="12" md="6">
        <apps-admin-email-templates-table />
      </v-col>

      <v-col cols="12" md="6">
        <apps-admin-email-templates-list />
      </v-col>

    </v-row>

    <!-- form -->
    <v-row>
      <v-col cols="12" md="12">
        <apps-admin-email-templates-create-email-template />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "index",
}
</script>
