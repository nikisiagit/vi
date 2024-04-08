<!--
Admin - Addresses List

A smart component that renders a list of the Addresses that have been added to the Venue/Partition.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-map-marker</v-icon>
      {{ $t('admin-addresses-list') }}
      ({{ numberOfAddresses }})

      <v-spacer />

      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-addresses-list-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- the list of Addresses -->
    <v-container fluid>
      <v-row>
        <v-col>
          <v-list>
            <apps-admin-address-nav-list-item
              v-for="address in addresses"
              :key="address.addressId"
              :addressId="address.addressId" />
          </v-list>
        </v-col>
      </v-row>
    </v-container>

  </v-card>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/addresses/load',
      reload: 'apps/admin/addresses/reload',
    })
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/addresses/loading',
      loaded: 'apps/admin/addresses/loaded',
      addresses: 'apps/admin/addresses/addresses',
      numberOfAddresses: 'apps/admin/addresses/numberOfAddresses'
    })
  },

  data: () => ({
    showHelp: true,
  }),
}
</script>

