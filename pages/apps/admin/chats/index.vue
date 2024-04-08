<!--
Admin - Chats Page

This page is used by Admins to manage the Chats within their Partition/Venue.

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-109
-->
<template>
  <v-container fluid>

    <v-row>
      <v-col cols="12" md="6">
        <apps-admin-chats-details />
      </v-col>
      <v-col cols="12" md="6">
        <apps-admin-chats-create-chat />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <apps-admin-chats-list />
      </v-col>
      <v-col cols="12" md="6">
        <apps-admin-chats-table />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "index",
  // layout: 'admin',
}
</script>
