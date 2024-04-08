<template>
  <v-list-item two-line :to="{name: 'apps-admin-advertisements-name', params: {name: name}}">
    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('advertisement') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    name: {
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
    name: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadAdvertisementWithName: 'apps/admin/advertisements/loadAdvertisementWithName',
    }),

    async load () {
      return await (this.name) ? this.loadAdvertisementWithName(this.name) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      advertisementWithName: 'apps/admin/advertisements/advertisementWithName',
    }),

    advertisement () {
      return (this.name) ? this.advertisementWithName(this.name) : undefined;
    },

    loaded () {
      return (this.advertisement) ? this.advertisement.loaded : false;
    },

    loading () {
      return (this.advertisement) ? this.advertisement.loading : false;
    },
  },
}
</script>
