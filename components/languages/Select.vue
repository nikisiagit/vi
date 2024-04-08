<template>
  <v-select
    :loading="loading"
    clearable
    v-model="languageIdLocal"
    :items="languages"
    item-text="name"
    item-value="languageId"
    :label="languageLabel"
    :hint="languageHint"
    required
    persistent-hint
    :attrs="$attrs"
    :error="isError"
    @change="change">
    <template v-slot:item="{on, attrs, item}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.languageId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LanguagesSelect",
  props: {
    languageId: {
      type: String
    }
  },

  /**
   * Created
   *
   * @return {Promise<void>}
   */
  async created () {
    if (! this.loading && ! this.loaded) {
      console.log(`## LANGUAGES SELECT`);
      await this.load();
    }
    this.languageIdLocal = this.languageId;
  },

  watch : {
    languageId () {
      this.languageIdLocal = this.languageId;
    }
  },

  data: () => ({
    languageIdLocal: undefined,
  }),

  computed: {
    ...mapGetters({
      loading: 'languages/loading',
      loaded: 'languages/loaded',
      languages: 'languages/languages',

      initialised: 'languages/initialised',
      error: 'languages/error',
    }),
    /**
     * @return {VueI18n.TranslateResult}
     */
    languageLabel () {
      return this.$i18n.t('languages-select-label');
    },

    /**
     *@return {VueI18n.TranslateResult}
     */
    languageHint () {
      return this.$i18n.t('languages-select-hint');
    },

    isError () {
      return !!this.error;
    }
  },
  methods: {
    ...mapActions({
      load: 'languages/load',
      reload: 'languages/reload',
    }),

    /**
     *
     */
    change () {
      this.$emit('change', this.languageIdLocal)
    },
  },
  updated() {
    this.languageIdLocal = this.languageId
  }
}
</script>
