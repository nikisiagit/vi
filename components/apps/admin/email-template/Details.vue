<!--
Admin - EmailTemplate Details

A smart component that renders the details of the EmailTemplate.
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t(emailTemplateId) }}
      <v-spacer />
      <!-- reload -->
      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <!-- help -->
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <!-- sub title -->
    <v-card-subtitle>{{ $t('email-template') }}</v-card-subtitle>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-email-template-details-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <v-list two-line>

      <!-- name -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-template-name') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- title -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ titleId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-template-title-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- description -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ descriptionId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-template-description-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- subject -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ subjectId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-template-subject-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- body -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ bodyId }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-template-body-id') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- createdAt -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ createdAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-template-created-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- createdBy -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ createdBy }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-template-created-by') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- lastModifiedAt -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ lastModifiedAt }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-template-last-modified-at') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- lastModifiedBy -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ lastModifiedBy }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-email-template-last-modified-by') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-list>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  props: {
    emailTemplateId: {
      type: String,
      required: true,
    },
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    emailTemplateId: {
      async handler () {
        if (! this.loaded && ! this.loading) {
          await this.load();
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      emailTemplateWithEmailTemplateId: 'apps/admin/email-templates/emailTemplateWithEmailTemplateId',
    }),

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

    titleId () {
      return (this.emailTemplate) ? this.emailTemplate.titleId : undefined;
    },

    descriptionId () {
      return (this.emailTemplate) ? this.emailTemplate.descriptionId : undefined;
    },

    subjectId () {
      return (this.emailTemplate) ? this.emailTemplate.subjectId : undefined;
    },

    bodyId () {
      return (this.emailTemplate) ? this.emailTemplate.bodyId : undefined;
    },

    createdBy () {
      return this.emailTemplate?.createdBy;
    },

    createdAt () {
      return this.emailTemplate?.createdAt;
    },

    lastModifiedAt () {
      return this.emailTemplate?.lastModifiedAt;
    },

    lastModifiedBy () {
      return this.emailTemplate?.lastModifiedBy;
    },
  },

  methods: {
    ...mapActions({
      loadEmailTemplateWithEmailTemplateId: 'apps/admin/email-templates/loadEmailTemplateWithEmailTemplateId',
    }),

    async load () {
      return await (this.emailTemplateId) ? this.loadEmailTemplateWithEmailTemplateId(this.emailTemplateId) : undefined;
    },

    async reload () {
      await this.load();
    },
  },

  data: () => ({
    showHelp: true,
  }),
}
</script>
