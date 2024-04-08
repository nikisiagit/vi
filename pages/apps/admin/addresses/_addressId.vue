<!--
Admin - Address Page
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-address-details :address-id="addressId" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ViewAddress",
  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadAddressWithAddressId: 'apps/admin/addresses/loadAddressWithAddressId',
    }),

    async load () {
      return await (this.addressId) ? this.loadAddressWithAddressId(this.addressId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      addressWithAddressId: 'apps/admin/addresses/addressWithAddressId',
    }),

    addressId () {
      return this.$route.params.addressId || undefined;
    },

    address () {
      return (this.addressId) ? this.addressWithAddressId(this.addressId) : undefined;
    },

    loading () {
      return (this.address) ? this.address.loading : false;
    },

    loaded () {
      return (this.address) ? this.address.loaded : false;
    },

    error () {
      return (this.address) ? this.address.error : undefined;
    },

    name () {
      return (this.address) ? this.address.name : undefined;
    },
  }
}
</script>
