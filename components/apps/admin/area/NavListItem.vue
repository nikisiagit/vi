<template>
  <v-list-item two-line :to="{name: 'apps-admin-areas-areaId', params: {areaId: areaId}}">

    <v-list-item-avatar>
      <v-icon>mdi-page-layout-header</v-icon>
<!--      <apps-admin-area-avatar :icon="icon" />-->
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('area') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    areaId: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    areaId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadAreaWithAreaId: 'apps/admin/areas/loadAreaWithAreaId',
    }),

    async load () {
      return await (this.areaId) ? this.loadAreaWithAreaId(this.areaId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      areaWithAreaId: 'apps/admin/areas/areaWithAreaId',
    }),

    area () {
      return (this.areaId) ? this.areaWithAreaId(this.areaId) : undefined;
    },

    name () {
      return (this.area) ? this.area.name : undefined;
    },

    icon () {
      return (this.area) ? this.area.icon : undefined;
    },

    loaded () {
      return (this.area) ? this.area.loaded : false;
    },

    loading () {
      return (this.area) ? this.area.loading : false;
    },
  },
}
</script>
