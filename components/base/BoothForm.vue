<template>
  <v-card>
    <v-card-text class="pa-0 ma-0">
      <v-container fluid>
        <v-row>
          <v-col class="py-0">
            <base-color-picker :label="stoolColorLabel"
                               :hint="stoolColorHint"
                               :color="boothForm.colors.stool"
                               mode="hex"
                               @change-color="(color) => changeColor('stool', color)" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <base-color-picker :label="tableColorLabel"
                               :hint="tableColorHint"
                               :color="boothForm.colors.table"
                               mode="hex"
                               @change-color="(color) => changeColor('table', color)" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <base-color-picker :label="floorColorLabel"
                               :hint="floorColorHint"
                               :color="boothForm.colors.floor"
                               mode="hex"
                               @change-color="(color) => changeColor('floor', color)" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-file-input
              :label="backWallTextureLabel"
              :hint="backWallTextureHint"
              truncate-length="15"
              v-model="boothForm.files.backWall"
              @change="(file) => changeTexture('Back Wall', file)"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-file-input
              :label="tableTextureLabel"
              :hint="tableTextureHint"
              truncate-length="15"
              v-model="boothForm.files.table"
              @change="(file) => changeTexture('Table Front Panel', file)"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-file-input
              :label="leftTopTextureLabel"
              :hint="leftTopTextureHint"
              truncate-length="15"
              v-model="boothForm.files.leftTop"
              @change="(file) => changeTexture('Front Panel 1', file)"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-file-input
              :label="leftTVTextureLabel"
              :hint="leftTVTextureHint"
              truncate-length="15"
              v-model="boothForm.files.leftTV"
              @change="(file) => changeTexture('TV Panel 1', file)"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-file-input
              :label="leftBottomTextureLabel"
              :hint="leftBottomTextureHint"
              truncate-length="15"
              v-model="boothForm.files.leftBottom"
              @change="(file) => changeTexture('Front Panel 2', file)"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-file-input
              :label="centreTextureLabel"
              :hint="centreTextureHint"
              truncate-length="15"
              v-model="boothForm.files.centre"
              @change="(file) => changeTexture('Front Panel 3', file)"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-file-input
              :label="rightTopTextureLabel"
              :hint="rightTopTextureHint"
              truncate-length="15"
              v-model="boothForm.files.rightTop"
              @change="(file) => changeTexture('Front Panel 4', file)"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-file-input
              :label="rightTVTextureLabel"
              :hint="rightTVTextureHint"
              truncate-length="15"
              v-model="boothForm.files.rightTV"
              @change="(file) => changeTexture('TV Panel 2', file)"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0">
            <v-file-input
              :label="rightBottomTextureLabel"
              :hint="rightBottomTextureHint"
              truncate-length="15"
              v-model="boothForm.files.rightBottom"
              @change="(file) => changeTexture('Front Panel 5', file)"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>

      <v-spacer />

      <v-btn plain
             @click="close">
        {{ $t('Close') }}
      </v-btn>

      <v-btn color="primary"
             @click="submit">
        {{ $t('Save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "BoothForm",
  props: {
    stoolColor: {
      type: String,
      required: false,
      default: '#FFFFFF'
    },
    tableColor: {
      type: String,
      required: false,
      default: '#FFFFFF'
    },
    floorColor: {
      type: String,
      required: false,
      default: '#FFFFFF'
    },
  },
  data: ()  => ({
    boothForm: {
      colors: {
        stool: '',
        table: '',
        floor: ''
      },
      files: {
        backWall: [],
        table: [],
        leftTop: [],
        leftTV: [],
        leftBottom: [],
        centre: [],
        rightTop: [],
        rightTV: [],
        rightBottom: []
      }
    }
  }),
  created () {
    this.boothForm.colors.stool = this.stoolColor;
    this.boothForm.colors.table = this.tableColor;
    this.boothForm.colors.floor = this.floorColor;
  },
  methods: {
    close () {
      this.$emit('close');
    },

    async submit () {
      this.$emit('submit-booth-form', this.boothForm);
      this.close();
    },

    changeColor(which, color){
      this.boothForm.colors[which] = color.hexa ? color.hexa : color;
      this.$emit('color-changed', which, this.boothForm.colors[which]);
    },

    changeTexture(which, file) {
      if(file === null) {
        this.$emit('texture-removed', which);
        return;
      }

      const blob = window.URL.createObjectURL(file);
      this.$emit('texture-changed', which, file.type, blob);

    }
  },
  computed: {
    stoolColorLabel() {
      return this.$i18n.t('Stool_Color_Label');
    },
    stoolColorHint() {
      return this.$i18n.t('Stool_Color_Hint');
    },

    tableColorLabel () {
      return this.$i18n.t('Table_Color_Label');
    },
    tableColorHint () {
      return this.$i18n.t('Table_Color_Hint');
    },

    floorColorLabel () {
      return this.$i18n.t('Floor_Color_Label');
    },
    floorColorHint () {
      return this.$i18n.t('Floor_Color_Hint');
    },

    backWallTextureLabel () {
      return this.$i18n.t('Back_Wall_Texture_Label');
    },
    backWallTextureHint () {
      return this.$i18n.t('Back_Wall_Texture_Hint');
    },

    tableTextureLabel () {
      return this.$i18n.t('Table_Texture_Label');
    },
    tableTextureHint () {
      return this.$i18n.t('Table_Texture_Hint');
    },

    leftTopTextureLabel () {
      return this.$i18n.t('Left_Top_Texture_Label');
    },
    leftTopTextureHint () {
      return this.$i18n.t('Left_Top_Texture_Hint');
    },

    leftTVTextureLabel () {
      return this.$i18n.t('Left_TV_Texture_Label');
    },
    leftTVTextureHint () {
      return this.$i18n.t('Left_TV_Texture_Hint');
    },

    leftBottomTextureLabel () {
      return this.$i18n.t('Left_Bottom_Texture_Label');
    },
    leftBottomTextureHint () {
      return this.$i18n.t('Left_Bottom_Texture_Hint');
    },

    centreTextureLabel () {
      return this.$i18n.t('Centre_Texture_Label');
    },
    centreTextureHint () {
      return this.$i18n.t('Centre_Texture_Hint');
    },

    rightTopTextureLabel () {
      return this.$i18n.t('Right_Top_Texture_Label');
    },
    rightTopTextureHint () {
      return this.$i18n.t('Right_Top_Texture_Hint');
    },

    rightTVTextureLabel () {
      return this.$i18n.t('Right_TV_Texture_Label');
    },
    rightTVTextureHint () {
      return this.$i18n.t('Right_TV_Texture_Hint');
    },

    rightBottomTextureLabel () {
      return this.$i18n.t('Right_Bottom_Texture_Label');
    },
    rightBottomTextureHint () {
      return this.$i18n.t('Right_Bottom_Texture_Hint');
    },
  },
}
</script>
