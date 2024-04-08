<template>
  <v-card :rounded="showLabel ? 'lg': 't-0 b-lg'" :flat="! showLabel">
    <v-card-title v-if="componentTitleId">
      {{ retrieveLabel(componentTitleId) }}
    </v-card-title>
    <v-card-subtitle v-if="componentDescriptionId">{{ retrieveLabel(componentDescriptionId) }}</v-card-subtitle>
    <v-card-text>
      <v-container fluid>

        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-text-field
              v-model.lazy.trim="search"
              clearable
              hide-details
              dense
              outlined
              append-icon="mdi-magnify"
              :label="$t('Search')"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="10"
            lg="10"
            md="8"
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

          <v-col cols="auto" align="center" v-for="exhibitor in exhibitors" :key="exhibitor.name">
            <v-card hover outlined rounded="lg" width="300" :to="{
                  name: 'events-eventId-exhibitors-exhibitorId',
                  params: { eventId: eventId, exhibitorId: exhibitor.exhibitorId}
                }">
              <v-img
                height="60"
                :src="exhibitor.theme.light.background"
              >

<!--                <v-btn fab x-small class="float-right ma-3" elevation="10" :to="{-->
<!--                  name: 'events-eventId-exhibitors-exhibitorId',-->
<!--                  params: { eventId: this.eventId, exhibitorId: 'exhibitor:ivent'}-->
<!--                }">-->
<!--                  <v-icon >-->
<!--                    mdi-arrow-right-->
<!--                  </v-icon>-->
<!--                </v-btn>-->
              </v-img>

              <v-card-title class="pa-0">
                <v-avatar size="64" class="mt-n8 ml-4" >
                  <v-img
                    :src="exhibitor.logo"
                  />
                </v-avatar>

                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon small>mdi-twitter</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon small>mdi-web</v-icon>
                </v-btn>
              </v-card-title>

              <v-card-title class="py-0">
                {{ exhibitor.title }}
              </v-card-title>

              <v-card-text class="text-left">
                <v-row>
                  <v-col>
                    {{ exhibitor.description }}
                  </v-col>
                </v-row>


                <v-row>
                  <v-col>
                    <v-chip label class="rounded-lg mr-1" color="primary" v-for="tag in exhibitor.tags" :key="tag">
                      {{ tag }}
                    </v-chip>
                  </v-col>
                </v-row>


              </v-card-text>
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
  name: "ExhibitorsList",
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
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'exhibitors-list') : undefined;
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

    exhibitors() {
      return (this.event) ? this.event?.exhibitors : undefined;
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
