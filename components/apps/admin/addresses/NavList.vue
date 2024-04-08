<template>
  <v-list>
    <apps-admin-address-nav-list-item
      v-for="address in addresses"
      :key="address.addressId"
      :address-id="address.addressId"
    />
  </v-list>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavList",

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/addresses/load',
    }),
  },

  computed: {
    ...mapGetters({
      addresses: 'apps/admin/addresses/addresses',
      loading: 'apps/admin/addresses/loading',
      loaded: 'apps/admin/addresses/loaded',
    })
  }
}
</script>
