<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-form v-model="valid" ref="fieldForm" lazy-validation>
        <v-container fluid>
          <!--Field Name-->
          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field
                v-model="name"
                :label="nameLabel"
                :hint="nameHint"
                persistent-hint
                clearable
                required
                :rules="[v => !!v || 'Field Name is required.']"/>
            </v-col>
          </v-row>

          <!--Field Title-->
          <v-row>
            <v-col cols="12" lg="12">
              <base-label-form
                :text="title"
                :text-label="titleLabel"
                :text-hint="titleHint"
                @change="changeTitle">
              </base-label-form>
            </v-col>
          </v-row>

          <!--Field Description-->
          <v-row>
            <v-col cols="12" lg="12">
              <base-label-form
                :text="description"
                :text-label="descriptionLabel"
                :text-hint="descriptionHint"
                @change="changeDescription">
              </base-label-form>
            </v-col>
          </v-row>

          <!--Field Label-->
          <v-row>
            <v-col cols="12" lg="12">
              <base-label-form
                :text="label"
                :text-label="labelLabel"
                :text-hint="labelHint"
                @change="changeLabel">
              </base-label-form>
            </v-col>
          </v-row>

          <!--Field Hint-->
          <v-row>
            <v-col cols="12" lg="12">
              <base-label-form
                :text="hint"
                :text-label="hintLabel"
                :text-hint="hintHint"
                @change="changeHint">
              </base-label-form>
            </v-col>
          </v-row>

          <!--Field Placeholder -->
          <v-row>
            <v-col cols="12" lg="12">
              <base-label-form
                :text="placeholder"
                :text-label="placeholderLabel"
                :text-hint="placeholderHint"
                @change="changePlaceholder">
              </base-label-form>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />
        <v-btn large class="pa-4" rounded @click="submit">
          {{ $t('next') }}
          <v-spacer></v-spacer>
          <v-icon small >
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import {slugify} from "@/utils/helpers";

export default {
  name: "CommonFields",

  data: () => ({
    name: undefined,
    title: undefined,
    description: undefined,
    label: undefined,
    hint: undefined,
    placeholder: undefined,

    titleLanguageId: undefined,
    descriptionLanguageId: undefined,
    labelLanguageId: undefined,
    hintLanguageId: undefined,
    placeholderLanguageId: undefined,

    valid:false,
  }),

  methods: {
    changeTitle({text, languageId}) {
      this.title = text
      this.titleLanguageId = languageId
    },
    changeDescription({text, languageId}) {
      this.description = text
      this.descriptionLanguageId = languageId
    },
    changeLabel({text, languageId}) {
      this.label = text
      this.labelLanguageId = languageId
    },
    changeHint({text, languageId}) {
      this.hint = text
      this.hintLanguageId = languageId
    },
    changePlaceholder({text, languageId}) {
      this.placeholder = text
      this.placeholderLanguageId = languageId
    },
    reset () {
      this.name = undefined;
      this.title = undefined;
      this.description = undefined;
      this.label = undefined;
      this.hint = undefined;
      this.placeholder = undefined;

      this.titleLanguageId = undefined;
      this.descriptionLanguageId = undefined;
      this.labelLanguageId = undefined;
      this.hintLanguageId = undefined;
      this.placeholderLanguageId = undefined;

      this.$refs.fieldForm.reset();
      this.$refs.fieldForm.resetValidation();
    },
    submit () {
      if (! this.$refs.fieldForm.validate()) {
        this.valid = false;
        return;
      }
      this.valid = true;
      this.$emit('submitted', {
        name: this.nameAsSlug,
        title: this.title,
        description: this.description,
        label: this.label,
        hint: this.hint,
        placeholder: this.placeholder,

        titleLanguageId: this.titleLanguageId,
        descriptionLanguageId: this.descriptionLanguageId,
        labelLanguageId: this.labelLanguageId,
        hintLanguageId: this.hintLanguageId,
        placeholderLanguageId: this.placeholderLanguageId,
      });
    },
    cancel () {
      this.$emit('close');
      this.$emit('reset');
    },
  },

  computed: {
    nameAsSlug () {
      if (this.name) {
        return slugify(this.name);
      }
    },
    placeholderLabel () {
      return this.$i18n.t('field-placeholder');
    },
    placeholderHint () {
      return this.$i18n.t('this-is-the-placeholder-of-the-field');
    },
    hintLabel () {
      return this.$i18n.t('field-hint');
    },
    hintHint () {
      return this.$i18n.t('this-is-the-hint-of-the-field');
    },

    labelLabel () {
      return this.$i18n.t('field-label');
    },
    labelHint () {
      return this.$i18n.t('this-is-the-label-of-the-field');
    },

    descriptionLabel () {
      return this.$i18n.t('field-description');
    },

    descriptionHint () {
      return this.$i18n.t('this-is-the-description-of-the-field');
    },

    nameLabel () {
      return this.$i18n.t('field-name');
    },

    nameHint () {
      return this.$i18n.t('this-is-the-name-of-the-field');
    },

    titleLabel () {
      return this.$i18n.t('field-title');
    },

    titleHint () {
      return this.$i18n.t('this-is-the-title-of-the-field');
    },
  }
}
</script>
