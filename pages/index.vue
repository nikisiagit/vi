<!--
[PRO-98] Venue App - Index Page

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-98

The Home page is used to render the default Area.

@link  https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-215
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>

        <!-- the home page renders the `default` Area -->
        <!-- @todo - luis we need to handle NOT having a areaId attribute - what do we show? a placeholder image? -->
        <v-fade-transition mode="out-in">
          <area-container v-if="areaId" :area-id="areaId" />
        </v-fade-transition>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'Home',

  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'venue/load',
    }),
  },

  computed: {
    ...mapGetters({
      initialised: 'venue/initialised',
      loading: 'venue/loading',
      loaded: 'venue/loaded',
      venue: 'venue/venue'
    }),

    /**
     * Retrieve the 'default' areaId from the Venue.
     *
     * This may not return a value.
     *
     * @returns {any}
     */
    areaId () {
      return (this.venue) ? this.venue?.areaId : undefined;
    },
  },
}
</script>
