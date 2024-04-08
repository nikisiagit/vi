<template>
  <v-card outlined rounded="lg"  class="d-flex">

    <v-container fluid style="width: 100px">
      <v-row no-gutters class="fill-height">
        <v-col cols="12">
          <v-card elevation="0" rounded="lg" height="75" width="78" class="text-center" color="primary" dark >

            <v-card-title class="text-h6 pt-2 pb-3 justify-center font-weight-bold">
              {{ startDateMonth }}
            </v-card-title>

            <v-card-subtitle class="text-h6 justify-center font-weight-bold">
              {{ startDateDay }}
            </v-card-subtitle>

          </v-card>
        </v-col>

<!--        <v-col cols="12" align-self="center" class="d-flex justify-center" >-->
<!--          <v-btn  text color="primary" icon>-->
<!--            <v-icon>-->
<!--              mdi-share-variant-outline-->
<!--            </v-icon>-->
<!--          </v-btn>-->

<!--        </v-col>-->
      </v-row>
    </v-container>

    <v-card flat width="100%" height="150">
      <v-card-title class="pl-1 pt-2">
        {{ titleId }}

        <v-spacer/>

        <v-btn
          rounded
          color="primary"
          text
          nuxt
          :to="{ name: 'events-eventId', params: { eventId: eventId } }"
        >
          <h3>{{ $t('join') }}</h3>
          <v-icon right>mdi-arrow-right</v-icon>

        </v-btn>

      </v-card-title>

<!--      <v-card-subtitle class="pl-0 py-1"  v-if="timeStart || timeEnd">-->
<!--        <v-icon small left>-->
<!--          mdi-clock-->
<!--        </v-icon>-->
<!--        {{ timeStart }} - {{ timeEnd }}-->
<!--      </v-card-subtitle>-->

      <v-card-subtitle class="pl-1 py-1 text-capitalize">
        <v-icon small left>
          mdi-map-marker
        </v-icon>
        {{ format }} <span v-show="addressId">- {{ addressId }}</span>
      </v-card-subtitle>

<!--      <v-card-subtitle class="pl-1 pt-1"  v-if="hostName">-->
<!--        <v-icon small left>-->
<!--          mdi-calendar-->
<!--        </v-icon>-->
<!--        {{ hostName ? `Hosted By ${hostName}`: null }}-->
<!--      </v-card-subtitle>-->

      <v-card-text class="pl-1">
        <v-row>

          <v-col cols="12" v-if="descriptionId" style="white-space: pre-line" v-html="descriptionId"></v-col>

        </v-row>

      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import dayjs from "dayjs";

export default {
  name: "EventListItem",
  props: {
    eventId: {
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      eventWithEventId: 'events/eventWithEventId',
    }),

    /**
     * The Event.
     *
     * @returns {*|undefined}
     */
    event() {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },

    startDateMonth(){
      return (this.event) ? this.formatDateMonth(this.event.startDateTime) : undefined;
    },

    startDateDay(){
      return (this.event) ? this.formatDateDay(this.event.startDateTime) : undefined;
    },

    titleId(){
      return (this.event) ? this.event.titleId : undefined;
    },

    descriptionId(){
      return (this.event) ? this.event.descriptionId : undefined;
    },

    addressId(){
      return (this.event) ? this.event.addressId : undefined;
    },

    format(){
      return (this.event) ? this.event.format : undefined;
    },

  },
  async created () {
    if (! this.loaded && ! this.loading) {
      return await this.load();
    }
  },
  methods: {
    ...mapActions({
      loadEventWithEventId: 'events/loadEventWithEventId',
    }),

    async load() {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    formatDateMonth(date){
      return dayjs(date).format("MMMM")?.slice(0, 3).toUpperCase();
    },

    formatDateDay(date){
      return dayjs(date).format("DD");
    },

    joinEvent(){
      this.$router.push({
        name: 'events-eventId',
        params: {eventId: this.eventId}
      })
    }
  }
}
</script>
