<template>
  <v-card class="rounded-t-lg rounded-0" :height="height">
    <!-- When is just an Image -->
    <v-img
      v-if="mediaType === 'image'"
      height="100%"
      width="100%"
      class="rounded-lg"
      style="object-fit: contain;"
      :src="imgSrc"
    ></v-img>
    <!-- width="640"  -->

    <div v-else>

      <!-- When is a custom Image/Video (Show a Cover Image but is video exits will have the Play button to Load the Custom Video Element)-->
      <div style="position: relative;" v-if="! videoEmbed">
        <video class="rounded-lg" ref="elVideo" width="100%" :height="height" controls preload="none" @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused">
          <source :src="videoSrc"> <!-- type="video/mp4" -->
          Your browser does not support the video tag.
        </video>

        <div v-show="! showVideoEmbed" class="video-img-overlay">
          <v-img  :height="height"
                  width="100%"
                  class="rounded-t-lg"
                  style="object-fit: contain;"
                  :src="imgSrc"
          />
        </div>

        <div v-show="! showVideoEmbed"  class="play-pause" @click="onPlayPause">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.686 13.3628C16.2026 12.5119 15 13.209 15 14.9184V27.5337C15 29.2449 16.2026 29.9411 17.686 29.091L28.7124 22.7674C30.1962 21.9163 30.1962 20.5372 28.7124 19.6862L17.686 13.3628Z" :fill="$vuetify.theme.themes.light.primary" fill-opacity="0.8"></path>
            <circle cx="21" cy="21" r="20" :stroke="$vuetify.theme.themes.light.primary" stroke-width="2"></circle>
          </svg>
        </div>
      </div>

      <!-- When is a Video Embed (Youtube - Video, etc)-->
      <iframe
        v-else-if="videoEmbed"
        width="100%"
        :height="height"
        class="rounded-lg"
        :src="videoSrc"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    mediaType: {
      type: String,
      default: 'image'
    },
    imgSrc: {
      type: String,
      default: 'https://eventheads.ivent-hq.com/hubfs/The%20Engagement%20value%20of%20Gamification.png'
    },
    videoSrc: {
      type: String,
    },
    videoEmbed: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 360
    },
  },
  data(){
    return {
      showVideoEmbed: false
    }
  },
  methods: {
    updatePaused(e){
      if (e?.type === 'pause') {
        this.showVideoEmbed = false
      } else if (e?.type === 'playing') {
        this.showVideoEmbed = true
      }
    },
    onPlayPause(){
      this.showVideoEmbed = !this.showVideoEmbed

      this.$refs.elVideo.play()
    }
  }
}
</script>

<style>
.play-pause {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  cursor: pointer;
}

.video-img-overlay{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

video {
  object-fit: cover;
}
</style>
