<template>
  <v-container fluid>

    <!-- Iterate components -->
    <template v-for="component in componentsSorted">
      <v-row v-if="component.componentType === 'header'" >
        <v-col align="center">
          <!-- COMPONENT TYPE === HEADER -->
          <area-components-header :area-id="areaId" />
          <!-- COMPONENT TYPE === HEADER -->
        </v-col>
      </v-row>

      <!-- COMPONENT TYPE === ABOUT -->
      <v-row v-if="component.componentType === 'about'">
        <v-col>
          <area-components-about :area-id="areaId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === ABOUT -->

      <!-- COMPONENT TYPE === advertisement -->
      <v-row v-if="component.componentType === 'advertisement'">
        <v-col>
          <area-components-advertisement :area-id="areaId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === advertisement -->

      <!-- COMPONENT TYPE === events-list -->
      <v-row v-if="component.componentType === 'events-list'">
        <v-col>
          <area-components-events-list :area-id="areaId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === events-list -->


      <!-- COMPONENT TYPE === event-details -->
      <v-row v-if="component.componentType === 'event-details'" >
        <v-col>
          <area-components-mockups-event-details :area-id="areaId"  @navigate-to="scrollToComponent" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === events-details -->


      <!-- COMPONENT TYPE === countdown -->
      <v-row v-if="component.componentType === 'countdown'" >
        <v-col>
          <area-components-mockups-countdown :area-id="areaId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === countdown -->


      <!-- COMPONENT TYPE === sponsors-list AND is not within Tabs -->
      <v-row v-if="component.componentType === 'sponsors-list' && ! areaContainsEventTab" >
        <v-col>
          <area-components-mockups-sponsors-list
            :area-id="areaId"
          />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === sponsors-list -->

      <!-- COMPONENT TYPE === speakers-list AND is not within Tabs -->
      <v-row v-if="component.componentType === 'speakers-list' && ! areaContainsEventTab" >
        <v-col>
          <area-components-mockups-speakers-list
            :area-id="areaId"
          />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === speakers-list -->

      <!-- COMPONENT TYPE === exhibitors-list AND is not within Tabs -->
      <v-row v-if="component.componentType === 'exhibitors-list' && ! areaContainsEventTab" >
        <v-col>
          <area-components-mockups-exhibitors-list
            :area-id="areaId"
          />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === exhibitors-list -->

      <!-- COMPONENT TYPE === schedule-list AND is not within Tabs -->
      <v-row v-if="component.componentType === 'schedule-list' && ! areaContainsEventTab" >
        <v-col>
          <area-components-mockups-schedule-list
            :area-id="areaId"
          />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === schedule-list -->

      <!-- COMPONENT TYPE === text AND is not within Tabs -->
      <v-row v-if="component.componentType === 'text' && ! areaContainsEventTab" >
        <v-col>
          <area-components-mockups-text
            :area-id="areaId"
          />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === text -->

      <!-- COMPONENT TYPE === registration-tickets AND is not within Tabs -->
      <v-row v-if="component.componentType === 'registration-tickets' && ! areaContainsEventTab" >
        <v-col>
          <area-components-mockups-registration-tickets
            :area-id="areaId"
            ref="registration-tickets"
            style="scroll-margin-top: 4rem;"
          ></area-components-mockups-registration-tickets>
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === registration-tickets -->


    </template>
    <!-- Iterate components -->


    <!--
       ***
       Composition of the Layout when uses event tabs
     -->
    <template v-if="areaContainsEventTab">

      <!-- Iterate components -->
      <!--      <template v-for="component in componentsSorted">-->

      <!-- COMPONENT TYPE === event-tabs -->
      <area-components-mockups-event-tabs
        @navigate-to="scrollToComponent"
        :area-id="areaId"
      >

        <template v-slot:tab-items>

          <!-- Iterate event TabItems components by componentId -->
          <template v-for="tabItemComponentId in areaContainsEventTab.tabItems">

            <!-- COMPONENT TYPE === sponsors-list -->
            <v-row v-show="tabItemComponentId === 'component:sponsors-list'">
              <v-col>
                <area-components-mockups-sponsors-list
                  :area-id="areaId"
                  :ref="tabItemComponentId"
                  style="scroll-margin-top: 4rem;"
                />
              </v-col>
            </v-row>
            <!-- COMPONENT TYPE === sponsors-list -->

            <!-- COMPONENT TYPE === speakers-list -->
            <v-row v-show="tabItemComponentId === 'component:speakers-list'">
              <v-col>
                <area-components-mockups-speakers-list
                  :area-id="areaId"
                  :ref="tabItemComponentId"
                  style="scroll-margin-top: 4rem;"
                />
              </v-col>
            </v-row>
            <!-- COMPONENT TYPE === speakers-list -->

            <!-- COMPONENT TYPE === exhibitors-list -->
            <v-row v-show="tabItemComponentId === 'component:exhibitors-list'">
              <v-col>
                <area-components-mockups-exhibitors-list
                  :area-id="areaId"
                  :ref="tabItemComponentId"
                  style="scroll-margin-top: 4rem;"
                />
              </v-col>
            </v-row>
            <!-- COMPONENT TYPE === exhibitors-list -->

            <!-- COMPONENT TYPE === schedule-list -->
            <v-row v-show="tabItemComponentId === 'component:schedule-list'">
              <v-col>
                <area-components-mockups-schedule-list
                  :area-id="areaId"
                  :ref="tabItemComponentId"
                  style="scroll-margin-top: 4rem;"
                />
              </v-col>
            </v-row>
            <!-- COMPONENT TYPE === schedule-list -->

            <!-- COMPONENT TYPE === text -->
            <v-row v-show="tabItemComponentId === 'component:text'">
              <v-col>
                <area-components-mockups-text
                  :area-id="areaId"
                  :ref="tabItemComponentId"
                  style="scroll-margin-top: 4rem;"
                />
              </v-col>
            </v-row>
            <!-- COMPONENT TYPE === text -->

            <!-- COMPONENT TYPE === registration-tickets  -->
            <v-row v-if="tabItemComponentId === 'component:registration-tickets'" >
              <v-col>
                <area-components-mockups-registration-tickets
                  :area-id="areaId"
                  :ref="tabItemComponentId"
                  style="scroll-margin-top: 4rem;"
                ></area-components-mockups-registration-tickets>
              </v-col>
            </v-row>
            <!-- COMPONENT TYPE === registration-tickets -->

          </template>
          <!-- /Iterate components-->


        </template>
      </area-components-mockups-event-tabs>
      <!-- / COMPONENT TYPE === event-tabs -->

      <!--      </template>-->
      <!-- Iterate components -->

    </template>
    <!--
       ***
       /Composition of the Layout when uses event tabs
     -->


    <v-container v-if="debug" fluid>
      <!-- debug: components -->
      <v-row v-if="debug" class="green">
        <v-col>
          components list:
          <pre>
            {{ components }}
          </pre>

          <pre>
            {{ componentsSorted }}
          </pre>
        </v-col>
      </v-row>
      <!-- /debug: components-->
    </v-container>

  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { sortBy } from '~/utils/helpers'

