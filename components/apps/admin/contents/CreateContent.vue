<template>
  <v-card color="">
      <v-toolbar v-if="true">
        <!-- close/cancel button -->
        <template v-if="currentStep === 1">
          <v-btn icon @click="cancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>

        <template v-if="currentStep > 1">
          <v-btn icon @click="previous">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>

        <v-toolbar-title>{{ $t('create-content') }}</v-toolbar-title>
      </v-toolbar>

      <!-- the form -->
      <template v-if="! executionArn">
        <!-- progress -->
        <v-container fluid class="">
          <v-row>
            <v-col class="px-4">
              <v-subheader class="pl-0">progress</v-subheader>
              <template>
                <v-progress-linear height="4" v-model="progressBar" color="accent"/>
              </template>
            </v-col>
          </v-row>
        </v-container>


        <!-- step 1 - the content type -->
        <template v-if="currentStep === 1">

          <v-container fluid  v-if="error">
            <v-row no-gutters >
              <v-col>
                <v-alert type="error" :tile="isMobile" class="mb-0">
<!--                  {{ $t('create-content-content-type') }}-->
                  {{ error }}
                </v-alert>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid class="">
            <v-row class="">
              <v-col class="pa-4">
                <v-select :items="contentTypes"
                          :value="contentType"
                          label="content-type"
                          hint="content-type"
                          persistent-hint
                          @change="changeContentType"
                />
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions class="px-4">
            <v-btn large @click="reset"
                   class="flex-grow-1">
              {{ $t('reset') }}
            </v-btn>
            <v-spacer />
            <v-btn @click="submitTypeForm"
                   class="flex-grow-1"
                   large>{{ $t('continue') }}</v-btn>
          </v-card-actions>
        </template>

        <!-- step 2 - the content title -->
        <template v-if="currentStep === 2">
          <v-alert tile>
            {{ $t('create-content-title') }}
          </v-alert>
          <v-container fluid class="px-4 pt-0">
            <v-row>
              <v-col>
                <v-text-field v-model="title"
                              label="titleLabel"
                              hint="titleHint"
                              persistent-hint />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn @click="submitTitleForm"
                   block
                   large>{{ $t('submit') }}</v-btn>
          </v-card-actions>
        </template>

        <!-- step 3 - description (text & languageId) -->
        <template v-if="currentStep === 3">
          <v-alert tile>
            {{ $t('content-description') }}
          </v-alert>
          <v-container class="px-4 pt-0">
            <v-row>
              <v-col>
                <v-textarea v-model="description.text"
                            label="textLabel"
                            hint="textHint"
                            persistent-hint />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <apps-admin-languages-select
                  @change="changeDescriptionLanguageId" :value="description.languageId" />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn @click="submitDescriptionForm"
                   block
                   large>{{ $t('submit') }}</v-btn>
          </v-card-actions>
        </template>

        <!-- step 4 - body (text & languageId) -->
        <template v-if="currentStep === 4">
          <v-alert tile>
            {{ $t('content-body') }}
          </v-alert>
          <v-container class="px-4 pt-0">
            <v-row>
              <v-col>
                <v-textarea v-model="body.text"
                              label="textLabel"
                              hint="textHint"
                              persistent-hint />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <apps-admin-languages-select @change="changeBodyLanguageId"
                                             :value="body.languageId"/>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn @click="submitBodyForm"
                   block
                   large>{{ $t('submit') }}</v-btn>
          </v-card-actions>
        </template>

        <!-- step 5 - author -->
        <template v-if="currentStep === 5">
          <v-alert tile>
            {{ $t('content-author') }}
          </v-alert>
          <v-container class="px-4 pt-0">
            <v-row>
              <v-col>
                <apps-admin-users-select @change="changeAuthorId" />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn @click="submitAuthorIdForm"
                   block
                   large>{{ $t('submit') }}</v-btn>
          </v-card-actions>
        </template>


        <!-- step 6 - tags -->
        <template v-if="currentStep === 6">
          <v-alert tile>
            {{ $t('content-tags') }}
          </v-alert>
          <v-container class="px-4 pt-0">
            <v-row>
              <v-col>
                <apps-admin-tags-select @change="changeTags" />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn @click="submit"
                   block
                   large>{{ $t('submit') }}</v-btn>
          </v-card-actions>
        </template>

      </template>
      <!-- /the form -->

      <template v-if="creatingContent">

        <template v-if="error">
          <v-alert type="error" tile>
            {{ error }}
          </v-alert>
        </template>

        <template v-if="creating">
          <v-container>
            <v-row>
              <v-col>
                <v-progress-linear indeterminate/>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <template v-if="contentId">
          <v-container>
            <v-row>
              <v-col>
                <apps-admin-content-nav-list-item :content-id="contentId" />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-btn @click="reset"
                   block
                   large>{{ $t('create-another') }}</v-btn>
          </v-card-actions>
        </template>

      </template>

    </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { slugify } from '~/utils/helpers'

