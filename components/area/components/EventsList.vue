<!--
[PRO-216] Region - Components

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-216

EventsList Component.
-->
<template>
  <div>

<!--    <v-row v-if="eventsFiltersEnabled">-->
<!--      <v-col >-->
<!--        <v-card flat>-->
<!--          <v-card-text>-->
<!--            <v-row>-->
<!--              <v-col cols="12" lg="4">-->
<!--                <v-text-field-->
<!--                  v-model.trim="search"-->
<!--                  clearable-->
<!--                  prepend-icon="mdi-magnify"-->
<!--                  :label="$t('search-by-name-or-location')"-->
<!--                  :hint="$t('search-hint')"-->
<!--                  persistent-hint-->
<!--                ></v-text-field>-->

<!--              </v-col>-->
<!--              <v-col cols="12" lg="3">-->
<!--                <base-date-picker-->
<!--                  v-model="date"-->
<!--                  :label="$t('date')"-->
<!--                  :hint="$t('date-hint')"-->
<!--                  icon="mdi-calendar"-->
<!--                />-->
<!--              </v-col>-->
<!--              <v-col cols="12" lg="4">-->

<!--                <v-select-->
<!--                  v-model="searchByEventTypeId"-->
<!--                  clearable-->
<!--                  :items="eventType"-->
<!--                  item-text="text"-->
<!--                  item-value="value"-->
<!--                  prepend-icon="mdi-apps"-->
<!--                  :label="$t('type-of-event')"-->
<!--                  :hint="$t('type-of-event-hint')"-->
<!--                  persistent-hint-->
<!--                ></v-select>-->

<!--              </v-col>-->

<!--              <v-col cols="12" lg="1" align-self="center" align="center">-->
<!--                <v-btn color="info" block large @click="onSearch">-->
<!--                  {{ $t('search') }}-->
<!--                </v-btn>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->

    <v-row>
      <v-col>
        <v-card flat :loading="loading">
          <v-card-title>
            {{ $t(titleId) }}
          </v-card-title>
          <v-card-subtitle>{{ $t(descriptionId) }}</v-card-subtitle>

          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12" md="12" lg="12" >

                  <v-list class="pa-0" color="transparent" rounded>
                    <event-list-item v-for="(event, index) in events"
                                     :event-id="event.eventId"
                                     :key="event.eventId"
                                     :class="{'mb-4': events.length -1 !== index}"
                    />
                  </v-list>

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
      eventsFiltersEnabled: false,

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
    }
  },
  computed: {
    ...mapGetters({
      initialised: 'events/initialised',
      loading: 'events/loading',
      loaded: 'events/loaded',
      events: 'events/events',

      componentWithComponentId: 'components/componentWithComponentId',
    }),

    component () {
      return (this.componentId)
        ? this.componentWithComponentId(this.componentId)
        : undefined;
    },


    componentLoaded () {
      return (this.component) ? this.component.loaded : false;
    },

    componentLoading () {
      return (this.component) ? this.component.loading : true;
    },

    componentError () {
      return (this.component) ? this.component.error : undefined;
    },

    titleId () {
      return (this.component) ? this.component.titleId : undefined;
    },

    descriptionId () {
      return (this.component) ? this.component.descriptionId : undefined;
    },

  },
  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }

      if (! this.componentLoaded && ! this.componentLoading) {
        await this.loadComponent();
      }
    }
  },
  methods: {
    ...mapActions({
      load: 'events/load',

      loadComponentWithComponentId: 'components/loadComponentWithComponentId',
    }),

    async loadComponent () {
      return await (this.componentId)
        ? this.loadComponentWithComponentId(this.componentId)
        : undefined;
    },

    onSearch(){

    },
  },
}
</script>
