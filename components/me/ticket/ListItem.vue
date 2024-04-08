<template>
  <v-list-item two-line :to="{name: 'event-eventId', params: {ticketId: ticketId}}">

    <v-list-item-avatar>
      <me-ticket-avatar />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ ticketId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('ticket-id') }}</v-list-item-subtitle>
    </v-list-item-content>


  </v-list-item>

<!--  <v-card  outlined>-->
<!--    <v-row no-gutters>-->
<!--      &lt;!&ndash; cols=4 md="2" lg="1" xl="1"  &ndash;&gt;-->
<!--      <v-col cols="4" lg="2" class="d-flex">-->
<!--        <v-card class="text-center rounded-0" color="primary" dark >-->

<!--          <v-card-title class="text-h5 justify-center font-weight-bold">-->
<!--            {{ dateMonth }}-->
<!--          </v-card-title>-->

<!--          <v-card-subtitle class="text-h5 justify-center font-weight-bold">-->
<!--            {{ dateDay }}-->
<!--          </v-card-subtitle>-->

<!--          <v-divider class="primary lighten-1"></v-divider>-->


<!--          <v-card-text>-->
<!--            <v-btn rounded text>-->
<!--              <v-icon>-->
<!--                mdi-calendar-plus-->
<!--              </v-icon>-->
<!--            </v-btn>-->
<!--          </v-card-text>-->

<!--          &lt;!&ndash;          <v-card-text class="text-h5">&ndash;&gt;-->
<!--          &lt;!&ndash;            {{ dateDay }}&ndash;&gt;-->
<!--          &lt;!&ndash;          </v-card-text>&ndash;&gt;-->
<!--        </v-card>-->
<!--      </v-col>-->

<!--      &lt;!&ndash;  cols="8" md="10" lg="11" xl="11"&ndash;&gt;-->
<!--      <v-col cols="8" lg="10">-->
<!--        <v-card elevation="0">-->
<!--          <v-card-title>-->
<!--            {{ title }}-->
<!--          </v-card-title>-->
<!--          <v-card-subtitle>-->
<!--            <v-icon small>-->
<!--              mdi-map-marker-->
<!--            </v-icon>-->
<!--            {{ eventType }} <span v-show="address">- {{ address }}</span>-->
<!--          </v-card-subtitle>-->

<!--          <v-card-text>-->
<!--            <v-row>-->
<!--              <v-col class="hidden-md-and-down" cols="12">-->

<!--                &lt;!&ndash; Don't axe until we create the class to cut a long paragraph &ndash;&gt;-->
<!--                {{ description }}-->
<!--                &lt;!&ndash;                <v-list-item-subtitle></v-list-item-subtitle>&ndash;&gt;-->

<!--              </v-col>-->

<!--              <v-col cols="12">-->

<!--                <v-row>-->
<!--                  <v-col>-->
<!--                    &lt;!&ndash;                    <v-avatar size="36px">&ndash;&gt;-->
<!--                    &lt;!&ndash;                      <v-icon>&ndash;&gt;-->
<!--                    &lt;!&ndash;                        mdi-account-group&ndash;&gt;-->
<!--                    &lt;!&ndash;                      </v-icon>&ndash;&gt;-->
<!--                    &lt;!&ndash;                    </v-avatar>&ndash;&gt;-->
<!--                    &lt;!&ndash;                    {{ members ? members.length : 0 }}&ndash;&gt;-->
<!--                  </v-col>-->
<!--                  <v-col cols="12" md="5" lg="5" align="end">-->



<!--                    &lt;!&ndash;                    <v-btn class="ml-2" color="primary" rounded>&ndash;&gt;-->
<!--                    &lt;!&ndash;                      <v-icon :left="$vuetify.breakpoint.mdAndUp">&ndash;&gt;-->
<!--                    &lt;!&ndash;                        mdi-ticket-confirmation&ndash;&gt;-->
<!--                    &lt;!&ndash;                      </v-icon>&ndash;&gt;-->

<!--                    &lt;!&ndash;                      <span class="hidden-md-and-down">&ndash;&gt;-->
<!--                    &lt;!&ndash;                         {{ $t('tickets') }}&ndash;&gt;-->
<!--                    &lt;!&ndash;                      </span>&ndash;&gt;-->
<!--                    &lt;!&ndash;                    </v-btn>&ndash;&gt;-->

<!--                    <v-btn class="ml-2" text color="primary" rounded @click="joinEvent">-->
<!--                      <span class="hidden-md-and-down">-->
<!--                         {{ $t('join') }}-->
<!--                      </span>-->

<!--                      <v-icon :right="$vuetify.breakpoint.mdAndUp">-->
<!--                        mdi-arrow-right-->
<!--                      </v-icon>-->
<!--                    </v-btn>-->

<!--                  </v-col>-->
<!--                </v-row>-->

<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->

<!--  </v-card>-->
</template>

<script>
export default {
  name: 'TicketListItem',
  props: {
    ticketId: {
      type: String,
      required: true,
    }
  },
  // props: {
  //   eventId: {
  //     type: String,
  //   },
  //   dateDay: {
  //     type: String,
  //   },
  //   dateMonth: {
  //     type: String,
  //   },
  //   title: {
  //     type: String,
  //   },
  //   eventType: {
  //     type: String,
  //   },
  //   address: {
  //     type: String
  //   },
  //   description: {
  //     type: String,
  //   },
  //   members: {
  //     type: Array,
  //   },
  // },

}
</script>
