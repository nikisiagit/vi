<template>
  <v-card rounded="lg">
    <v-card-title v-if="componentTitleId">
      {{ retrieveLabel(componentTitleId) }}
    </v-card-title>
    <v-card-subtitle v-if="componentDescriptionId">{{ retrieveLabel(componentDescriptionId) }}</v-card-subtitle>
    <v-card-text>
      <v-container fluid>
        <v-row justify="center">

          <v-col cols="auto" align="center" v-for="speaker in speakers" :key="speakers.name">
            <v-card outlined rounded="lg" width="170" height="240">
              <v-responsive  max-height="140">
                <v-img
                  :src="speaker.avatar.image"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150"
                >
                  <v-card-title>
                    <h5 class="text-truncate">{{ speaker.fullname }}</h5>
                  </v-card-title>
                </v-img>
              </v-responsive>

              <v-card-text class="py-1 px-1">
                <v-responsive  height="50" class="overflow-y-auto">
                  {{ speaker.headline }}
                </v-responsive>
              </v-card-text>

              <v-card-actions class="py-1 justify-center">


                <v-btn icon>
                  <v-icon small>mdi-twitter</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon small>mdi-web</v-icon>
                </v-btn>

              </v-card-actions>
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
  name: "SpeakersList",
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
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'speakers-list') : undefined;
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

    speakers() {
      return (this.event) ? this.event?.speakers : undefined;
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
