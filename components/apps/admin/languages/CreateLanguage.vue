<!--
[PRO-242] Venue App (Admin) - Languages - CreateLanguage

@link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-242

A smart component that renders a form that enables an Admin to create a new Language in their Partition.
-->
<template>
  <v-card :loading="loading"
          rounded>

    <!-- progress -->
    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-translate</v-icon>
      {{ $t('admin-languages-create-language-title') }}
      <v-spacer />

      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>{{ $t('admin-languages-create-language-subtitle') }}</v-card-subtitle>

    <!-- the form -->
    <template v-if="! executionArn">
      <v-container fluid>
        <v-row>
          <v-col class="pa-4">
            <apps-admin-region-languages-select :value="value"
                                                @change="change" />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pa-4">
            <v-btn @click="submit"
                   block
                   large
                   color="primary"
                   :loading="submitting"
                   :disabled="submitting">{{ $t('submit') }}
            </v-btn>
          </v-col>
        </v-row>

      </v-container>
    </template>
    <!-- /the form -->

    <template v-if="executionArn">
      <!-- the error -->
      <v-card-text v-show="error">
        <v-alert type="error">
          {{ error }}
        </v-alert>
      </v-card-text>

      <!-- the loader -->
      <v-card-text v-show="creating">
        <v-progress-linear class="mt-2" indeterminate />
      </v-card-text>

      <v-card-text v-if="languageId">
        <v-list two-line>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ languageId }}</v-list-item-title>
              <v-list-item-title>{{ $t('language') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="cancel">{{ $t('close') }}</v-btn>
        <v-spacer/>
        <v-btn @click="reset">{{ $t('create-another-language') }}</v-btn>
      </v-card-actions>
    </template>

  </v-card>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateLanguage",

  methods: {
    ...mapActions({
      createLanguage: 'apps/admin/languages/createLanguage',
    }),

    /**
     * Close/Cancel
     */
    close () {
      this.reset();
      this.$emit('close');
    },

    cancel () {
      this.reset();
      this.$emit('close');
    },

    /**
     *
     * @param language {{name: string} | undefined}
     */
    change (language = undefined) {
      console.log(`## CREATE LANGUAGE - CHANGE LANGUAGE TO `);
      console.log(language);

      this.valueLocal = language;
      if (language) {
        const {languageId} = language;
        this.value = languageId;
      }
    },

    reset () {
      this.valueLocal = undefined;
      this.value = undefined;

      this.executionArn = undefined;
      this.startDate = undefined;
      this.submitting = false;
    },

    async submit () {
      console.log(`## CREATE LANGUAGE`);
      try {

        // valueLocal should be a Region Language
        // we will need to parse the name from it
        const {name} = this.valueLocal;
        if (! name) {
          console.log(`## CREATE LANGUAGE - ERROR - NAME WAS NOT FOUND IN LANGUAGE`);
          console.log(this.valueLocal);
          return;
        }

        const languageToCreate = {name};

        this.submitting = true;
        const creatingLanguage = await this.createLanguage(languageToCreate);
        this.submitting = false;

        const {executionArn, startDate} = creatingLanguage;

        this.executionArn = executionArn;
        this.startDate = startDate;

        console.log(`## CREATE LANGUAGE`);
        console.log(creatingLanguage);

      } catch (error) {
        console.log(`## CREATE LANGUAGE ERROR`);
        console.log(error);
        this.submitting = false;
      }
    },
  },

  computed: {
    ...mapGetters({
      creatingLanguageWithExecutionArn: 'apps/admin/languages/creatingLanguageWithExecutionArn',
    }),

    creatingLanguage () {
      return (this.executionArn) ? this.creatingLanguageWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return (this.creatingLanguage) ? this.creatingLanguage.creating : false;
    },

    created () {
      return (this.creatingLanguage) ? this.creatingLanguage.created : false;
    },

    error () {
      return (this.creatingLanguage) ? this.creatingLanguage.error : false;
    },

    loaded () {
      return (this.creatingLanguage) ? this.creatingLanguage.loaded : false;
    },

    loading () {
      return (this.creatingLanguage) ? this.creatingLanguage.loading : false;
    },

    languageId () {
      return (this.creatingLanguage) ? this.creatingLanguage.languageId : undefined;
    },
  },

  data: () => ({
    debug: false,
    valueLocal: undefined,
    value: undefined,

    submitting: false,
    executionArn: undefined,
    startDate: undefined,
  }),
}
</script>
