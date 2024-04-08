<!--
Venue Admin - Rooms Page

The Rooms Page is used by Admins to manage the Rooms that have been created
in their Venue/Partition.
-->
<template>

  <v-container v-if="! room.url"  fluid>
    <v-row>
      <v-col>

        <!--
        Venue App (Admin) - Rooms

        PRO-261 RoomsApp

        The app is nested inside a "glass" container.
        -->
        <v-sheet width="100%"
                 height="100%"
                 elevation="1"
                 rounded="lg"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">

          <!-- a glass container - I want to control this in the Platform. -->





          <v-container fluid class="fill-height">
            <!--
            Title

            The title component of the RoomsApp.

            Actions:
            - Refresh button - reload the store
            - Create Room - show the CreateRoom component
            -->
            <!--            <v-row>-->
            <!--              <v-col>-->
            <!--                <apps-admin-rooms-title />-->
            <!--              </v-col>-->
            <!--            </v-row>-->

            <!--
            Alerts notices, warnings, etc

            Show a list of alerts to the Admin.
            "alerts" includes - errors, warnings, info type messages.
            -->
            <!--            <v-row>-->
            <!--              <v-col>-->
            <!--                <apps-admin-rooms-alerts />-->
            <!--              </v-col>-->
            <!--            </v-row>-->

            <!--
            Tabs

            The tabs/view switcher component of the Rooms App.

            Tabs The tabs/view switcher component of the RoomsApp.
            -->
            <v-row>
              <v-col>
                <apps-admin-rooms-index-app @join-daily-room="joinDailyRoom"/>
              </v-col>
            </v-row>



            <!--
            Select - typically used by other "modules/apps"
            as a querying function

            A basic select form element.

            @merve @luis - this is "sub" component - it doesnt include a card wrapper (title, subtitle etc).
            -->
            <!--            <v-row>-->
            <!--              <v-col>-->
            <!--                <apps-admin-rooms-select />-->
            <!--              </v-col>-->
            <!--            </v-row>-->

          </v-container>
        </v-sheet>
      </v-col>
    </v-row>

  </v-container>
  <apps-admin-daily-app @close="close" v-else :room-name="room.name" :room-url="room.url"></apps-admin-daily-app>

</template>

<script>
export default {
  name: "index",
  layout: 'admin',
  data(){
    return {
      room: {
        name: '',
        url: '',
      },

    }

  },
  methods: {
    joinDailyRoom(room){
      this.room.name = room.name
      this.room.url = room.url

    },
    close(){
      this.room = {
        name: '',
        url: '',

      }

    }

  }
}
</script>
