<!--
[PRO-129] Venue App (Admin) Users - Search

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-129

A smart component that renders the UsersApp Search input component.
-->
<template>
  <!-- users search card form/inputs -->
  <v-card rounded>

    <v-card-title>
      <v-icon left>mdi-magnify</v-icon>
      {{ $t('admin-users-search-title')}}
    </v-card-title>

    <v-card-subtitle>
      {{ $t('admin-users-search-subtitle')}}
    </v-card-subtitle>

    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-text-field v-model="searchLocal"
                        clearable
                        dense
                        outlined hide-details
                        append-icon="mdi-magnify"
                        :label="$t('Search')"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "Search",

  data: () => ({
    /**
     * The component "local" search/query value.
     */
    searchLocal: undefined,
  }),
}
</script>