export default {
  name: "CreateContent",



  data: () => ({
    dialog: false,
    submitting: false,

    currentStep: 1,

    //
    title: undefined,

    //
    contentType: undefined,

    //
    tagIds: [],

    // description
    description: {
      text: undefined,
      languageId: undefined,
    },

    // body
    body: {
      text: undefined,
      languageId: undefined,
    },

    executionArn: undefined,
    startDate: undefined,


    /**
     * The list of available ContentTypes.
     */
    contentTypes: [
      {
        text: 'post',
        value: 'post'
      },
    ],

    numberOfSteps: 5,
  }),

  methods: {
    ...mapActions({
      createContent: 'apps/admin/contents/createContent',
    }),

    changeContentType (contentType) {
      console.log(`## CHANGING CONTENT TYPE TO ${contentType}`);
      this.contentType = contentType;
    },

    // description language id
    changeDescriptionLanguageId (languageId) {
      console.log(`## CHANGING DESCRIPTION LANGUAGE ID TO ${languageId}`);
      this.description.languageId = languageId;
    },

    changeBodyLanguageId (languageId) {
      console.log(`## CHANGING BODY LANGUAGE ID TO ${languageId}`);
      this.body.languageId = languageId;
    },

    changeAuthorId (profileId) {
      console.log(`## CHANGING AUTHOR ID TO ${profileId}`);
      this.authorId = profileId;
    },

    changeTags (tagIds = []) {
      console.log(`## CHANGING TAGS TO ${tagIds}`);
      console.log(tagIds);
      this.tagIds = tagIds;
    },

    reset () {
      this.dialog = false;
      this.submitting = false;


      this.contentType = undefined;
      this.title = undefined;
      this.contentType = undefined;
      this.tagIds = [];
    },

    cancel () {
      this.reset();
      this.$emit('cancel');
    },

    previous () {
      this.currentStep = (this.currentStep !== 1) ? this.currentStep - 1 : 1;
    },

    async submitTypeForm () {
      if (! this.contentType) {
        return;
      }
      this.currentStep = 2;
    },

    async submitTitleForm () {
      if (! this.title) {
        return;
      }
      this.currentStep = 3;
    },

    async submitDescriptionForm () {
      const {languageId, text} = this.description;

      if (! languageId && ! text) {
        this.currentStep = 4;
      }

      if (! languageId || ! text) {
        return;
      }

      this.currentStep = 4;
    },

    async submitBodyForm () {
      const {languageId, text} = this.body;
      if (! languageId || ! text) {
        return;
      }

      this.currentStep = 5;
    },

    async submitAuthorIdForm () {
      this.currentStep = 6;
    },

    async submitTagsForm () {
      this.currentStep = 7;
    },

    async submit () {
      const contentType = this.contentType;
      const name = this.name;
      const title = this.title;
      const tagIds = [...this.tagIds];
      const authorId = this.authorId;
      const description = {...this.description};

      //
      let contentToCreate = {
        name,
        title,
        tagIds,
        authorId,
        contentType,
        description
      };

      if (contentType === 'post') {
        const body = {...this.body};

        contentToCreate = {
          ...contentToCreate,
          ...{
            body
          }
        };
      }

      console.log(`contentToCreate`);
      console.log(contentToCreate);


      // other contentTypes to be handled here...

      this.submitting = true;
      const creatingContent = await this.createContent(contentToCreate);
      this.submitting = false;

      const {executionArn, startDate} = creatingContent;

      this.executionArn = executionArn;
      this.startDate = startDate;
    }
  },

  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.name === 'xs';
    },

    ...mapGetters({
      creatingContentWithExecutionArn: 'apps/admin/contents/creatingContentWithExecutionArn',
    }),




    creatingContent () {
      return (this.executionArn) ? this.creatingContentWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return (this.creatingContent) ? this.creatingContent.creating : false;
    },

    created () {
      return (this.creatingContent) ? this.creatingContent.created : false;
    },

    error () {
      return (this.creatingContent) ? this.creatingContent.error : undefined;
    },

    contentId () {
      return (this.creatingContent) ? this.creatingContent.contentId : undefined;
    },

    name () {
      return (this.title) ? slugify(this.title) : undefined;
    },

    progressBar() {
      return (this.currentStep - 1) / (this.numberOfSteps + 1) * 100
    },
  },
}
</script>
