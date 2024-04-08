<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-radio-group v-model="form.type" column>
              <v-radio :label="colorLabel" value="color"></v-radio>
              <v-radio :label="fileLabel" value="file"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row v-show="form.type === 'color'">
          <v-col>
            <base-color-picker
              :label="colorLabel"
              :hint="colorHint"
              :color="form.color"
              mode="hex"
              @change-color="changeColor"
            />
          </v-col>
        </v-row>
        <v-row v-show="form.type === 'file'">
          <v-col>
            <v-file-input
              :label="fileLabel"
              :hint="fileHint"
              truncate-length="15"
              v-model="form.file"
              @change="changeFile"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="linkLabel"
              :hint="linkHint"
              v-model="form.link"
              prepend-icon="mdi-link"
              @change="changeLink"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="close">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TextureForm",
  props: {
    color: {
      type: String,
      required: false,
      default: ''
    },
    file: {
      type: File,
      required: false,
      default: null
    },
    link: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'color'
    }
  },
  data: ()  => ({
    form: {
      type: 'color',
      color: '',
      file: null,
      link: ''
    }
  }),
  watch: {
    color: function() {
      this.form.color = this.color;
    },
    link: function() {
      this.form.link = this.link;
    },
    file: function() {
      this.form.file = this.file;
    },
    type: function() {
      this.form.type = this.type;
    },
    formType: function() {
      if(this.form.type === 'color') this.$emit('color-changed', this.form.color);
      if(this.form.type === 'file') this.$emit('file-changed', this.form.file);
    }
  },
  methods: {
    changeColor(color){
      this.form.color = color.substring(0,7);
      this.$emit('color-changed', this.form.color);
    },
    changeFile(file) {
      this.form.file = file;
      this.$emit('file-changed', this.form.file);
    },
    changeLink(link) {
      this.form.link = link;
      this.$emit('link-changed', this.form.link);
    },
    close() {
      this.$emit('close');
    }
  },
  computed: {
    colorLabel() {
      return this.$i18n.t('Color_Label');
    },
    colorHint() {
      return this.$i18n.t('Color_Hint');
    },

    fileLabel () {
      return this.$i18n.t('Texture_Label');
    },
    fileHint () {
      return this.$i18n.t('Texture_Hint');
    },

    linkLabel () {
      return this.$i18n.t('Link_Label');
    },
    linkHint () {
      return this.$i18n.t('Link_Hint');
    },

    formType () {
      return this.form.type;
    }
  },
  async created () {
    this.form.color = this.color;
    this.form.link = this.link;
    this.form.file = this.file;
    this.form.type = this.type;
  },
}
</script>
