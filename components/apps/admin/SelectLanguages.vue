<template>
  <v-select
    v-model="languageId"
    :items="languages"
    item-text="name"
    item-value="languageId"
    :prepend-icon="prependIcon"
    :label="$attrs['label'] ? $attrs['label']: languageLabel"
    :hint="$attrs['hint'] ? $attrs['hint']: languageHint"
    required
    persistent-hint
    @change="$emit('input', languageId)"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import {mapActions, mapGetters} from "vuex";
// import {LANGUAGES_NAMESPACE} from "../constants";

export default {
  name: "SelectLanguages",
  props: {
    value: {
      type: String
    },
    prependIcon: {
      type: String,
      default: "mdi-translate"
    },
  },
  data: () => ({
    valid: true,
    languageId: '',
  }),
  created(){
    this.languageId = this.value

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
      languages: 'languages',
    }),
    languageLabel () {
      return this.$i18n.t('Language_Label');
    },
    languageHint () {
      return this.$i18n.t('Language_Hint');
    },
    // languageRules() {
    //   //TODO: Handle i18n.
    //   return [
    //     v => !!v || 'Language_Is_Required'
    //   ]
    // },
  }
}
</script>
