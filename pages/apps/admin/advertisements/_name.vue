<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-advertisement-details :name="name"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "_name",
  layout: 'admin',

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadAdvertisementWithName: 'apps/admin/advertisements/loadAdvertisementWithName',
    }),

    async load() {
      return await (this.name) ? this.loadAdvertisementWithName(this.name) : undefined;
    }
  },

  computed: {
    ...mapGetters({
      advertisementWithName: 'apps/admin/advertisements/advertisementWithName',
    }),

    name () {
      return this.$route.params.name || undefined;
    },

    advertisement () {
      return (this.name) ? this.advertisementWithName(this.name) : undefined;
    },

    loaded () {
      return (this.advertisement) ? this.advertisement.loaded : false;
    },

    loading () {
      return (this.advertisement) ? this.advertisement.loading : false;
    },

    error () {
      return (this.advertisement) ? this.advertisement.error : false;
    },
  }
}
</script>
