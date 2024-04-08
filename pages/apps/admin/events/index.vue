<!--
Venue Admin - Events Page

This page is used by Venue Admins to manage the Events in the Venue/Partition.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>

        <!--
        Venue App (Admin) - Events

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

            The title component of the EventsApp.

            Actions:
            - Refresh button - reload the store
            - Create Event - show the CreateEvent component
            - Export/import actions
            - anything else
            -->
            <v-row>
              <v-col>
                <apps-admin-events-title />
              </v-col>
            </v-row>

            <!--
            Alerts notices, warnings, etc

            Show a list of alerts to the Admin.
            "alerts" includes - errors, warnings, info type messages.
            -->
            <v-row>
              <v-col>
                <apps-admin-events-alerts />
              </v-col>
            </v-row>

            <!--
            Tabs

            The tabs/view switcher component of the Events App.

            Tabs The tabs/view switcher component of the EventsApp.
            -->
            <v-row>
              <v-col>
                <apps-admin-events-tabs />
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
                <apps-admin-events-select />
              </v-col>
            </v-row>

          </v-container>
        </v-sheet>
      </v-col>
    </v-row>

  </v-container>
<!--  <v-container fluid v-if="false">-->
<!--    <v-row>-->
<!--      &lt;!&ndash; events list &ndash;&gt;-->
<!--      <v-col cols="12" md="6">-->
<!--        <apps-admin-events-list />-->
<!--      </v-col>-->

<!--      &lt;!&ndash; events table &ndash;&gt;-->
<!--      <v-col cols="12" md="6">-->
<!--        <apps-admin-events-table />-->
<!--      </v-col>-->

<!--    </v-row>-->

<!--    <v-row>-->
<!--      &lt;!&ndash; events create event &ndash;&gt;-->
<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-events-create-event />-->
<!--      </v-col>-->
<!--    </v-row>-->

<!--  </v-container>-->
</template>

<script>
export default {
  name: "index",
  layout: 'admin',
}
</script>

