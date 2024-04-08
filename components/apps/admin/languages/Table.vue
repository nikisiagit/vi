<!--
[PRO-242] Venue App (Admin) - Languages - Table

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-242

A smart component that renders the Table component of the Admin Languages App.
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
      {{ $t('admin-languages-table-title') }} ({{ numberOfLanguages || 0 }})
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>{{ $t('admin-languages-table-subtitle') }}</v-card-subtitle>

    <!-- table -->
    <v-card-text>
      <v-data-table :headers="headers" :items="languages" :loading="loading">
        <!-- headers -->
        <template v-slot:header.languageId="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.type="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.partition="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.name="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.code="{ header }">
          {{ $t(header.text) }}
        </template>

        <template v-slot:header.actions="{ header }">
          {{ $t(header.text) }}
        </template>

        <!-- items -->
        <template v-slot:item.languageId="{ item }">
          <nuxt-link :to="{name: 'apps-admin-languages-languageId', params: {languageId: item.languageId}}"
                     class="text-decoration-none">
            {{ item.languageId }}
          </nuxt-link>
        </template>

        <template v-slot:item.actions="{ item }">

          <template v-if="item.loaded">
            <v-btn icon :loading="item.loading">
              <v-icon color="success">mdi-check-circle</v-icon>
            </v-btn>
          </template>

<!--          <v-btn icon color="warning" @click="openDeleteLabelDialog(item)">-->
<!--            <v-icon>mdi-delete</v-icon>-->
<!--          </v-btn>-->

          <v-btn icon link nuxt :to="{name: 'apps-admin-languages-languageId', params: {languageId: item.languageId}}">
            <v-icon>mdi-eye</v-icon>
          </v-btn>

        </template>

      </v-data-table>
    </v-card-text>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Table",
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

  data: () => ({

    addLanguageDialog: false,

    headers: [
      {
        text: 'language-id',
        align: 'start',
        value: 'languageId',
        sortable: true,
      },
      {
        text: 'partition',
        align: 'start',
        value: 'partition',
        sortable: true,
      },
      {
        text: 'type',
        align: 'start',
        value: 'type',
        sortable: true,
      },
      {
        text: 'name',
        align: 'start',
        value: 'name',
        sortable: true,
      },
      {
        text: 'code',
        align: 'start',
        value: 'code',
        sortable: true,
      },
      {
        text: 'actions',
        align: 'right',
        value: 'actions',
        sortable: false,
      },
    ],
  }),
}
</script>
