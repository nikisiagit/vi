<!--
 Smart Component Daily Call iFrame - THIS COMPONENT IS THE PRE-BUILT UI DAILY FRAME
-->

<template>
  <v-container class="call-container" :class="{ hidden: status === 'home' }">
    <v-row>
      <v-col :cols="status === 'call'">
        <!-- The Daily Prebuilt iframe is embedded in the div below using the ref -->
        <div id="call" ref="callRef"></div>
      </v-col>


      <!--  && hasCustomPanel ? 8: 12 -->
<!--      <v-col cols="4" v-if="status === 'call' && hasCustomPanel">-->
<!--        &lt;!&ndash; Only show the control panel if a call is on &ndash;&gt;-->
<!--        <daily-controls-iframe-->
<!--          :roomUrl="url"-->
<!--          :callFrame="callFrame"-->
<!--          :transcriptionHistory="transcriptionHistory"-->
<!--          :participants="participants"-->
<!--          :participantToPromote="participantToPromote"-->
<!--          :handIsLower="handIsLower"-->
<!--          @on-raise-hand="onParticipantRaiseHand"-->
<!--          @on-lower-hand="onParticipantLowerHand"-->
<!--          @on-mute-all="muteAll"-->
<!--          @on-mute-speaker="muteSpeaker"-->
<!--          @promote-participant="promoteParticipantAsSpeaker"-->
<!--        >-->

<!--          <template v-slot:custom-controls>-->
<!--            <v-card-title>-->
<!--              <v-icon left>-->
<!--                mdi-script-text-outline-->
<!--              </v-icon>-->
<!--              Transcription controls-->
<!--            </v-card-title>-->
<!--            <v-card-subtitle>You can control the transcriptions from here.</v-card-subtitle>-->
<!--            <div class="text-center">-->
<!--              <v-btn @click="startTranscription" v-if="!isTranscribing">-->
<!--                <v-icon left v-show="! isTranscribing" color="red">mdi-play</v-icon>-->

<!--                Start transcribing-->
<!--              </v-btn>-->

<!--              <v-btn @click="stopTranscription" v-else>-->
<!--                <v-icon left color="red">mdi-stop</v-icon>-->
<!--                Stop transcribing-->
<!--              </v-btn>-->
<!--            </div>-->

<!--            <br />-->
<!--            <br />-->
<!--            <v-divider></v-divider>-->

<!--            <v-card-title>-->
<!--              <v-icon left>-->
<!--                mdi-television-classic-->
<!--                &lt;!&ndash;             mdi-theater&ndash;&gt;-->
<!--              </v-icon>-->
<!--              Live streaming controls-->
<!--            </v-card-title>-->
<!--            <v-card-subtitle>You can control the live streaming from here.</v-card-subtitle>-->
<!--            <div class="text-center">-->

<!--              <v-select-->
<!--                v-model="liveStreamConfigLayout.preset"-->
<!--                :items="layoutType"-->
<!--                label="Layout"-->
<!--              />-->

<!--              <v-select-->
<!--                v-model="liveStreamConfigLayout.max_cam_streams"-->
<!--                :items="maxCams"-->
<!--                v-show="liveStreamConfigLayout.preset === 'default'"-->
<!--                placeholder="Additional cameras"-->
<!--              />-->

<!--              <v-select-->
<!--                v-model="liveStreamConfigLayout.session_id"-->
<!--                :items="participantsLayout"-->
<!--                v-show="liveStreamConfigLayout.preset === 'single-participant'"-->
<!--                label="Select Participant"-->
<!--              />-->

<!--              <v-btn @click="startLiveStreaming" v-if="!isLiveStreaming">-->
<!--                <v-icon left v-show="! isLiveStreaming" color="red">mdi-play</v-icon>-->

<!--                Start live streaming-->
<!--              </v-btn>-->

<!--              <v-btn @click="stopLiveStreaming" v-else>-->
<!--                <v-icon left color="red">mdi-stop</v-icon>-->
<!--                Stop live streaming-->
<!--              </v-btn>-->
<!--            </div>-->

<!--            <br />-->
<!--            <v-divider></v-divider>-->
<!--          </template>-->

