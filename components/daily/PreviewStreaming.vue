<!--
 Smart Component Daily Preview IVS video live stream
-->
<template>
<!--  <video id="video-player" class="rounded-lg" ref="elVideo" width="100%" height="360" controls preload="none" >-->
<!--  </video>-->
  <video
    ref="elVideo"
    id="video-player"
    width="100%"
    height="360"
    controls
    muted
    class="rounded-lg"
  ></video>
</template>

<script>
export default {
  props: {
    playing: {
      type: Boolean
    }
  },

  // async mounted(){
  //   const playbackUrl = 'https://4777d1b2efd2.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.841144982209.channel.Lh8MS30MZlnf.m3u8';
  //   let player;
  //
  //   if (IVSPlayer.isPlayerSupported) {
  //     player = IVSPlayer.create();
  //     player.attachHTMLVideoElement(this.$refs.elVideo);
  //     player.load(playbackUrl);
  //     player.play();
  //
  //   }
  //
  //   attachListeners()
  //
  //   function attachListeners() {
  //     const { ErrorType, PlayerEventType, PlayerState } = IVSPlayer;
  //
  //     for (let state of Object.values(PlayerState)) {
  //       player.addEventListener(state, () => {
  //         console.log(state);
  //       });
  //     }
  //
  //     player.addEventListener(PlayerEventType.INITIALIZED, () => {
  //       console.log('INITIALIZED');
  //     });
  //
  //     player.addEventListener(PlayerEventType.ERROR, (error) => {
  //       const statusTooManyRequests = 429;
  //       if (error.type === ErrorType.NOT_AVAILABLE && error.code === statusTooManyRequests) {
  //         console.error('Concurrent-viewer limit reached', error);
  //       } else {
  //         console.error('ERROR', error);
  //       }
  //     });
  //
  //     player.addEventListener(PlayerEventType.QUALITY_CHANGED, (quality) => {
  //       console.log('QUALITY_CHANGED', quality);
  //     });
  //
  //     // This event fires when text cues are encountered, such as captions or subtitles
  //     player.addEventListener(PlayerEventType.TEXT_CUE, (cue) => {
  //       console.log('TEXT_CUE', cue.startTime, cue.text);
  //     });
  //
  //     // This event fires when embedded Timed Metadata is encountered
  //     player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
  //       console.log('Timed metadata', cue.text);
  //     });
  //   }
  // },
  mounted(){
    // const playbackUrl = 'https://4777d1b2efd2.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.841144982209.channel.Lh8MS30MZlnf.m3u8';
    // let player;
    //
    // if (IVSPlayer.isPlayerSupported) {
    //   player = IVSPlayer.create();
    //   player.attachHTMLVideoElement(this.$refs.elVideo);
    //   player.load(playbackUrl);
    //   player.play();
    //
    // }

    // attachListeners()
    //
    // function attachListeners() {
    //   const { ErrorType, PlayerEventType, PlayerState } = IVSPlayer;
    //
    //   for (let state of Object.values(PlayerState)) {
    //     player.addEventListener(state, () => {
    //       console.log(state);
    //     });
    //   }
    //
    //   player.addEventListener(PlayerEventType.INITIALIZED, () => {
    //     console.log('INITIALIZED');
    //   });
    //
    //   player.addEventListener(PlayerEventType.ERROR, (error) => {
    //     const statusTooManyRequests = 429;
    //     if (error.type === ErrorType.NOT_AVAILABLE && error.code === statusTooManyRequests) {
    //       console.error('Concurrent-viewer limit reached', error);
    //     } else {
    //       console.error('ERROR', error);
    //     }
    //   });
    //
    //   player.addEventListener(PlayerEventType.QUALITY_CHANGED, (quality) => {
    //     console.log('QUALITY_CHANGED', quality);
    //   });
    //
    //   // This event fires when text cues are encountered, such as captions or subtitles
    //   player.addEventListener(PlayerEventType.TEXT_CUE, (cue) => {
    //     console.log('TEXT_CUE', cue.startTime, cue.text);
    //   });
    //
    //   // This event fires when embedded Timed Metadata is encountered
    //   player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
    //     console.log('Timed metadata', cue.text);
    //   });
    // }
  },
  watch: {
    playing: {
      immediate: true,
      handler(){
        if (this.playing) {

          (() => {

            const getExecution = async () => {


              fetch('https://4777d1b2efd2.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.841144982209.channel.Lh8MS30MZlnf.m3u8')
                .then((response) => {
                  if (!response.ok) {
                    throw Error(response.statusText);
                  }
                  return response;
                }).then(() => {
                console.log("ok");

                const playbackUrl = 'https://4777d1b2efd2.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.841144982209.channel.Lh8MS30MZlnf.m3u8';
                let player;

                if (IVSPlayer.isPlayerSupported) {
                  player = IVSPlayer.create();
                  player.attachHTMLVideoElement(this.$refs.elVideo);
                  player.load(playbackUrl);
                  player.play();

                  this.$emit('live')

                }

              }).catch((error) => {
                console.log(error);

                setTimeout(getExecution, 1000);
              });

            };

            setTimeout(getExecution, 1000);
          })();

        }
      }

    }
  }
}
</script>
