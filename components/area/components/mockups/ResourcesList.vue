<template>
  <v-card :rounded="showLabel ? 'lg': 'lg'" :flat="! showLabel">
    <v-card-title v-if="showLabel">
      Resources
    </v-card-title>
    <v-card-text>
      <v-container fluid>

        <v-row justify="center">

          <v-col cols="auto" align="center">
            <v-sheet elevation="1" color="primary" style="padding: 0.2rem" rounded="lg">
              <v-card
                flat
                max-width="250"
                height="230"
              >
                <!-- image or background -->
                <v-img contain class="text-right align-end" src="https://s3.eu-west-2.amazonaws.com/attendees.luis.ivent-pro.com/demo/spotlight-directors.png">

                 <v-container>
                   <v-row>
                     <v-col>
                       <v-chip small class="px-2 primary--text text--darken-3" color="primary">
                         <strong>2:51</strong>
                       </v-chip>
                     </v-col>
                   </v-row>
                 </v-container>

                </v-img>

                <v-card-title class="py-1 text-left" style="line-height: 1.5">
                  <h6>Spotlight on Directors: with Ros Oxley</h6>
                </v-card-title>

                <v-card-actions style="position:absolute;right: 0;bottom: 0;">
                  <v-spacer></v-spacer>

                  <v-btn icon>
                    <v-icon>mdi-video-plus</v-icon>
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-sheet>
          </v-col>

          <v-col cols="auto" align="center">
            <v-sheet elevation="1" color="primary" style="padding: 0.2rem" rounded="lg">
              <v-card
                flat
                max-width="250"
                height="230"
              >
                <!-- image or background -->
                <v-img contain class="text-right align-end" src="https://s3.eu-west-2.amazonaws.com/attendees.luis.ivent-pro.com/demo/virtual-booths.png"></v-img>

                <v-card-title class="py-1 text-left" style="line-height: 1.5">
                  <h6>Virtual Booths</h6>
                </v-card-title>

                <v-card-actions style="position:absolute;right: 0;bottom: 0;">
                  <v-spacer></v-spacer>

                  <v-btn icon>
                    <v-icon small>mdi-open-in-new</v-icon>
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-sheet>
          </v-col>

          <v-col cols="auto" align="center">
            <v-sheet elevation="1" color="primary" style="padding: 0.2rem" rounded="lg">
              <v-card
                flat
                max-width="250"
                height="230"
              >
                <!-- image or background -->
                <v-img contain class="text-right align-end" src="https://s3.eu-west-2.amazonaws.com/attendees.luis.ivent-pro.com/demo/info-pack.png"></v-img>

                <v-card-title class="py-1 text-left" style="line-height: 1.5">
                  <h6>Info Pack</h6>
                </v-card-title>

                <v-card-actions style="position:absolute;right: 0;bottom: 0;">
                  <v-spacer></v-spacer>

                  <v-btn icon>
                    <v-icon small>mdi-tray-arrow-down</v-icon> <!-- mdi-download -->
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-sheet>
          </v-col>



          <v-col cols="auto" align="center" v-if="false">
            <v-chip small class="px-2 blink elevation-8" color="error">
              <strong>Live</strong>
            </v-chip>

            <v-chip small outlined class="px-2 blink elevation-4" color="error">
              <v-icon left x-small>mdi-circle</v-icon>
              <strong>Live</strong>
            </v-chip>
          </v-col>

        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ResourcesList",
  props: {
    // this should come from customization of component in the admin - should contain title - yes - no.
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    eventId () {
      return this.$route.params.eventId || undefined;
    },
  },
  data(){
    return {
    }
  },
};
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
  animation: blinking 1s infinite;
}
</style>
