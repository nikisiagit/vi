<template>
  <v-card  :rounded="showLabel ? 'lg': 't-0 b-lg'" :flat="! showLabel">
    <v-card-title v-if="showLabel">
      Networking
    </v-card-title>
    <v-card-text >
      <v-container fluid>

        <v-row justify="center">
          <v-col
            cols="12"
            sm="10"
            md="8"
            lg="10"
            class="d-flex justify-center"
          >
            <v-chip-group
              multiple
              v-model="selected"
              active-class="primary"
            >
              <v-chip

                :color="!  selected.includes(i) ? 'primary primary--text': null"
                :outlined="! selected.includes(i)"
                v-for="(tag, i) in tags"
                :key="i"
              >
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>

        <v-row justify="center">





          <v-col cols="auto" align="center">
            <v-card outlined rounded="lg" width="300" hover nuxt
                    :to="{
                      name: 'events-eventId-networking-networkingId',
                      params: { eventId: this.eventId, networkingId: 'room-1' }
                    }"
            >
              <v-img
                height="170"
                src="https://techstory.in/wp-content/uploads/2017/08/Hosting-An-Unforgettable-Marketing-Event.jpeg"

                class="white--text"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"

              >

                <v-card color="transparent white--text" height="100%" class="d-flex flex-column">
                  <v-card-title>
                    <h5>
                      What are the biggest challenges in hosting events? 🤔
                    </h5>
                  </v-card-title>
                  <v-card-text class="mt-auto white--text text-left">
                    <div>
                      Created by Organiser
                    </div>
                    <v-chip small label color="deep-orange lighten-2" class="mt-2 white--text">
                      <v-icon left small>mdi-forum</v-icon>
                      Text Chat
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-img>

              <v-card-actions class="justify-center">

                <v-container fluid>
                  <v-row>
                    <v-col>
                      <v-avatar size="40" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src="https://cdn.hubilo.com/speaker/2116606/150/4878_5255_577711001636455599.png"
                        ></v-img>
                      </v-avatar>

                      <v-avatar size="40" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src="https://cdn.hubilo.com/speaker/2116606/150/1641_7013_946400001636454677.png"
                        ></v-img>
                      </v-avatar>

                      <v-avatar size="40" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src="https://silicon.createx.studio/assets/img/team/25.jpg"
                        ></v-img>
                      </v-avatar>

                      <v-avatar size="40" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src="https://silicon.createx.studio/assets/img/team/24.jpg"
                        ></v-img>
                      </v-avatar>

                      <v-avatar color="primary white--text" size="40" >
                        <h5>+10</h5>
                      </v-avatar>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-left">
                      1 space left
                    </v-col>


                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="auto" align="center">
            <v-card outlined rounded="lg" width="300" hover>
              <v-img
                height="170"
                src="https://ivent-hq.com/wp-content/themes/iVent/images/image-eventFormat-top-mob@2x.jpg"

                class="white--text"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"

              >

                <v-card color="transparent white--text" height="100%" class="d-flex flex-column">
                  <v-card-title>
                    <h5>
                      AMA with CEO of iVent - bring all your 🔥 questions
                    </h5>
                  </v-card-title>
                  <v-card-text class="mt-auto white--text text-left">
                    <div>
                      Created by Organiser
                    </div>
                    <v-chip small label color="deep-purple lighten-2" class="mt-2 white--text">
                      <v-icon left small>mdi-video</v-icon>
                      Video Chat Moderated
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-img>

              <v-card-actions class="justify-center">
                <v-container fluid>
                  <v-row>
                    <v-col>
                      <v-avatar size="46" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src="https://ivent-hq.com/wp-content/uploads/2021/07/Emma-Selfie-ForWeb.png"
                        ></v-img>
                      </v-avatar>

                      <v-avatar size="46" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src="https://ivent-hq.com/wp-content/uploads/2021/06/Nikita-Selfie-ForWeb.png"
                        ></v-img>
                      </v-avatar>

                      <v-avatar size="46" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src="https://ivent-hq.com/wp-content/uploads/2021/06/Ash-Selfie-ForWeb.png"
                        ></v-img>
                      </v-avatar>

                      <v-avatar color="primary white--text" size="40" >
                        <h5>+7</h5>
                      </v-avatar>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-left">
                      10 spaces left
                    </v-col>

                    <v-col class="text-right">
                      <v-icon small>mdi-lock</v-icon>
                    </v-col>
                  </v-row>
                </v-container>

              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="auto" align="center">
            <v-card outlined rounded="lg" width="300" hover>
              <v-img
                height="170"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Pac-man.png/220px-Pac-man.png"

                class="white--text"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"

              >

                <v-card color="transparent white--text" height="100%" class="d-flex flex-column">
                  <v-card-title>
                    <h5>
                      Game Bar with Speakers
                    </h5>
                  </v-card-title>
                  <v-card-text class="mt-auto white--text text-left">
                    <div>
                      Created by Organiser
                    </div>
                    <v-chip small label color="deep-orange lighten-2" class="mt-2 white--text">
                      <v-icon left small>mdi-forum</v-icon>
                      Text Chat
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-img>

              <v-card-actions class="justify-center">
                <v-container fluid>
                  <v-row>
                    <v-col>
                      <v-avatar size="40" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src='https://cdn.hubilo.com/speaker/2116606/150/1549_8254_024241001636454559.png'
                        ></v-img>
                      </v-avatar>

                      <v-avatar size="40" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src="https://cdn.hubilo.com/speaker/2116606/150/1207_7616_896656001637156224.png"
                        ></v-img>
                      </v-avatar>

                      <v-avatar size="40" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src="https://silicon.createx.studio/assets/img/team/26.jpg"
                        ></v-img>
                      </v-avatar>



                      <v-avatar color="primary white--text" size="40" >
                        <h5>+4</h5>
                      </v-avatar>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="text-left">
                      5 spaces left
                    </v-col>

                    <v-col class="text-right">
                      <v-icon small>mdi-lock</v-icon>
                    </v-col>
                  </v-row>
                </v-container>

              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="auto" align="center">
            <v-card outlined rounded="lg" width="300" hover>
              <v-img
                height="170"
                :src="null"

                class="white--text primary"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"

              >

                <v-card color="transparent white--text" height="100%" class="d-flex flex-column">
                  <v-card-title>
                    <h6>
                      I’ve got 2 weeks to host a 1000pax event, does anyone have advice? 🤯
                    </h6>
                  </v-card-title>
                  <v-card-text class="mt-auto white--text text-left">
                    <div>
                      Created by Anton Dushkin
                    </div>
                    <v-chip small label color="deep-orange lighten-2" class="mt-2 white--text">
                      <v-icon left small>mdi-forum</v-icon>
                      Text Chat
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-img>

              <v-card-actions class="justify-center">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-avatar size="40" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src='https://cdn.vuetifyjs.com/images/lists/4.jpg'
                        ></v-img>
                      </v-avatar>

                      <v-avatar size="40" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src='https://cdn.vuetifyjs.com/images/lists/3.jpg'
                        ></v-img>
                      </v-avatar>

                      <v-avatar size="40" class="mr-2">
                        <v-img
                          class="rounded-lg"
                          src='https://cdn.vuetifyjs.com/images/lists/2.jpg'
                        ></v-img>
                      </v-avatar>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="text-left">
                      7 spaces left
                    </v-col>

                    <v-col class="text-right">
                      <v-icon small>mdi-lock</v-icon>
                    </v-col>
                  </v-row>
                </v-container>

              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "NetworkingRoomsList",
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
      selected: [],
      search: '',
      tags: [
        'events',
        'tech',
        'saas',
        'virtual',
        'planning',
        'engagement',
      ],
    }
  },
};
</script>
