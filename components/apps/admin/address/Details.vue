<!--
Admin - Address Details

A smart component that renders the details of the specified Address.
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-address</v-icon>
      {{ $t('label:region:app:admin:address-details') }}

      <v-spacer />

      <v-btn rounded :loading="loading" :disabled="loading" @click="reload">
        <v-icon left>mdi-refresh</v-icon>{{ $t('reload') }}
      </v-btn>
    </v-card-title>

    <v-card-subtitle>{{ $t('address-details-subtitle') }}</v-card-subtitle>

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
            <v-list-item-title>{{ street }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('street') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ city }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('city') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ state }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('state') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ zip }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('zip') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ country }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('country') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ api }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('api') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ latitude }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('latitude') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ longitude }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t('longitude') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  props: {
    addressId: {
      type: String,
      required: true,
    },
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    addressId: {
      async handler () {
        console.log(`## ADDRESS DETAILS WATCHER`)
        if (! this.loaded && ! this.loading) {
          await this.load();
        }
      }
    }
  },

  methods: {
    ...mapActions({
      loadAddressWithAddressId: 'apps/admin/addresses/loadAddressWithAddressId',
    }),

    async load() {
      return await (this.addressId) ? this.loadAddressWithAddressId(this.addressId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      addressWithAddressId: 'apps/admin/addresses/addressWithAddressId',
    }),

    address () {
      return (this.addressId) ? this.addressWithAddressId(this.addressId) : undefined;
    },



    name () {
      return (this.address) ? this.address.name : undefined;
    },

    street () {
      return (this.address) ? this.address.street : undefined;
    },

    zip () {
      return (this.address) ? this.address.zip : undefined;
    },

    api () {
      return (this.address) ? this.address.api : undefined;
    },

    city () {
      return (this.address) ? this.address.city : undefined;
    },

    state () {
      return (this.address) ? this.address.state : undefined;
    },

    country () {
      return (this.address) ? this.address.country : undefined;
    },

    latitude () {
      return (this.address) ? this.address.latitude : undefined;
    },

    longitude () {
      return (this.address) ? this.address.longitude : undefined;
    },

    loaded () {
      return (this.address) ? this.address.loaded : false;
    },

    loading () {
      return (this.address) ? this.address.loading : false;
    },

    error () {
      return (this.address) ? this.address.error : undefined;
    }
  }
}
</script>

