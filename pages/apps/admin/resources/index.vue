<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-resources-list />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <apps-admin-resources-create-resource />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "index",
  layout: 'admin',
}
</script>
