<!--
[PRO-243] Venue App (Admin) - Region - Languages - Select

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-243

A smart component that renders a list of the Languages the Region can offer to the Partition
-->
<template>
  <v-select
    v-model="languageId"
    :loading="loading"
    clearable
    :items="languages"
    item-text="name"
    item-value="languageId"
    return-object
    :prepend-icon="prependIcon"
    :label="$attrs['label'] ? $attrs['label']: languageLabel"
    :hint="$attrs['hint'] ? $attrs['hint']: languageHint"
    required
    persistent-hint
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

    <template v-slot:append-outer>
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

  watch : {
    value: {
      handler () {
        this.languageId = this.value;
      }
    }
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
      load: 'apps/admin/region/languages/load',
      reload: 'apps/admin/region/languages/reload',
    }),
  },
  computed: {
    ...mapGetters({
      loading: 'apps/admin/region/languages/loading',
      loaded: 'apps/admin/region/languages/loading',
      languages: 'apps/admin/region/languages/languages',
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

