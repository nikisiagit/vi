<!--
NavListItem

Renders a link to the Venue Admin EmailTemplates Page.

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-109
-->
<template>
  <v-list-item link :to="{name: 'apps-admin-email-templates'}">
    <v-list-item-avatar>
      <v-icon>mdi-email</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t('admin-email-templates') }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('admin-email-templates-subtitle') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "NavListItem",
}
</script>
