<template>
  <v-select
    :loading="loading"
    v-model="languageId"
    :items="languages"
    item-text="name"
    item-value="languageId"
    :label="languageLabel"
    :hint="languageHint"
    :attrs="$attrs"
    required
    persistent-hint
    clearable
    v-bind="$attrs"
    v-on="$listeners"
  >

    <template v-slot:item="{on, attrs, item}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.languageId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-slot:append-outer v-if="false">
      <v-btn icon @click="reload" :loading="loading" :disabled="loading">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </template>
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
    prependIcon: {
      type: String,
    },
  },

  watch: {
    value: {
      handler () {
        this.languageId = this.value;
      }
    }
  },

  data: () => ({
    languageId: undefined,
  }),

  async created() {
    if (! this.loaded && ! this.loading) {
      console.log(`## LANGUAGES SELECT CREATED`);
      await this.load();
    }
    this.languageId = this.value
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/languages/load',
      reload: 'apps/admin/languages/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/languages/loading',
      loaded: 'apps/admin/languages/loaded',
      languages: 'apps/admin/languages/languages',
    }),


    languageLabel () {
      return this.$i18n.t('language-label');
    },

    languageHint () {
      return this.$i18n.t('language-hint');
    },
  }
}
</script>
