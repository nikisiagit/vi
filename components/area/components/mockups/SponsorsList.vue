<template>
  <v-card :rounded="showLabel ? 'lg': 't-0 b-lg'" :flat="! showLabel">
    <v-card-title v-if="componentTitleId">
      {{ retrieveLabel(componentTitleId) }}
    </v-card-title>
    <v-card-subtitle v-if="componentDescriptionId">{{ retrieveLabel(componentDescriptionId) }}</v-card-subtitle>

    <v-card-text>
      <v-container fluid>
        <v-row justify="center">

          <v-col cols="auto" align="center" v-for="sponsor in sponsors" :key="sponsor.name">
            <v-card outlined target="_blank" :href="sponsor.link" rounded="lg" height="99" width="200" class="pa-3 d-flex justify-center align-center">
              <v-img contain height="50" :src="sponsor.image.url" :alt="sponsor.text"></v-img>
            </v-card>
          </v-col>

        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "SponsorsList",
  props: {
    areaId: {
      type: String,
      required: true
    },
  },
  computed: {
    ...mapGetters({
      // eventWithEventId: 'apps/admin/events/eventWithEventId',
      eventWithEventId: 'events/eventWithEventId',

      componentWithAreaIdAndComponentType: 'areas/componentWithAreaIdAndComponentType',
    }),

    component () {
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'sponsors-list') : undefined;
    },

    heading () {
      return (this.component) ? this.component?.heading : undefined;
    },

    componentTitleId() {
      return (this.heading) ? this.heading?.titleId : undefined;
    },

    componentDescriptionId() {
      return (this.heading) ? this.heading?.descriptionId : undefined;
    },

    showLabel(){
      return (this.componentTitleId) || (this.componentDescriptionId)
    },

    eventId () {
      return this.$route.params.eventId || undefined;
    },

    /**
     * The Event.
     *
     * @returns {*|undefined}
     */
    event() {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    sponsors() {
      return (this.event) ? this.event?.sponsors : undefined;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },
  },
  methods: {
    retrieveLabel(labelId){

      switch(labelId){
        case `label:demo:area:demo:${this.eventId}:landing:component:sponsors-list:title`:
          return 'Sponsors'

        case `label:demo:area:demo:${this.eventId}:landing:component:text:title`:
          return 'About'

        case `label:demo:area:demo:${this.eventId}:landing:component:registration-tickets:title`:
          return 'Register'

        case `label:demo:area:demo:${this.eventId}:landing:component:exhibitors-list:title`:
          return 'Exhibitors'

        case `label:demo:area:demo:${this.eventId}:landing:component:speakers-list:title`:
          return 'Speakers'

        case `label:demo:area:demo:${this.eventId}:landing:component:schedule-list:title`:
          return 'Schedule'
      }
    },
  }
};
</script>
