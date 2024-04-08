<template>
  <v-card rounded="lg">
    <v-card-title v-if="componentTitleId">
      {{ retrieveLabel(componentTitleId) }}
    </v-card-title>
    <v-card-subtitle v-if="componentDescriptionId">{{ retrieveLabel(componentDescriptionId) }}</v-card-subtitle>
    <v-card-text>

      <v-row class="mb-n6" v-show="! viewAsListItem">
        <v-col>
          <v-text-field
            v-model.lazy.trim="search"
            clearable
            dense
            outlined
            append-icon="mdi-magnify"
            :label="$t('Search')"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-select
            v-model="filterByTrack"
            @change="onTrackChange"
            clearable
            outlined
            dense
            :items="tracks"
            item-text="text"
            item-value="value"
            prepend-icon="mdi-filter"
            :label="$t('Filter by track')"

          ></v-select>
        </v-col>
      </v-row>

      <v-tabs>
        <v-tabs-slider></v-tabs-slider>

        <v-tabs v-model="scheduleTab">
          <v-tab>
            Day One - Nov 28 ({{ localList.length }})
          </v-tab>

        </v-tabs>

        <v-tabs-items v-model="scheduleTab">
          <v-tab-item>

            <v-fade-transition>
              <v-card flat class="mt-3" v-if="! localList.length">
                <v-card-text class="text-center text-body-1">
                  <v-row>
                    <v-col>
                      <v-chip large class="pa-4" color="grey lighten-2" elevation="0">
                        <v-icon>mdi-calendar</v-icon>
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <p>Nothing founded in the schedule.</p>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-fade-transition>

            <v-sheet v-for="(l, index) in localList" :key="index" rounded="lg" outlined class="mt-3">
              <v-container fluid class="pa-2">

                <v-row justify="space-between" no-gutters>

                  <v-col>
                    <v-row>
                      <v-col cols="3" class="px-0">

                        <v-row no-gutters>
                          <v-col align="center" >
                            <h4>{{ l.startTime }}</h4>
                            <h4>{{ l.endTime }}</h4>

                            <div v-if="l.track" class="mt-2">
                              <v-chip small label :color="l.track.color" class="font-weight-bold">
                                {{ l.track.name }}
                              </v-chip>
                            </div>

                          </v-col>
                          <v-col cols="auto">
                            <v-tooltip bottom :color="! agendaWithName(l.name) ? 'primary': null">
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn  v-bind="attrs"
                                        v-on="on" @click="handleItemToAgenda(l)" icon class="align-self-end">

                                  <v-fade-transition mode="out-in">
                                    <v-icon v-if="agendaWithName(l.name)" color="primary">
                                      mdi-text-box-minus-outline
                                    </v-icon>

                                    <v-icon v-else>
                                      mdi-text-box-plus-outline

                                    </v-icon>
                                  </v-fade-transition>

                                </v-btn>
                              </template>

                              <span v-if="agendaWithName(l.name)">Remove from My Schedule</span>
                              <span v-else>Add to My Schedule</span>
                            </v-tooltip>
                          </v-col>



                        </v-row>

                      </v-col>

                      <v-col class="mt-1 mr-2">
                        <h3>
                          {{ l.title }}
                        </h3>

                        <v-card-text v-show="l.description && ! expandSchedule[`schedule-${index}`]" class="pl-0 text-body-2 line-clamp">
                          {{ l.description }}
                        </v-card-text>

                        <!-- Show Icon-->
                        <v-icon small v-if="l.icon">{{ l.icon }}</v-icon>
                        <!-- /Show Icon -->

                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="1" class="text-right mr-3">
                    <!-- -->
                    <v-btn @click="join(l.stageId)" rounded small color="primary" text v-if="l.status === 'join' && ! viewAsListItem">
                      Join
                      <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>

                    <v-container class="pa-0 mt-2" v-if="l.isLive && ! viewAsListItem">
                      <!--                              <v-row>-->
                      <!--                                <v-col>-->
                      <!--                                  <v-chip small class="pa-2 blink elevation-8" color="error">-->
                      <!--                                    <strong>LIVE</strong>-->
                      <!--                                  </v-chip>-->
                      <!--                                </v-col>-->
                      <!--                              </v-row>-->
                      <v-row>
                        <v-col>
                          <v-chip small outlined class="px-2 blink" color="error">
                            <v-icon left x-small>mdi-circle</v-icon>
                            <strong>LIVE</strong>
                          </v-chip>
                        </v-col>
                      </v-row>



                    </v-container>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col cols="11" >
                    <v-expand-transition>
                      <div v-show="expandSchedule[`schedule-${index}`]">
                        <v-card-text class="text-body-2 line-clamp">
                          {{ l.description }}
                        </v-card-text>

                        <v-list dense>
                          <v-row no-gutters v-for="(presenter, pIndex) in l.presenters" :key="pIndex">
                            <v-col>
                              <v-list-item>
                                <v-list-item-avatar tile>
                                  <v-img
                                    class="rounded-lg"
                                    :src="presenter.avatar"
                                  ></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-list-item-title>{{ presenter.name }}</v-list-item-title>
                                  <v-list-item-subtitle>{{ presenter.description }}</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-row>
                                    <v-btn icon>
                                      <v-icon small>mdi-linkedin</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                      <v-icon small>mdi-twitter</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                      <v-icon small>mdi-web</v-icon>
                                    </v-btn>
                                  </v-row>
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider class="py-1" v-if="pIndex !== l.presenters.length -1"></v-divider>
                            </v-col>
                          </v-row>
                        </v-list>
                      </div>
                    </v-expand-transition>
                  </v-col>

                  <v-col
                    class="text-right d-flex flex-column"
                    cols="1"
                  >
                    <v-btn
                      icon
                      @click="expand(index)"
                      class="align-self-end mt-auto"
                      v-show="l.presenters.length || l.description"
                    >
                      <v-icon>{{ expandSchedule[`schedule-${index}`] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>

                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>

          </v-tab-item>
        </v-tabs-items>

      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import dayjs from "dayjs";

export default {
  name: "ScheduleList",
  props: {
    areaId: {
      type: String,
      required: true
    },
  },
  data(){
    return {
      viewAsListItem: false, // used by the stage

      search: '',
      filterByTrack: '',
      tracks: ['Keynote', 'Panel'],
      localList: [],
      list: [
        {
          startTime: '10:30 AM',
          endTime: '11:30 AM',
          track: {
            name: 'Keynote',
            color: 'warning'
          },
          isLive: false,
          status: 'join',
          stageId: 'stage-1',
          name: 'product-strategy',
          title: 'Product strategy: Defining your strategy, tactics, metrics & roadmap',
          description: 'Find out when and where this lecture will happen. List of all dates, tasks and resources will be available in the presentation\'s detail',
          presenters: [
            {
              name: 'Marvin McKinney',
              description: 'Product Manager at Google',
              avatar: 'https://cdn.hubilo.com/speaker/2116606/150/1549_8254_024241001636454559.png'
            }
          ],
        },
        {
          startTime: '11:30 AM',
          endTime: '11:45 AM',
          track: undefined,
          name: 'cooffee-break',
          title: 'Coffee Break',
          isLive: false,
          status: '',
          description: '',
          presenters: [],
          icon: 'mdi-coffee',
        },
        {
          startTime: '11:45 AM',
          endTime: '12:30 PM',
          track: {
            name: 'Panel',
            color: 'info lighten-2'
          },
          isLive: false,
          status: 'join',
          stageId: 'stage-2',
          name: 'group-discussion-teams',
          title: 'Group discussion: How to align teams for ultimate success',
          description: 'Pellentesque rhoncus viverra vestibulum, purus purus quisque quisque sed. Cras vestibulum facilisis dictumst consequat. In bibendum diam nunc dignissim magna morbi mattis.',
          presenters: [
            {
              name: 'Jenny Wilson',
              description: 'UX Designer at Glassdoor',
              avatar: 'https://silicon.createx.studio/assets/img/team/26.jpg'
            },
            {
              name: 'Jerome Bell',
              description: 'Strategic Advisor at Shopify',
              avatar: 'https://cdn.hubilo.com/speaker/2116606/150/1207_7616_896656001637156224.png'
            }
          ],
        },
        {
          startTime: '12:30 PM',
          endTime: '13:30 PM',
          track: {
            name: 'Panel',
            color: 'info lighten-2'
          },
          isLive: true,
          status: 'join',
          stageId: 'stage-3',
          name: 'group-discussion-virtual-events',
          title: 'Group discussion: How to achieve success in virtual events',
          description: 'Pellentesque rhoncus viverra vestibulum, purus purus quisque quisque sed. Cras vestibulum facilisis dictumst consequat. In bibendum diam nunc dignissim magna morbi mattis.',
          presenters: [
            {
              name: 'Ralph Edwards',
              description: 'Founder & CEO at Strapi',
              avatar: 'https://silicon.createx.studio/assets/img/team/24.jpg'
            },
            {
              name: 'Gavin Newman',
              description: 'CEO and Co-founder at iVent',
              avatar: 'https://ivent-hq.com/wp-content/uploads/2021/07/Gav-Selfie-ForWeb-1.png'
            }
          ],
        },
        {
          startTime: '13:30 PM',
          endTime: '15:00 PM',
          track: {
            name: 'Keynote',
            color: 'warning'
          },
          isLive: false,
          status: '',
          title: 'Deep Dive on Creating a Photorealistic Talking Avatar',
          description: 'Creating a photorealistic avatar speaking any sentence starting from a written input text. Focusing on autoencoders, we will do a journey from the beginning (Of the speaker experience), mistakes and tips learned along the path.',
          presenters: [
            {
              name: 'Albert McKinney          ',
              description: 'Principal Consultant at Stretto Inc.',
              avatar: 'https://silicon.createx.studio/assets/img/team/25.jpg'
            },
          ],
        }
      ],
      expandSchedule: {},
      scheduleTab: null,
    }
  },
  created() {
    if (this.name) {
      // filtering by Name when the component is used by the Stage
      this.localList = this.list.filter( l => l.name === this.name)

            this.viewAsListItem = true
    } else {
      this.localList = this.list
    }
  },
  watch: {
    search(){
      this.onSearchChange()
    },
  },
  computed: {
    ...mapGetters({
      agendaWithName: 'app/agendaWithName',

      // eventWithEventId: 'apps/admin/events/eventWithEventId',
      eventWithEventId: 'events/eventWithEventId',

      componentWithAreaIdAndComponentType: 'areas/componentWithAreaIdAndComponentType',
    }),

    eventId () {
      return this.$route.params.eventId || undefined;
    },

    component () {
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'schedule-list') : undefined;
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

    /**
     * The Event.
     *
     * @returns {*|undefined}
     */
    event() {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    schedule() {
      return (this.event) ? this.event?.schedule : undefined;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },
  },
  methods: {
    ...mapActions({
      addItemToAgenda: 'app/addItemToAgenda',
      removeItemFromAgenda: 'app/removeItemFromAgenda'
    }),

    groupItemsByDate(schedule){
      if ( schedule ) {
        const groups = schedule.reduce((groups, item) => {
          const date = item.startDateTime
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(item);
          return groups;
        }, {});


        const groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            items: groups[date]
          };
        });

        return groupArrays
      }

      return []
    },

    join(stageId){
      this.$router.push({
        name: 'events-eventId-stage-stageId',
        params: { eventId: this.eventId, stageId}
      })
    },

    handleItemToAgenda(item){
      if (this.agendaWithName(item.name))
        this.removeItemFromAgenda(item)
      else
        this.addItemToAgenda(item)
    },
    onSearchChange(){
      if (this.search) {
        this.localList = this.list.filter( l =>
          l.title.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
      } else {
        this.localList = this.list
      }
    },

    onTrackChange(){
      if (this.filterByTrack) {
        this.localList = this.list.filter(l => l.track?.name === this.filterByTrack)
      } else {
        this.localList = this.list
      }
    },

    expand(index){
      this.expandSchedule = {
        ...this.expandSchedule,
        ...{
          [`schedule-${index}`]: !this.expandSchedule[`schedule-${index}`]
        }
      }
    },

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

    time(date) {
      return dayjs(date).format("hh:mm A");
    },

    dateMonth(date){
      return dayjs(date).format("MMMM")?.slice(0, 3).toUpperCase();
    },

    dateDay(date){
      return dayjs(date).format("DD");
    },
  }
};
</script>


<style>
@keyframes blinking {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.blink {
  animation: blinking 1.2s infinite;
}
</style>
