<template>
  <v-list-item two-line :to="{name: 'apps-admin-addresses-addressId', params: {addressId: addressId}}">
    <v-list-item-avatar>
      <apps-admin-address-avatar :address-id="addressId" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('address') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    addressId: {
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
    addressId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadAddressWithAddressId: 'apps/admin/addresses/loadAddressWithAddressId',
    }),

    async load () {
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

    loaded () {
      return (this.address) ? this.address.loaded : false;
    },

    loading () {
      return (this.address) ? this.address.loading : false;
    },
  },
}
</script>
