<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-resources-create-resource />
      </v-col>
    </v-row>

    <v-row v-if="false">
      <v-col>
        <template>
          <v-card>
            <v-card-title >{{$t('Create_a_Content') }}</v-card-title>
            <v-card-subtitle class="pb-0">{{ $t('Create_a_Content_subtitle') }}</v-card-subtitle>

            <v-card-text class="pa-0">
              <v-container v-show="!isWizardVisible">

                <v-row>
                  <v-col cols="12">
                    <h2>
                      {{ $t('Create a Content in under 5 minutes') }}
                    </h2>
                  </v-col>

                  <v-col
                    class="pa-0"
                    cols="3" md="3" lg="3"
                    :key="preset.presetId"
                    v-for="preset in contentPresets"
                  >
                    <v-hover v-slot:default="{ hover }">
                      <v-card flat class="mx-auto" color="">
                        <v-avatar color="success" size="25" class="elevation-1" style="position: absolute; bottom: 50%; left: 46.5%;"
                                  v-show="preset.presetId === contentPresetSelected.presetId">
                          <v-icon small>mdi-check</v-icon>
                        </v-avatar>

                        <v-avatar class=" align-end" style="border-radius: 0;" height="80px" width="100%">
                          <v-icon large>{{ preset.icon }}</v-icon>
                          <v-fade-transition>
                            <v-overlay
                              v-if="hover"
                              absolute
                              color="grey lighten-1 "
                            >
                              <v-btn
                                color="primary"
                                @click="selectPreset(preset)"
                              >
                                {{ preset.presetId === contentPresetSelected.presetId ? 'Selected': 'Select' }}
                              </v-btn>
                            </v-overlay>
                          </v-fade-transition>

                        </v-avatar>

                        <v-divider></v-divider>

                        <v-card-text class="text-center">
                          <h3>{{ preset.name }}</h3>
                          <div>
                            {{ preset.description }}
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-hover>
                  </v-col>
                </v-row>
              </v-container>

              <v-container v-show="isWizardVisible">

                <v-stepper v-model="currentStep" alt-labels>
                  <v-stepper-header>
                    <v-container>
                      <v-row class="text-right">
                        <v-col class="pb-0">
                          <v-chip
                            v-if="presetChipCloseable"
                            class="ma-2"
                            close
                            color="primary"
                            text-color="white"
                            @click:close="presetChipCloseable = false"
                          >
                            Content type: {{ contentPresetSelected.name }}
                          </v-chip>
                        </v-col>
                      </v-row>
                    </v-container>

                    <v-stepper-step :complete="currentStep > 1" step="1" :rules="[() => resourceFormValid]">
                      <template>
                        <span class="text-center d-block">{{ $t('Choose resource') }}</span>
                      </template>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="currentStep > 2" step="2" :rules="[() => detailsFormValid]">
                      <template>
                        <span class="text-center d-block">{{ $t('Add_Content_Details') }}</span>
                      </template>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="currentStep > 3" step="3" :rules="[() => settingsFormValid]">
                      <template>
                        <span class="text-center d-block">{{ $t('Add_Content_Settings') }}</span>
                      </template>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="currentStep > 4" step="4" :rules="[() => featuresFormValid]">
                      <template>
                        <span class="text-center d-block">{{ $t('Add_Content_Features') }}</span>
                      </template>
                    </v-stepper-step>

                  </v-stepper-header>

                  <v-stepper-items>

                    <v-stepper-content step="1">
                      <v-card>
                        <v-card-text>
                          <v-data-table
                            v-model="selectedResource"
                            :headers="resourceTableHeaders"
                            :items="resources"
                            :single-select="true"
                            item-key="resourceId"
                            show-select
                          >
                            <!--                    <template v-slot:item.already_added="{ item }">-->
                            <!--                      <v-simple-checkbox-->
                            <!--                        v-model="item.already_added"-->
                            <!--                        disabled-->
                            <!--                      ></v-simple-checkbox>-->
                            <!--                    </template>-->
                            <template v-slot:item.alreadyAdded="{ item }">
                              <v-simple-checkbox
                                v-model="item.alreadyAdded"
                                disabled
                              ></v-simple-checkbox>
                            </template>
                          </v-data-table>

                          <v-form v-model="resourceFormValid" ref="resourceForm" lazy-validation>
                            <v-container fluid>
                              <v-row>
                                <v-col>
                                  <!--                          <v-text-field v-model="name"-->
                                  <!--                                        :label="nameLabel"-->
                                  <!--                                        :hint="nameHint"-->
                                  <!--                                        prepend-icon="mdi-link-variant"-->
                                  <!--                                        persistent-hint-->
                                  <!--                                        required-->
                                  <!--                                        :rules="nameRules"-->
                                  <!--                                        clearable-->
                                  <!--                          />-->
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-form>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn @click="cancel">
                            {{ $t('Cancel') }}
                          </v-btn>
                          <v-btn @click="reset">
                            {{ $t('Reset') }}
                          </v-btn>
                          <v-spacer />
                          <v-btn @click="submitResourceForm" color="primary">
                            {{ $t('Next: Add content details') }}
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-card>
                        <v-card-text>
                          <v-form v-model="detailsFormValid" ref="detailsForm" lazy-validation>
                            <v-container fluid>
                              <v-row>
                                <v-col>
                                  <v-text-field v-model="title"
                                                :label="titleLabel"
                                                :hint="titleHint"
                                                prepend-icon="mdi-format-title"
                                                persistent-hint
                                                required
                                                clearable
                                                :rules="titleRules"
                                  />
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col>
                                  <v-textarea v-model="description"
                                              :label="descriptionLabel"
                                              :hint="descriptionHint"
                                              prepend-icon="mdi-format-title"
                                              persistent-hint
                                              required
                                              clearable
                                              :rules="descriptionRules"
                                  />
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col>
                                  <v-text-field v-model="author"
                                                :label="authorLabel"
                                                :hint="authorHint"
                                                prepend-icon="mdi-format-title"
                                                persistent-hint
                                                required
                                                clearable
                                                :rules="authorRules"
                                  />
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col>
                                  <v-file-input v-model="thumbnail"
                                                :label="thumbnailLabel"
                                                :hint="thumbnailHint"
                                                prepend-icon="mdi-camera"
                                                persistent-hint
                                                required
                                                clearable
                                                :rules="thumbnailRules"
                                  />
                                  <!--                          <v-dialog v-model="uploadThumbnailDialog" max-width="1000px">-->
                                  <!--                            <template v-slot:activator="{ on, attrs }">-->
                                  <!--                              <v-btn class="ml-2" v-bind="attrs" v-on="on">-->
                                  <!--                                <v-icon left>-->
                                  <!--                                  mdi-plus-->
                                  <!--                                </v-icon>-->
                                  <!--                                {{ $t('Add Thumbnail') }}-->
                                  <!--                              </v-btn>-->
                                  <!--                            </template>-->

                                  <!--                            <base-file-uploader v-if="uploadThumbnailDialog"-->
                                  <!--                                                :documentAttachment.sync="thumbnailFiles"-->
                                  <!--                                                :maxFileSize="10240"-->
                                  <!--                                                :maxFileCount="1"-->
                                  <!--                                                :changeFileName="true"-->
                                  <!--                                                :isSubmitting="submitting"-->
                                  <!--                                                :multiple="false"-->
                                  <!--                                                @close="uploadThumbnailDialog = false"-->
                                  <!--                                                @reset-registry="resetRegistry"-->
                                  <!--                            />-->
                                  <!--                          </v-dialog>-->
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col>
                                  <v-combobox v-model="tags"
                                              :label="tagsLabel"
                                              :hint="tagsHint"
                                              :items="venueTags"
                                              prepend-icon="mdi-format-title"
                                              multiple
                                              chips
                                              persistent-hint
                                              clearable
                                              :rules="tagsRules"
                                  />
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-form>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn @click="currentStep = 1">{{ $t('Back') }}</v-btn>
                          <v-spacer />
                          <v-btn @click="submitDetailsForm">{{ $t('Next: Add content settings') }}</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-card>
                        <v-card-text>
                          <v-form v-model="settingsFormValid" ref="settingsForm" lazy-validation>
                            <v-container fluid>
                              <v-row>
                                <v-col>
                                  <v-menu
                                    v-model="publishedDateMenu"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on }">
                                      <v-text-field
                                        label="Start Date"
                                        prepend-icon="mdi-calendar-start"
                                        :label="publishedDateLabel"
                                        :hint="publishedDateHint"
                                        readonly
                                        :value="publishedDate"
                                        v-on="on"
                                        clearable
                                        :rules="publishedDateRules"
                                      ></v-text-field>
                                    </template>

                                    <v-date-picker
                                      v-model="publishedDate"
                                      no-title
                                      @input="publishedDateMenu = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                                <v-col>
                                  <v-menu
                                    v-model="expiryDateMenu"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on }">
                                      <v-text-field
                                        label="Start Date"
                                        prepend-icon="mdi-calendar-start"
                                        :label="expiryDateLabel"
                                        :hint="expiryDateHint"
                                        readonly
                                        :value="expiryDate"
                                        v-on="on"
                                        clearable
                                        :rules="expiryDateRules"
                                      ></v-text-field>
                                    </template>

                                    <v-date-picker
                                      v-model="expiryDate"
                                      no-title
                                      @input="expiryDateMenu = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-text-field v-model="consumptionTime"
                                              :label="consumptionTimeLabel"
                                              :hint="consumptionTimeHint"
                                              prepend-icon="mdi-format-title"
                                              persistent-hint
                                              required
                                              clearable
                                              :rules="consumptionTimeRules"
                                />
                              </v-row>
                            </v-container>
                          </v-form>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn @click="currentStep = 2">{{ $t('Back') }}</v-btn>
                          <v-spacer />
                          <v-btn @click="submitSettingsForm">{{ $t('Next: Add content features') }}</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                      <v-card>
                        <v-card-text>
                          <v-form v-model="featuresFormValid" ref="featuresForm" lazy-validation>
                            <v-container fluid>
                              <v-row>
                                <v-col>
                                  <v-checkbox
                                    v-model="allowComments"
                                    :label="allowCommentsLabel"
                                    :value="true"
                                  ></v-checkbox>
                                  <v-checkbox
                                    v-model="allowReactions"
                                    :label="allowReactionsLabel"
                                    :value="true"
                                  ></v-checkbox>
                                  <v-checkbox
                                    v-model="allowSharing"
                                    :label="allowSharingLabel"
                                    :value="true"
                                  ></v-checkbox>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-form>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn @click="currentStep = 3">{{ $t('Back') }}</v-btn>
                          <v-spacer />
                          <v-btn @click="submitFeaturesForm">{{ $t('Finish') }}</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-stepper-content>

                  </v-stepper-items>

                </v-stepper>
              </v-container>
            </v-card-text>

            <v-card-actions v-show="!isWizardVisible">
              <v-container>
                <v-row >
                  <v-col class="text-right">
                    <v-btn color="primary" @click="startWizard" :disabled="contentPresetSelected.presetId === ''">
                      {{ $t('Get Started') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>

        </template>
      </v-col>
    </v-row>

  </v-container>
</template>




<script>
import {mapActions, mapGetters} from "vuex"

export default {
  name: 'create',
  layout: 'admin',
};

// import {APP_NAMESPACE, RESOURCES_NAMESPACE} from "../constants";
// import {MENU_NAMESPACE} from "../constants";
// import {createNamespacedHelpers} from "vuex";
// const { mapActions, mapGetters } = createNamespacedHelpers(APP_NAMESPACE);
// const { mapActions: resourcesMapActions, mapGetters: resourcesMapGetters } = createNamespacedHelpers(
//  RESOURCES_NAMESPACE
//);


/*
export default {
  name: "CreateContent",
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  data: () => ({
    isWizardVisible: true,
    contentPresetSelected: {
      presetId: ''
    },
    currentStep: 1,
    presetChipCloseable: true,
    resourceFormValid: false,
    detailsFormValid: false,
    settingsFormValid: false,
    featuresFormValid: false,
    publishedDateMenu: false,
    expiryDateMenu: false,
    title: undefined,
    description: undefined,
    author: undefined,
    thumbnail: undefined,
    tags: [],
    publishedDate: undefined,
    expiryDate: undefined,
    consumptionTime: undefined,
    allowComments: false,
    allowReactions: false,
    allowSharing: false,
    selectedResource: [],
    uploadThumbnailDialog: false,
    thumbnailFiles: [],
    resourceTableHeaders: [
      {
        text: 'File name',
        value: 'name'
      },
      {
        text: 'File type',
        value: 'type'
      },
      {
        text: 'Already added to library',
        value: 'alreadyAdded'
      }
    ],
    venueTags: [
      'Programming',
      'Gaming',
      'Pooping'
    ]
  }),

  methods: {
    ...mapActions({
      addContent: 'addContent',
      uploadThumbnail: 'uploadThumbnail'
    }),

    ...mapActions({
      loadResources: 'load'
    }),

    async startWizard() {
      this.isWizardVisible = true;
      this.presetChipCloseable = true;

      const types = this.contentPresetSelected.resourceTypes;

      console.log("loadResources in Create page");
      await this.loadResources(types);
      console.log("this.resources", this.resources);
    },

    selectPreset(preset) {
      this.contentPresetSelected = preset
    },

    cancel() {
      this.reset();
      this.$emit('close');
    },

    reset() {
      this.$refs.resourceForm.reset();
      this.$refs.detailsForm.reset();

      this.currentStep = 1;
      this.isWizardVisible = false
    },

    submitResourceForm() {
      if (typeof this.selectedResource[0] === "undefined") {
        this.resourceFormValid = false;
        return;
      }

      this.resourceFormValid = true;

      this.currentStep += 1;
    },

    submitDetailsForm() {
      if (! this.$refs.detailsForm.validate()) {
        this.detailsFormValid = false;
        return;
      }

      this.detailsFormValid = true;

      this.currentStep += 1;
    },

    submitSettingsForm() {
      if (! this.$refs.settingsForm.validate()) {
        this.settingsFormValid = false;
        return;
      }

      this.settingsFormValid = true;

      this.currentStep += 1;
    },

    async submitFeaturesForm() {
      const content = {
        resourceId: this.selectedResource[0].resourceId,
        type: this.contentPresetSelected.presetId,
        title: this.title,
        description: this.description,
        author: this.author,
        tags: this.tags,
        publishedDate: this.publishedDate,
        expiryDate: this.expiryDate,
        consumptionTime: this.consumptionTime,
        allowComments: this.allowComments,
        allowReactions: this.allowReactions,
        allowSharing: this.allowSharing,
        thumbnail_name: this.thumbnail.name
      };

      console.log("content in Create page", content);

      await this.uploadThumbnail(this.thumbnail);

      await this.addContent(content);

      console.log("redirect to contents list please");
      await this.$router.push('/studios/content-hub');
    },

    // getFileInfo() {
    //   let file = {};
    //
    //   let strTemp = this.readerFile.split(",");
    //   file.base64 = strTemp[1];
    //   file.size = String(item.size);
    // },

    handleUpload(fileAttachment) {
      let reader = new FileReader();
      return new Promise(function(resolve) {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(fileAttachment);
      });
    },
  },

  computed: {
    ...mapGetters({
      contentPresets: 'contentPresets'
    }),

    ...mapGetters({
      resources: 'resources'
    }),

    titleLabel () {
      return this.$i18n.t('Title_Label');
    },

    titleHint () {
      return this.$i18n.t('Title_Hint');
    },

    titleRules() {
      return [
        v => !!v || this.$i18n.t('Title_Is_Required')
      ]
    },

    descriptionLabel () {
      return this.$i18n.t('Description_Label');
    },

    descriptionHint () {
      return this.$i18n.t('Description_Hint');
    },

    descriptionRules() {
      return [
        v => !!v || this.$i18n.t('Description_Is_Required')
      ]
    },

    authorLabel () {
      return this.$i18n.t('Author_Label');
    },

    authorHint () {
      return this.$i18n.t('Author_Hint');
    },

    authorRules() {
      return [
        v => !!v || this.$i18n.t('Author_Is_Required')
      ]
    },

    thumbnailLabel () {
      return this.$i18n.t('Thumbnail_Label');
    },

    thumbnailHint () {
      return this.$i18n.t('Thumbnail_Hint');
    },

    thumbnailRules() {
      return [
        v => !!v || this.$i18n.t('Thumbnail_Is_Required')
      ]
    },

    tagsLabel () {
      return this.$i18n.t('Tags_Label');
    },

    tagsHint () {
      return this.$i18n.t('Tags_Hint');
    },

    tagsRules() {
      return [
        v => v.length > 0 || this.$i18n.t('Tags_Is_Required')
      ]
    },

    publishedDateLabel () {
      return this.$i18n.t('Published_Date_Label');
    },

    publishedDateHint () {
      return this.$i18n.t('Published_Date_Hint');
    },

    publishedDateRules() {
      return [
        v => !!v || this.$i18n.t('Published_Date_Is_Required')
      ]
    },

    expiryDateLabel () {
      return this.$i18n.t('Expiry_Date_Label');
    },

    expiryDateHint () {
      return this.$i18n.t('Expiry_Date_Hint');
    },

    expiryDateRules() {
      return [
        v => !!v || this.$i18n.t('Expiry_Date_Is_Required')
      ]
    },

    consumptionTimeLabel () {
      return this.$i18n.t('Consumption_Time_Label');
    },

    consumptionTimeHint () {
      return this.$i18n.t('Consumption_Time_Hint');
    },

    consumptionTimeRules() {
      return [
        v => !!v || this.$i18n.t('Consumption_Time_Is_Required')
      ]
    },

    allowCommentsLabel () {
      return this.$i18n.t('Allow_Comments_Label');
    },

    allowReactionsLabel () {
      return this.$i18n.t('Allow_Reactions_Label');
    },

    allowSharingLabel () {
      return this.$i18n.t('Allow_Sharing_Label');
    }
  },
}

 */
</script>
