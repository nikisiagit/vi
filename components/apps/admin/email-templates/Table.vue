<!--
Admin - Email Templates - Table

A smart component that lists the EmailTemplates that have been created in the Partition.
-->
<template>

  <v-card>
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('admin-email-templates')}}
      ({{ numberOfEmailTemplates }})
      <v-spacer />

      <v-btn icon :loading="loading" :disabled="loading" @click="reload" >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-container fluid>
      <v-row>
        <v-col class="px-4">

          <v-data-table :items="emailTemplates" :headers="headers" :loading="loading">
            <template v-slot:item.actions="{ item }">
              <v-btn icon
                     nuxt
                     :to="{name: 'apps-admin-email-templates-emailTemplateId', params: {emailTemplateId: item.emailTemplateId}}">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
          </v-data-table>

        </v-col>
      </v-row>
    </v-container>
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
      load: 'apps/admin/email-templates/load',
      reload: 'apps/admin/email-templates/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/email-templates/loading',
      loaded: 'apps/admin/email-templates/loaded',
      error: 'apps/admin/email-templates/error',
      emailTemplates: 'apps/admin/email-templates/emailTemplates',
      numberOfEmailTemplates: 'apps/admin/email-templates/numberOfEmailTemplates',
    }),

    placeholder () {
      return this.$i18n.t('search');
    },
  },

  data: () => ({
    headers: [
      {
        text: 'titleId',
        align: 'start',
        value: 'titleId',
        sortable: true,
      },
      {
        text: 'descriptionId',
        align: 'start',
        value: 'descriptionId',
        sortable: true,
      },
      {
        text: 'actions',
        align: 'right',
        value: 'actions',
        sortable: false,
      }
    ],
  }),

}
</script>
