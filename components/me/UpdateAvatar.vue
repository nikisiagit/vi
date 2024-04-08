<!--
Me - Update Avatar

A smart component that enables the Me Profile to update their avatar attribute.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

<!--    <v-card-title>
      <v-icon left>mdi-account-circle</v-icon>
      {{ $t('me-update-avatar') }}
    </v-card-title>-->

    <!-- preview -->
    <v-container fluid>
      <v-row>
        <v-col class="text-center">
          <base-avatar :size="size" :color="colourLocal" :icon="iconLocal" :label="label" :status-indicator="onlineStatusLocal" status-indicator-color="success"/>
        </v-col>
      </v-row>
    </v-container>
    <!-- /preview -->

    <!-- the form -->
    <v-container fluid>
      <!-- color picker -->
      <v-row>
        <v-col class="px-4">
          <base-color-picker :color="colourLocal"
                             :label="colourLabel"
                             :hint="colourHint"
                             :hasIcon="false"
                             @reset="resetColor"
                             @change-colour="changeColour"
                             clearable
          />
        </v-col>
      </v-row>

      <!-- icons select -->
      <v-row>
        <v-col class="px-4">
          <base-icons-select :icon="iconLocal" @change-icon="changeIcon "/>
        </v-col>
      </v-row>

      <!-- online status -->
      <v-row>
        <v-col class="px-4">
          <v-list class="pa-0">
            <v-list-item class="px-0">
              <v-list-item-content>
                <v-list-item-title>{{ onlineStatus }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('avatar-online-status') }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action class="ma-0">
                <v-switch v-model="onlineStatusLocal" @change="changeOnlineStatus"></v-switch>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <!-- image -->
      <v-row>
        <v-col class="px-4">
          <v-list class="pa-0">
            <v-list-item class="px-0">
              <v-list-item-content>
                <v-list-item-title>{{ imageLabel }}</v-list-item-title>
                <v-list-item-subtitle>{{ imageHint }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-dialog
                  v-model="addImageDialog"
                  max-width="600px"
                  @click:outside="closeImageDialog"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>


                  <!-- @todo refactor to handle resource selection -->
                  <v-card>
                    <v-card-title>Add Image</v-card-title>
                    <v-card-text>

                      <v-tabs v-model="tabImg">
                        <v-tab>{{ $t('URL') }}</v-tab>
                        <v-tab>{{ $t('Upload') }}</v-tab>
                      </v-tabs>

                      <v-tabs-items v-model="tabImg">
                        <v-tab-item>
                          <v-container>
                            <v-row>
                              <v-col>
                                <v-form>
                                  <v-text-field
                                    v-model="imageUrl"
                                    :label="$t('Source_Link')"
                                    outlined
                                    clearable
                                    dense
                                  />
                                  <v-text-field
                                    v-model="imageUrlText"
                                    :label="$t('Alternative_Text')"
                                    outlined
                                    clearable
                                    dense
                                  />

                                </v-form>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-tab-item>

                        <v-tab-item>
                          <v-container>
                            <v-row>
                              <v-col>
                                <v-btn v-show="imgSrc" @click="imgSrc = ''"  block>
                                  <v-icon left>mdi-arrow-left</v-icon>
                                  {{ $t('Choose_another') }}
                                </v-btn>

                                <base-file-drag-drop v-show="!imgSrc" class="mt-2" @filesToUpload="setImage" file-accept="image/*" />

                                <vue-cropper
                                  v-show="imgSrc"
                                  ref="cropper"
                                  :guides="false"
                                  :view-mode="0"
                                  drag-mode="move"
                                  :auto-crop-area="0.5"
                                  :min-container-width="250"
                                  :min-container-height="180"
                                  :background="true"
                                  :rotatable="true"
                                  :src="imgSrc"
                                  :modal="true"
                                  :img-style="{ width: '400px', height: '400px' }"
                                  :center="false"
                                  :highlight="true"
                                />
                              </v-col>
                            </v-row>
                          </v-container>

                        </v-tab-item>

                      </v-tabs-items>

                    </v-card-text>

                    <v-card-actions>
                      <v-btn @click="closeImageDialog" >Cancel</v-btn>
                      <v-spacer></v-spacer>
                      <template v-if="imgSrc && tabImg === 1">
                        <v-btn v-if="imgSrc" @click="rotate('r');" icon>
                          <v-icon>mdi-rotate-right</v-icon>
                        </v-btn>
                        <v-btn v-if="imgSrc" @click="rotate('l');" icon>
                          <v-icon>mdi-rotate-left</v-icon>
                        </v-btn>
                        <v-btn color="primary" @click="cropImage">Ok</v-btn>
                      </template>
                      <template v-else>
                        <v-btn color="primary" @click="setImageUrl">Ok</v-btn>
                      </template>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <!-- /image -->
    </v-container>
    <!-- /the form -->

    <!-- submit button -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-btn large block
                 class="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('me-update-avatar')}}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>

</template>
<script>
import {mapActions, mapGetters} from "vuex";
import icons from '@/data/icons.json'
import { distance } from '@/utils/helpers'
import VueCropper from "vue-cropperjs";

export default {
  name: "UpdateAvatar",

  components: {
    VueCropper,
  },

  data: () => ({
    valid: true,
    debug: false,
    submitting: false,


    colourLocal: undefined,
    iconLocal: undefined,
    onlineStatusLocal: undefined,

    addImageDialog: false,
    tabImg: '',
    imageUrl: undefined,
    imageUrlText: undefined,
    imgSrc: undefined,
    avatarData: undefined,
  }),

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    colour: {
      immediate: true,
      handler () {
        this.colourLocal = this.colour;
      },
    },

    icon: {
      immediate: true,
      handler () {
        this.iconLocal = this.icon;
      }
    },

    onlineStatus: {
      immediate: true,
      handler () {
        this.onlineStatusLocal = this.onlineStatus;
      }
    },
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      loaded: 'me/loaded',
      loading: 'me/loading'
    }),

    avatar () {
      return (this.me) ? this.me.avatar : undefined;
    },

    colour () {
      return (this.avatar) ? this.avatar.colour : undefined;
    },

    icon () {
      return (this.avatar) ? this.avatar.icon : undefined;
    },

    onlineStatus () {
      return (this.avatar) ? this.avatar.onlineStatus : false;
    },



    isDark() {
      return this.$vuetify.theme.isDark
    },

    size () {
      return (this.isMobile) ? 'lg' : 'xl';
    },

    colorRules(){
      return [
        // v => !!v || 'Colour is required',
      ]
    },

    label () {
      const fullname =  (this.meFullname) ? this.meFullname : undefined;
      return (fullname) ? fullname.value : undefined;
    },

    order () {
      return 'first';
      // (this.isMobile) ? 'first' : 'last';
    },

    isMobile(){
      return this.$vuetify.breakpoint.mobile;
    },



    croppedFile() {
      return new File([this.cropImg], this.file.name, { type: this.file.type });
    },
    cropSrc() {
      return this.cropImg
    },

    fullnameLabel () {
      return this.$i18n.t('Full-name');
    },

    colorLabel () {
      return this.$i18n.t('Colour');
    },

    colorHint () {
      return this.$i18n.t('Colour_Hint');
    },

    iconDistance () {
      return icons.map(icon => ({
        icon,
        distance: Math.max(
          distance(this.search, icon.name),
          ...icon.aliases.map(v => distance(this.search, v))
        ),
      }))
    },

    filteredIcons () {
      // if (!icons.length || !this.search) return []
      if (!this.search) return icons


      const items = this.iconDistance
        .filter(v => v.distance > 0.7)
        .sort((a, b) => {
          return b.distance - a.distance
        })
      return items.map(v => v.icon)
    },

    untouched() {
      return JSON.stringify(this.originalAvatarData) === JSON.stringify(this.avatarData)
    },

    // i18n
    colourLabel () {
      return this.$i18n.t('colour-label');
    },
    colourHint () {
      return this.$i18n.t('colour-hint');
    },
    iconLabel () {
      return this.$i18n.t('Icon');
    },
    iconHint () {
      return this.$i18n.t('Icon_Hint');
    },
    imageLabel () {
      return this.$i18n.t('Image');
    },
    imageHint () {
      return this.$i18n.t('Image_hint');
    },
    onlineStatusLabel () {
      return this.$i18n.t('Online_Status');
    },
    onlineStatusHint () {
      return this.$i18n.t('Online_Status_hint');
    },
  },

  methods: {
    ...mapActions({
      load: 'me/load',
      updateMe: 'me/updateMe'
    }),

    /**
     * Submit the updated Avatar to the Store.
     *
     * @return {Promise<void>}
     */
    async submit () {
      try {
        const avatar = {
          icon: this.iconLocal,
          colour: this.colourLocal,
          onlineStatus: this.onlineStatusLocal,
        };

        const update = {
          avatar: avatar
        };

        this.submitting = true;
        const updated = await this.updateMe(update);
        this.submitting = false;

        console.log(`UPDATE AVATAR - UPDATED`);

        // this.cancel();
        this.$emit('close');


      } catch (error) {
        console.log(error);
      }
    },

    cancel () {
      this.$emit('close');
    },

    /**
     * @param colour
     */
    changeColour (colour = undefined) {
      console.log(`## UPDATE AVATAR - CHANGE TO ${colour}`);
      this.colourLocal = colour;
    },

    resetColor() {
      console.log(`## UPDATE AVATAR - RESET COLOUR`);
      this.colorLocal = undefined;
    },


    /**
     * @param icon
     */
    changeIcon (icon = undefined) {
      console.log(`## UPDATE AVATAR - CHANGE INPUT ICON TO ${icon}`);
      this.iconLocal = icon;
    },

    /**
     * @param onlineStatus
     */
    changeOnlineStatus (onlineStatus = false) {
      console.log(`## UPDATE AVATAR - CHANGE INPUT ONLINE STATUS TO ${onlineStatus}`);
      this.onlineStatusLocal = onlineStatus;
    },

    // AXE IT

    removeImage(){
      this.avatarData.avatar = ''
    },

    handleSave(){
      // this.updateMe({
      //   ...this.me,
      //   avatarData: this.avatarData,
      //
      // })

      // this.robotAssistant.show = false
      // this.robotAssistant.status = ''
    },
    // closeRobot(){
    //   this.robotAssistant.show = false
    //   this.robotAssistant.status = ''
    //   this.robotAssistant.dismissed = true
    // },
    // closeTourRobot(){
    //   this.robotTour.show = false
    // },

    setImageUrl() {
      // https://cdn.vuetifyjs.com/images/john.png
      this.avatarData.avatar = this.imageUrl
      this.closeImageDialog()
    },

    setImage(files) {
      // const file = e;

      const file = files[0];
      // this.file = file
      // const filename = file.name;

      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
          this.$emit("update:dataUrl", this.imgSrc);
        };

        reader.readAsDataURL(file);


      } else {
        alert("Sorry, FileReader API not supported");
      }
    },


    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      // this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()

      this.avatarData.avatar = this.$refs.cropper.getCroppedCanvas().toDataURL()

      this.$refs.cropper
        .getCroppedCanvas({
          maxWidth: 1920,
          maxHeight: 1200
        })
        .toBlob(
          blob => {
            this.cropImg = URL.createObjectURL(blob);
            this.croppedBlob = blob;
            this.$emit("update:objectUrl", this.cropImg);
          },
          "image/jpeg",
          0.95
        );

      this.closeImageDialog()
    },
    rotate(dir) {
      if (dir === "r") {
        this.$refs.cropper.rotate(90);
      } else {
        this.$refs.cropper.rotate(-90);
      }
    },
    flip(vert) {
      let { scaleX, scaleY, rotate } = this.$refs.cropper.getData();
      // when image is rotated, direction must be flipped
      if (rotate === 90 || rotate === 270) {
        vert = !vert;
      }
      if (vert) {
        this.$refs.cropper.scale(scaleX, -1 * scaleY);
      } else {
        this.$refs.cropper.scale(-1 * scaleX, scaleY);
      }
    },

    // addIconRules(){
    //   if ( this.avatarData.icon !== '' && this.iconSelected !== this.search ) {
    //     this.iconRules = [
    //       // 'The Icon must be selected from the list', // @todo make i18n compat
    //     ]
    //   } else {
    //     this.iconRules = []
    //   }
    // },
    //
    // removeIconRules(){
    //   this.iconRules = []
    // },

    toggleIconMenu(){
      if (this.filteredIcons.length > 0 && !this.menu ) {
        this.menu = true
      }
    },

    closeImageDialog(){
      this.imgSrc = ''
      this.imageUrl = ''
      this.imageUrlText = ''

      this.addImageDialog = false
    },

    selectIcon (item) {
      this.search = item.name
      this.avatarData.icon = `mdi-${item.name}`
      this.iconSelected = item.name
      this.menu = false

    },





    resetIcon () {
      this.menu = false
      this.avatarData.icon = ''
      this.search = ''
      this.iconSelected = ''
    },



    resetForm () {
      // this.$refs.form.reset();
      this.$refs.form.resetValidation();

      this.formValid = true;

    },


  },


}
</script>

<style>
.v-sheet.v-card:not(.v-sheet--outlined) {
  border-radius: 0;
  box-shadow: none;
}
</style>
