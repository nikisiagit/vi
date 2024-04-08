<template>
  <v-card color="transparent" flat rounded="lg">
    <v-row >
      <v-col>
        <v-card flat class="rounded-lg my-2" height="52" elevation="1" style="top: 0;position: sticky;z-index: 1;">
          <v-toolbar-title class="ma-auto my-0">
            <v-tabs
              v-model="tab"
              centered

            >
              <v-tabs-slider></v-tabs-slider>

              <v-tabs v-model="tab">

                <v-tab
                  v-if="component.componentId !== 'component:registration-tickets'"
                  v-for="component in componentsInPage"
                  :key="component.componentId"
                  @click="$emit('navigate-to', component.componentId)"
                >
                  {{ component.title }}
                </v-tab>
              </v-tabs>

            </v-tabs>
          </v-toolbar-title>


        </v-card>

        <v-sheet rounded="lg" color="transparent">
          <slot name="tab-items"></slot>
        </v-sheet>

      </v-col>
    </v-row>
  </v-card>
</template>


<script>
import {mapGetters} from "vuex";

export default {
  name: "EventTabs",
  props: {
    areaId: {
      type: String,
      required: true
    },
  },
  data(){
    return {
      tab: null,
    }
  },
  computed: {
    ...mapGetters({
      // eventWithEventId: 'apps/admin/events/eventWithEventId',
      eventWithEventId: 'events/eventWithEventId',

      componentsWithAreaId: 'areas/componentsWithAreaId',
      componentWithAreaIdAndComponentType: 'areas/componentWithAreaIdAndComponentType',

    }),

    component () {
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'event-tabs') : undefined;
    },

    tabItems () {
      return (this.component) ? this.component?.tabItems : undefined;
    },

    components () {
      return (this.areaId) ? this.componentsWithAreaId(this.areaId) : undefined;
    },

    /**
     * Check just that all the components that belongs to the area does not include Activity Panel SideBar.
     * @returns {*|undefined}
     */
    componentsInPage () {
      return (this.components) ? this.components.filter(c => this.tabItems.includes(c.componentId)).map(c => {
        return {
          ...c,
          title: this.retrieveLabel(c?.heading?.titleId)
        }
      }) : undefined;
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
