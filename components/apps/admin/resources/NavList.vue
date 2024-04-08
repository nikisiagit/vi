<template>
  <v-list>
    <apps-admin-resource-nav-list-item
      v-for="resource in resources"
      :key="resource.resourceId"
      :resource-id="resource.resourceId"
    />
  </v-list>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavList",

  /**
   * @return {Promise<void>}
   */
  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/resources/load',
      unload: 'apps/admin/resources/unload',
    }),
  },

  computed: {
    ...mapGetters({
      resources: 'apps/admin/resources/resources',
      loading: 'apps/admin/resources/loading',
      loaded: 'apps/admin/resources/loaded',
    })
  }
}
</script>
