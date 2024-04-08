<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-area-details :area-id="areaId"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ViewArea",
  layout: 'admin',

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadAreaWithAreaId: 'apps/admin/areas/loadAreaWithAreaId',
    }),

    async load () {
      return await (this.areaId) ? this.loadAreaWithAreaId(this.areaId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      areaWithAreaId: 'apps/admin/areas/areaWithAreaId',
    }),

    areaId () {
      return this.$route.params.areaId || undefined;
    },

    area () {
      return (this.areaId) ? this.areaWithAreaId(this.areaId) : undefined;
    },

    loading () {
      return (this.area) ? this.area.loading : false;
    },

    loaded () {
      return (this.area) ? this.area.loaded : false;
    },

    error () {
      return (this.area) ? this.area.error : undefined;
    },

    name () {
      return (this.area) ? this.area.name : undefined;
    },
  }
}
</script>
