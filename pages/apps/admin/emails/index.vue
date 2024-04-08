<!--
[PRO-236] Venue App (Admin) - Emails - Index Page

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-236

The page that renders the Admin Emails App.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>

        <!--
        Admin Emails App
        -->
        <v-sheet width="100%"
                 height="100%"
                 elevation="1"
                 rounded="lg"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
          <v-container fluid class="fill-height">

            <!--
            Title
            -->
            <v-row>
              <v-col cols="12">
                <apps-admin-emails-title />
              </v-col>
            </v-row>

            <!--
            Identities (List)
            -->
            <v-row>
              <v-col cols="12">
                <apps-admin-email-identities-list />
              </v-col>
            </v-row>

            <!--
            Identities (Table)
            -->
            <v-row>
              <v-col cols="12">
                <apps-admin-email-identities-table />
              </v-col>
            </v-row>

            <!--
            Identities (Select)
            -->
            <v-row>
              <v-col cols="12">
                <apps-admin-email-identities-select />
              </v-col>
            </v-row>

            <!--
            Settings
            -->
            <v-row>
              <v-col cols="12">
                <apps-admin-email-settings-details />
              </v-col>
            </v-row>



          </v-container>
        </v-sheet>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Index"
}
</script>

