<!--
Create Daily Room

A Stepper form for creating a Room.

@link https://vuetifyjs.com/en/components/steppers/
-->
<template>
  <v-card >

    <v-card-title>
      <v-icon left>mdi-door</v-icon>
      {{ $t('Create_Room') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('Create_Room_Subtitle') }}</v-card-subtitle>

    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>

    <v-card-text>

      <v-stepper v-model="currentStep" alt-labels>
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1" :rules="[() => nameFormValid]">
            <template>
              <span class="text-center d-block">{{ $t('Select_room_type') }}</span>
              <small>{{ $t('Select_room_type_Subtitle')}}</small>
            </template>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 2" step="2" :rules="[() => accessFormValid]">
            <template>
              <span class="text-center d-block">{{ $t('Set_room_access') }}</span>
              <small>{{ $t('Set_room_access_Subtitle') }}</small>
            </template>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" >
            <template>
              <span class="text-center d-block">{{ $t('Configure_room_settings') }}</span>
              <small>{{ $t('Configure_room_settings_Subtitle') }}</small>
            </template>
          </v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>

          <v-stepper-content step="1">
            <v-card>
              <v-card-text>
                <v-form v-model="nameFormValid" ref="nameForm" lazy-validation>
                  <v-container fluid>
                    <span class="subheading">Select type</span>

                    <v-chip-group
                      v-model="room.type"
                      active-class="primary--text"
                      mandatory
                    >
                      <v-chip disabled>Livestream</v-chip>
                      <v-chip>Webinar</v-chip>
                      <v-chip>Meeting</v-chip>
                      <v-chip>Networking Lounge</v-chip>
                      <v-chip>Podcast</v-chip>
                    </v-chip-group>


                    <v-text-field
                      v-model="room.name"
                      label="Room name"
                      hint="Enter Room name"
                      persistent-hint
                      required
                      :rules="nameRules"
                      clearable
                    />

                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="cancel">
                  {{ $t('Cancel') }}
                </v-btn>
