<!--
[PRO-215] Venue App - Areas

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-215

This component renders a list of links to the Areas that have been added to the Partition/Venue.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-home</v-icon>
      {{ $t('areas')}}
    </v-card-title>

    <v-card-subtitle>{{ $t('areas')}}</v-card-subtitle>

    <v-list>
      <area-nav-list-item
        v-for="area in areas"
        :key="area.areaId"
        :area-id="area.areaId"
      />
    </v-list>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavList",

  async created() {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'areas/load',
      reload: 'areas/reload',
    })
  },

  computed: {
    ...mapGetters({
      initialised: 'areas/initialised',
      loading: 'areas/loading',
      loaded: 'areas/loaded',
      areas: 'areas/areas',
    })
  },
}
</script>
