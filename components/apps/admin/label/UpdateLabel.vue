<!--
Venue App (Admin) UpdateLabel

This smart component is used to update the Label specified by the supplied LabelId prop.
-->
<template>

  <v-card :loading="labelLoading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-label</v-icon>

      <v-toolbar-title>{{ $t(labelId) }}</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="reloadLabel">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-alert type="info" v-show="updating" class="mb-0">updating</v-alert>
          <v-alert type="success" v-show="updated" class="mb-0">updated</v-alert>
          <v-alert type="error" v-show="error" class="mb-0">{{ error }}</v-alert>
        </v-col>
      </v-row>
    </v-container>

    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="textLocal"
                          :label="titleLabel"
                          :hint="titleHint"
                          persistent-hint
                          required
                          :disabled="updating"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="px-4">
            <apps-admin-languages-select :value="languageIdLocal"
                                         :disabled="updating"
                                         required
                                         :rules="[v => !!v || 'Item is required']"
                                         @change="changeLanguageId"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex">
            <v-btn @click="cancel">
              {{ $t('cancel')}}
            </v-btn>
            <v-spacer />
            <v-btn @click="submit"
                   :loading="updating"
                   :disabled="updating || ! hasChanges  || ! valid">
              {{ $t('submit')}}
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
  name: "UpdateLabel",

  props: {
    labelId: {
      type: String,
      required: true
    }
  },

  async created () {
    if (! this.labelLoaded && ! this.labelLoading) {
      await this.loadLabel();
    }
  },

  watch: {
    labelId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.loadLabel();
        }
      }
    },

    hasChanges: {
      handler () {
        if (this.hasChanges) {
          this.executionArn = undefined;
          this.startDate = undefined;
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
    },
  },

  data: () => ({
    debug: false,
    valid: true,
    textLocal: undefined,
    languageIdLocal: undefined,

    submitting: false,
    executionArn: undefined,
    startDate: undefined,
  }),

  methods: {
    ...mapActions({
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
      updateLabel: 'apps/admin/labels/updateLabel',
    }),

    async loadLabel () {
      return await (this.labelId) ? this.loadLabelWithLabelId(this.labelId) : undefined;
    },

    async reloadLabel () {
      return await this.loadLabel();
    },

    changeLanguageId (languageId) {
      this.languageIdLocal = languageId;
    },



    reset () {
      this.$refs.form.resetValidation();

      this.valid = true;

      this.textLocal = this.text;
      this.languageIdLocal = this.languageId;

      this.submitting = false;

      this.executionArn = undefined;
      this.startDate = undefined;

    },

    cancel () {
      this.reset();
      this.$emit('close');
    },

    async submit () {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      const update = {
        labelId: this.labelId,
        text: this.textLocal,
        languageId: this.languageIdLocal,
      }

      this.submitting = true;
      const updatingLabel = await this.updateLabel(update);
      this.submitting = false;

      const {executionArn, startDate} = updatingLabel;

      this.executionArn = executionArn;
      this.startDate = startDate;
    }
  },

  computed: {
    ...mapGetters({
      labelWithLabelId: 'apps/admin/labels/labelWithLabelId',

      updatingLabelWithExecutionArn: 'apps/admin/labels/updatingLabelWithExecutionArn',
    }),

    label () {
      return (this.labelId) ? this.labelWithLabelId(this.labelId) : undefined;
    },

    labelLoaded () {
      return (this.label) ? this.label.loaded : false;
    },

    labelLoading () {
      return (this.label) ? this.label.loading : false;
    },

    languageId () {
      return (this.label) ? this.label.languageId : undefined;
    },

    text () {
      return (this.label) ? this.label.text : undefined;
    },



    hasChanges () {
      return (this.languageIdLocal !== this.languageId || this.textLocal !== this.text);
    },

    updatingLabel () {
      return (this.executionArn) ? this.updatingLabelWithExecutionArn(this.executionArn) : undefined;
    },

    updating () {
      return (this.updatingLabel) ? this.updatingLabel.updating : false;
    },

    updated () {
      return (this.updatingLabel) ? this.updatingLabel.updated : false;
    },

    error () {
      return (this.updatingLabel) ? this.updatingLabel.error : undefined;
    },

    titleLabel () {
      return this.$i18n.t('title-label');
    },

    titleHint () {
      return this.$i18n.t('title-hint');
    },
  }
}
</script>
