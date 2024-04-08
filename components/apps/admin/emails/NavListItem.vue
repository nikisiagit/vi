<!--
[PRO-236] Venue App (Admin) - Emails - Nav List Item

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-236

A smart component that renders the link to Admin Emails.
-->
<template>
  <v-list-item link :to="{name: 'apps-admin-emails'}">

    <!-- avatar -->
    <v-list-item-avatar>
      <v-icon>mdi-email</v-icon>
    </v-list-item-avatar>

    <!-- title subtitle -->
    <v-list-item-content>
      <v-list-item-title>{{ $t('admin-emails-title') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('admin-emails-subtitle') }}</v-list-item-subtitle>
    </v-list-item-content>

    <!-- @todo alerts etc -->

  </v-list-item>
</template>

<script>
export default {
  name: "NavListItem",

  // @todo which store(s) is this using
}
</script>

