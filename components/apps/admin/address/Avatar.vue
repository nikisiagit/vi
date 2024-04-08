<template>
  <base-avatar size="xs" icon="mdi-map-marker" />
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BaseAvatar from "../../../base/Avatar";

export default {
  name: "Avatar",
  components: {
    BaseAvatar
  },

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
