<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-upload</v-icon>
      {{ $t('upload-file') }}
    </v-card-title>
    <v-card-subtitle>
      {{ $t('upload-file-subtitle') }}
    </v-card-subtitle>
    <v-card-text>

      <v-container fluid>

        <v-row v-if="! imgSrc">
          <v-col>
            <base-file-drag-drop @filesToUpload="setImage" file-accept="image/*" />
          </v-col>
        </v-row>

        <v-row v-if="imgSrc">
          <v-col >
            <v-img contain max-width="150" :src="imgSrc"></v-img>
          </v-col>
        </v-row>

      </v-container>

    </v-card-text>

    <v-card-actions>
      <v-btn :disabled="false" @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />
      <v-btn @click="removeImage">{{ $t('choose-another') }}</v-btn>
      <v-btn :loading="false" :disabled="! imgSrc" @click="upload">{{ $t('upload') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'UploadFile',
  data(){
    return {
      imgSrc: undefined,
      imgName: undefined,
    }
  },
  methods: {
    setImage(files) {
      // const file = e;

      const file = files[0];
      // this.file = file
      // const filename = file.name;

      if (!file?.type.includes("image/")) {
        // alert("Please select an image file");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = event => {
          this.imgSrc = event.target.result;
          this.imgName = file.name

        };

        reader.readAsDataURL(file);


      } else {
        console.error("FileReader API not supported");
      }
    },
    removeImage(){
      this.imgSrc = null
    },
    upload(){
      this.$emit('upload', this.imgSrc)
    },
    cancel(){
      this.$emit('close')
    }
  }
}
</script>
