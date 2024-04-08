<template>
  <v-card rounded="0">
    <v-toolbar elevation="0" class="pa-0 ma-0">
      <v-toolbar-title class="font-weight-medium">
       <v-icon left>mdi-calendar-outline</v-icon> {{ $t('My Schedule') }}
      </v-toolbar-title>

    </v-toolbar>

    <v-card-text>

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

      <v-text-field
        v-model.lazy.trim="search"
        clearable
        dense
        outlined
        append-icon="mdi-magnify"
        :label="$t('Search')"
      ></v-text-field>

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
                      <p>Nothing found in your schedule.</p>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-fade-transition>

            <v-sheet v-for="(l, index) in localList" :key="index" rounded="lg" outlined class="mt-3">
              <v-container fluid class="pa-2">

                <v-row justify="space-between" no-gutters>

                  <v-col cols="3" >

                    <v-row no-gutters>
                      <v-col align="center" cols="12">
                        <h4>{{ l.startTime }}</h4>
                        <h4>{{ l.endTime }}</h4>
                      </v-col>

                      <v-col v-if="l.track" align="center" class="mt-2" cols="12">
                        <v-chip small label :color="l.track.color" class="font-weight-bold">
                          {{ l.track.name }}
                        </v-chip>
                      </v-col>

                    </v-row>

                  </v-col>

                  <v-col>
                    <h3>
                      {{ l.title }}
                    </h3>

                    <!-- Show Icon-->
                    <v-icon small v-if="l.icon">{{ l.icon }}</v-icon>
                    <!-- /Show Icon -->

                  </v-col>
                  <v-col cols="auto" align="end">
                    <v-menu
                      :nudge-width="200"
                      offset-y
                      left
                      transition="slide-y-transition"
                      bottom
                      :close-on-content-click="false"
                      close-on-content-click
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item @click="handleItemToAgenda(l)">
                          <v-list-item-content>
                            <v-list-item-title>
                              <v-icon left>mdi-text-box-minus-outline</v-icon>  Remove from My Schedule
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider  v-if="l.status === 'join'"></v-divider>

                        <v-list-item @click="join(l.stageId)"  v-if="l.status === 'join'">
                          <v-list-item-content>
                            <v-list-item-title>
                              <v-icon left>mdi-door-open</v-icon>
                              Join
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-icon color="primary">mdi-arrow-right</v-icon>
                          </v-list-item-action>
                        </v-list-item>

                      </v-list>
                      <!-- -->


                    </v-menu>

                    <v-container class="pa-0 mt-2" v-if="l.isLive">
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

export default {
  name: "MyScheduleList",
  data(){
    return {
      search: '',
      filterByTrack: '',
      tracks: ['Keynote', 'Panel'],
      localList: [],
      expandSchedule: {},
      scheduleTab: null,
    }
  },
  created() {
    this.localList = this.agendaList
  },
  watch: {
    search(){
      this.onSearchChange()
    }
  },
  computed: {
    ...mapGetters({
      agendaWithName: 'app/agendaWithName',
      agendaList: 'app/agendaList'
    }),

    eventId () {
      return this.$route.params.eventId || undefined;
    },
  },
  methods: {
    ...mapActions({
      addItemToAgenda: 'app/addItemToAgenda',
      removeItemFromAgenda: 'app/removeItemFromAgenda'
    }),

    handleItemToAgenda(item){
      if (this.agendaWithName(item.name))
        this.removeItemFromAgenda(item)
      else
        this.addItemToAgenda(item)
    },
    join(stageId){
      this.$router.push({
        name: 'events-eventId-stage-stageId',
        params: { eventId: this.eventId, stageId}
      })
    },
    onSearchChange(){
      if (this.search) {
        this.localList = this.agendaList.filter( l =>
          l.title.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
      } else {
        this.localList = this.agendaList
      }
    },

    onTrackChange(){
      if (this.filterByTrack) {
        this.localList = this.agendaList.filter(l => l.track?.name === this.filterByTrack)
      } else {
        this.localList = this.agendaList
      }
    },

    expand(index){
      this.expandSchedule = {
        ...this.expandSchedule,
        ...{
          [`schedule-${index}`]: !this.expandSchedule[`schedule-${index}`]
        }
      }
    }
  }
};
</script>
