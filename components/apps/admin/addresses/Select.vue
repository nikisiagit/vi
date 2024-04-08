<!--
Admin - Addresses Select

A smart component that renders a list of Addresses to select from.
-->
<template>
  <v-select
    v-model="addressId"
    item-text="name"
    item-value="addressId"
    :loading="loading"
    :items="addresses"
    :label="addressLabel"
    :hint="addressHint"
    :atts="$attrs"
    persistent-hint
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:item="{on, attrs, item}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.addressId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",

  props: {
    value: {
      type: String,
    },
  },

  data: () => ({
    addressId: undefined,
  }),

  watch: {
    value: {
      immediate: true,
      handler () {
        this.addressId = this.value;
      }
    }
  },

  async created () {
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
      addresses: 'apps/admin/addresses/addresses',
      loading: 'apps/admin/addresses/loading',
      loaded: 'apps/admin/addresses/loaded',
    }),

    addressLabel () {
      return this.$i18n.t('address-label');
    },

    addressHint () {
      return this.$i18n.t('address-hint');
    },
  },
}
</script>
