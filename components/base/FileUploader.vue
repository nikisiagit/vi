<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-plus</v-icon>
      {{ $t('Upload_Files') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('Upload_Files_Subtitle') }}</v-card-subtitle>

    <v-card-text>
      <template>
        <base-file-drag-drop class="mb-8"
                             @filesToUpload="onDropFilesToUpload" >
          <template v-slot:default>
            <v-file-input
              v-show="false"
              :accept="fileAccept"
              v-model="tempAttachment"
              :label="$t('Insert_New_File')"
              :multiple="multiple"
              id="inputFile"
            ></v-file-input>
          </template>
        </base-file-drag-drop>
      </template>

      <template>
        <v-expansion-panels
          v-if="addFileDescription || changeFileName"
        >
          <v-expansion-panel
            v-for="(attachment, index) in tempAttachmentChanged"
            :key="`attachment-${index}`"
          >
            <v-expansion-panel-header>
              <v-row>
                <v-col cols="11">
                  {{
                    attachment.name
                  }}
                </v-col>
                <v-col cols="1">
                  <v-icon @click.native.stop="removeFile(index)">
                    mdi-delete
                  </v-icon>
                </v-col>
              </v-row>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-row align="center" justify="center">
                <v-col cols="12" lg="9" md="9" xs="12">

                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-if="changeFileName"
                        :label="$t('File_Name')"
                        v-model="attachment.name"
                        :prepend-icon="attachment.icon"
                      >
                      </v-text-field>
                      <v-textarea
                        v-if="addFileDescription"
                        :label="$t('File_Description')"
                        auto-grow
                        row-height="1"
                        v-model="attachment.description"
                      >
                      </v-textarea>
                    </v-col>

                    <v-col cols="4" v-if="isImage(attachment)">
                      <v-text-field
                        v-model="attachment.width"
                        :label="widthLabel"
                        :hint="widthHint"
                        persistent-hint
                        required
                        type="number"
                      />
                    </v-col>

                    <v-col cols="4" v-if="isImage(attachment)">
                      <v-text-field
                        v-model="attachment.height"
                        :label="heightLabel"
                        :hint="heightHint"
                        persistent-hint
                        required
                        type="number"
                      />
                    </v-col>

                    <v-col cols="4" v-if="isImage(attachment)">
                      <v-select
                        v-model="attachment.resizeMode"
                        :label="resizeModeLabel"
                        :hint="resizeModeHint"
                        :items="resizesMode"
                        persistent-hint
                      />
                    </v-col>


                    <!--  custom fields-->
                    <v-col cols="4" v-if="isImage(attachment)">
                      <slot name="customFields" v-bind:attachment="attachment"></slot>
                    </v-col>

                  </v-row>

                </v-col>

                <v-col align="center" cols="12" lg="3" md="3" xs="12">
                  <template
                    v-if="isImage(attachment)"
                  >
                    <v-card>
                      <v-img :src="attachment.base64"></v-img>
                    </v-card>
                  </template>

                  <template v-else>
                    <base-file-icon-type
                      :file-format="attachment.format"
                      :size="60"
                    >
                    </base-file-icon-type>
                  </template>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-card v-else class="mx-auto" tile>
          <v-list-item
            v-for="(attachment, index) in tempAttachmentChanged"
            :key="`attachment-${index}`"
            style="border-bottom: 1px solid #E0E0E0"
          >
            <v-list-item-content>
              <v-list-item-title>
                <base-file-icon-type :file-format="attachment.format"/>

                {{ attachment.name }}.{{ attachment.format }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>
    </v-card-text>

    <v-card-actions>


    <v-container>
<!--      <v-row>-->
<!--        <v-col cols="12">-->
<!--          <pre>-->
<!--            {{ registryDocFile }} &lt;!&ndash; the place where the file is printed &ndash;&gt;-->
<!--          </pre>-->
<!--        </v-col>-->
<!--      </v-row>-->

        <v-row>
          <v-col cols="12" class="d-flex">
            <v-alert
              class="mt-3"
              border="left"
              outlined
              elevation="1"
              type="error"
              v-if="error"
            >
         <span class="text--primary">
           {{ errorText }}
         </span>
            </v-alert>

            <v-btn @click="$emit('close')">
              {{ $t('Cancel') }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-badge
              v-if="tempAttachmentChanged.length"
              bordered
              overlap
              :color="tempAttachmentChanged.length +1 === maxFileCount ? 'error' : 'success'"
              :content="tempAttachmentChanged.length"
            >
              <v-btn
                :color="btnColor"
                :disabled="tempAttachment == null || isSubmitting"
                :loading="isSubmitting"
                @click="uploadChange"
              >
                <v-icon>mdi-upload</v-icon> {{ $t('Upload') }}
              </v-btn>
            </v-badge>

            <v-btn
              v-else
              :color="btnColor"
              :disabled="tempAttachment == null || isSubmitting"
              :loading="isSubmitting"
              @click="uploadChange"
            >
              <v-icon>mdi-upload</v-icon> {{ $t('Upload') }}
            </v-btn>
          </v-col>
        </v-row>
    </v-container>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    /**
     * Array contain files
     */
    documentAttachment: {
      type: Array,
      default: () => ([]),
    },

    isSubmitting: {
      type: Boolean,
    },

    /**
     * Maximum file size
     */
    maxFileSize: {
      type: Number,
      default: 5120
    },

    /**
     * Maximum file Upload
     */
    maxFileCount: {
      type: Number,
      default: 1
    },

    /**
     * Button Color
     */
    btnColor: {
      type: String,
      default: "primary"
    },

    /**
     * Accept uploaded files
     */
    fileAccept: String,

    /**
     * Allow Change/override file Name before upload
     */
    changeFileName: {
      type: Boolean,
      default: false
    },

    /**
     * Add file Description
     */
    addFileDescription: {
      type: Boolean,
      default: false
    },

    multiple: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    widthLabel () {
      return this.$i18n.t('Width_Label');
    },

    widthHint () {
      return this.$i18n.t('Width_Hint');
    },

    heightLabel () {
      return this.$i18n.t('Height_Label');
    },

    heightHint () {
      return this.$i18n.t('Height_Hint');
    },

    resizeModeLabel () {
      return this.$i18n.t('Resize_Mode_Label');
    },

    resizeModeHint () {
      return this.$i18n.t('Resize_Mode_Hint');
    }
  },
  data: () => ({
    tempAttachment: [],
    tempAttachmentChanged: [],
    resizesMode: [
      {
        text: 'Disabled',
        value: 'disabled'
      },
      {
        text: 'Cover',
        value: 'cover'
      },
      {
        text: 'Contain',
        value: 'contain'
      },
      {
        text: 'Fill',
        value: 'fill'
      },
      {
        text: 'Inside',
        value: 'inside'
      },
      {
        text: 'Outside',
        value: 'outside'
      },
    ],

   // isLoading: false,
    error: false,
    errorText: "",

    readerFile: null,
    registryDocFile: [],

    selectedIndex: "",
    selectedId: "",
    attachmentIndex: ""
  }),
  watch: {
    tempAttachment: function(newValue) {
      console.log(`FILE UPLOADED - TEMP ATTACHMENT `, newValue);
      if (this.tempAttachment.length > 0) this.getAttachmentDetails(newValue);
      // else this.tempAttachmentChanged = [];
    },

    documentAttachment: {
      immediate: true,
      handler(documentAttachment){
        this.registryDocFile = documentAttachment;
      }
    }
  },
  mounted() {
    this.tempAttachment = [];

    this.registryDocFile = this.documentAttachment;
  },
  destroyed() {
    this.registryDocFile = [];
    this.$emit('reset-registry');
  },
  methods: {
    isImage(attachment) {
      return (
        attachment.format.toLowerCase() === 'jpg' || // doesn't work because it's aprt of for loop
        attachment.format.toLowerCase() === 'jpeg' ||
        attachment.format.toLowerCase() === 'png' ||
        attachment.format.toLowerCase() === 'tif' ||
        attachment.format.toLowerCase() === 'bmp'
      );
    },

    handleUpload(fileAttachment) {
      let reader = new FileReader();
      return new Promise(function(resolve) {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(fileAttachment);
      });
    },

    async uploadChange() {
     // this.isLoading = true;
      for (let [index, item] of this.tempAttachment.entries()) {

        console.log("tempAttachmentEntries", this.tempAttachment.entries());

        if (this.documentAttachment.length < this.maxFileCount) {
          if ((item.size / 1000).toFixed(1) > this.maxFileSize) {

            this.errorText = `${
              this.$i18n.t('Max file Size is')
            } ${Math.round(this.maxFileSize / 1024)} ${
              this.$i18n.t('MB')
            }`;
            this.error = true;
          } else {

            try {
              // console.log(item);
              this.readerFile = await this.handleUpload(item);
            } catch (e) {
              console.log(e);
            }

            let tempFile = {};
            let file = {};

            // Split the Reader file
            let strTemp = this.readerFile.split(",");
            tempFile.base64 = strTemp[1];
            tempFile.size = String(item.size);

            tempFile.name =
              this.tempAttachmentChanged[index].name +
              "." +
              this.tempAttachmentChanged[index].format;

            if (this.tempAttachmentChanged[index].description === undefined)
              tempFile.description = "";
            else
              tempFile.description = this.tempAttachmentChanged[index].description;

            tempFile.format = strTemp[0].replace("data:", ""); // Format or File Extension.

            // this is the File instance
            tempFile.fileContent = this.tempAttachmentChanged[index].fileContent

            tempFile.width = this.tempAttachmentChanged[index].width
            tempFile.height = this.tempAttachmentChanged[index].height
            tempFile.resizeMode = this.tempAttachmentChanged[index].resizeMode

            tempFile.imageLink = this.tempAttachmentChanged[index].imageLink // @todo: to figure it out a better way

            // Create a file based from tempFile for the registry.
            // With following props: { base64, format, size, name, description, width, height, resizeMode  }
            file.file = tempFile;

            console.log("tempFile.fileContent", tempFile.fileContent);

            this.registryDocFile.push(file);

            console.log("registryDocFile", this.registryDocFile);


            this.$emit('handle-upload', this.registryDocFile)
          }
        } else {
          this.errorText = `${
            this.$i18n.t('Max file Count is')
          } ${this.maxFileCount}`;
          this.error = true;
        }
      }

      this.tempAttachmentChanged = [];
      // this.$emit('close')
    },

    async getAttachmentDetails(selectedAttachment) {
      for (let item of selectedAttachment) {
        try {
          this.readerFile = await this.handleUpload(item);
        } catch (e) {
          console.log(e);
        }
        let obj = {};
        let name = "";
        name = item.name.split(".");
        obj.format = item.name.substr(item.name.lastIndexOf(".") + 1);
        obj.name = name[0];
        obj.base64 = this.readerFile;
        obj.fileContent = item

        console.log("obj", obj);

        this.tempAttachmentChanged.push(obj);
      }
    },

    removeFile(index){
      this.tempAttachmentChanged.splice(index, 1);
    },

    onDropFilesToUpload(filesToUpload){
      console.log("filesToUpload: ", filesToUpload)

      this.getAttachmentDetails(filesToUpload)
    }
  }
};
</script>