<!--                <v-btn @click="reset">-->
<!--                  {{ $t('Reset') }}-->
<!--                </v-btn>-->
                <v-spacer />
                <v-btn @click="submitNameForm">
                  {{ $t('Continue') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card>
              <v-card-text>

                <v-form v-model="accessFormValid" ref="accessForm" lazy-validation>
                  <v-container fluid>

                    <v-radio-group v-model="roomAccess">
                      <v-radio
                        value="open"
                      >
                        <template v-slot:label>
                          <v-icon left>
                            mdi-earth
                          </v-icon>

                          Open Room: Room can be accessible at every time.
                        </template>
                      </v-radio>

                      <v-radio
                        value="schedule"
                      >
                        <template v-slot:label>
                          <v-icon left>
                            mdi-calendar
                          </v-icon>

                          Schedule Room: Room can be accessible between a specific range date time.
                        </template>
                      </v-radio>
                    </v-radio-group>

                    <v-row v-show="roomAccess === 'schedule'">
                      <v-col cols="6">
                        <base-date-picker
                          v-model="nbfDate"
                          label="Start Date"
                          hint="Enter Start Date Hint"
                        />
                      </v-col>
                      <v-col cols="6">
                        <base-time-picker
                          v-model="nbfTime"
                          label="Start Time"
                          hint="Enter Start Time Hint"
                        />
                      </v-col>
                    </v-row>

                    <v-row v-show="roomAccess === 'schedule'">
                      <v-col cols="6">
                        <base-date-picker
                          v-model="expDate"
                          label="End Date"
                          hint="Enter End Date Hint"
                        />
                      </v-col>
                      <v-col cols="6">
                        <base-time-picker
                          v-model="expTime"
                          label="End Time"
                          hint="Enter End Time Hint"
                        />
                      </v-col>
                    </v-row>

                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn @click="currentStep = 1">{{ $t('Back') }}</v-btn>
                <v-spacer />
                <v-btn @click="submitAccessForm">{{ $t('Continue') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card>
              <v-card-text>

                <v-form v-model="accessFormValid" ref="accessForm" lazy-validation>
                  <v-container fluid>

                    <v-list two-line subheader>
                      <v-list-item>
                        <v-list-item-content>
                          <v-row>
                            <v-col cols="6">
                              <v-list-item-title>
                                Text chat
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                Participants can send text chat during calls.
                              </v-list-item-subtitle>
                            </v-col>

                            <v-col cols="6">
                              <v-switch
                                dense
                                color="primary"
                                v-model="room.properties.enable_chat"
                                :label="room.properties.enable_chat ? 'On': 'Off'"
                              ></v-switch>
                            </v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>

                      <v-divider  />

                      <v-list-item>
                        <v-list-item-content>
                          <v-row>
                            <v-col cols="6">
                              <v-list-item-title>
                                People
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                Users can view a list of all participants in the meeting.
                              </v-list-item-subtitle>
                            </v-col>

                            <v-col cols="6">
                              <v-switch
                                dense
                                color="primary"
                                v-model="room.properties.enable_people_ui"
                                :label="room.properties.enable_people_ui ? 'On': 'Off'"
                              ></v-switch>
                            </v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>

                      <v-divider  />

                      <v-list-item>
                        <v-list-item-content>
                          <v-row>
                            <v-col cols="6">
                              <v-list-item-title>
                                Network
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                Participants can view network stats, like packet loss and bitrate, during their call.
                              </v-list-item-subtitle>
                            </v-col>

                            <v-col cols="6">
                              <v-switch
                                dense
                                color="primary"
                                v-model="room.properties.enable_network_ui"
                                :label="room.properties.enable_network_ui ? 'On': 'Off'"
                              ></v-switch>
                            </v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>

                      <v-divider />

                      <v-list-item>
                        <v-list-item-content>
                          <v-row>
                            <v-col cols="6">
                              <v-list-item-title>
                                Recording
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                Enable video call recording for this room. Any participant in the room will be able to start the recording.
                              </v-list-item-subtitle>
                            </v-col>

                            <v-col cols="6">
                              <v-radio-group v-model="room.properties.enable_recording">
                                <v-radio
                                  :value="null"
                                >
                                  <template v-slot:label>
                                    <v-icon left>
                                      mdi-movie-open-off
                                    </v-icon>

                                    Off
                                  </template>
                                </v-radio>

                                <v-radio
                                  value="local"
                                >
                                  <template v-slot:label>
                                    <v-icon left>
                                      mdi-laptop
                                    </v-icon>

                                    Local recording
                                  </template>
                                </v-radio>

                                <v-radio
                                  value="cloud"
                                >
                                  <template v-slot:label>
                                    <v-icon left>
                                      mdi-cloud
                                    </v-icon>

                                    Cloud recording
                                  </template>
                                </v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>

                <v-container>
                  <v-alert
                    dense
                    text
                    type="success"
                    v-show="feedbackRoom"
                  >
                    Room <strong>{{ room.name }}</strong> created with success
                  </v-alert>

                  <v-alert v-show="roomError" class="mt-4" type="error">
                    Room could not be created: <br>
                    <p>
                      {{ roomErrorMsg }}
                    </p>
                  </v-alert>

                </v-container>

                <v-btn @click="currentStep = 2">{{ $t('Back') }}</v-btn>
                <v-spacer />

                <v-btn :loading="creatingRoom" color="primary" @click="submitForm">{{ $t('Create_Room') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

        </v-stepper-items>

      </v-stepper>

    </v-card-text>

  </v-card>

</template>

<script>
export default {
  name: "CreateRoom",
  methods: {
    cancel () {
      this.reset();
      this.$emit('close');
    },

    reset () {
      this.$refs.nameForm.reset();
      this.$refs.accessForm.reset();

      this.currentStep = 1;
    },

    async submitNameForm () {

      if (! this.$refs.nameForm.validate()) {
        this.nameFormValid = false;
        return;
      }

      this.nameFormValid = true;
      this.currentStep = 2;
    },

    async submitAccessForm () {

      if (! this.$refs.accessForm.validate()) {
        this.accessFormValid = false;
        return;
      }

      this.accessFormValid = true;
      this.currentStep = 3;
    },

    async submitForm () {
      console.log('Submitting the form');

      if (! this.nameFormValid || ! this.accessFormValid ) {
        return;
      }

      console.log(this.room.properties, "this.room.properties")

      const opt = {
        name: this.room.name,
        privacy: this.room.privacy,
        properties: {
          ...this.room.properties,
        }
      }

      if (this.nbfUnixTime) {
        opt.properties.nbf = this.nbfUnixTime
      }

      if (this.expUnixTime) {
        opt.properties.exp = this.expUnixTime
      }

      this.creatingRoom = true
      const room = await this.createRoom(opt)
      this.creatingRoom = false
      this.feedbackRoom = true

      //@todo: expose url in table and use url to join with token fetch...
      console.log("Join room with url: ", room.url);

      this.$emit('close');
    },

    /** Function that creates a new room.
     * ! - Meaning could be differences between the Daily Prebuilt and Daily call object. As well could be deprecated soon.
     * !! - Meaning could have limitations and might need to UPGRADE OR SCALE PLAN
     * Ref: https://docs.daily.co/reference/rest-api/rooms/create-room
     *
     *  name: The room name. Default: randomly generated string
     *  privacy: Determines who can access the room. (Options: "public","private"). | Default: Public
     *
     *  properties:
     *   nbf: "Not before". Unix timestamp (seconds since the epoch.) Users cannot join a meeting in this room before this time. | Default: <not set>
     *   exp:"Expires". This is a unix timestamp (seconds since the epoch.) Users cannot join a meeting in this room after this time. | Default: <not set>
     *
     * ! autojoin:
     *  - Skip the initial meeting join page and go straight into the call.
     *  - Default: true. **Consider to enable_prejoin_ui to false**
     *  - ❗️ autojoin will soon be deprecated
     *
     * ! enable_new_call_ui:
     *  - Sets whether the room uses Daily Prebuilt or the previous video chat interface.
     *  - Default: false for existing customers; true for new signups
     *  - ⚠️ This property will eventually be deprecated, once Daily Prebuilt is the only available interface experience.
     *
     * ! enable_people_ui:
     *  - Determines if Daily Prebuilt displays the People UI. When set to true, a People button in the call tray reveals a People tab
     *  in the call sidebar. When enable_people_ui is set to false, the button and tab are hidden.
     *  - ⚠️ Has no effect on custom calls built on the Daily call object.
     *  - ⚠️ If owner_only_broadcast is set to true and enable_chat is set to false, then the People UI is already hidden for participants.
     *  - Default: NULL
     *
     * ! enable_pip_ui:
     *  - Sets whether the room can use Daily Prebuilt's Picture in Picture controls. When set to true, an additional button will be
     *  available in Daily Prebuilt's UI to toggle the Picture in Picture feature.
     * - ⚠️ This flag only applies to Daily Prebuilt. It has no effect when building custom video applications with the Daily call object.
     * - ⚠️ This property is in beta as of daily-js 0.24.0.
     * - Default: false
     *
     * ! enable_prejoin_ui:
     * - Determines whether participants enter a waiting room with a camera, mic, and browser check before joining a call.
     * - ⚠️ You must be using Daily Prebuilt to use enable_prejoin_ui.
     * - Default: NULL
     * - If you want to have autojoin true then you must pass enable_prejoin_ui as false
     *
     * ! enable_network_ui:
     * - Determines whether the network button, and the network panel it reveals on click, appears in this room.
     * - ⚠️ You must be using Daily Prebuilt to use enable_network_ui.
     * - Default: false
     *
     * enable_knocking:
     *  - Turns on a lobby experience for private rooms. A participant without a corresponding meeting token
     *  can request to be admitted to the meeting with a "knock", and wait for the meeting owner to admit them.
     * - Requires the signaling_impl room or domain property set to "ws".
     * - Default: false
     *
     * enable_screenshare: | Default: true
     *
     * ! enable_video_processing_ui:
     * - Determines whether Daily Prebuilt displays background blur controls. When set to true, a participant can enable blur during a Daily Prebuilt call.
     * - ⚠️ This flag only applies to Daily Prebuilt. It has no effect when building custom video applications with the Daily call object.
     * - Default: true
     *
     * enable_chat: This property is one of multiple ways to add chat to Daily video calls. | Default: false
     * start_video_off: When a participant first joins a meeting in a room, keep their camera off. | Default: false
     * start_audio_off: When a participant first joins a meeting in a room, keep their microphone muted. | Default: false
     *
     * ! owner_only_broadcast: In Daily Prebuilt, only the meeting owners will be able to turn on camera, unmute mic, and share screen | Default: false
     *
     * eject_at_room_exp: If there's a meeting going on at room exp time, end the meeting by kicking everyone out.
     * This behavior can be overridden by setting eject properties of a meeting token. | Default: false
     *
     * eject_after_elapsed: Eject a meeting participant this many seconds [INTEGER VALUE] after the participant joins the meeting.
     * You can use this is a default length limit to prevent long meetings. This can be overridden by setting eject properties of a meeting token.
     *
     * lang:
     * - The default language of the Daily prebuilt video call UI, for this room.
     * - Setting the language at the room level will override any domain-level language settings you have.
     * - Read more about changing UI language settings: https://help.daily.co/en/articles/4579930-changing-the-language-setting-of-the-prebuilt-ui
     * - *Norwegian "no" and Russian "ru" are only available in the new Daily Prebuilt.
     * - Options: "de","en","es","fi","fr","it","jp","ka","nl","no","pt","pl","ru","sv","tr","user"
     * - Default: "en"
     *
     * meeting_join_hook:
     * - Sets a URL that will receive a webhook when a user joins a room.
     * - Default is NULL.
     * - Character limit for webhook URL is 255.
     * - Default: NULL
     * - [Configuring a webhook to send notifications when someone joins your video calls]: https://www.daily.co/blog/configure-a-webhook-to-send-notifications-when-someone-joins-your-video-calls/
     *
     * signaling_imp: Sets the signaling type. Options: "ws" | Default: "ws"
     *
     * geo:
     * - Daily calls use signaling servers to manage all of the participants in a given call session. In an SFU/server mode call, that same server will also send and receive all the audio and video from each participant. In a peer-to-peer call, each participant sends media directly to and from each other peer, but a signaling server still manages call state.
     * Daily runs servers in several different AWS regions to minimize latency for users around the world. The job of 'picking' a call server is handled when the first participant joins a room. Their browser connects to a call server using Amazon's Route 53 DNS resolution, which chooses a server in the region closest to them.
     * This isn't always optimal. For example, if one person joins in London, and then ten more people join from Cape Town, the call will still be hosted out of eu-west-2 . The majority of the participants will have higher latency to the server than if one of them had joined first and the call was being hosted in af-south-1. In cases like this, you may want to configure your domain (or a specific room) to always choose a call server in a specific AWS region.
     * - Available regions:
     * - "af-south-1" (Cape Town)
     * - "ap-northeast-2" (Seoul)
     * - "ap-southeast-1" (Singapore)
     * - "ap-southeast-2" (Sydney)
     * - "ap-south-1" (Mumbai)
     * - "eu-central-1" (Frankfurt)
     * - "eu-west-2" (London)
     * - "sa-east-1" (São Paulo)
     * - "us-east-1" (N. Virginia)
     * - "us-west-2" (Oregon)
     * - Default: NULL
     *
     *
     * !! SCALE PLAN ONLY !!
     * !! max_participants: How many people are allowed in a room at the same time. | Default: 200
     *
     * !! enable_recording:
     * Recording docs: https://docs.daily.co/reference/rest-api/rooms/create-room#enable_recording && https://docs.daily.co/reference/rest-api/recordings
     * - Options: "cloud","local","rtp-tracks","output-byte-stream","<not set>"
     * - Default: <not set>
     *
     * @param options {{
     * name: string,
     * privacy: string,
     * properties: {
     *
     * nbf: number | undefined,
     * exp: number | undefined,
     * max_participants: number | undefined,
     * enable_prejoin_ui: boolean | undefined,
     * enable_new_call_ui: boolean | undefined,
     * enable_people_ui: boolean | undefined,
     * enable_pip_ui: boolean | undefined,
     * enable_network_ui: boolean | undefined,
     * enable_knocking: boolean | undefined,
     * enable_screenshare: boolean | undefined,
     * enable_video_processing_ui: boolean | undefined,
     * enable_chat: boolean | undefined,
     * start_video_off: boolean | undefined,
     * start_audio_off: boolean | undefined,
     *
     * owner_only_broadcast: boolean | undefined,
     * enable_recording: string | undefined,
     *
     * eject_at_room_exp: boolean | undefined,
     * eject_after_elapsed: number | undefined,
     * lang: string | undefined,
     * meeting_join_hook: string | undefined,
     * signaling_imp: string | undefined,
     * geo: string | undefined,
     * }
     *
     * }}
     */
    async createRoom(options){
      try {
        return await this.$api().daily.createRoom(options)

      } catch(e){
        console.log(e.response.data);
        this.roomError = true;
        this.roomErrorMsg = e.response.data && e.response.data.info;
      }
    },
  },

  data: () => ({
    currentStep: 1,
    accessFormValid: true,
    nameFormValid: false,


    room: {
      type: null, // 0:livestream - 1:webinar - 2:meeting - 3:networking lounge - 4:podcast
      name: "",
      privacy: "private",
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
        lang: 'en',

        owner_only_broadcast: false,
        eject_at_room_exp: false, // should just be true when exp unix time is present.

        enable_recording: null,

        enable_pip_ui: true,
      },

    },

    nbfDate: undefined,
    expDate: undefined,
    nbfTime: undefined,
    expTime: undefined,

    roomAccess: 'open',
    feedbackRoom: false,
    creatingRoom: false,
    roomError: false,
    roomErrorMsg: ''

  }),
  computed: {
    nameRules() {
      //TODO: Handle i18n.
      return [
        v => !!v || 'Room name is required', // @todo make i18n compat
      ]
    },

    nbfUnixTime(){
      Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

      const dateTime = this.nbfDate && this.nbfTime ? this.nbfDate + 'T' + this.nbfTime + ':00': null;

      return new Date(dateTime).getUnixTime()
    },

    expUnixTime(){
      Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

      const dateTime = this.expDate && this.expTime ? this.expDate + 'T' + this.expTime + ':00': null;
      return new Date(dateTime).getUnixTime()
    },
  },
  watch: {
    /**
     * @todo:
     * When roomType = webinar
     *
     * privacy: "private",
     * enable_knocking: true.
     * prejoin true
     * camera on start off -true
     * video on start off -true
     * screen sharing on
     * textchat on
     * people on
     * backgroud effects on
     * network on
     * owner only broadcast on/true
     *
     *
     *
     * @todo: When roomType = meetings/or networking lounge - User may want to set limit people (max.Participants)
     * @todo: When roomType = meetings/or networking lounge - User may want to set eject after
     *
     * @todo: all roomType needs recording on.. (Feature not tested/implemented yet.)
     * @todo: privacy field for others roomType
     *
     */
    'room.type'(type){
      switch (type) {
        case 0:
          console.log("Room type: livestream")
          break;

        case 1:
          // Set up room for webinar case
          this.room.privacy = 'private'
          this.room.properties.enable_knocking = true
          this.room.properties.enable_prejoin_ui = true
          this.room.properties.start_video_off = true
          this.room.properties.start_audio_off = true
          this.room.properties.enable_screenshare = true
          this.room.properties.enable_chat = true
          this.room.properties.enable_people_ui = true
          this.room.properties.enable_video_processing_ui = true
          this.room.properties.enable_network_ui = true
          // this.room.properties.owner_only_broadcast = true

          console.log("Room type: webinar", this.room)

          break;

        case 2:
          console.log("Room type: meeting")
          break;

        case 3:
          console.log("Room type: networking lounge")
          break;

        case 4:
          console.log("Room type: podcast")
          break;
      }
    }
  }
}
</script>
