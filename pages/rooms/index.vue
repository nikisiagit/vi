<!--
Venue - Rooms Page

The Rooms Page is used access the Rooms that have been created
in their Venue/Partition.
-->
<template>

  <v-container v-if="! room.url"  fluid>
    <v-row>
      <v-col>

        <v-sheet width="100%"
                 height="100%"
                 elevation="1"
                 rounded="lg"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">

          <v-container fluid class="fill-height">

            <v-row no-gutters>
              <v-col>
                <!-- area name-label OR this could be a heading component that can use a label -->
                <rooms-title
                  title="Rooms"
                  subtitle="Find and join any available room"
                ></rooms-title>

              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col>
                <rooms-grid-list
                  @join-daily-room="joinDailyRoom"
                ></rooms-grid-list>
              </v-col>
            </v-row>


<!--            <v-row>-->
<!--              <v-col>-->
<!--                <rooms-grid-list @join-daily-room="joinDailyRoom"/>-->
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
