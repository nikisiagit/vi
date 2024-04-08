<!--
Daily Rooms/index.vue

The Daily rooms index page.
-->
<template>
  <v-container fluid>
    <!--    <script src="https://player.live-video.net/1.8.0/amazon-ivs-player.min.js"></script>-->


    <v-row>
      <v-col>

        <!--
        Venue App (Admin) - Registrations

        PRO-261 RegistrationsApp

        The app is nested inside a "glass" container.
        -->
        <v-sheet width="100%"
                 height="100%"
                 elevation="1"
                 rounded="lg"
                 :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">

          <!-- a glass container - I want to control this in the Platform. -->





          <v-container fluid class="fill-height">

            <v-row>
              <v-col>
                <apps-admin-daily-title />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <apps-admin-daily-tabs />
              </v-col>
            </v-row>


            </v-container>
        </v-sheet>
      </v-col>

      </v-row>




    <apps-admin-daily-call-frame
      :status="status"
      :url="room.url"
      :roomName="room.name"
      @change-status-call="changeStatusCall"
    />

  </v-container>


</template>

<script>

export default {
  name: "Daily",
  scrollToTop: true,
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  data() {
    return {
      rooms: [],

      roomError: false,
      roomErrorMsg: '',
      roomLoading: false,

      status: "home", // status of the call can be: ["home", "call"]
      room: {
        name: '', // name of the room in order to generate user token. "As owner of the room"
        url: '', // url of the room to join.
      }
    };
  },
  async created (){



    await this.listRooms()

    const playbackUrl = 'https://4777d1b2efd2.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.841144982209.channel.Lh8MS30MZlnf.m3u8';
    let player;

    // if (IVSPlayer.isPlayerSupported) {
    //   player = IVSPlayer.create();
    //   player.attachHTMLVideoElement(document.getElementById('video-player'));
    //   player.load(playbackUrl);
    //   player.play();
    //
    // }
    //
    // attachListeners()


    function attachListeners() {
      const { ErrorType, PlayerEventType, PlayerState } = IVSPlayer;

      for (let state of Object.values(PlayerState)) {
        player.addEventListener(state, () => {
          console.log(state);
        });
      }

      player.addEventListener(PlayerEventType.INITIALIZED, () => {
        console.log('INITIALIZED');
      });

      player.addEventListener(PlayerEventType.ERROR, (error) => {
        const statusTooManyRequests = 429;
        if (error.type === ErrorType.NOT_AVAILABLE && error.code === statusTooManyRequests) {
          console.error('Concurrent-viewer limit reached', error);
        } else {
          console.error('ERROR', error);
        }
      });

      player.addEventListener(PlayerEventType.QUALITY_CHANGED, (quality) => {
        console.log('QUALITY_CHANGED', quality);
      });

      // This event fires when text cues are encountered, such as captions or subtitles
      player.addEventListener(PlayerEventType.TEXT_CUE, (cue) => {
        console.log('TEXT_CUE', cue.startTime, cue.text);
      });

      // This event fires when embedded Timed Metadata is encountered
      player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
        console.log('Timed metadata', cue.text);
      });
    }

    console.log("IVSPlayer", IVSPlayer)
  },
  methods: {
    changeStatusCall(status){
      this.status = status
    },

    handleJoinRoom(room){
      this.room.name = room.name
      this.room.url = room.url
    },

    /**
     * List all rooms
     * @returns {Promise<*>}
     */
    async listRooms(){
      try {
        this.roomLoading = true

        //@todo: filter by assigned user
        this.$api().daily.listRooms().then(response => this.rooms = response.data.data)


      } catch(e){
        console.log(e.response.data);
        this.roomError = true;
        this.roomErrorMsg = e.response.data && e.response.data.info;
      } finally {
        this.roomLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
}
</style>
