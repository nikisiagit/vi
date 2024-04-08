<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-advertisements</v-icon>
      {{ $t('advertisement-details') }}

      <v-spacer />

      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>
    </v-card-title>

    <v-card-subtitle>{{ $t('advertisement-details-subtitle') }}</v-card-subtitle>

    <v-card-text>
      <v-list two-line>

        <!-- name -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ label }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('label') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('text') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!-- other attributes -->

<!--        <pre>{{ advertisement }}</pre>-->

      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

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
    },

    async reload () {
      return await (this.name) ? this.loadAdvertisementWithName(this.name) : undefined;
    },
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
      return (this.advertisement) ? this.advertisement.error : undefined;
    },

    label () {
      return (this.advertisement) ? this.advertisement.label : undefined;
    },

    text () {
      return (this.advertisement) ? this.advertisement.text : undefined;
    },
  }
}
</script>

