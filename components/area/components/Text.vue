<!--
Text component: used also as About/Description of the Event. (descriptionId)
-->

<template>
  <v-card flat ref="about" rounded="lg">
    <v-card-text style="white-space: pre-line" v-html="retrieveLabel(descriptionId)"></v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Text",
  props: {
    componentId: {
      type: String,
      required: true
    },
  },
  // props: {
  //   text: {
  //     type: String
  //   }
  // },

  computed: {
    ...mapGetters({
      // eventWithEventId: 'apps/admin/events/eventWithEventId',
      eventWithEventId: 'events/eventWithEventId',

      componentWithAreaIdAndComponentType: 'areas/componentWithAreaIdAndComponentType',
    }),

    component () {
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'text') : undefined;
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

    descriptionId() {
      return (this.event) ? this.event?.descriptionId : undefined;
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
          case 'label:demo:event:demo:eventheads-gamification:description':
          return 'What you might have missed: at our launch event, EventHeads Matt Franks from Noonah and Gavin Newman at iVent provided precious insights into today\'s engagement and gamification landscape and suggested how you can remove friction from your attendee experience in order to better market, sell and delight your virtual or hybrid audience.'

         case 'label:demo:event:demo:virtual-open-day:description':
          return `Join our Postgraduate Virtual Open Days on 01st April. Meet academics and students, ask your questions and learn more about life at Warwick. Top 10 UK University. Campus Experience. Scholarships Available.
          `

      }
    },
  }
};
</script>
