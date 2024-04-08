<template>
  <div>

    <v-container class="mt-4 ml-4">
      <v-badge
        v-if="messages.length"
        bordered
        overlap
        :color="! messages.length ? 'primary' : 'success'"
        :content="messages.length"
      >
        <v-btn
          color="info"
          @click.stop="drawer = !drawer"
        >
          <v-icon left>mdi-forum</v-icon> Chat
        </v-btn>
      </v-badge>

      <v-btn
        v-else
        color="info"
        @click.stop="drawer = !drawer"
      >
        <v-icon left>mdi-forum</v-icon> Chat
      </v-btn>
    </v-container>



    <!-- loading is true when the call is in the "joining-meeting" meeting state -->
    <template v-if="loading">
      <div class="loading-spinner"><loading /></div>
    </template>

    <template v-else>
      <v-container >
        <template v-if="error">
          <p class="error--text">{{ error }}</p>
          <!-- refreshing will leave the call and reset the app state -->
          <v-btn color="warning" @click="leaveAndCleanUp">
            Refresh
          </v-btn>
        </template>

        <template v-if="showPermissionsError">
          <permissions-error-msg :reset="leaveAndCleanUp" />
        </template>

        <template v-else>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                :class="screen ? 'tile-container' : 'tile-container full-height'"
              >
                <template v-if="screen">
                  <screenshare-tile :participant="screen" />
                </template>

                <div class="participants-container" v-if="participants">
                  <template>
                    <video-tile
                      v-for="p in participants" :key="p.session_id"
                      :participant="p"
                      :handleVideoClick="handleVideoClick"
                      :handleAudioClick="handleAudioClick"
                      :handleScreenshareClick="handleScreenshareClick"
                      :leaveCall="leaveAndCleanUp"
                      :disableScreenShare="screen && !screen.local"
                    />
                  </template>

                  <template v-if="count === 1">
                    <waiting-card :url="roomUrl" />
                  </template>
                </div>
              </v-col>
            </v-row>
          </v-container>

        </template>


        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
          width="500"
        >

          <chat :sendMessage="sendMessage" :messages="messages" />

        </v-navigation-drawer>
      </v-container>
    </template>
  </div>
</template>

<script>
import daily from "@daily-co/daily-js";

import WaitingCard from "./WaitingCard.vue";
import Chat from "./Chat.vue";
import VideoTile from "./VideoTile.vue";
import ScreenshareTile from "./ScreenshareTile.vue";
import Loading from "./Loading.vue";
import PermissionsErrorMsg from "./PermissionsErrorMsg.vue";

