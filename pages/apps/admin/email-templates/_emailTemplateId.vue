<!--
Admin - Email Template Page

Currently, this page renders the EmailTemplate components used by a specific EmailTemplate.
-->
<template>
  <v-container fluid>

    <v-row>
      <v-col cols="12" md="4">
        <apps-admin-email-template-details :email-template-id="emailTemplateId" />
      </v-col>
    </v-row>

    <v-row>
      <!-- title -->
      <v-col cols="12" md="4">
        <apps-admin-email-template-update-title :email-template-id="emailTemplateId" />
      </v-col>

      <!-- description -->
      <v-col cols="12" md="4">
        <apps-admin-email-template-update-description :email-template-id="emailTemplateId" />
      </v-col>

      <!-- subject -->
      <v-col cols="12" md="4">
        <apps-admin-email-template-update-subject :email-template-id="emailTemplateId" />
      </v-col>

      <!-- body -->
      <v-col cols="12" md="4">
        <apps-admin-email-template-update-body :email-template-id="emailTemplateId" />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "EmailTemplate",

  methods: {
    ...mapActions({
      loadEmailTemplateWithEmailTemplateId: 'apps/admin/email-templates/loadEmailTemplateWithEmailTemplateId',
    }),

    async load () {
      return await (this.emailTemplateId) ? this.loadEmailTemplateWithEmailTemplateId(this.emailTemplateId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      emailTemplateWithEmailTemplateId: 'apps/admin/email-templates/emailTemplateWithEmailTemplateId',
    }),

    emailTemplateId () {
      return this.$route.params.emailTemplateId || undefined;
    },

    /**
     * @returns {*|undefined}
     */
    emailTemplate () {
      return (this.emailTemplateId) ? this.emailTemplateWithEmailTemplateId(this.emailTemplateId) : undefined;
    },

    loading () {
      return (this.emailTemplate) ? this.emailTemplate.loading : false;
    },

    loaded () {
      return (this.emailTemplate) ? this.emailTemplate.loaded : false;
    },

    error () {
      return (this.emailTemplate) ? this.emailTemplate.error : undefined;
    },

    name () {
      return (this.emailTemplate) ? this.emailTemplate.name : undefined;
    },
  }
}
</script>
