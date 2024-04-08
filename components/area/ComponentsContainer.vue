<!--
[PRO-216] Region - Components

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-216

The ComponentsContainer loops through the Components that have been added to the Area and
renders each in turn.
-->
<template>
  <v-container fluid>

<!--    <pre>-->
<!--      {{ components }}-->
<!--    </pre>-->

    <template v-for="component in components">

      <!-- /COMPONENT TYPE === about -->
      <v-row v-if="component.componentType === 'about'">
        <v-col>
          <area-components-about :component-id="component.componentId" />
        </v-col>
      </v-row>
      <!-- /COMPONENT TYPE === about -->

      <!-- COMPONENT TYPE === advertisement -->
      <v-row v-if="component.componentType === 'advertisement'">
        <v-col>
          <area-components-advertisement :component-id="component.componentId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === advertisement -->

      <!-- COMPONENT TYPE === countdown -->
      <v-row v-if="component.componentType === 'countdown'" >
        <v-col>
          <area-components-countdown :component-id="component.componentId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === countdown -->


      <!-- COMPONENT TYPE === eventdetails -->
      <v-row v-if="component.componentType === 'eventdetails'" >
        <v-col>
          <area-components-event-details :component-id="component.componentId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === eventdetails -->

      <!-- COMPONENT TYPE === eventslist -->
      <v-row v-if="component.componentType === 'eventslist'">
        <v-col>
          <area-components-events-list :component-id="component.componentId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === eventslist -->


      <!-- COMPONENT TYPE === header -->
      <v-row v-if="component.componentType === 'header'" >
        <v-col>
          <area-components-header :component-id="component.componentId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === header -->

      <!-- COMPONENT TYPE === sponsorslist -->
      <v-row v-if="component.componentType === 'sponsorslist'">
        <v-col>
          <area-components-sponsors-list :component-id="component.componentId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === sponsorslist -->

      <!-- COMPONENT TYPE === speakerslist -->
      <v-row v-if="component.componentType === 'speakerslist'" >
        <v-col>
          <area-components-speakers-list :component-id="component.componentId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === speakerslist -->

      <!-- COMPONENT TYPE === exhibitors-list -->
      <v-row v-if="component.componentType === 'exhibitorslist'" >
        <v-col>
          <area-components-exhibitors-list :component-id="component.componentId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === exhibitors-list -->

      <!-- COMPONENT TYPE === text -->
      <v-row v-if="component.componentType === 'text'" >
        <v-col>
          <area-components-text :component-id="component.componentId" />
        </v-col>
      </v-row>
      <!-- COMPONENT TYPE === text -->

    </template>

  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ComponentsContainer",

  props: {
    areaId: {
      type: String,
      required: true
    }
  },

  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  watch: {
    areaId: {
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading) {
            this.load();
          }
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadComponentsWithAreaId: 'components/loadComponentsWithAreaId',
    }),

    async load () {
      return await (this.areaId) ? this.loadComponentsWithAreaId(this.areaId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      initialised: 'components/initialised',
      componentsWithAreaId: 'components/componentsWithAreaId',
      withAreaId: 'components/withAreaId',
    }),

    loaded () {
      if (! this.areaId) {
        return false;
      }
      let withAreaId = this.withAreaId(this.areaId);

      if (withAreaId) {
        return withAreaId?.loaded;
      }

      return false;
    },

    loading () {
      if (! this.areaId) {
        return false;
      }
      let withAreaId = this.withAreaId(this.areaId);

      if (withAreaId) {
        return withAreaId?.loading;
      }

      return false;
    },

    components () {
      return (this.areaId) ? this.componentsWithAreaId(this.areaId) : [];
    },
  },
}
</script>

