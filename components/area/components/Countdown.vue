<!--
[PRO-216] Region - Components

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-216

Countdown Component
-->

<template>
  <v-card :loading="loading">
    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-clock</v-icon>
      {{ $t(titleId) }}
    </v-card-title>

    <v-card-subtitle>{{ $t(descriptionId) }}</v-card-subtitle>

    <v-container class="d-flex align-center" fluid>
      <v-card-title>Event starts in</v-card-title>

      <v-spacer></v-spacer>

      <div class="d-flex justify-end text-body-1">
        <!--        <v-sheet outlined width="70" class="text-center" rounded>-->
        <!--          <h2 class="primary&#45;&#45;text">-->
        <!--            {{ years }}-->
        <!--          </h2>-->
        <!--          <v-divider></v-divider>-->
        <!--          <h5 class="primary&#45;&#45;text lighten-1">-->
        <!--            Years-->
        <!--          </h5>-->
        <!--        </v-sheet>-->

        <v-sheet outlined width="70" height="70" class="text-center mr-1" rounded>
          <h2 class="primary--text py-1">
            {{ days % 365  }}
          </h2>
          <v-divider></v-divider>
          <h5 class="primary--text lighten-1 mt-1">
            Days
          </h5>
        </v-sheet>

        <v-sheet outlined width="70" height="70" class="text-center mr-1" rounded>
          <h2 class="primary--text py-1">
            {{ hours % 24 }}
          </h2>
          <v-divider></v-divider>
          <h5 class="primary--text lighten-1 mt-1">
            Hours
          </h5>
        </v-sheet>

        <v-sheet outlined width="70" height="70" class="text-center mr-1" rounded>
          <h2 class="primary--text py-1">
            {{ minutes % 60 }}
          </h2>
          <v-divider></v-divider>
          <h5 class="primary--text lighten-1 mt-1">
            Minutes
          </h5>
        </v-sheet>

        <v-sheet outlined width="70" height="70" class="text-center" rounded>
          <h2 class="primary--text py-1">
            {{ seconds % 60 }}
          </h2>
          <v-divider></v-divider>
          <h5 class="primary--text lighten-1 mt-1">
            Seconds
          </h5>
        </v-sheet>
      </div>
    </v-container>
  </v-card>
</template>


<script>
import {mapActions, mapGetters} from "vuex";
import dayjs from "dayjs";

export default {
  name: "CountdownComponent",

  props: {
    componentId: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  watch: {
    componentId: {
      handler () {
        if (this.initialised) {
          if (!this.loaded && !this.loading) {
            this.load();
          }
        }
      },
    },

    startDateTime: {
      immediate: true,
      handler(){
        if ( ! this.startDateTime ) return

        setInterval(() => {
          const currentDate = new Date();
          const time = new Date(this.startDateTime) - currentDate;
          this.seconds = parseInt(time / 1000);
          this.minutes = parseInt(this.seconds / 60);
          this.hours = parseInt(this.minutes / 60);
          this.days = parseInt(this.hours / 24);
          this.years = parseInt(this.days / 365);
        }, 1000);
      }
    }
  },

  methods: {
    ...mapActions({
      loadComponentWithComponentId: 'components/loadComponentWithComponentId',
    }),

    async load () {
      return await (this.componentId)
        ? this.loadComponentWithComponentId(this.componentId)
        : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      initialised: 'components/initialised',
      componentWithComponentId: 'components/componentWithComponentId',
      eventWithEventId: 'events/eventWithEventId',
    }),

    /**
     * The Component.
     *
     * @returns {*|undefined}
     */
    component () {
      return (this.componentId)
        ? this.componentWithComponentId(this.componentId)
        : undefined;
    },

    /**
     * The EventId.
     *
     * @returns {*|undefined}
     */
    eventId () {
      return (this.component) ? this.component.eventId : undefined;
    },

    loading () {
      return (this.component) ? this.component.loading : false;
    },

    loaded () {
      return (this.component) ? this.component.loaded : false;
    },

    error () {
      return (this.component) ? this.component.error : undefined;
    },

    titleId () {
      return (this.component) ? this.component.titleId : undefined;
    },

    descriptionId () {
      return (this.component) ? this.component.descriptionId : undefined;
    },


    /**
     * The Event.
     *
     * @returns {*|undefined}
     */
    event() {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    startDateTime() {
      return (this.event) ? this.event?.startDateTime : undefined;
    },

    endDateTime() {
      return (this.event) ? this.event?.endDateTime : undefined;
    },
  },

  data(){
    return {
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  },

};
</script>