export default {
  name: "ComponentsContainer",
  props: {
    areaId: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      componentsSorted: [],

      debug: false
    }
  },
  async created () {
    // load components with AreaId
    if (! this.loaded && ! this.loading) {
      await this.load();
    }

    // sort components by order
    this.$watch(vm => [vm.components, vm.areaId], async val => {
        this.componentsSorted = sortBy(this.components, 'order')
    }, {
      immediate: true,
      deep: true
    })
  },

  methods: {
    ...mapActions({
      loadComponentsWithAreaId: 'areas/loadComponentsWithAreaId',
    }),

    async load () {
      return await (this.areaId) ? this.loadComponentsWithAreaId(this.areaId) : undefined;
    },

    scrollToComponent(componentRef) {
      if (! this.$refs[componentRef]) return

      /**
       * VueComponent instance vm
       * it compares that the Ref Vue component has the Computed Property 'component' with the componentRef to verify matches.
       * componentRef being equal to componentId
       */
      const vc = this.$refs[componentRef].find(ref => ref?.component?.componentId === componentRef)

      if (vc?.$el) {
        vc?.$el.scrollIntoView({behavior: 'smooth'});
      }
    },
  },

  computed: {
    ...mapGetters({
      areaWithAreaId: 'areas/areaWithAreaId',
    }),

    area () {
      return (this.areaId) ? this.areaWithAreaId(this.areaId) : undefined;
    },

    components () {
      return (this.area) ? this.area.components : undefined;
    },

    areaContainsEventTab () {
      return (this.components) ? this.components.find(c => c.componentId === 'component:event-tabs') : undefined;
    },

    loaded () {
      return (this.area) ? this.area.componentsLoaded : false;
    },

    loading () {
      return (this.area) ? this.area.componentsLoading : false;
    },

    error () {
      return (this.area) ? this.area.componentsError : undefined;
    }
  }
}
</script>
