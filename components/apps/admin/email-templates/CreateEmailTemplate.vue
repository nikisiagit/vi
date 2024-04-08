<!--
Admin - EmailTemplates - CreatEmail Template

A smart component that enables an Admin to create a new EmailTemplate.
-->
<template>
  <v-card>

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('admin-email-templates-create-email-template') }}
      <v-spacer />
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <!-- sub title -->
    <v-card-subtitle>{{ $t('admin-email-templates-create-email-template-subtitle') }}</v-card-subtitle>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-email-templates-create-email-template-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>
        <!-- from address -->
        <!-- @todo a select list of the SES Verified Emails associated with this Partition -->
        <v-row>
          <v-col class="px-4">
            <v-select :value="fromAddressLocal"
                      :items="fromAddresses"
                      :label="fromAddressLabel"
                      :hint="fromAddressHint"
            />
          </v-col>
        </v-row>

        <!-- title (language, text) -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="titleTextLocal"
                          :label="titleTextLabel"
                          :hint="titleTextHint"
                          :placeholder="titleTextPlaceholder"
                          persistent-hint
                          persistent-placeholder
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="px-4">
            <apps-admin-languages-select @change="changeTitleLanguageId" />
          </v-col>
        </v-row>

        <!-- description (language, text) -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="descriptionTextLocal"
                          :label="descriptionTextLabel"
                          :hint="descriptionTextHint"
                          :placeholder="descriptionTextPlaceholder"
                          persistent-hint
                          persistent-placeholder
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="px-4">
            <apps-admin-languages-select  @change="changeDescriptionLanguageId"/>
          </v-col>
        </v-row>

        <!-- subject (language, text) -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="subjectTextLocal"
                          :label="subjectTextLabel"
                          :hint="subjectTextHint"
                          persistent-hint
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="px-4">
            <apps-admin-languages-select @change="changeSubjectLanguageId" />
          </v-col>
        </v-row>

        <!-- body (language, text) -->
        <v-row>
          <v-col class="px-4">
            <pro-text-editor v-model="bodyTextLocal" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="px-4">
            <apps-admin-languages-select @change="changeBodyLanguageId" />
          </v-col>
        </v-row>
      </v-container>

      <!-- submit -->
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-btn large
                   block
                   color="primary"
                   @click="submit"
                   :loading="submitting"
                   :disabled="submitting">
              {{ $t('admin-email-templates-create-email-template-submit') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

    </v-form>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateTemplate",

  data: () => ({
    showHelp: false,

    // is the form submitting?
    submitting: false,

    // @todo the list of SES Verified emails
    fromAddresses: [],

    fromAddressLocal: undefined,
    fromNameLocal: undefined,

    titleTextLocal: undefined,
    titleLanguageIdLocal: undefined,

    descriptionTextLocal: undefined,
    descriptionLanguageIdLocal: undefined,

    subjectTextLocal: undefined,
    subjectLanguageIdLocal: undefined,

    bodyTextLocal: undefined,
    bodyLanguageIdLocal: undefined,

    executionArn: undefined,
    startDate: undefined,

    debug: true,
  }),

  methods: {
    ...mapActions({
      createEmailTemplate: 'apps/admin/email-templates/createEmailTemplate',
    }),

    /**
     * Change the Title languageId.
     *
     * @param languageId {string|undefined}
     */
    changeTitleLanguageId (languageId = undefined) {
      this.titleLanguageIdLocal = languageId;
    },

    /**
     * Change the Description languageId.
     *
     * @param languageId {string|undefined}
     */
    changeDescriptionLanguageId (languageId = undefined) {
      this.descriptionLanguageIdLocal = languageId;
    },

    /**
     * Change the Subject languageId.
     *
     * @param languageId {string|undefined}
     */
    changeSubjectLanguageId (languageId = undefined) {
      this.subjectLanguageIdLocal = languageId;
    },

    /**
     * Change the Body languageId.
     *
     * @param languageId {string|undefined}
     */
    changeBodyLanguageId (languageId = undefined) {
      this.bodyLanguageIdLocal = languageId;
    },

    /**
     * Reset the form.
     */
    reset () {
      this.fromAddressLocal = undefined;
      this.fromNameLocal = undefined;

      this.titleTextLocal = undefined;
      this.titleLanguageIdLocal = undefined;

      this.descriptionTextLocal = undefined;
      this.descriptionLanguageIdLocal = undefined;

      this.subjectTextLocal = undefined;
      this.subjectLanguageIdLocal = undefined;

      this.bodyTextLocal = undefined;
      this.bodyLanguageIdLocal = undefined;

      this.executionArn = undefined;
      this.startDate = undefined;
    },

    /**
     *
     * @returns {Promise<void>}
     */
    async submit () {
      try {
        if (this.$refs.form.validate()) {
          this.valid = false;
          return;
        }

        this.valid = true;

        const emailTemplateToCreate = {
          fromAddress: this.fromAddressLocal,
          fromName: this.fromNameLocal,

          title: {
            text: this.titleTextLocal,
            languageId: this.titleLanguageIdLocal,
          },

          description: {
            text: this.descriptionTextLocal,
            languageId: this.descriptionLanguageIdLocal,
          },

          subject: {
            text: this.subjectTextLocal,
            languageId: this.subjectLanguageIdLocal,
          },

          body: {
            text: this.bodyTextLocal,
            languageId: this.bodyLanguageIdLocal,
          },
        };

        console.log(`## EMAIL TEMPLATE TO CREATE`);
        console.log(emailTemplateToCreate);

        this.submitting = true;
        const creatingEmailTemplate = await this.createEmailTemplate(emailTemplateToCreate);
        this.submitting = false;

        const {executionArn, startDate} = creatingEmailTemplate;

        this.executionArn = executionArn;
        this.startDate = startDate;

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  computed: {
    ...mapGetters({
      creatingEmailTemplateWithExecutionArn: 'apps/admin/email-templates/creatingEmailTemplateWithExecutionArn',
    }),

    /**
     * @returns {*|undefined}
     */
    creatingEmailTemplate () {
      return (this.executionArn) ? this.creatingEmailTemplateWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return (this.creatingEmailTemplate) ? this.creatingEmailTemplate.creating : false;
    },

    created () {
      return (this.creatingEmailTemplate) ? this.creatingEmailTemplate.created : false;
    },

    error () {
      return (this.creatingEmailTemplate) ? this.creatingEmailTemplate.error : false;
    },

    emailTemplateId () {
      return (this.creatingEmailTemplate) ? this.creatingEmailTemplate.emailTemplateId : undefined;
    },


    // form labels

    fromAddressLabel () {
      return this.$i18n.t('admin-create-email-template-from-address-label');
    },

    fromAddressHint () {
      return this.$i18n.t('admin-create-email-template-from-address-hint');
    },


    titleTextLabel () {
      return this.$i18n.t('admin-create-email-template-title-label');
    },

    titleTextHint () {
      return this.$i18n.t('admin-create-email-template-title-hint');
    },

    titleTextPlaceholder () {
      return this.$i18n.t('admin-create-email-template-title-placeholder');
    },


    descriptionTextLabel () {
      return this.$i18n.t('admin-create-email-template-description-label');
    },

    descriptionTextHint () {
      return this.$i18n.t('admin-create-email-template-description-hint');
    },

    descriptionTextPlaceholder () {
      return this.$i18n.t('admin-create-email-template-description-placeholder');
    },


    subjectTextLabel () {
      return this.$i18n.t('admin-create-email-template-subject-label');
    },

    subjectTextHint () {
      return this.$i18n.t('admin-create-email-template-subject-hint');
    },

    subjectTextPlaceholder () {
      return this.$i18n.t('admin-create-email-template-subject-placeholder');
    },


    bodyTextLabel () {
      return this.$i18n.t('admin-create-email-template-body-label');
    },

    bodyTextHint () {
      return this.$i18n.t('admin-create-email-template-body-hint');
    },

    bodyTextPlaceholder () {
      return this.$i18n.t('admin-create-email-template-body-placeholder');
    },

  },
}
</script>
