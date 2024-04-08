<!--
[PRO-216] Region - Components

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-216

EventsList Component.
-->
<template>
  <div>
    <v-row v-if="eventsFiltersEnabled">
      <v-col >
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col cols="12" lg="4">
                <v-text-field
                  v-model.trim="search"
                  clearable
                  prepend-icon="mdi-magnify"
                  :label="$t('search-by-name-or-location')"
                  :hint="$t('search-hint')"
                  persistent-hint
                ></v-text-field>

              </v-col>
              <v-col cols="12" lg="3">
                <base-date-picker
                  v-model="date"
                  :label="$t('date')"
                  :hint="$t('date-hint')"
                  icon="mdi-calendar"
                />
              </v-col>
              <v-col cols="12" lg="4">

                <v-select
                  v-model="searchByEventTypeId"
                  clearable
                  :items="eventType"
                  item-text="text"
                  item-value="value"
                  prepend-icon="mdi-apps"
                  :label="$t('type-of-event')"
                  :hint="$t('type-of-event-hint')"
                  persistent-hint
                ></v-select>

              </v-col>

              <v-col cols="12" lg="1" align-self="center" align="center">
                <v-btn color="info" block large @click="onSearch">
                  {{ $t('search') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card flat :loading="eventsLoading">
          <v-card-title>
            {{ $t('Upcoming Events') }}
          </v-card-title>
          <v-card-subtitle>
            {{ $t('Explore our recent events in the venue.') }}
          </v-card-subtitle>

          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="12" lg="12" v-for="(event, i) in localEvents" :key="i">
                  <events-event-list-item
                    :event-id="event.eventId"
                    :date-day="dateDay(event.startDateTime)"
                    :date-month="dateMonth(event.startDateTime)"
                    :title="retrieveLabel(event.titleId)"
                    :description="retrieveLabel(event.descriptionId)"
                    :event-type="event.format"
                    :members="[]"
                  />
                </v-col>

              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import dayjs from "dayjs";

export default {
  name: 'EventsList',
  props: {
    componentId: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      search: '',
      searchByEventTypeId: '',
      eventType: [
        {
          value: 'hybrid',
          text: 'Hybrid'
        },
        {
          value: 'online',
          text: 'Online'
        },
        {
          value: 'in-person',
          text: 'In Person'
        }
      ],

      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu2: false,
    }
  },
  computed: {
    ...mapGetters({
      eventsLoading: 'events/loading',
      eventsLoaded: 'events/loaded',
      events: 'events/events',

      componentWithAreaIdAndComponentType: 'areas/componentWithAreaIdAndComponentType',
    }),

    qParameters(){
      return this.$route.query
    },

    isUniProDemo(){
      return this.qParameters['d'] && this.qParameters['d'] === 'uni'
    },

    localEvents (){
      //@todo: UniPro stuff
      if (this.isUniProDemo)
        return this.events.filter(e => e.venue === 'venue:demo-uni')
      else
        return this.events.filter(e => e.venue === 'venue:demo-eventheads')
      // return this.events
    },

    component () {
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'events-list') : undefined;
    },

    eventsFiltersEnabled () {
      return (this.component) ? this.component.eventsFiltersEnabled : undefined;
    },

    eventsSortBy () {
      return (this.component) ? this.component.eventsSortBy : undefined;
    },

    // componentId () {
    //   return (this.component) ? this.component.componentId : undefined;
    // },

    loaded () {
      return (this.component) ? this.component.loaded : false;
    },

    loading () {
      return (this.component) ? this.component.loading : true;
    },

    error () {
      return (this.component) ? this.component.error : undefined;
    },
  },
  async created() {
    // if (! this.eventsLoaded && ! this.eventsLoading) {
    //   await this.load();
    // }
  },
  methods: {
    ...mapActions({
      load: 'events/load',
    }),

    retrieveLabel(labelId){
      switch(labelId){
        case 'label:demo:event:demo:eventheads-gamification:title':
          return 'The Engagement value of Gamification with Noonah'

        case 'label:demo:event:demo:eventheads-gamification:description':
          return 'What you might have missed: at our launch event, EventHeads Matt Franks from Noonah and Gavin Newman at iVent provided precious insights into today\'s engagement and gamification landscape and suggested how you can remove friction from your attendee experience in order to better market, sell and delight your virtual or hybrid audience.'

        case 'label:demo:event:demo:supporting-student-workshop-2023:title':
          return 'Supporting Student Success workshop 2023'

        case 'label:demo:event:demo:supporting-student-workshop-2023:description':
          return `
          The fifth Centre for Online and Distance Education workshop 'Supporting Student Success' will take place on Thursday 12 January 2023, 9.30-13.00 in Chancellor's Hall, Senate House, University of London.
          `

        case 'label:demo:event:demo:virtual-open-day:title':
          return 'Virtual Open Day'

        case 'label:demo:event:demo:virtual-open-day:description':
          return `
          Join our Postgraduate Virtual Open Days on 01st April. Meet academics and students, ask your questions and learn more about life at Warwick. Top 10 UK University. Campus Experience. Scholarships Available.
          `

      }
    },

    dateMonth(date){
      return dayjs(date).format("MMMM")?.slice(0, 3).toUpperCase();
    },

    dateDay(date){
      return dayjs(date).format("DD");
    },

    onSearch(){

    },
  },
}
</script>
