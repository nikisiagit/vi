<!--
Venue App (Admin) Fields - CreateDateForm | A smart component that creates a new date field.
-->
<template>
  <v-card rounded elevation="4" :loading="loading">
    <v-card-title class="primary">
      <v-icon left>mdi-format-list-bulleted</v-icon>
      {{title}}
    </v-card-title>

    <v-card-subtitle class="primary">{{ subtitle }}</v-card-subtitle>

    <v-card v-if="!creating && !created">
      <template>
        <v-stepper v-model="createFieldSteps" >
          <v-stepper-header>
            <v-stepper-step :complete="createFieldSteps > 1" step="1">Field Details</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="createFieldSteps > 2" step="2">Field Validation</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="createFieldSteps > 3" step="3">Review Field</v-stepper-step>
            <v-divider></v-divider>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <apps-admin-registration-fields-common-fields
                ref="stepName"
                @submitted="fieldDetailsSubmitted"
                @cancel="cancel"
              />
            </v-stepper-content>

            <v-stepper-content step="2">
              <apps-admin-registration-fields-date-time-steps-validation
                ref="stepType"
                @submitted="validationSubmitted"
                @cancel="cancel"
                @back="back"
              />
            </v-stepper-content>

            <v-stepper-content step="3">
              <apps-admin-registration-fields-date-time-steps-review
                ref="stepReview"
                @submitted="submit"
                @cancel="cancel"
                @back="back"
                :field = "this.field"
                :creating = "creating"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </template>
    </v-card>

    <!-- CREATING FIELD -->
    <v-container v-if="creating" fluid>
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">
          {{ $t('admin-creating-field') }}
        </v-col>
        <v-col cols="6">
          <v-progress-linear indeterminate rounded height="6" />
        </v-col>
      </v-row>
    </v-container>

    <!--CREATED FIELD-->
    <v-container v-if="created" fluid>
      <apps-admin-registration-status
        :name="'field'"
        :status="fieldExecution.status"
        :action="'created'"
      />
    </v-container>

    <v-card-actions v-if="created" class="justify-end">
      <v-btn
        text
        @click="cancel">
        {{ $t('close') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {slugify} from "@/utils/helpers";

export default {
  name: 'Form',
  props: {
    registrationId: {
      type: String,
      required: true
    },
    fieldType: {
      type: String,
      required: true
    }
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    createFieldSteps: 1,
    field: {
      name: '',
      registrationId: '',
      fieldType: '',
      title: {
        text: '',
        languageId: '',
      },
      description: {
        text: '',
        languageId: '',
      },
      label: {
        text: '',
        languageId: '',
      },
      hint: {
        text: '',
        languageId: '',
      },
      placeholder: {
        text: '',
        languageId: '',
      },
      minDateRange: undefined,
      maxDateRange: undefined,
      allowedHours: [],
      allowedMinutes: [],
      allowedSeconds: [],
      required: false,
      visible: false,
      editable: false,
    },
    currentStep: 1,
    numberOfSteps: 3,

    valid:false,
    executionArn: undefined,
  }),

  methods: {
    ...mapActions({
      createField: 'apps/admin/registrations/fields/createField',
      load: 'apps/admin/registrations/fields/load',
    }),

    cancel () {
      this.$emit('close');
      this.reset();
    },

    reset () {
      this.field = {
        name: '',
        registrationId: '',
        fieldType: '',
        title: {
          text: '',
          languageId: '',
        },
        description: {
          text: '',
          languageId: '',
        },
        label: {
          text: '',
          languageId: '',
        },
        hint: {
          text: '',
          languageId: '',
        },
        placeholder: {
          text: '',
          languageId: '',
        },
        minDateRange: undefined,
        maxDateRange: undefined,
        allowedHours: [],
        allowedMinutes: [],
        allowedSeconds: [],
        required: false,
        visible: false,
        editable: false,
      }
    },
    back(){
      if (this.createFieldSteps !== 1)
        this.createFieldSteps = this.createFieldSteps -1
    },

    fieldDetailsSubmitted ({ name, title, description, label, hint,placeholder, titleLanguageId, descriptionLanguageId, labelLanguageId, hintLanguageId, placeholderLanguageId }) {
      this.field = {
        ...this.field,
        registrationId: this.registrationId,
        name,
      }
      if(title && title !== '') {
        this.field.title = {
          text: title,
          languageId: titleLanguageId
        }
      }
      if (description && description !== '') {
        this.field.description = {
          text: description,
          languageId: descriptionLanguageId
        }
      }
      if(label && label !== '') {
        this.field.label = {
          text: label,
          languageId: labelLanguageId
        }
      }
      if(hint && hint !== '') {
        this.field.hint = {
          text: hint,
          languageId: hintLanguageId
        }
      }
      if(placeholder && placeholder !== '') {
        this.field.placeholder = {
          text: placeholder,
          languageId: placeholderLanguageId
        }
      }
      this.createFieldSteps = 2
    },
    validationSubmitted ({ minDateRange, maxDateRange, allowedHours, allowedMinutes, allowedSeconds, required, visible, editable}) {
      this.field = {
        ...this.field,
        minDateRange,
        maxDateRange,
        allowedHours,
        allowedMinutes,
        allowedSeconds,
        required,
        visible,
        editable,

      }
      this.createFieldSteps = 3
    },

    async submit () {
      const fieldToCreate = {
        ...this.field,
        fieldType: this.fieldType,
      };
      const {executionArn} = await this.createField(fieldToCreate);

      this.createFieldSteps = 4;
      this.executionArn = executionArn;
    },
  },
  computed: {
    ...mapGetters({
      loading: 'apps/admin/registrations/loading',
      loaded: 'apps/admin/registrations/loaded',
      creatingFieldWithExecutionArn: 'apps/admin/registrations/fields/creatingFieldWithExecutionArn',
    }),
    nameAsSlug () {
      if (this.name) {
        return slugify(this.name);
      }
    },
    title () {
      return `${this.$i18n.t("create")} ${this.fieldType} ${this.$i18n.t("title")}`;
    },

    subtitle() {
      return `${this.$i18n.t("create")} ${this.fieldType} ${this.$i18n.t("subtitle")}`;
    },

    fieldExecution () {
      return (this.executionArn) ? this.creatingFieldWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return this.fieldExecution?.creating
    },

    created() {
      return this.fieldExecution?.created
    },
  },
}
</script>
