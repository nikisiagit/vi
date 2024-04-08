<!--
Venue - Room detail Page

The Room detail Page is used access the Daily Call Pre Built UI
in their Venue/Partition.
-->
<template>

  <v-container fluid>
    <v-row>
      <v-col>

        <v-sheet width="100%"
                 height="100%"
                 elevation="1"
                 rounded="lg"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">

          <v-container fluid class="fill-height">


            <v-row  >
              <v-col>
                <!-- If daily video is activated -->

                <!--                  daily video call-->
                <v-sheet
                  v-if="dailyRoomId && dailyRoomName"
                  rounded="lg"
                  height="710px" class="ma-auto " style="position: relative">

                  <daily-call-frame
                    :status="status"
                    :url="dailyRoomUrl"
                    :roomName="dailyRoomName"
                    @change-status-call="changeStatusCall"
                  />

                </v-sheet>
                <!--                  daily video call-->


              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <room-details
                  :room-id="roomId"
                  :title-id="titleId"
                  :description-id="descriptionId"
                  :created-by="createdBy"
                  :chat-id="chatId"
                  :daily-room-id="dailyRoomId"
                />
              </v-col>
            </v-row>

<!--            <v-row v-if="! room.url" >-->
<!--              <v-col>-->

<!--              </v-col>-->
<!--            </v-row>-->

<!--            <apps-admin-daily-app @close="close" v-else :room-name="room.name" :room-url="room.url"></apps-admin-daily-app>-->

          </v-container>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- if chat is activated -->
    <app-side-activity-panel v-if="! $vuetify.breakpoint.mobile && chatId"/>

  </v-container>



</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RoomId",
  data(){
    return {
      status: "reception", // status of the call can be: ["home", "call"]
      dailyRoomLocal: {
        name: '', // name of the room in order to generate user token. "As owner of the room"
        url: '', // url of the room to join.
      }
    }
  },
  async created () {
    await this.load();
  },

  computed: {
    ...mapGetters({
      roomWithRoomId: 'rooms/roomWithRoomId',
    }),
    roomId () {
      return this.$route.params.roomId || undefined;
    },

    room () {
      return (this.roomId) ? this.roomWithRoomId(this.roomId) : undefined;
    },

    name () {
      return this.room?.name
    },

    createdBy () {
      return this.room?.createdBy;
    },

    createdAt () {
      return this.room?.createdAt;
    },

    loaded () {
      return (this.room) ? this.room.loaded : false;
    },

    loading () {
      return (this.room) ? this.room.loading : false;
    },

    error () {
      return (this.room) ? this.room.error : undefined;
    },

    titleId () {
      return this.room?.titleId
    },

    descriptionId () {
      return this.room?.descriptionId
    },

    dailyRoomId () {
      return this.room?.dailyRoomId
    },

    chatId () {
      return this.room?.chatId
    },

    daily () {
      return this.room?.daily
    },

    dailyRoomName () {
      return this.room?.daily?.name
    },

    dailyRoomUrl () {
      return this.room?.daily?.url
    },

  },
  methods: {
    ...mapActions({
      loadRoomWithRoomId: 'rooms/loadRoomWithRoomId',
    }),

    async load () {
      return await (this.roomId) ? this.loadRoomWithRoomId(this.roomId) : undefined;
    },

    changeStatusCall(status){
      this.status = status

      if (this.status === 'home')
        this.$router.push({
          name: 'rooms'
        })
    },
  }
}
</script>