export default {
  name: "Call",
  components: {
    VideoTile,
    WaitingCard,
    Chat,
    ScreenshareTile,
    Loading,
    PermissionsErrorMsg,
  },
  props: ["leaveCall", "name", "roomUrl"],
  data() {
    return {
      callObject: null,
      participants: null,
      count: 0,
      messages: [],
      error: false,
      loading: false,
      showPermissionsError: false,
      screen: null,

      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
      ],
    };
  },
  mounted() {
    const option = {
      url: this.roomUrl,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1ZCI6ImN1c3RvbWVycy51Y2FzLmFiY2I1NDFmLWQ3NzctNDgzOC05ZWMyLTExYmY1YzNlYjk1NSIsIm8iOnRydWUsInIiOiJ0cmFuc2NyaXB0MiIsImQiOiJjMzNlNWE3Zi02YmQxLTRjMjMtYjk1Mi0zMDZjYmQ3NTc1MjIiLCJpYXQiOjE2NTA0NDgyMDR9.7y6DJGCUiDnXT5H11Q3bGWZd01Q5kXPpsJRvuT5l-08'
    };

    // Create instance of Daily call object
    const co = daily.createCallObject(option);
    // Assign in data obj for future reference
    this.callObject = co;

    // Join the call with the name set in the Home.vue form
    co.join({ userName: this.name });

    // Add call and participant event handler
    // Visit https://docs.daily.co/reference/daily-js/events for more event info
    co.on("joining-meeting", this.handleJoiningMeeting)
      .on("joined-meeting", this.updateParticipants)
      .on("participant-joined", this.updateParticipants)
      .on("participant-updated", this.updateParticipants)
      .on("participant-left", this.updateParticipants)
      .on("error", this.handleError)
      // camera-error = device permissions issue
      .on("camera-error", this.handleDeviceError)
      // app-message handles receiving remote chat messages
      .on("app-message", this.updateMessages);
  },
  unmounted() {
    if (!this.callObject) return;
    // Clean-up event handlers
    this.callObject
      .off("joining-meeting", this.handleJoiningMeeting)
      .off("joined-meeting", this.updateParticipants)
      .off("participant-joined", this.updateParticipants)
      .off("participant-updated", this.updateParticipants)
      .off("participant-left", this.updateParticipants)
      .off("error", this.handleError)
      .off("camera-error", this.handleDeviceError)
      .off("app-message", this.updateMessages);
  },
  methods: {
    /**
     * This is called any time a participant update registers.
     * In large calls, this should be optimized to avoid re-renders.
     * For example, track-started and track-stopped can be used
     * to register only video/audio/screen track changes.
     */
    updateParticipants(e) {
      console.log("[EVENT] ", e);
      if (!this.callObject) return;

      const p = this.callObject.participants();
      this.count = Object.values(p).length;
      this.participants = Object.values(p);

      const screen = this.participants.filter((p) => p.screenVideoTrack);
      if (screen?.length && !this.screen) {
        console.log("[SCREEN]", screen);
        this.screen = screen[0];
      } else if (!screen?.length && this.screen) {
        this.screen = null;
      }
      this.loading = false;
    },
    // Add chat message to local message array
    updateMessages(e) {
      console.log("[MESSAGE] ", e.data);
      this.messages.push(e?.data);
    },
    // Show local error in UI when daily-js reports an error
    handleError(e) {
      console.log("[ERROR] ", e);
      this.error = e?.errorMsg;
      this.loading = false;
    },
    // Temporary show loading view while joining the call
    handleJoiningMeeting() {
      this.loading = true;
    },
    // Toggle local microphone in use (on/off)
    handleAudioClick() {
      const audioOn = this.callObject.localAudio();
      this.callObject.setLocalAudio(!audioOn);
    },
    // Toggle local camera in use (on/off)
    handleVideoClick() {
      const videoOn = this.callObject.localVideo();
      this.callObject.setLocalVideo(!videoOn);
    },
    // Show permissions error in UI to alert local participant
    handleDeviceError() {
      this.showPermissionsError = true;
    },
    // Toggle screen share
    handleScreenshareClick() {
      if (this.screen?.local) {
        this.callObject.stopScreenShare();
        this.screen = null;
      } else {
        this.callObject.startScreenShare();
      }
    },
    /**
     * Send broadcast message to all remote call participants.
     * The local participant updates their own message history
     * because they do no receive an app-message Daily event for their
     * own messages.
     */
    sendMessage(text) {
      // Attach the local participant's username to the message to be displayed in Chat.vue
      const local = this.callObject.participants().local;
      const message = { message: text, name: local?.user_name || "Guest" };
      this.messages.push(message);
      this.callObject.sendAppMessage(message, "*");
    },
    // leave call, destroy call object, and reset local state values
    leaveAndCleanUp() {
      if (this.screen?.local) {
        this.callObject.stopScreenShare();
      }
      this.callObject.leave().then(() => {
        this.callObject.destroy();

        this.participantWithScreenshare = null;
        this.screen = null;
        this.leaveCall();
      });
    },
  },
};
</script>

<style scoped>

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.tile-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  /*width: 1200px;*/
}
.participants-container {
  display: flex;
  margin: 0 -20px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  height: inherit;
}


</style>
