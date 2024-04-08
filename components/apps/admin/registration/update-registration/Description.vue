<!--
Admin - Registration Update Description

A smart component that enables an Admin to update the Registration Description.
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- description -->
    <v-card-title class="primary">
      <v-icon left>mdi-form-select</v-icon>
      {{ $t('admin-registration-update-description')}}
      <v-spacer />
    </v-card-title>

    <v-card-subtitle class="primary">{{$t('admin-registration-update-description')}}</v-card-subtitle>

    <!-- form -->
    <v-card-text>
      <v-form  v-if="!updating && !updated" ref="form">
        <v-container fluid>
          <v-row>
            <v-col class="px-4">
              <v-text-field v-model="textLocal"
                            :label="descriptionLabel"
                            :hint="descriptionHint"
                            persistent-hint/>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="px-4">
              <apps-admin-languages-select :value="languageIdLocal"
                                           @change="changeLanguageId" />
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <!-- UPDATING REGISTRATION -->
      <v-container v-if="updating" fluid>
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            {{ $t('admin-updating-registration') }}
          </v-col>
          <v-col cols="6">
            <v-progress-linear indeterminate rounded height="6" />
          </v-col>
        </v-row>
      </v-container>

      <!--UPDATED REGISTRATION-->
      <v-container v-if="updated" fluid>
        <apps-admin-registration-status
          :name="'registration'"
          :action="'updated'"
          :status="updatingLabel.status"
        />
      </v-container>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn plain large rounded @click="close">{{ $t('close') }}</v-btn>
      <v-btn v-if="!updated && !updating" large
             color="primary"
             @click="submit"
             :loading="submitting"
             :disabled="submitting">
        {{ $t('update') }}
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Description",
  props: {
    registrationId: {
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
    registrationId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    },
    descriptionId: {
      immediate: true,
      handler () {
        if (this.descriptionId) {
          if (! this.labelLoading && ! this.labelLoaded) {
            this.loadLabelWithLabelId(this.descriptionId);
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
      loadRegistrationWithRegistrationId: 'apps/admin/registrations/loadRegistrationWithRegistrationId',
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
      updateLabel: 'apps/admin/labels/updateLabel',
    }),

    async load() {
      return await (this.registrationId) ? this.loadRegistrationWithRegistrationId(this.eventId) : undefined;
    },

    async reload() {
      return await this.load();
    },

    async changeLanguageId(languageId = undefined) {
      this.languageIdLocal = languageId;
    },

    close(){
      this.$emit('close')
    },

    async submit () {
      if (! this.descriptionId) {
        return;
      }
      try {
        const update = {
          labelId: this.descriptionId,
          text: this.textLocal,
          languageId: this.languageIdLocal,
        };
        this.submitting = true;

        const {executionArn} = await this.updateLabel(update);

        this.executionArn = executionArn;
        this.submitting = false;

      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      registrationWithRegistrationId: 'apps/admin/registrations/registrationWithRegistrationId',
      labelWithLabelId: 'apps/admin/labels/labelWithLabelId',
      updatingLabelWithExecutionArn: 'apps/admin/labels/updatingLabelWithExecutionArn',
    }),

    registration () {
      return (this.registrationId) ? this.registrationWithRegistrationId(this.registrationId) : undefined;
    },

    loaded () {
      return (this.registration) ? this.registration.loaded : false;
    },

    loading () {
      return (this.registration) ? this.registration.loading : false;
    },

    descriptionId () {
      return (this.registration) ? this.registration.descriptionId : undefined;
    },

    // the Label
    updatingLabel () {
      return (this.executionArn) ? this.updatingLabelWithExecutionArn(this.executionArn) : undefined;
    },

    updating () {
      return this.updatingLabel?.updating;
    },

    updated () {
      return this.updatingLabel?.updated;
    },

    label () {
      return (this.descriptionId) ? this.labelWithLabelId(this.descriptionId) : undefined;
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

    descriptionLabel () {
      return this.$i18n.t('admin-registration-description-label');
    },

    descriptionHint () {
      return this.$i18n.t('admin-registration-description-hint');
    },
  },

  data: () => ({
    submitting: false,
    showHelp: false,
    textLocal: undefined,
    languageIdLocal: undefined,
    executionArn: undefined,
  }),
}
</script>
