<template>
  <v-list>
    <apps-admin-area-nav-list-item
      v-for="area in areas"
      :key="area.areaId"
      :area-id="area.areaId"
    />
  </v-list>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavList",

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/areas/load',
    }),
  },

  computed: {
    ...mapGetters({
      areas: 'apps/admin/areas/areas',
      loading: 'apps/admin/areas/loading',
      loaded: 'apps/admin/areas/loaded',
    })
  }
}
</script>
