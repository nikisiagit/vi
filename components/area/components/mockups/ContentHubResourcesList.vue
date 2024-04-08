<template>
  <v-card :rounded="showLabel ? 'lg': 't-0 b-lg'" :flat="! showLabel">
<!--    <v-card-title v-if="showLabel">-->
<!--      {{ isUniProDemo ? 'Documents': 'Resources' }}-->
<!--    </v-card-title>-->
    <v-card-text>
      <v-container fluid>

        <v-row justify="center" class="my-0">

<!--          <v-col  cols="12" class="d-flex justify-center">-->
<!--            <v-chip-group-->
<!--              multiple-->
<!--              v-model="selected"-->
<!--              active-class="primary"-->
<!--            >-->
<!--              <v-chip-->
<!--                :color="!  selected.includes(i) ? 'primary primary&#45;&#45;text': null"-->
<!--                :outlined="! selected.includes(i)"-->
<!--                v-for="(tag, i) in (isUniProDemo ? uniTags: tags)"-->
<!--                :key="i"-->
<!--              >-->
<!--                {{ tag }}-->
<!--              </v-chip>-->
<!--            </v-chip-group>-->
<!--          </v-col>-->

<!--          <v-col cols="auto" align="center">-->

<!--            <v-card-->
<!--              hover-->
<!--              outlined-->
<!--              rounded="lg"-->
<!--              max-width="300"-->
<!--              height="280"-->
<!--            >-->
<!--              <v-img height="170" class="text-right align-end" :src="resource.image">-->
<!--                <v-container>-->
<!--                  <v-row>-->
<!--                    <v-col>-->
<!--                      <v-chip small class="px-2 primary&#45;&#45;text text&#45;&#45;darken-3" color="primary">-->
<!--                        <strong>2:51</strong>-->
<!--                      </v-chip>-->
<!--                    </v-col>-->
<!--                  </v-row>-->
<!--                </v-container>-->
<!--              </v-img>-->

<!--              <v-card-title class="py-1 text-left" style="line-height: 1.5; ">-->
<!--                <h5>{{ resource.name }}</h5>-->
<!--              </v-card-title>-->

<!--              <v-card-actions style="position:absolute;right: 0;bottom: 0;width: 100%;">-->
<!--                <span class="text&#45;&#45;disabled ml-2">{{ resource.views }} views · {{ resource.timeAgo }}</span>-->
<!--                <v-spacer></v-spacer>-->

<!--                <v-btn icon>-->
<!--                  <v-icon>mdi-bookmark-outline</v-icon>-->
<!--                </v-btn>-->

<!--                <v-btn icon v-if="resource.canDownload">-->
<!--                  <v-icon>mdi-tray-arrow-down</v-icon>-->
<!--                </v-btn>-->
<!--              </v-card-actions>-->
<!--            </v-card>-->
<!--          </v-col>-->

          <v-col cols="auto" align="center">
            <v-card
              hover
              outlined
              rounded="lg"

              max-width="300"
              height="280"
            >
              <!-- image or background -->
              <v-img height="170" class="text-right align-end" src="https://ivent-pro-public-shared.s3.eu-west-2.amazonaws.com/e-bird.png">

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

              <v-card-title class="py-1 text-left" style="line-height: 1.5; ">
                <h5>Tips on event pricing psychology</h5>
              </v-card-title>

              <v-card-actions style="position:absolute;right: 0;bottom: 0;width: 100%;">
                <span class="text--disabled ml-2">100 views · 3 days ago</span>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-bookmark-outline</v-icon>
                </v-btn>
              </v-card-actions>

            </v-card>
          </v-col>

          <v-col cols="auto" align="center">
            <v-card
              hover
              outlined
              rounded="lg"

              max-width="300"
              height="280"
            >
              <!-- image or background -->
              <v-img contain class="text-right align-end" src="https://ivent-pro-public-shared.s3.eu-west-2.amazonaws.com/v-booths.png"></v-img>

              <v-card-title class="py-1 text-left" style="line-height: 1.5">
                <h5>Virtual Booths</h5>
              </v-card-title>

              <v-card-actions style="position:absolute;right: 0;bottom: 0;width: 100%;">
                <span class="text--disabled ml-2">8 views · 1 day ago</span>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-bookmark-outline</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-tray-arrow-down</v-icon>
                </v-btn>
              </v-card-actions>

            </v-card>
          </v-col>

          <v-col cols="auto" align="center">
            <v-card
              hover
              outlined
              rounded="lg"

              max-width="300"
              height="280"
            >
              <!-- image or background -->
              <v-img contain class="text-right align-end" src="https://ivent-pro-public-shared.s3.eu-west-2.amazonaws.com/info-p.png"></v-img>

              <v-card-title class="py-1 text-left" style="line-height: 1.5">
                <h5>Enhancing Engagement at Virtual Events: eBook</h5>
              </v-card-title>

              <v-card-actions style="position:absolute;right: 0;bottom: 0;width: 100%;">
                <span class="text--disabled ml-2">26 views · 8 days ago</span>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-bookmark-outline</v-icon> <!-- mdi-download -->
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-tray-arrow-down</v-icon>
                </v-btn>
              </v-card-actions>

            </v-card>
          </v-col>



<!--          <v-col cols="auto" align="center" v-if="false">-->
<!--            <v-chip small class="px-2 blink elevation-8" color="error">-->
<!--              <strong>Live</strong>-->
<!--            </v-chip>-->

<!--            <v-chip small outlined class="px-2 blink elevation-4" color="error">-->
<!--              <v-icon left x-small>mdi-circle</v-icon>-->
<!--              <strong>Live</strong>-->
<!--            </v-chip>-->
<!--          </v-col>-->

        </v-row>

        <template></template>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ContentHubResourcesList",
  props: {
    // this should come from customization of component in the admin - should contain title - yes - no.
    showLabel: {
      type: Boolean,
      default: true
    },
    noFilters: {
      type: Boolean,
      default: true
    },
    resource: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    eventId () {
      return this.$route.params.eventId || undefined;
    },

    qParameters(){
      return this.$route.query
    },

    isUniProDemo(){
      return this.qParameters['d'] && this.qParameters['d'] === 'uni'
    },
  },
  data(){
    return {
      tab: null,
      selected: [],
      tags: [
        'events',
        'tech',
        'saas',
        'virtual',
      ],
      uniTags: [
        'business',
        'masters',
        'history',
        'computer science',
        'bachelors',
        'culture',
      ],
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
