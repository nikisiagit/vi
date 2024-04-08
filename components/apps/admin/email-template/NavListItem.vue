<!--
Admin - EmailTemplate - NavListItem

A smart component that renders the EmailTemplate as a nav list item.
-->
<template>
  <v-list-item :to="{name: 'apps-admin-email-templates-emailTemplateId', params: {emailTemplateId: emailTemplateId}}">
    <v-list-item-avatar>
      <v-avatar>
        <v-icon>mdi-email</v-icon>
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ $t(titleId) }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('email-template') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    emailTemplateId: {
      type: String,
      required: true,
    }
  },

  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  watch: {
    emailTemplateId: {
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading) {
            this.load();
          }
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadEmailTemplateWithEmailTemplateId: 'apps/admin/email-templates/loadEmailTemplateWithEmailTemplateId'
    }),

    async load() {
      return await (this.emailTemplateId) ? this.loadEmailTemplateWithEmailTemplateId(this.emailTemplateId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      emailTemplateWithEmailTemplateId: 'apps/admin/email-templates/emailTemplateWithEmailTemplateId',
    }),

    emailTemplate () {
      return (this.emailTemplateId) ? this.emailTemplateWithEmailTemplateId(this.emailTemplateId) : undefined;
    },

    name () {
      return this.emailTemplate?.name;
    },

    titleId () {
      return this.emailTemplate?.titleId;
    },

    descriptionId () {
      return this.emailTemplate?.descriptionId;
    },

    subjectId () {
      return this.emailTemplate?.subjectId;
    },

    bodyId () {
      return this.emailTemplate?.bodyId;
    },
  },
}
</script>
