<template>
  <div class="controls">
    <div class="devices">
      <v-btn @click="handleAudioClick">
        <template v-if="participant.audio">
          <v-icon>mdi-microphone</v-icon>
        </template>
        <template v-else>
          <v-icon>mdi-microphone-off</v-icon>
        </template>
      </v-btn>

      <v-btn @click="handleVideoClick">
        <template v-if="participant.video">
          <v-icon>mdi-video</v-icon>
        </template>
        <template v-else>
          <v-icon>mdi-video-off</v-icon>
        </template>
      </v-btn>

      <template v-if="supportsScreenshare">
        <v-btn @click="handleScreenshareClick" :disabled="disableScreenShare">
          <v-icon>mdi-laptop</v-icon>
<!--          <v-icon>mdi-cast-variant</v-icon>-->
        </v-btn>
      </template>
    </div>

    <v-btn color="red darken-1" class="leave" @click="leaveCall">
<!--      <v-icon>mdi-phone-hangup</v-icon>-->
      <v-icon size="1.85rem">mdi-exit-to-app</v-icon>
    </v-btn>
  </div>
</template>

<script>
import daily from "@daily-co/daily-js";

export default {
  name: "Controls",
  props: [
    "participant",
    "handleVideoClick",
    "handleAudioClick",
    "handleScreenshareClick",
    "leaveCall",
    "disableScreenShare",
  ],
  data() {
    return {
      supportsScreenshare: false,
    };
  },
  mounted() {
    // Only show the screen share button if the browser supports it
    this.supportsScreenshare = daily.supportedBrowser().supportsScreenShare;
  },
};
</script>

<style scoped>
.controls {
  position: absolute;
  bottom: 12px;
  left: 8px;
  justify-content: space-between;
  display: flex;
  width: calc(100% - 16px);
}

.devices {
  margin: auto;
  border-radius: 12px;
  background-color: #121a24;
  opacity: 0.85;
  padding: 14px 10px 15px;
}

.leave {
  height: auto !important;
  margin-left: -5rem;
  border-radius: 12px;
}
</style>
