<template>
  <v-card rounded="lg">
    <v-card-title>
      {{ retrieveLabel(componentTitleId) }}
    </v-card-title>
    <v-card-text class="py-0">
      <v-container fluid>
        <v-row>

          <v-col cols="12">
            <v-radio-group class="pa-0 ma-0" v-model="ticketSelected" column>
              <v-radio v-for="ticket in tickets" :key="ticket.name" :value="ticket.name">
                <template v-slot:label>
                  <v-card
                    width="100%"
                    color="primary"
                    outlined
                    :dark="! $vuetify.theme.isDark"
                    class="card-ticket"
                  >

                    <v-card-text class="py-0 pr-0">
                      <div class="d-flex">
                        <div>
                          <v-card-title class="white--text">
                            <strong>{{ ticket.title }}</strong>
                          </v-card-title>
                          <v-card-subtitle v-text="ticket.description"></v-card-subtitle>
                        </div>

                        <v-divider vertical class="text--transparent ml-auto" style=" border-left: 2px dashed;"></v-divider>

                        <div class="mx-4 ma-auto">
                          <v-card-title class="pt-0 pb-0 justify-center">{{ ticket.price }}</v-card-title>

                          <v-chip v-if="ticketSelected" class="rounded-lg my-1" label color="primary darken-1">
                            Selected
                          </v-chip>
                        </div>

                      </div>
                    </v-card-text>
                  </v-card>
                </template>
              </v-radio>
            </v-radio-group>


          </v-col>


        </v-row>

        <v-row no-gutters v-if="ticketSelected">
          <v-col align="end">
            <v-btn block text color="primary">
              {{ retrieveLabel(componentTitleId) }}

              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "RegistrationTickets",
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
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'registration-tickets') : undefined;
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

    tickets() {
      return (this.event) ? this.event?.tickets : undefined;
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
  },
  data(){
    return {
      ticketSelected: null
    }
  },
}
</script>

<style lang="scss" scoped>
.card-ticket:after {
  background: #eceff4;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  box-shadow: inset 0 2px 0 0 #dce1eb;
  content: "";
  height: .7rem;
  transform: rotate(90deg);
  position: absolute;
  top: calc(50% - .3rem);
  left: -0.3rem;
  width: 1.2rem;
}

.card-ticket:before {
  background: #eceff4;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  box-shadow: inset 0 2px 0 0 #dce1eb;
  content: "";
  height: .7rem;
  transform: rotate(270deg);
  position: absolute;
  top: calc(50% - .3rem);
  right: -0.3rem;
  width: 1.2rem;
}
</style>
