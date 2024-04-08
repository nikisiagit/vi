<!--
NavListItem

Renders a link to the Venue Admin Chats Page.

@idea https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-109
-->
<template>
  <v-list-item link :to="{name: 'apps-admin-chats'}">
    <v-list-item-avatar>
      <v-icon>mdi-pound</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('chats') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('chats-subtitle') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "NavListItem",
}
</script>
