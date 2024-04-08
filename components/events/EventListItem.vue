<template>
  <v-card  outlined>
    <v-row no-gutters>
      <!-- cols=4 md="2" lg="1" xl="1"  -->
      <v-col cols="4" lg="2" class="d-flex">
        <v-card class="text-center rounded-0" color="primary" dark >

          <v-card-title class="text-h5 justify-center font-weight-bold">
            {{ dateMonth }}
          </v-card-title>

          <v-card-subtitle class="text-h5 justify-center font-weight-bold">
            {{ dateDay }}
          </v-card-subtitle>

          <v-divider class="primary lighten-1"></v-divider>


          <v-card-text>
            <v-btn rounded text>
              <v-icon>
                mdi-calendar-plus
              </v-icon>
            </v-btn>
          </v-card-text>

          <!--          <v-card-text class="text-h5">-->
          <!--            {{ dateDay }}-->
          <!--          </v-card-text>-->
        </v-card>
      </v-col>

      <!--  cols="8" md="10" lg="11" xl="11"-->
      <v-col cols="8" lg="10">
        <v-card elevation="0">
          <v-card-title>
            {{ title }}
          </v-card-title>
          <v-card-subtitle>
            <v-icon small>
              mdi-map-marker
            </v-icon>
            {{ eventType }} <span v-show="address">- {{ address }}</span>
          </v-card-subtitle>

          <v-card-text>
            <v-row>
              <v-col class="hidden-md-and-down" cols="12">

                <!-- Don't axe until we create the class to cut a long paragraph -->
                {{ description }}
<!--                <v-list-item-subtitle></v-list-item-subtitle>-->

              </v-col>

              <v-col cols="12">

                <v-row>
                  <v-col>
<!--                    <v-avatar size="36px">-->
<!--                      <v-icon>-->
<!--                        mdi-account-group-->
<!--                      </v-icon>-->
<!--                    </v-avatar>-->
<!--                    {{ members ? members.length : 0 }}-->
                  </v-col>
                  <v-col cols="12" md="5" lg="5" align="end">



<!--                    <v-btn class="ml-2" color="primary" rounded>-->
<!--                      <v-icon :left="$vuetify.breakpoint.mdAndUp">-->
<!--                        mdi-ticket-confirmation-->
<!--                      </v-icon>-->

<!--                      <span class="hidden-md-and-down">-->
<!--                         {{ $t('tickets') }}-->
<!--                      </span>-->
<!--                    </v-btn>-->

                    <v-btn class="ml-2" text color="primary" rounded @click="joinEvent">
                      <span class="hidden-md-and-down">
                         {{ $t('join') }}
                      </span>

                      <v-icon :right="$vuetify.breakpoint.mdAndUp">
                        mdi-arrow-right
                      </v-icon>
                    </v-btn>

                  </v-col>
                </v-row>

              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "EventListItem",
  props: {
    eventId: {
      type: String,
    },
    dateDay: {
      type: String,
    },
    dateMonth: {
      type: String,
    },
    title: {
      type: String,
    },
    eventType: {
      type: String,
    },
    address: {
      type: String
    },
    description: {
      type: String,
    },
    members: {
      type: Array,
    },
  },
  methods: {
    joinEvent(){
      this.$router.push({
        name: 'events-eventId',
        params: {eventId: this.eventId}
      })
    }
  }
}
</script>
