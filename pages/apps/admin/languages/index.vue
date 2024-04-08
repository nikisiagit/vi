<!--
[PRO-242] Venue App (Admin) - Languages - Index

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-242

Venue (Admin) - Languages Page

The Languages Page is used by Admins to manage the Languages that have
been added to their Partition/Venue.
-->
<template>
  <v-container fluid>

    <!--
    Admin Languages App
    -->
    <v-sheet width="100%"
             height="100%"
             elevation="1"
             rounded="lg"
             :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
      <v-container fluid class="fill-height">

        <!-- Title -->
        <v-row>
          <v-col cols="12">
            <apps-admin-languages-title />
          </v-col>
        </v-row>

        <!-- Create Language -->
        <v-row>
          <v-col cols="12">
            <apps-admin-languages-create-language />
          </v-col>
        </v-row>

        <!-- Table -->
        <v-row>
          <v-col cols="12">
            <apps-admin-languages-table />
          </v-col>
        </v-row>

        <!-- List -->
        <v-row>
          <v-col>
            <apps-admin-languages-list />
          </v-col>
        </v-row>

      </v-container>
    </v-sheet>

  </v-container>
</template>

<script>
export default {
  name: "index",
  layout: 'admin',
}
</script>
