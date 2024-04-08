<!--
Admin - EmailTemplates - List

A smart component that renders the EmailTemplates that have been created in the Partition
in a list.
-->
<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('admin-email-templates')}}
      ({{ numberOfEmailTemplates }})
      <v-spacer />

      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-list v-if="numberOfEmailTemplates > 0">
            <apps-admin-email-template-nav-list-item
              v-for="emailTemplate in emailTemplates"
              :key="emailTemplate.emailTemplateId"
              :email-template-id="emailTemplate.emailTemplateId"
            />
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
    })
  },
}
</script>
