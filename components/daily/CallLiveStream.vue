<!--
 Smart Component Daily Call iFrame for Live Streams - [IGNORE UNLESS WE WANT DO IMPLEMENT DAILY LIVE STREAMS]
-->
<template>
  <v-card height="100%">
    <v-card-title>
      <v-icon left>
        mdi-television-classic
        <!--             mdi-theater-->
      </v-icon>
      Live streaming
    </v-card-title>
    <v-card-subtitle>You can control the live streaming from here.</v-card-subtitle>
    <v-card-text class="text-center">

      <v-container>
        <v-row>
          <v-col>
            <v-select
              v-model="liveStreamConfigLayout.preset"
              :items="layoutType"
              label="Layout"
            />

            <v-select
              v-model="liveStreamConfigLayout.max_cam_streams"
              :items="maxCams"
              v-show="liveStreamConfigLayout.preset === 'default'"
              placeholder="Additional cameras"
            />

            <v-select
              v-model="liveStreamConfigLayout.session_id"
              :items="participantsLayout"
              v-show="liveStreamConfigLayout.preset === 'single-participant'"
              label="Select Participant"
            />

            <v-btn @click="startLiveStreaming" v-if="!isLiveStreaming" :disabled="!callFrame">
              <v-icon left v-show="! isLiveStreaming" color="red">mdi-play</v-icon>

              Start live streaming
            </v-btn>

            <v-btn @click="stopLiveStreaming" :disabled="!callFrame" v-else>
              <v-icon left color="red">mdi-stop</v-icon>
              Stop live streaming
            </v-btn>
          </v-col>
        </v-row>
        <v-row style="
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;">
          <v-col>
<!--            width="520"-->
<!--            height="440"-->

            <v-card-title class="pl-0">
             <v-icon left>mdi-eye</v-icon> Preview

              <v-spacer></v-spacer>

              <v-chip v-if="isLiveStreaming && isLiveRTC" small outlined class="px-2 blink" color="error">
                <v-icon left x-small>mdi-circle</v-icon>
                <strong>LIVE</strong>
              </v-chip>

              <template v-else>
                <v-progress-circular
                  v-if="isLiveStreaming"
                  class="mr-3"
                  :size="20" :width="3"
                  indeterminate
                  color="primary"
                >
                </v-progress-circular>
                <small v-if="isLiveStreaming">Streaming...</small>
              </template>
            </v-card-title>

            <daily-preview-streaming @live="liveRTCHandle" :playing="isLiveStreaming"></daily-preview-streaming>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data(){
    return {
      callFrame: null,
      isLiveStreaming: false,

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

      isLiveRTC: false,
    }
  },

  created() {
    this.$nuxt.$on('callFrame-init', (callFrame) => {
      this.callFrame = callFrame

      this.callFrame.on("live-streaming-started", this.liveStreamingStarted)
      this.callFrame.on("live-streaming-stopped", this.liveStreamingStopped)
      this.callFrame.on("live-streaming-error", this.liveStreamingError)
    })
  },

  methods: {
    liveRTCHandle(){
      this.isLiveRTC =  true
    },

    startLiveStreaming() {
      if (! this.callFrame) return

      // This should be in the format rtmp://RTMP_ENDPOINT/STREAM_KEY
      // rtmps://RTMP_ENDPOINT/STREAM_KEY
      const rtmpUrl =
        'rtmps://4777d1b2efd2.global-contribute.live-video.net:443/app/sk_eu-west-1_3bwP1ujbCaIu_MyzErJM3u98SV8oT4wXjLJzyxBPR71'

      this.isLiveStreaming = false
      this.callFrame.startLiveStreaming({
        rtmpUrl,

        // width: 1280, // Controls the resolution of the stream. This can only be set once via startLiveStreaming()
        // height: 720, // Controls the resolution of the stream. This can only be set once via startLiveStreaming()
        // backgroundColor: '#FF1F2D3D', // Specifies the background color of the stream, formatted as #rrggbb or #aarrggbb string. This can only be set once via startLiveStreaming()

        /**
         * *- LAYOUT: an object specifying the way participants’ videos are laid out in the stream. -*
         *
         * A preset key with one of the following values must be provided:
         * 1- "default":
         * This is the default grid layout, which renders participants in a grid,
         * or in a single column vertical grid to the right, if a screen share is enabled.
         * Optionally, a ____"max_cam_streams"_____ integer key can be provided to specify how many cameras to include in the grid.
         * The default value is 9, which is also the maximum number of cameras in a grid. The maximum may be increased at a later date.
         *
         * 2- "single-participant":
         * Use this layout to stream only a single participant's audio and video.
         * The selected participant’s session ID must be specified via a "session_id" key.
         *
         * 3- "active-participant": This layout focuses on the current speaker, and places up to 9 other cameras
         * to the right in a single column vertical grid in the order in which they last spoke.
         *
         * 4- "portrait": Allows for mobile-friendly layouts. The video will be forced into portrait mode, where up to two participants will be shown.
         * An additional variant key may be specified. Valid values are "vertical" for a vertical grid layout (the default),
         * and "inset" for having one participant's video take up the entire screen and the other inset in a smaller rectangle.
         * Participants' videos are scaled and cropped to fit the entire available space.
         * Participants with the is_owner flag are shown lower in the grid (vertical variant), or full screen (inset variant).
         */
        layout: this.liveStreamConfigLayout,
      });
    },

    stopLiveStreaming() {
      if (! this.callFrame) return

      this.callFrame.stopLiveStreaming();
    },

    liveStreamingStarted() {
      this.isLiveStreaming = true
      console.log('📺 Live stream started');

    },

    liveStreamingStopped() {
      this.isLiveStreaming = false
      console.log('📺 Live stream stopped');
    },

    liveStreamingError(e) {
      this.isLiveStreaming = false
      console.log('📺 Live stream error ' + e.errorMsg);
    },
  }
}
</script>

<style>
@keyframes blinking {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.blink {
  animation: blinking 1.2s infinite;
}
</style>