<!--        </daily-controls-iframe>-->
<!--      </v-col>-->
    </v-row>
  </v-container>

</template>

<script>
import DailyIframe from "@daily-co/daily-js";
import {mapGetters, mapActions} from "vuex";

const IFRAME_OPTIONS = {
  height: "100%", //"auto"
  width: "100%",
  // aspectRatio: 16 / 9,
  // minWidth: "400px",
  // maxWidth: "100%", //maxWidth: "920px",
  borderRadius: "10px",
  border: "none",
};

export default {
  name: 'CallFrame',
  props: {
    url: {
      type: String,
      required: true
    },
    roomName: {
      type: String,
      required: true
    },
    status: {
      type: String
    },
    hasCustomPanel: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      ownerSessionIds: [],
      participantToPromote: {}, // @todo: need to be an array of participants who wants to speak
      handIsLower: false,

      transcriptionHistory: [],
      isTranscribing: false,
      isLiveStreaming: false,

      room: {
        name: "",
        privacy: "public",
        properties: {
          enable_new_call_ui: true, // They recommend to pass false for old/existing Customers.
          enable_prejoin_ui: true,
          enable_knocking: false,
          start_video_off: true,
          start_audio_off: true,
          enable_screenshare: true,
          enable_chat: false,
          enable_people_ui: true,
          enable_video_processing_ui: false,
          enable_network_ui: false,
          enable_pip_ui: false,
          lang: 'en',

          owner_only_broadcast: false,
          eject_at_room_exp: false, // should just be true when exp unix time is present.


        }
      },

      nbfDate: undefined,
      expDate: undefined,
      nbfTime: undefined,
      expTime: undefined,

      token: '',
      creatingToken: false,

      callFrame: null,
      error: false,
      errorMsg: '',

      participants: [],

      // Live streaming config
      liveStreamConfigLayout: {
        preset: 'default',
        max_cam_streams: 9
      },

      participantsLayout: [], // array with sessionIds as value and text equal to userName

      // Live streaming config Selects items
      layoutType: [
        {
          text: 'Grid (default)',
          value: 'default'
        },
        {
          text: 'Single Participant',
          value: 'single-participant'
        },
        {
          text: 'Active Participant',
          value: 'active-participant'
        },
      ],

      maxCams: [
        {
          text: '9 cameras',
          value: 9
        },
        {
          text: '8 cameras',
          value: 8
        },
        {
          text: '7 cameras',
          value: 7
        },
        {
          text: '6 cameras',
          value: 6
        },
        {
          text: '5 cameras',
          value: 5
        },
        {
          text: '4 cameras',
          value: 4
        },
        {
          text: '3 cameras',
          value: 3
        },
        {
          text: '2 cameras',
          value: 2
        },
        {
          text: '1 cameras',
          value: 1
        },
      ],

      /**
       * @Todo: Unused yet.
       */
      // dailyLanguages: [
      //   {
      //     text: 'German',
      //     value: 'de'
      //   },
      //   {
      //     text: 'English',
      //     value: 'en'
      //   },
      //   {
      //     text: 'Spanish',
      //     value: 'es'
      //   },
      //   {
      //     text: 'Finnish',
      //     value: 'fi'
      //   },
      //   {
      //     text: 'French',
      //     value: 'fr'
      //   },
      //   {
      //     text: 'Italian',
      //     value: 'it'
      //   },
      //   {
      //     text: 'Japanese',
      //     value: 'jp'
      //   },{
      //     text: 'Norwegian',
      //     value: 'no'
      //   },
      //   {
      //     text: 'Portuguese',
      //     value: 'pt'
      //   },
      //   {
      //     text: 'Polish',
      //     value: 'pl'
      //   },
      //   {
      //     text: 'Georgian',
      //     value: 'ka'
      //   },
      //   {
      //     text: 'Dutch',
      //     value: 'nl'
      //   },
      //   {
      //     text: 'Russian',
      //     value: 'ru'
      //   },
      //   {
      //     text: 'Swedish',
      //     value: 'sv'
      //   },
      //   {
      //     text: 'Turkish',
      //     value: 'tr'
      //   }
      // ],
      //
      // dailyEjectAfterTimes: [
      //   {
      //     text: '15 min',
      //     value: 900
      //   },
      //   {
      //     text: '30 min',
      //     value: 1800
      //   },
      //   {
      //     text: '1 Hr',
      //     value: 3600
      //   },
      //   {
      //     text: '2 Hr',
      //     value: 7200
      //   },
      //   {
      //     text: '4 Hr',
      //     value: 14400
      //   }
      // ],

    };
  },

  async created(){
    if (! this.loading && ! this.loaded) {
      await this.load();
    }

    // Enable transcriptions Domain Level
    // await this.$repository.daily.enableTranscription() //@todo: enable in domain level just once.
  },

  unmounted() {
    if (!this.callFrame) return;
    // Clean-up event handlers
    this.callFrame

      .off("joined-meeting", this.updateParticipants)
      .off("participant-joined", this.updateParticipants)
      .off("participant-updated", this.updateParticipants)
      .off("participant-left", this.updateParticipants)

  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      loading: 'me/loading',
      loaded: 'me/loaded',
    }),
  },

  watch: {
    url: {
     immediate: true,
      async handler(url){
        // We need roomName for the creation of the user token.
        // We need the url of the room in order to join.
        if (url !== '' && this.roomName !== '') {

          //@todo: Associate a profile with token.
          // Create token for the user as owner of the room.
          await this.createToken()

          // if (this.me.profileId === "customers.ucas.b27b2186-88df-4b4a-87dd-796c2f40306a") {
          //   this.joinRoom(url, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1ZCI6ImN1c3RvbWVycy51Y2FzLmIyN2IyMTg2LTg4ZGYtNGI0YS04N2RkLTc5NmMyZjQwMzA2YSIsInIiOiJnYXZzLXJvb20iLCJkIjoiYzMzZTVhN2YtNmJkMS00YzIzLWI5NTItMzA2Y2JkNzU3NTIyIiwiaWF0IjoxNjUwOTE4MzM1fQ.TjvKq9bnE1DRvmxq96XtzzyPVYGHNzc3kXJAiz06P90")
          // } else {

          // Join room with token
          this.joinRoom(url, this.token);

          // }

        }
      }
    },

    '$vuetify.theme.isDark': {
      immediate: true,
      handler: function (isDark) {
        const mode = isDark ? 'dark': 'light'

        const defaults = this.$vuetify.theme.themes[mode];
        console.log( defaults.accent, "THEME")


        if (this.callFrame) {
          this.callFrame.setTheme({
            colors: {
              accent: defaults.primary,
              accentText: '#FFFFFF',

              background: '#000', // defaults.secondary, // main area background - outer (footer(controls)/header) | White or Black depending of contrast.

              backgroundAccent: defaults.primary, // hover icons/actions
              baseText: '#FFF', // colorText hover icons/actions | White or Black depending of contrast.


              // border: '#ffff00', // inner border - Where users displays with its own controls.
              mainAreaBgAccent: defaults.accent, // backgroundColor when user has not videoOn
              mainAreaText: '#FFF', // colorText when user has not videoOn | White or Black depending of contrast.

              mainAreaBg: '#000000', // backgroundColor behind participants and call
              // supportiveText: defaults.primary, // colorText used in ParticipantList header and as descriptive text to display relant info
            },
          });
        }

      }
    },
  },

  methods: {
    ...mapActions({
      load: 'me/load',
    }),

    muteSpeaker(sessionId){
      this.callFrame.updateParticipant(sessionId, {
        setAudio: false
      });
    },

    muteAll() {
      let updateList = {};
      for (let id in this.callFrame.participants()) {
        if (id === 'local') {
          continue;
        }
        updateList[id] = { setAudio: false };
      }
      console.log('!!! UPDATE LIST', updateList);
      this.callFrame.updateParticipants(updateList);
    },

    unMute() {
      let updateList = {};
      for (let id in this.callFrame.participants()) {
        if (id === 'local') {
          continue;
        }
        updateList[id] = { setAudio: true };
      }
      console.log('!!! UPDATE LIST', updateList);
      this.callFrame.updateParticipants(updateList);
    },

    /**
     * Create a Meeting Token access
     * @param options
     * @returns {Promise<*>}
     */
    async createMeetingToken(options){
      try {
        return await this.$api().daily.createMeetingToken(options)

      } catch(e){
        console.log(e.response.data);
         // e.response.data && e.response.data.info;
      }
    },

    async createToken() {
      const opt = {
        properties: {
          // "user_name": "user123", // from the profile or input textField. (i.e. Administrator)
          // "user_id": this.me.profileId,
          "is_owner": true, // create a owner token //@todo: To handle different roles-token
          "room_name": this.roomName
        }
      }

      this.creatingToken = true
      const res = await this.createMeetingToken(opt).then(response => this.token = response.data.token)
      this.creatingToken = false

      // this.token = res.token;
    },

    // Daily callframe created and joined below
    joinRoom(url, token) {
      if (this.callFrame) {
        this.callFrame.destroy();
      }

      // Daily event callbacks
      const logEvent = (ev) => console.log(ev);
      const goToLobby = () => ( this.$emit('change-status-call', "lobby") );

      const goToCall = () => {
        this.$emit('change-status-call', "call")
      }


      const leaveCall = () => {
        if (this.callFrame) {
          this.$emit('change-status-call', "home")
          this.callFrame.destroy();
        }
      };

      const mode = this.$vuetify.theme.isDark ? 'dark': 'light'
      const defaults = this.$vuetify.theme.themes[mode];

      // DailyIframe container element
      const callWrapper = this.$refs.callRef;

      // Create Daily call
      const callFrame = DailyIframe.createFrame(callWrapper, {
        iframeStyle: IFRAME_OPTIONS,

        // other config...
        showLeaveButton: true,
        showFullscreenButton: true,

        activeSpeakerMode: true,
        //lang: 'en', either or we use the language from roomLang or pass to the frame by single user.
        // userName: this.me.profileId,
        userName: this.me && this.me.fullname,


        theme: {
          colors: {
            accent: defaults.primary,
            accentText: '#FFFFFF',

            background: '#2a2a2a', // defaults.secondary, // main area background - outer (footer(controls)/header) | White or Black depending of contrast.

            backgroundAccent: defaults.primary, // hover icons/actions
            baseText: '#FFF', // colorText hover icons/actions | White or Black depending of contrast.


            // border: '#ffff00', // inner border - Where users displays with its own controls.
            mainAreaBgAccent: `#5db7af`, // backgroundColor when user has not videoOn
            mainAreaText: '#FFF', // colorText when user has not videoOn | White or Black depending of contrast.

            mainAreaBg: '#5db7af', // backgroundColor behind participants and call
            // supportiveText: defaults.primary, // colorText used in ParticipantList header and as descriptive text to display relant info
          },
        },


      });
      this.callFrame = callFrame;



      // Add event listeners and join call
      callFrame
        .on("loaded", logEvent)
        .on("started-camera", logEvent)
        .on("camera-error", logEvent)
        .on("joining-meeting", goToLobby)
        .on("left-meeting", leaveCall)

        //@TODO: WIP...
        .on("joined-meeting", () => {
          this.updateParticipants()
          goToCall()
        })
        .on("participant-joined", this.updateParticipants)
        .on("participant-updated", this.updateParticipants)
        .on("participant-left", this.updateParticipants)

        .on('transcription-started', this.transcriptionStarted)
        .on('transcription-stopped', this.transcriptionStopped)
        .on('transcription-error', this.transcriptionError)
        .on('app-message', (msg) => {
          this.participantsToPromote(msg)

          this.transcriptionNewMessage(msg)
        })

        // .on("live-streaming-started", this.liveStreamingStarted)
        // .on("live-streaming-stopped", this.liveStreamingStopped)
        // .on("live-streaming-error", this.liveStreamingError)


      callFrame.join({
        url,
        showFullscreenButton: true,

        token,

        // showParticipantsBar: false,

      });

      // let others components/pages of the app know about this callFrame
      this.$nuxt.$emit('callFrame-init', callFrame);
    },

    updateParticipants(e) {
      console.log("[EVENT] ", e);
      if (!this.callFrame) return;

      const p = this.callFrame.participants();
      this.participants = Object.values(p);
      console.log(this.participants, "participants")

      // store session_id and user_id in array for Live Stream
      this.participantsLayout = []
      this.participants.map(p => this.participantsLayout.push({ value: p.session_id, text: p.user_id }))

      // store owner's room session_id
      for (let id in p) {
        if (id === 'local') {
          continue;
        }

        if (p[id].owner && ! p[id].local && !this.ownerSessionIds.includes(p[id].session_id)) {
          this.ownerSessionIds.push(p[id].session_id)
        }
      }

    },

    /**
     * Transcription can be just used if user is owner of the room.
     * @returns {Promise<void>}
     */
    async startTranscription() {
      await this.callFrame.startTranscription();
    },

    async stopTranscription() {
      await this.callFrame.stopTranscription();
    },

    transcriptionStarted() {
      console.log('💬 Transcription started');
      this.isTranscribing = true
    },

    transcriptionStopped() {
      console.log('💬 Transcription stopped');
      this.isTranscribing = false
    },

    transcriptionError(err) {
      console.log('❗ Transcription error!', err);
      this.isTranscribing = false
    },

    transcriptionNewMessage(msg) {
      // Collect only transcription messages, and gather enough
      // words to be able to post messages at sentence intervals
      if (msg?.fromId === 'transcription' && msg.data?.is_final) {
        const participants = this.callFrame.participants()

        // Get the sender's current display name or the local name
        const sender = msg.data?.session_id !== participants.local?.session_id
          ? participants[msg.data.session_id].user_name
          : participants.local.user_name;


        console.log("trans msg", { sender, message: msg.data.text })

        this.transcriptionHistory.push({ sender, message: msg.data.text })
      }

    },

    // startLiveStreaming() {
    //   // This should be in the format rtmp://RTMP_ENDPOINT/STREAM_KEY
    //   // rtmps://RTMP_ENDPOINT/STREAM_KEY
    //   const rtmpUrl =
    //     'rtmps://4777d1b2efd2.global-contribute.live-video.net:443/app/sk_eu-west-1_3bwP1ujbCaIu_MyzErJM3u98SV8oT4wXjLJzyxBPR71'
    //
    //   this.isLiveStreaming = false
    //   this.callFrame.startLiveStreaming({
    //     rtmpUrl,
    //
    //     // width: 1280, // Controls the resolution of the stream. This can only be set once via startLiveStreaming()
    //     // height: 720, // Controls the resolution of the stream. This can only be set once via startLiveStreaming()
    //     // backgroundColor: '#FF1F2D3D', // Specifies the background color of the stream, formatted as #rrggbb or #aarrggbb string. This can only be set once via startLiveStreaming()
    //
    //     /**
    //      * *- LAYOUT: an object specifying the way participants’ videos are laid out in the stream. -*
    //      *
    //      * A preset key with one of the following values must be provided:
    //      * 1- "default":
    //      * This is the default grid layout, which renders participants in a grid,
    //      * or in a single column vertical grid to the right, if a screen share is enabled.
    //      * Optionally, a ____"max_cam_streams"_____ integer key can be provided to specify how many cameras to include in the grid.
    //      * The default value is 9, which is also the maximum number of cameras in a grid. The maximum may be increased at a later date.
    //      *
    //      * 2- "single-participant":
    //      * Use this layout to stream only a single participant's audio and video.
    //      * The selected participant’s session ID must be specified via a "session_id" key.
    //      *
    //      * 3- "active-participant": This layout focuses on the current speaker, and places up to 9 other cameras
    //      * to the right in a single column vertical grid in the order in which they last spoke.
    //      *
    //      * 4- "portrait": Allows for mobile-friendly layouts. The video will be forced into portrait mode, where up to two participants will be shown.
    //      * An additional variant key may be specified. Valid values are "vertical" for a vertical grid layout (the default),
    //      * and "inset" for having one participant's video take up the entire screen and the other inset in a smaller rectangle.
    //      * Participants' videos are scaled and cropped to fit the entire available space.
    //      * Participants with the is_owner flag are shown lower in the grid (vertical variant), or full screen (inset variant).
    //      */
    //     layout: this.liveStreamConfigLayout,
    //   });
    // },
    //
    // stopLiveStreaming() {
    //   this.callFrame.stopLiveStreaming();
    // },
    //
    // liveStreamingStarted() {
    //   this.isLiveStreaming = true
    //   console.log('📺 Live stream started');
    //
    // },
    //
    // liveStreamingStopped() {
    //   this.isLiveStreaming = false
    //   console.log('📺 Live stream stopped');
    // },
    //
    // liveStreamingError(e) {
    //   this.isLiveStreaming = false
    //   console.log('📺 Live stream error ' + e.errorMsg);
    // },

    onParticipantLowerHand() {
      if (! this.callFrame) return;

      const participants = this.callFrame.participants()
      const participantWhoRH = participants.local

      const split = participantWhoRH?.user_name.split("✋ ");
      const username = split.length === 2 ? split[1] : split[0];
      this.callFrame.setUserName(username);

      // update handIsLower on controls participant
      this.handIsLower = true

      // Send a message to notify that the user wants to speak to each owner. [*Bring user to the stage*]
      this.ownerSessionIds.map(oSessionId => {
        this.callFrame.sendAppMessage(
          {
            //@todo: missing userName prop
            id: participantWhoRH?.user_id,
            action: 'unraising-hand' // 'make-speaker' | 'make-moderator' | 'make-listener'
          },
          oSessionId // OR '*' => * means to everyone
        );
      })
    },

    onParticipantRaiseHand() {
      if (!this.callFrame) return;

      const participants = this.callFrame.participants()
      const participantWhoRH = participants.local

      this.callFrame.setUserName(`✋ ${participantWhoRH?.user_id}`); // @todo: when we have a userName or fullname change to: p.user_name

      //to keep track of the newest users that raised hand -> `raising-hand-${p?.user_id}-${Date.now()}`;

      console.log("ownerSessionIds", this.ownerSessionIds)
      // Send a message to notify that the user wants to speak to each owner. [*Bring user to the stage*]
      this.ownerSessionIds.map(oSessionId => {
        this.callFrame.sendAppMessage(
          {
            //@todo: missing userName prop
            id: participantWhoRH?.user_id,
            action: 'raising-hand' // 'make-speaker' | 'make-moderator' | 'make-listener'
          },
          oSessionId // OR '*' => * means to everyone
        );
      })


      this.handIsLower = false
    },

    // Participants wants to speak..
    // Function can be called for a owner to promote another user or a participant who need to set lower hand
    participantsToPromote(msg){
      if (msg.data.action === 'raising-hand') {
        this.participantToPromote = { // participantToPromote can be call participantWRaisedHand
          session_id: msg.fromId,
          ...msg.data
        }
      }

      if (msg.data.action === 'raised-hand') {
        // As a participant that became speaker: remove raiseHand from label.
        this.onParticipantLowerHand()
      }

      if (msg.data.action === 'unraising-hand') {
        // As a Owner: remove participant from participantToPromote
        this.participantToPromote = {} // @todo: change obj to array, find user by session and remove from array.
      }

      console.log("participantsToPromote", msg)
    },

    promoteParticipantAsSpeaker(participant){
      this.callFrame.updateParticipant(participant.session_id, {
        setAudio: true
      });

      // Send a message to user that raise the hand to lower hand after being promoted as speaker.
      this.callFrame.sendAppMessage(
        {
          //@todo: missing userName prop
          id: participant.user_id,
          action: 'raised-hand' // 'make-speaker' | 'make-moderator' | 'make-listener'
        },
        participant.session_id
      );

      console.log("promoteParticipantAsSpeaker")
    }
  },
  // destroyed() {
  //   this.$nuxt.$emit('callFrame-init', null);
  // },
}
</script>

<style lang="scss" scoped>
.v-list-item__title, .v-list-item__subtitle {
 text-overflow: unset;
 white-space: unset;
}

.call-container {
  display: flex;
  max-width: 100%;
  height: 100%;
  margin: auto;
  flex: 1;
  flex-wrap: wrap;
}
.call-container.hidden {
  display: none;
}
#call {
  flex: 1;
  height: 100%;
}

</style>
