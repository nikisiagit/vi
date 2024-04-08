<!--
[PRO-129] Venue App (Admin) - Users

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-129

Venue App (Admin) - Users Page

This page represents/renders the nested/sub app used by the Admins to
manage everything to do with "users" in their Partition.

"users" includes Users (the people who have signed up)
AND the backend services (UserPool, IdentityPool etc)
the are available to the Partition.

This would include features such as Social Sign-in and MFA.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>

        <!--
        Venue App (Admin) - Users

        The app is nested inside a "glass" container.
        -->
        <v-sheet width="100%"
                 height="100%"
                 elevation="1"
                 rounded="lg"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
          <v-container fluid class="fill-height">
            <!--
            Title

            The title component of the UsersApp.

            Actions:
            - Refresh button - reload the store
            - Create User (Admin) - show the CreateUser component
            - Export/import actions
            - anything else
            -->
            <v-row>
              <v-col>
                <apps-admin-users-title />
              </v-col>
            </v-row>

            <!--
            Alerts notices, warnings, etc

            Show a list of alerts to the Admin.
            "alerts" includes - errors, warnings, info type messages.
            -->
            <v-row>
              <v-col>
                <apps-admin-users-alerts />
              </v-col>
            </v-row>

            <!--
            Tabs

            The tabs/view switcher component of the Users App.

            Tabs The tabs/view switcher component of the UsersApp.
            -->
            <v-row>
              <v-col>
                <apps-admin-users-tabs @change="" />
              </v-col>
            </v-row>



            <!--
            Select - typically used by other "modules/apps"
            as a querying function

            A basic select form element.

            @merve @luis - this is "sub" component - it doesnt include a card wrapper (title, subtitle etc).
            -->
            <v-row>
              <v-col>
                <apps-admin-users-select />
              </v-col>
            </v-row>

          </v-container>
        </v-sheet>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AdminUsers",

  methods: {
    ...mapActions({
      //
    })
  },

  computed: {
    ...mapGetters({

    })
  },
}
</script>
