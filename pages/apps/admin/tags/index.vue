<!--
Venue Admin - Tags Page

This page is used by Admins to manage the Tags in their Partition.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-tags-list />
      </v-col>
    </v-row>
<!--    <v-row>-->
<!--      <v-col>-->
<!--        <apps-admin-tags-table />-->
<!--      </v-col>-->
<!--    </v-row>-->
    <v-row>
      <v-col>
        <apps-admin-tags-create-tag />
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
