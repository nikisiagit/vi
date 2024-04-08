<template>
  <v-card rounded="0" height="100%" :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-home</v-icon>
      {{ $t('venue-areas-nav')}}
    </v-card-title>

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
  name: "VenueNavAreas",

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
