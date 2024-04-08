<template>
  <v-select
    v-model="currencyIdLocal"
    :loading="loading"
    clearable
    :items="currencies"
    item-text="name"
    item-value="currencyId"
    :label="currencyLabel"
    :hint="currencyHint"
    required
    persistent-hint
    :attrs="$attrs"
    v-bind="$attrs"
    v-on="$listeners"
  >

    <template v-slot:item="{on, attrs, item}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.currencyId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

<!--    <template v-slot:append-outer>-->
<!--      <v-btn icon @click="reload" :loading="loading" :disabled="loading">-->
<!--        <v-icon>mdi-refresh</v-icon>-->
<!--      </v-btn>-->
<!--    </template>-->
  </v-select>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",

  props: {
    value: {
      type: String
    },
  },

  async created () {
    this.currencyIdLocal = this.value;

    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  watch: {
    value () {
      this.currencyIdLocal = this.value;
    }
  },

  data: () => ({
    currencyIdLocal: undefined,
  }),

  computed: {
    ...mapGetters({
      currencies: 'apps/admin/region/currencies/currencies',
      loading: 'apps/admin/region/currencies/loading',
      loaded: 'apps/admin/region/currencies/loaded',
    }),

    currencyLabel () {
      return this.$i18n.t('currency-label');
    },

    currencyHint () {
      return this.$i18n.t('currency-hint');
    },
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/region/currencies/load',
      reload: 'apps/admin/region/currencies/reload',
    }),
  }
}
</script>
