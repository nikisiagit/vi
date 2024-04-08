<template>
  <v-card>
    <v-card-title>
      {{ $t('Whats the event called?') }}
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
          </v-row>

          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field
                v-model="title"
                :label="titleLabel  + ' *'"
                :hint="titleHint"
                persistent-hint
                clearable
                required
                :rules="nameRules"
              />
            </v-col>
          </v-row>


          <v-row>

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

          </v-row>

          <v-row>
            <v-col cols="12" lg="12">
              <apps-admin-languages-select :value="languageId" @change="changeLanguage" />
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
  name: "EventName",
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
      return this.$i18n.t('event-description');
    },

    descriptionHint () {
      return this.$i18n.t('this-is-the-description-of-the-event');
    },

    nameLabel () {
      return this.$i18n.t('event-name');
    },

    nameHint () {
      return this.$i18n.t('this-is-the-name-of-the-event');
    },

    titleLabel () {
      return this.$i18n.t('event-title');
    },

    titleHint () {
      return this.$i18n.t('this-is-the-title-of-the-event');
    },
  },
  data: () => ({
    valid: true,

    name: undefined,
    title: undefined,
    description: undefined,
    languageId: undefined,

    nameRules: [],
    descriptionRules: [],
  }),
  watch: {
    languageIdValue: {
      immediate: true,
      handler(){
        this.languageId = this.languageIdValue
      }
    }
  },
  methods: {
    reset () {
      this.valid = true
      this.name = undefined
      this.title = undefined
      this.description = undefined
      this.languageId = undefined

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
          title: this.title,
          description: this.description,
          languageId: this.languageId,
        });
      })
    },
    cancel () {
      this.$emit('cancel');
      this.$emit('reset');
    },

    changeLanguage (languageId) {
      this.languageId = languageId;
    },
  }
}
</script>
