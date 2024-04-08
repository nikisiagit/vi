<template>
  <v-card>
    <v-card-title>
      {{ $t(`What's the name of this ticket?`) }}
    </v-card-title>

    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field
                v-model="name"
                :label="nameLabel  + ' *'"
                :hint="nameHint"
                persistent-hint
                clearable
                required
                :rules="nameRules"
              />
            </v-col>

            <v-col cols="12" lg="12">
              <v-textarea
                auto-grow
                rows="1"
                row-height="15"
                v-model.trim="title"
                :label="titleLabel"
                :hint="titleHint"
                persistent-hint
                clearable
              />
            </v-col>

            <v-col cols="12" lg="12">
              <v-textarea
                auto-grow
                rows="1"
                row-height="15"
                v-model.trim="description"
                :label="descriptionLabel"
                :hint="descriptionHint"
                persistent-hint
                clearable
              />
            </v-col>

            <v-col>
              <apps-admin-languages-select
                rows="1"
                row-height="15"
                v-model.trim="language"
                :label="languageLabel"
                :hint="languageHint"
                persistent-hint
                clearable
              />
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
  name: "TicketName",
  props: {},
  computed: {
    nameAsSlug () {
      if (this.name) {
        return slugify(this.name);
      }
    },

    descriptionLabel () {
      return this.$i18n.t('ticket-description');
    },

    descriptionHint () {
      return this.$i18n.t('this-is-the-description-of-the-ticket');
    },

    nameLabel () {
      return this.$i18n.t('ticket-name');
    },

    nameHint () {
      return this.$i18n.t('this-is-the-name-of-the-ticket');
    },

    titleLabel () {
      return this.$i18n.t('ticket-title');
    },

    titleHint () {
      return this.$i18n.t('this-is-the-title-of-the-ticket');
    },

    languageLabel () {
      return this.$i18n.t('ticket-language');
    },

    languageHint () {
      return this.$i18n.t('this-is-the-language-of-the-ticket');
    },
  },
  data: () => ({
    valid: true,

    name: undefined,
    title: undefined,
    description: undefined,
    language: undefined,

    nameRules: [],
    descriptionRules: [],
  }),
  methods: {
    reset () {
      this.valid = true
      this.name = undefined
      this.title = undefined
      this.description = undefined
      this.language = undefined

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
      this.addNameRules();
      this.addDescriptionRules();

      // after rules has been added, it requires to update the template to pick up validation.
      this.$nextTick(() => {
        if (! this.$refs.form.validate()) {
          this.valid = false;
          return;
        }

        this.valid = true;
        this.$emit('submitted', {
          name: this.nameAsSlug,
          title: this.name,
          description: this.description,
          language: this.language
        });
      })
    },
    cancel () {
      this.$emit('close');
      this.$emit('reset');
    },
  }
}
</script>
