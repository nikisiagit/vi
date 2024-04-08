<!--
[PRO-242] Venue App (Admin) - Languages - List

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-242

A smart component that renders the List component for the Admin Languages App.
-->
<template>
  <v-card :loading="loading" rounded>

    <!-- progress -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-translate</v-icon>
      {{ $t('admin-languages-list-title') }} ({{ numberOfLanguages }})
      <v-spacer />
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-languages-list-subtitle') }}
    </v-card-subtitle>

    <!-- content -->
    <v-container fluid>
      <v-row>
        <v-col>
          <v-list>
            <apps-admin-language-nav-list-item v-for="language in languages"
                                               :key="language.languageId"
                                               :language-id="language.languageId" />
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

  async created() {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  data: () => ({
    createLanguageDialog: false,
  }),

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
      numberOfLanguages: 'apps/admin/languages/numberOfLanguages',
    })
  },
}
</script>

