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
      {{ $t('admin-email-template-update-title')}}
      <v-spacer />
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle>{{ $t('admin-email-template-update-title-subtitle') }}</v-card-subtitle>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-email-template-update-title-help') }}</p>
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
            {{ $t('admin-email-template-update-title-submit') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateTitle",

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
    titleId: {
      immediate: true,
      handler () {
        if (this.titleId) {
          if (! this.labelLoading && ! this.labelLoaded) {
            this.loadLabelWithLabelId(this.titleId);
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
      if (! this.titleId) {
        console.log(`## NO TITLE ID AVAILABLE TO UPDATE`);
        return;
      }

      try {
        const update = {
          labelId: this.titleId,
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

    titleId () {
      return (this.emailTemplate) ? this.emailTemplate.titleId : undefined;
    },


    label () {
      return (this.titleId) ? this.labelWithLabelId(this.titleId) : undefined;
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

  data: () => ({
    submitting: false,
    showHelp: false,
    textLocal: undefined,
    languageIdLocal: undefined,
  }),
}
</script>

