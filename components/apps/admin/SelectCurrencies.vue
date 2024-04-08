<template>
  <v-select
    v-model="currencyId"
    :items="currencies"
    item-text="name"
    item-value="currencyId"

    :label="$attrs['label'] ? $attrs['label']: currencyLabel"
    :hint="$attrs['hint'] ? $attrs['hint']: currencyHint"
    required
    persistent-hint
    @change="$emit('input', currencyId)"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import {mapActions, mapGetters} from "vuex";
// import {CURRENCIES_NAMESPACE} from "../constants";

export default {
  name: "SelectCurrencies",
  props: {
    value: {
      type: String
    },
    prependIcon: {
      type: String,
      default: "mdi-"
    },
  },
  data: () => ({
    valid: true,
    currencyId: '',
  }),
  created(){
    this.currencyId = this.value

    if (! this.loaded && ! this.loading) {
      this.load();
    }
  },
  methods: {
    ...mapActions({
      load: 'load',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      loaded: 'loaded',
      currencies: 'currencies',
    }),

    currencyLabel () {
      return this.$i18n.t('Currency_Select');
    },

    currencyHint () {
      return this.$i18n.t('Currency_Select_Hint');
    },
  }
}
</script>
