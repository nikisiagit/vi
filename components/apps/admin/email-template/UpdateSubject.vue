<!--
Admin - EmailTemplate - UpdateTitle

A smart component that enables an Admin to update the EmailTemplate Title Label.
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
      {{ $t('admin-email-template-update-subject')}}
      <v-spacer />
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle>{{ $t('admin-email-template-update-subject-subtitle') }}</v-card-subtitle>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-email-template-update-subject-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-text-field v-model="textLocal"
                        :label="titleLabel"
                        :hint="titleHint"
                        persistent-hint
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-4">
          <apps-admin-languages-select :value="languageIdLocal"
                                       @change="changeLanguageId" />
        </v-col>
      </v-row>
    </v-container>

    <!-- submit -->
    <v-container>
      <v-row>
        <v-col class="px-4">
          <v-btn large
                 block
                 color="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('admin-email-template-update-subject-submit') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateSubject",

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
    },
    subjectId: {
      immediate: true,
      handler () {
        if (this.subjectId) {
          if (! this.labelLoading && ! this.labelLoaded) {
            this.loadLabelWithLabelId(this.subjectId);
          }
        }
      }
    },
    text: {
      immediate: true,
      handler () {
        this.textLocal = this.text;
      }
    },
    languageId: {
      immediate: true,
      handler () {
        this.languageIdLocal = this.languageId;
      }
    }
  },

  computed: {
    ...mapGetters({
      emailTemplateWithEmailTemplateId: 'apps/admin/email-templates/emailTemplateWithEmailTemplateId',
      labelWithLabelId: 'apps/admin/labels/labelWithLabelId',
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

    subjectId () {
      return (this.emailTemplate) ? this.emailTemplate.subjectId : undefined;
    },


    label () {
      return (this.subjectId) ? this.labelWithLabelId(this.subjectId) : undefined;
    },

    labelLoading () {
      return (this.label) ? this.label.loading : false;
    },

    labelLoaded () {
      return (this.label) ? this.label.loaded : false;
    },

    text () {
      return (this.label) ? this.label.text : undefined;
    },

    languageId () {
      return (this.label) ? this.label.languageId : undefined;
    },


    // labels

    titleLabel () {
      return this.$i18n.t('admin-email-template-title-label');
    },

    titleHint () {
      return this.$i18n.t('admin-email-template-title-hint');
    },
  },

  methods: {
    ...mapActions({
      loadEmailTemplateWithEmailTemplateId: 'apps/admin/email-templates/loadEmailTemplateWithEmailTemplateId',
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
      updateLabel: 'apps/admin/labels/updateLabel',
    }),

    async load () {
      return await (this.emailTemplateId) ? this.loadEmailTemplateWithEmailTemplateId(this.emailTemplateId) : undefined;
    },

    async reload() {
      return await this.load();
    },

    async changeLanguageId(languageId = undefined) {
      this.languageIdLocal = languageId;
    },

    async submit () {
      if (! this.subjectId) {
        return;
      }

      try {
        const update = {
          labelId: this.subjectId,
          text: this.textLocal,
          languageId: this.languageIdLocal,
        };

        this.submitting = true;
        const updatingLabel = await this.updateLabel(update);
        this.submitting = false;

      } catch (error) {
        console.log(error);
      }
    },
  },

  data: () => ({
    submitting: false,
    showHelp: false,
    textLocal: undefined,
    languageIdLocal: undefined,
  }),
}
</script>



