<template>
  <v-card :flat="! displayAsCard">

    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>

    <v-card-title v-if="displayAsCard">
      <v-icon left>mdi-file-plus</v-icon>
      {{ $t('create-resource') }}
    </v-card-title>

    <v-card-subtitle v-if="displayAsCard">{{ $t('create-resource-subtitle') }}</v-card-subtitle>

    <!-- the input form -->
    <template v-if="! creatingResource">

      <template v-if="! resourceToCreate.name">
        <v-card-text>
          <base-file-drag-drop @filesToUpload="onFilesToUpload"/>
        </v-card-text>
      </template>

      <template v-if="resourceToCreate.name">
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-avatar tile size="100" v-if="resourceToCreateIsTypeImage">
                <v-img contain :src="imgSrc"></v-img>
              </v-list-item-avatar>
              <v-list-item-icon v-else>
                <base-file-icon-type :file-format="resourceToCreate.format"/>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  {{ resourceToCreate.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ resourceToCreate.format }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn class="ml-2" icon @click="submit" :loading="submitting">
                  <v-icon>mdi-upload</v-icon>
                </v-btn>
              </v-list-item-action>

              <v-list-item-action>
                <v-btn icon color="error" @click="reset">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions v-if="displayAsCard">
          <v-btn @click="cancel">{{ $t('close') }}</v-btn>
          <v-spacer />
          <v-btn @click="submit" :loading="submitting">
            <v-icon>mdi-upload</v-icon>
            {{ $t('Upload') }}
          </v-btn>
        </v-card-actions>
      </template>
    </template>

    <!-- the creating resource -->
    <template v-if="creatingResource">

      <!-- the loader -->
      <v-card-text class="text-center" v-show="creating">
        {{ $t('uploading') }}...

        <v-progress-linear class="mt-2" indeterminate />
      </v-card-text>

      <v-card-text v-if="resourceId">
        <!-- link to the newly created resource -->
        <v-list two-line>
          <!-- apps-admin-resource-nav-list-item :resource-id="resourceId" /> -->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ resourceId }}</v-list-item-title>
              <v-list-item-title>{{ $t('resource') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions v-if="displayAsCard">
        <v-btn @click="cancel">{{ $t('close') }}</v-btn>
        <v-spacer/>
        <v-btn @click="reset">{{ $t('create-resource') }}</v-btn>
      </v-card-actions>
    </template>

      <!-- the file(s) to upload -->
<!--      <v-card-text v-if="true">-->
<!--        <v-list-item v-for="(resource, index) in resourcesToCreate"-->
<!--                     :key="`resource-${index}`">-->
<!--          <v-list-item-icon>-->
<!--            <base-file-icon-type :file-format="resource.format"/>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>-->
<!--              {{ resource.name }}-->
<!--            </v-list-item-title>-->
<!--            <v-list-item-subtitle>-->
<!--              {{ resource.format }}-->
<!--            </v-list-item-subtitle>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-card-text>-->



      <v-card-text v-if="debug">
        {{ JSON.stringify(resourceToCreate) }}
      </v-card-text>

      <v-card-text v-if="false">
        <v-container v-if="false">
          <v-row>
            <v-col>
              <!--            <v-btn v-show="imgSrc" @click="imgSrc = ''"  block>-->
              <!--              <v-icon left>mdi-arrow-left</v-icon>-->
              <!--              {{ $t('Choose_another') }}-->
              <!--            </v-btn>-->

              <!--            <base-file-uploader  :changeFileName="true"/>-->
              <!--              v-show="!imgSrc"-->
              <!--                                 file-accept="image/*" -->

              <!--            <vue-cropper-->
              <!--              v-show="imgSrc"-->
              <!--              ref="cropper"-->
              <!--              :guides="false"-->
              <!--              :view-mode="0"-->
              <!--              drag-mode="move"-->
              <!--              :auto-crop-area="0.5"-->
              <!--              :min-container-width="250"-->
              <!--              :min-container-height="180"-->
              <!--              :background="true"-->
              <!--              :rotatable="true"-->
              <!--              :src="imgSrc"-->
              <!--              :modal="true"-->
              <!--              :img-style="{ width: '400px', height: '400px' }"-->
              <!--              :center="false"-->
              <!--              :highlight="true"-->
              <!--            />-->
            </v-col>
          </v-row>
        </v-container>
        <v-stepper v-model="currentStep" alt-labels v-if="false">

          <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" step="1" :rules="[() => resourceFormValid]">
              <template>
                <span class="text-center d-block">{{ $t('File') }}</span>
                <small>{{ $t('Choose file to upload')}}</small>
              </template>
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <v-card-text>
                  <v-form v-model="resourceFormValid" ref="resourceForm" lazy-validation>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-file-input
                            :label="resourcesLabel"
                            :hint="resourcesHint"
                            required
                            persistent-hint
                            :rules="[v => !!v || 'Resource is required']"
                            v-model="resourceFile"
                          >
                          </v-file-input>
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
                  <v-btn @click="submitResourceForm">
                    {{ $t('Continue') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>

    </v-card>



</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateResource",

  props: {
    itemId: {
      type: String,
      default: "resource-centre"
    },
    displayAsCard: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    creatingResource({ created, resourceId }) {
      if (created) {
        this.$emit('resource-created', resourceId);
        this.$emit('src-resource-created', this.resourceToCreate.base64)
      }
    }
  },

  methods: {
    ...mapActions({
      createResource: 'apps/admin/resources/createResource',
    }),


    /**
     * @param filesToUpload
     * @return {Promise<void>}
     */
    async onFilesToUpload (filesToUpload) {
      console.log(`## CREATE RESOURCE - FILES TO UPLOAD`);


      const file = filesToUpload[0];

      console.log(`## CREATE RESOURCE - FILE TO UPLOAD`);
      console.log(file);

      if(file) {
        const base64 = await this.getFileReader(file);

        const nameParts = file.name.split(".");
        const name = nameParts[0];
        const format = file.name.substr(file.name.lastIndexOf(".") + 1);

        // create a new Resource
        // this is the list of files that we will upload
        this.resourceToCreate = {
          name,
          format,
          file,
          //
          base64,
        };
      }
    },

    async getFileReader (file) {
      let reader = new FileReader();
        return new Promise(resolve => {
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });

    },





    /**
     *
     * @param files
     */
    // setFile (files) {
    //   console.log(`## CREATE RESOURCE - CHANGE FILES`);
    //   console.log(files);
    //
    //   const file = files[0];
    //
    //   const {
    //     lastModified,
    //     lastModifiedDate,
    //     name,
    //     size,
    //     type,
    //   } = file;
    //
    //
    //   console.log("file.fileContent", file.fileContent);
    // },

    cancel() {
      this.reset();
      this.$emit('close');
    },

    reset() {
      this.resourceToCreate = {
        name: undefined,
        format: undefined,
        file: undefined,
        base64: undefined,
      };
    },

    async submit () {
      console.log(`## CREATE RESOURCE - SUBMIT`);

      // we are only interested in  name ane file.
      let {name, file, base64, format} = this.resourceToCreate;

      // temporary - we might make this required (David)
      // let itemId = 'resource-centre'; // undefined; @todo: Add itemId based on context -- Luis hardcoded itemId = 'resource-centre'

      let itemId = this.itemId;

      const resource = {
        name,
        file,
        itemId,
        // ...other attributes
      };

      this.submitting = true;

      const creatingResource = await this.createResource(resource);
      console.log(`## CREATING RESOURCE`);
      console.log(creatingResource);

      let {executionArn, startDate} = creatingResource;
      this.executionArn = executionArn;
      this.startDate = startDate;

      this.submitting = false;
    },
  },

  computed: {
    ...mapGetters({
      creatingResourceWithExecutionArn: 'apps/admin/resources/creatingResourceWithExecutionArn',
    }),

    creatingResource () {
      return (this.executionArn) ? this.creatingResourceWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return (this.creatingResource) ? this.creatingResource.creating : false;
    },

    created () {
      return (this.creatingResource) ? this.creatingResource.created : false;
    },

    error () {
      return (this.creatingResource) ? this.creatingResource.error : false;
    },

    loaded () {
      return (this.creatingResource) ? this.creatingResource.loaded : false;
    },

    loading () {
      return (this.creatingResource) ? this.creatingResource.loading : false;
    },

    resourceId () {
      return (this.creatingResource) ? this.creatingResource.resourceId : undefined;
    },

    imgSrc () {
      return (this.resourceToCreate) ? this.resourceToCreate.base64 : undefined;
    },

    resourceToCreateIsTypeImage () {
      return this.resourceToCreate?.format === 'jpg' ||
        this.resourceToCreate?.format === 'jpeg' ||
        this.resourceToCreate?.format === 'png' ||
        this.resourceToCreate?.format === 'tif' ||
        this.resourceToCreate?.format === 'bmp';
    },

    // resourcesLabel () {
    //   return this.$i18n.t('Resources_Label');
    // },
    // resourcesHint () {
    //   return this.$i18n.t('Resources_Hint');
    // },
  },

  data: () => ({
    debug: false,

    resourceToCreate: {
      name: undefined,
      format: undefined,
      file: undefined,
      base64: undefined,
    },

    // the list of Resources to create - local
    // resourcesToCreate: [
      // {
        // name,
        // format,
        // file,
        // base64,
      // }
    // ],

    submitting: false,

    executionArn: undefined,
    startDate: undefined,
    // currentStep: 1,
    // valid: true,
    // resourceFormValid: true,
    // // loading: false,
    // resourceFile: null
  }),

}
</script>
