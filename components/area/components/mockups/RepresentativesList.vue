<template>
  <v-card :rounded="showLabel ? 'lg': 'lg'" :flat="! showLabel">
    <v-card-title v-if="showLabel">
      Booth Reps
    </v-card-title>
    <v-card-text>
      <v-container fluid>

        <v-row >

          <v-col cols="auto" v-for="rep in exhibitorReps">
            <v-card
              flat
              outlined
              rounded="lg"
              max-width="305"
            >
              <v-card-title class="pa-0">
                <v-list class="pa-0 rounded-lg">
                  <v-list-item >
                    <v-list-item-avatar size="54"> <!-- to get border around avatar:  ( color="grey darken-3" )   -->
                      <v-img
                        class="elevation-6"
                        alt=""
                        :src="rep.avatar"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content class="text-left">
                      <v-list-item-title>{{ rep.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ rep.headline }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-title>

              <v-card-actions class="pb-1 mt-n5">
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-video-plus</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon small>mdi-message</v-icon>
                </v-btn>

              </v-card-actions>
            </v-card>
          </v-col>

<!--          <v-col cols="auto" align="center">-->
<!--            <v-card-->
<!--              flat-->
<!--              outlined-->
<!--              rounded="lg"-->
<!--              max-width="300"-->
<!--            >-->
<!--              <v-card-title class="pa-0">-->
<!--                <v-list class="pa-0 rounded-lg">-->
<!--                  <v-list-item >-->
<!--                    <v-list-item-avatar size="54"> &lt;!&ndash; to get border around avatar:  ( color="grey darken-3" )   &ndash;&gt;-->
<!--                      <v-img-->
<!--                        class="elevation-6"-->
<!--                        alt=""-->
<!--                        src="https://ivent-hq.com/wp-content/uploads/2021/07/Beth-Selfie-ForWeb-1.png"-->
<!--                      ></v-img>-->
<!--                    </v-list-item-avatar>-->

<!--                    <v-list-item-content class="text-left">-->
<!--                      <v-list-item-title>Beth Walker</v-list-item-title>-->
<!--                      <v-list-item-subtitle>Projects Guru at iVent HQ</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                  </v-list-item>-->
<!--                </v-list>-->
<!--              </v-card-title>-->

<!--              <v-card-actions class="pb-1 mt-n5">-->
<!--                <v-spacer></v-spacer>-->

<!--                <v-btn icon>-->
<!--                  <v-icon>mdi-video-plus</v-icon>-->
<!--                </v-btn>-->

<!--                <v-btn icon>-->
<!--                  <v-icon small>mdi-message</v-icon>-->
<!--                </v-btn>-->

<!--              </v-card-actions>-->
<!--            </v-card>-->
<!--          </v-col>-->
        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RepresentativesList",
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

    exhibitorId () {
      return this.$route.params.exhibitorId || undefined;
    },

    exhibitorReps(){
      switch (this.exhibitorId) {
        case 'exhibitor:ivent':
          return [
            {
              name: 'Gavin Newman',
              avatar: 'https://ivent-hq.com/wp-content/uploads/2021/07/Gav-Selfie-ForWeb-1.png',
              headline: 'CEO and Co-founder at iVent'
            },
            {
              name: 'Beth Walker',
              avatar: 'https://ivent-hq.com/wp-content/uploads/2021/07/Beth-Selfie-ForWeb-1.png',
              headline: 'Projects Guru at iVent HQ'
            },
          ]
        case 'exhibitor:noonah':
          return [
            {
              name: 'Matt Franks',
              avatar: 'https://s3.eu-west-2.amazonaws.com/attendees.luis.ivent-pro.com/demo/1618211887912.jpeg',
              headline: 'CEO and Co-Founder of Noonah'
            },
          ]
      }
    },
  },
  data(){
    return {
    }
  },
};
</script>
