<template>
  <v-card class="controls">
    <v-card-title>
      <v-icon left>
        mdi-pan
      </v-icon>
      Panel
    </v-card-title>
    <v-card-subtitle>
      Control your room with this panel.
    </v-card-subtitle>

    <v-card-text>

      <v-tabs>
        <v-tab >
          <v-icon small left>
            mdi-account-group
          </v-icon>
          Participants {{ participants.length ? `(${participants.length})`: '' }}
        </v-tab>

        <v-tab-item class="mt-2">
          <v-container class="d-flex justify-space-between">
            <v-btn @click="muteAll">
              <v-icon left>
                mdi-volume-off
              </v-icon>
              Mute All
            </v-btn>

            <v-btn @click="raiseHand" v-show="! raisedHand">
              <v-icon left> mdi-hand-back-left </v-icon>
              Raise Hand
            </v-btn>

            <v-btn @click="lowerHand" v-show="raisedHand">
              <v-icon left> mdi-hand-back-left-off </v-icon>
              Lower Hand
            </v-btn>

          </v-container>

          <div class="overflow-y-auto" style="max-height: 500px">
            <v-app-bar
              v-for="p in participants"
              :key="p.session_id"
              class="mb-2 ml-1"
              color="rgba(0,0,0,0)"
              flat
            >
              <v-badge
                bordered
                bottom
                color="green"
                dot
                offset-x="16"
                offset-y="9"
              >
                <v-avatar class="mt-n5 mr-2" size="30" elevation="10">
                  <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
                </v-avatar>
              </v-badge>

              <v-list-item class="pa-0">
                <v-list-item-content>
                  <div style="word-break: break-word">
                    {{ p['user_name'] }}
                  </div>
                  <v-list-item-subtitle style="margin-top: .25rem">
                    {{ 'name' }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    small
                    color="accent"
                    @click="promoteAsSpeaker(p)"
                    v-if="p['session_id'] === participantToPromote.session_id"
                  >
                    <v-icon left>
                      mdi-account-voice
                    </v-icon>
                    Make speaker
                  </v-btn>

                  <v-btn
                    class="mt-2"
                    small
                    color="error"
                    @click="muteSpeaker(p['session_id'])"
                    v-if="! (p['owner'] && p['local']) && p['audio']"
                  >
                    <v-icon left>
                      mdi-volume-off
                    </v-icon>
                    Mute
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-app-bar>
          </div>
        </v-tab-item>

        <v-tab >
          <v-icon small left>
            mdi-cog
          </v-icon>
          Controls
        </v-tab>

        <v-tab-item class="mt-2">
<!--          <v-btn @click="toggleCamera">Toggle camera</v-btn>-->
<!--          <v-btn @click="toggleMic">Toggle mic</v-btn>-->
<!--          <v-btn @click="toggleScreenShare">Toggle screen share</v-btn>-->
<!--          <v-btn @click="expandFullscreen">Expand fullscreen</v-btn>-->
<!--          <v-btn @click="toggleLocalVideo">-->
<!--            {{ localVideoText }} local video-->
<!--          </v-btn>-->
<!--          <v-btn @click="toggleRemoteParticipants">-->
<!--            {{ remoteVideoText }} remote participants (Speaker view only)-->
<!--          </v-btn>-->
<!--          <v-btn @click="leaveCall">-->
<!--            Leave call-->
<!--          </v-btn>-->

          <slot name="custom-controls"></slot>


          <v-card-title>Invite participants</v-card-title>
          <v-card-subtitle>Share URL below to invite others</v-card-subtitle>
          <div class="text-center">
            <!-- Room URL to copy and share -->
            <v-text-field type="text" id="urlInput" :value="roomUrl" />
            <v-btn @click="copyUrl" color="accent">{{ copyButtonText }}</v-btn>
          </div>
        </v-tab-item>

        <v-tab :disabled="! transcriptionHistory.length">
          <v-icon small left>
            mdi-script-text-play
          </v-icon>
          Transcriptions {{ transcriptionHistory.length ? `(${transcriptionHistory.length})`: '' }}
        </v-tab>

        <v-tab-item class="mt-2">
          <div class="overflow-y-auto" style="height: 500px">

            <v-app-bar
              v-for="(transcription, i) in transcriptionHistory"
              :key="i"
              class="mb-2 ml-1"
              color="rgba(0,0,0,0)"
              flat
            >
              <v-badge
                bordered
                bottom
                color="green"
                dot
                offset-x="16"
                offset-y="9"
              >
                <v-avatar class="mt-n5 mr-2" size="30" elevation="10">
                  <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
                </v-avatar>
              </v-badge>

              <v-list-item class="pa-0">
                <v-list-item-content>
                  <div style="word-break: break-word">
                    {{ transcription.message }}
                  </div>
                  <v-list-item-subtitle style="margin-top: .25rem">
                    {{ transcription.sender }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-app-bar>
          </div>
        </v-tab-item>
      </v-tabs>


    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: "ControlsIframe",
  props: ["roomUrl", "callFrame", "transcriptionHistory", "participants", "participantToPromote", "handIsLower"],
  data() {
    return {
      copyButtonText: "Copy URL",
      localVideoText: "Hide",
      remoteVideoText: "Hide",

      raisedHand: false
    };
  },

  watch: {
    handIsLower(val){
      console.log(val, "hand is lowerrrrr")
      if (val) {
        this.raisedHand = false
      }
    }
  },

  methods: {
    muteAll(){
      this.$emit('on-mute-all')
    },

    muteSpeaker(sessionId){
      this.$emit('on-mute-speaker', sessionId)
    },

    raiseHand(){
      this.raisedHand = true
      this.$emit('on-raise-hand')
    },

    lowerHand(){
      this.raisedHand = false
      this.$emit('on-lower-hand')
    },

    promoteAsSpeaker(participant){
      this.$emit('promote-participant', participant)
    },

    copyTextToClipboard(text) {
      if (!navigator.clipboard) {
        return;
      }
      navigator.clipboard.writeText(text).then(
        function() {
          console.log("Async: Copying to clipboard was successful!");
        },
        function(err) {
          console.error("Async: Could not copy text: ", err);
        }
      );
    },
    copyUrl() {
      this.copyTextToClipboard(this.roomUrl);
      this.copyButtonText = "Copied!";
    },
    toggleCamera() {
      this.callFrame.setLocalVideo(!this.callFrame.localVideo());
    },
    toggleMic() {
      this.callFrame.setLocalAudio(!this.callFrame.localAudio());
    },
    toggleScreenShare() {
      const participants = this.callFrame.participants();
      if (participants?.local?.screen) {
        this.callFrame.stopScreenShare();
      } else {
        this.callFrame.startScreenShare();
      }
    },
    expandFullscreen() {
      this.callFrame.requestFullscreen();
    },
    toggleLocalVideo() {
      const hidden = !this.callFrame.showLocalVideo();
      this.localVideoText = hidden ? "Hide" : "Show";
      this.callFrame.setShowLocalVideo(hidden);
    },
    toggleRemoteParticipants() {
      const hidden = !this.callFrame.showParticipantsBar();
      this.remoteVideoText = hidden ? "Hide" : "Show";
      this.callFrame.setShowParticipantsBar(hidden);
    },
    leaveCall() {
      this.callFrame.leave().then(() => this.callFrame.destroy());
    },
  },
};
</script>
