<template>
  <v-card
    @drop.prevent="onDrop($event)"
    @dragover.prevent="dragover = true"
    @dragenter.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    :class="{ 'grey lighten-2': dragover }"
    style="border: 2px dashed #eee; cursor: pointer;"
    flat
  >
    <v-card-text>
      <v-row class="d-flex flex-column" dense align="center" justify="center">
        <v-icon :class="[dragover ? 'mt-2, mb-6' : 'mt-5']" size="60">
          mdi-cloud-upload
        </v-icon>


<!--        <input type="file" multiple id="assetsFieldHandle" class="d-none" />-->
        <slot>
          <v-file-input
            v-show="false"
            :accept="fileAccept"
            @change="fileChange"
            :multiple="multiple"
            id="inputFile"
          ></v-file-input>
        </slot>
        <label class="text-decoration-underline v-chip--clickable" for="inputFile">
          Drop your file(s) here or click to select them.
        </label>

      </v-row>

<!--      <v-virtual-scroll-->
<!--        v-if="uploadedFiles.length > 0"-->
<!--        :items="uploadedFiles"-->
<!--        height="150"-->
<!--        item-height="50"-->
<!--      >-->
<!--        <template v-slot:default="{ item }">-->
<!--          <v-list-item :key="item.name">-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-title>-->
<!--                {{ item.name }}-->
<!--                <span class="ml-3 text&#45;&#45;secondary">-->
<!--                    {{ item.size }} bytes</span-->
<!--                >-->
<!--              </v-list-item-title>-->
<!--            </v-list-item-content>-->

<!--            <v-list-item-action>-->
<!--              <v-btn @click.stop="removeFile(item.name)" icon>-->
<!--                <v-icon> mdi-close-circle </v-icon>-->
<!--              </v-btn>-->
<!--            </v-list-item-action>-->
<!--          </v-list-item>-->

<!--          <v-divider></v-divider>-->
<!--        </template>-->
<!--      </v-virtual-scroll>-->
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

<!--      <v-btn @click="clearAll" icon>-->
<!--        <v-icon id="close-button">mdi-close</v-icon> Clear all-->
<!--      </v-btn>-->

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "FileDragDrop",
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    fileAccept: {
      type: String
    }
  },
  data() {
    return {
      dragover: false,
      uploadedFiles: []
    };
  },
  methods: {
    // removeFile(fileName) {
    //   // Find the index of the
    //   const index = this.uploadedFiles.findIndex(
    //     file => file.name === fileName
    //   );
    //   // If file is in uploaded files remove it
    //   if (index > -1) this.uploadedFiles.splice(index, 1);
    // },

    onDrop(e) {
      this.dragover = false;
      // If there are already uploaded files remove them
      if (this.uploadedFiles.length > 0) {
        this.uploadedFiles = [];

        // // If user has uploaded multiple files but the component is not multiple throw error
        // if (!this.multiple && e.dataTransfer.files.length > 1) {
        //   // this.$store.dispatch("addNotification", {
        //   //   message: "Only one file can be uploaded at a time..",
        //   //   colour: "error"
        //   // });
        // }
      } else {
        // Add each file to the array of uploaded files
        var files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
        //Loop through all dropped files
        for (var i = 0; i < files.length; i++) {
          //Add files to the selected file list
          this.uploadedFiles.push(files[i])
        }
      }

      console.log("uploadedFiles",  this.uploadedFiles)
      this.$emit("filesToUpload", this.uploadedFiles);
      this.uploadedFiles = []
    },

    fileChange(file){
      this.uploadedFiles.push(file)

      console.log(" this.uploadedFiles",  this.uploadedFiles)
      this.$emit("filesToUpload", this.uploadedFiles);
      this.uploadedFiles = []
    }
  }
};
</script>
