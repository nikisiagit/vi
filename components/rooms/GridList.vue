<template>
    <!-- the list of rooms as card/grid view -->
  <v-card rounded="b">
    <v-card-text >
      <v-container fluid>
        <v-row >


          <v-col cols="auto" align="center"  v-for="room in rooms" :key="room.roomId">
            <rooms-grid-list-item
              :room-id="room.roomId"
              :title-id="room.titleId"
              :created-by="room.createdBy"
              :description-id="room.descriptionId"
              :chat-id="room.chatId"
              :daily-room-id="room.dailyRoomId"
            />
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>
  </v-card>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "GridList",

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'rooms/load',
      reload: 'rooms/reload',
    }),

    joinRoom(room){
      if(! room?.daily?.url) return;

      this.$emit('join-daily-room', room.daily)

    }
  },

  computed: {
    ...mapGetters({
      loading: 'rooms/loading',
      loaded: 'rooms/loaded',
      rooms: 'rooms/rooms',
      numberOfRooms: 'rooms/numberOfRooms',
    }),

  },

  data: () => ({

  }),
}
</script>


