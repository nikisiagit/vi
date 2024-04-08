<!--
[PRO-236] Venue App (Admin) - Emails - Title

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-236

A smart component that renders the Title component of the Admin Emails App.
-->
<template>
  <v-card rounded>

    <!-- title and actions -->
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('admin-emails-title') }}
      <v-spacer />
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-emails-subtitle')}}
    </v-card-subtitle>

  </v-card>
</template>

<script>
export default {
  name: "Title"
}
</script>
