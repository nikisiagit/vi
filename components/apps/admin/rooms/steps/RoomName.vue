<template>
  <v-card>

    <v-card-text class="pa-0">
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field
                v-model="name"
                :label="nameLabel"
                :hint="nameHint"
                persistent-hint
                clearable
                required
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" lg="12">
              <base-label-form
                :text="title"
                :text-label="titleLabel"
                :text-hint="titleHint"
                @change="changeTitleForm"
              ></base-label-form>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" lg="12">
              <base-label-form
                :text="description"
                :text-label="descriptionLabel"
                :text-hint="descriptionHint"
                @change="changeDescriptionForm"
                is-textarea
              ></base-label-form>
            </v-col>
          </v-row>

        </v-container>
      </v-form>
    </v-card-text>

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
  </v-card>
</template>

<script>
import { slugify } from '~/utils/helpers'

export default {
  name: "RoomName",
  props: {
    languageIdValue: {
      type: String,
      required: false
    },
  },
  computed: {
    nameAsSlug () {
      if (this.name) {
        return slugify(this.name);
      }
    },

    descriptionLabel () {
      return this.$i18n.t('room-description');
    },

    descriptionHint () {
      return this.$i18n.t('this-is-the-description-of-the-room');
    },

    nameLabel () {
      return this.$i18n.t('room-name');
    },

    nameHint () {
      return this.$i18n.t('this-is-the-name-of-the-room');
    },

    titleLabel () {
      return this.$i18n.t('room-title');
    },

    titleHint () {
      return this.$i18n.t('this-is-the-title-of-the-room');
    },
  },
  data: () => ({
    valid: true,

    name: undefined,
    title: undefined,
    description: undefined,

    titleLanguageId: undefined,
    descriptionLanguageId: undefined,

    nameRules: [],
    descriptionRules: [],
  }),
  created() {
    this.titleLanguageId = this.languageIdValue
    this.descriptionLanguageId = this.languageIdValue
  },
  methods: {
    reset () {
      this.valid = true
      this.name = undefined
      this.title = undefined
      this.description = undefined
      this.titleLanguageId = undefined
      this.descriptionLanguageId = undefined

      this.$refs.form.reset();
    },

    addNameRules(){
      this.nameRules = [
        v => !!v || 'A name is required'
      ]
    },

    addDescriptionRules(){
      this.descriptionRules = [
        v => !!v || 'A description is required'
      ]
    },

    submit () {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      this.valid = true;
      this.$emit('submitted', {
        name: this.nameAsSlug,
        title: this.title,
        description: this.description,

        titleLanguageId: this.titleLanguageId,
        descriptionLanguageId: this.descriptionLanguageId,
      });
    },
    cancel () {
      this.$emit('close');
      this.$emit('reset');
    },

    changeTitleForm({ text, languageId }){
      this.title = text
      this.titleLanguageId = languageId

    },
    changeDescriptionForm({ text, languageId }){
      this.description = text
      this.descriptionLanguageId = languageId

    },
  }
}
</script>
