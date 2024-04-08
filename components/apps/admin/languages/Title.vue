<!--
[PRO-242] Venue App (Admin) - Languages - Title

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-242

A smart component that renders the Title component of the Admin Languages App.
-->
<template>
  <v-card rounded :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title and actions -->
    <v-card-title>
      <v-icon left>mdi-translate</v-icon>
      {{ $t('admin-languages-title') }} ({{ numberOfLanguages || 0 }})

      <v-spacer />

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 v-bind="attrs"
                 v-on="on"
                 :loading="loading"
                 :disabled="loading"
                 @click="reload">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        {{ $t('reload') }}
      </v-tooltip>

      <v-dialog v-model="addLanguageDialog" max-width="1000px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 v-bind="attrs"
                 v-on="on"
                 class="ml-2">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <apps-admin-languages-create-language />
      </v-dialog>

    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-languages-subtitle')}}
    </v-card-subtitle>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Title",

  data: () => ({
    addLanguageDialog: false,
  }),

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/languages/load',
      reload: 'apps/admin/languages/reload',
    })
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

