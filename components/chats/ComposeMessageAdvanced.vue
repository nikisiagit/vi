<template>
  <v-card flat>
    <v-card-text class="pa-0">
      <v-form autocomplete="off" v-model="valid" ref="form" lazy-validation>


        <v-row no-gutters>
          <v-col class="pa-2">
            <v-textarea
              auto-grow
              rows="1"
              row-height="15"
              v-model.trim="message"
              @keyup.enter="sendMessage"
              dense
              :placeholder="placeholder"
              type="text"
              filled
              hide-details
              rounded
            ></v-textarea>
          </v-col>

        </v-row>

        <v-row no-gutters>
          <v-col cols="12">
            <chats-compose-message-toolbar :toolbar-attributes="{ color: 'transparent', flat: true }" >
              <template v-slot:left-actions>

                <template v-if="!qaMode">
                  <v-btn icon disabled @click="sendVoiceMessage" color="primary">
                    <v-icon class="scale-icon">
                      mdi-microphone
                    </v-icon>
                  </v-btn>

                  <v-btn icon disabled @click="openAttachment" color="primary" >
                    <v-icon class="scale-icon">
                      mdi-paperclip
                    </v-icon>
                  </v-btn>

                  <v-btn icon  @click.stop="toggleDialogEmoji" color="primary" >
                    <v-icon class="scale-icon">
                      mdi-emoticon-outline
                    </v-icon>
                  </v-btn>
                </template>

                <v-btn rounded text @click="openUpdateLanguageDialog" color="primary">
                  <v-icon class="scale-icon" :left="languageIdSelected !== null">
                    mdi-translate
                  </v-icon>

                  {{ languageIdSelected.split(':')[2] }}
                </v-btn>

              </template>

              <template v-slot:right-actions>

                <v-btn text v-if="cancelBtn" rounded @click="$emit('cancel')">
<!--                  <v-icon left>mdi-close</v-icon>-->
                  Cancel
                </v-btn>

                <v-btn icon @click="sendMessage" color="primary" :disabled="! message">
                  <v-icon class="scale-icon">
                    mdi-send
                  </v-icon>
                </v-btn>
              </template>
            </chats-compose-message-toolbar>
          </v-col>
        </v-row>

      </v-form>

      <!-- Emoji picker -->
      <VEmojiPicker
        v-show="showEmojiDialog"

        :style="{
          position: 'absolute',
          zIndex: 1,
          bottom: '7.4rem',

          width: '100%'
        }"

        :dark="false"
        :show-search="false"
        @select="onSelectEmoji"
      />
      <!-- -->

      <!-- Alternative language menu selector  -->
<!--      <v-menu-->
<!--        v-model="showAttachmentsMenu"-->
<!--        :activator="selectedElement"-->
<!--        :close-on-content-click="true"-->
<!--        :nudge-width="380"-->
<!--        offset-y-->
<!--        transition="slide-y-reverse-transition"-->
<!--        top-->

<!--        nudge-left="50"-->
<!--        nudge-top="20"-->
<!--      >-->
<!--        <v-card>-->
<!--          <v-card-text class="pa-0">-->
<!--            <v-list>-->
<!--              <v-list-item @click="openResourcesDialog">-->
<!--                <v-list-item-avatar>-->
<!--                  <v-icon>mdi-file-multiple</v-icon>-->
<!--                </v-list-item-avatar>-->
<!--                <v-list-item-content>-->
<!--                  <v-list-item-title>-->
<!--                    Choose from Resources-->
<!--                  </v-list-item-title>-->
<!--                </v-list-item-content>-->
<!--              </v-list-item>-->

<!--              <v-list-item @click="openUploadFileDialog">-->
<!--                <v-list-item-avatar>-->
<!--                  <v-icon>mdi-upload</v-icon>-->
<!--                </v-list-item-avatar>-->
<!--                <v-list-item-content>-->
<!--                  <v-list-item-title>-->
<!--                    Upload from my computer-->
<!--                  </v-list-item-title>-->
<!--                </v-list-item-content>-->
<!--              </v-list-item>-->

<!--            </v-list>-->
<!--          </v-card-text>-->

<!--        </v-card>-->
<!--      </v-menu>-->
      <!-- -->

      <!-- upload files-images attachments-resources -->
      <v-menu
        v-model="updateLanguageDialog"
        :activator="selectedElement"
        :close-on-content-click="true"
        :nudge-width="380"
        max-height="300"

        transition="slide-y-reverse-transition"
        top
        nudge-top="100"
        nudge-left="160"
        content-class="elevation-4"
      >
        <languages-list
          :language-id="languageIdSelected"
          @change-language="messageLanguageChanged"
        ></languages-list>
      </v-menu>
      <!-- -->

      <!-- Upload Files Dialog -->
      <v-dialog v-model="uploadFileDialog" max-width="800px">
        <chats-upload-file
          @close="uploadFileDialog = false;"
          @upload="uploadFile"
        />
      </v-dialog>
      <!-- -->


      <!-- Update Language Dialog -->
<!--      <v-dialog v-model="updateLanguageDialog" max-width="800px">-->
<!--        <chats-update-language-->
<!--          @close="updateLanguageDialog = false;"-->
<!--          @change-language="messageLanguageChanged"-->
<!--        />-->
<!--      </v-dialog>-->
      <!-- -->

    </v-card-text>
  </v-card>
</template>

<script>
/**
 * https://github.com/joaoeudes7/V-Emoji-Picker
 * @Prop({ default: () => [] }) customEmojis!: IEmoji[];
 * @Prop({ default: () => [] }) customCategories!: ICategory[];
 * @Prop({ default: 15 }) limitFrequently!: number;
 * @Prop({ default: 5 }) emojisByRow!: number;
 * @Prop({ default: false }) continuousList!: boolean;
 * @Prop({ default: 32 }) emojiSize!: number;
 * @Prop({ default: true }) emojiWithBorder!: boolean;
 * @Prop({ default: true }) showSearch!: boolean;
 * @Prop({ default: true }) showCategories!: boolean;
 * @Prop({ default: false }) dark!: boolean;
 * @Prop({ default: "Peoples" }) initialCategory!: string;
 * @Prop({ default: () => [] as ICategory[] }) exceptCategories!: ICategory[];
 * @Prop({ default: () => [] as Emoji[] }) exceptEmojis!: IEmoji[];
 * @Prop({}) i18n!: Object;
 */
import { VEmojiPicker } from "v-emoji-picker";

export default {
  name: 'ComposeMessageAdvanced',
  props: {
    qaMode: {
      type: Boolean,
    },
    cancelBtn: {
      type: Boolean,
    },
    placeholder: {
      type: String,
      default: 'Type message'
    },
  },
  components: {
    VEmojiPicker
  },
  data(){
    return {
      valid: true,
      message: '',
      showEmojiDialog: false,

      showAttachmentsMenu: false,
      selectedElement: null,
      uploadFileDialog: false,
      updateLanguageDialog: false,

      languageIdSelected: 'language:demo:en',  //@todo: pick from the venue default language.
    }
  },
  methods: {
    sendMessage () {
      if ( ! this.message) return

      this.$emit('send-message', this.message)
      // this.$emit('send-message', {
      //   message: this.message,
      //   profileName: 'Luis Carbajal',
      //   createdAt: "12:22 PM"
      // })

      this.clearMessage()
    },
    clearMessage () {
      this.message = ''
    },

    sendVoiceMessage(){},

    openAttachment(event){
      this.selectedElement = event.target
      this.showAttachmentsMenu = true
    },

    /**
     * Open/Closes Emoji Dialog.
     */
    toggleDialogEmoji() {
      this.showEmojiDialog = !this.showEmojiDialog;
    },
    onSelectEmoji(emoji) {
      if (! this.message)
        this.message += `${ emoji.data }`
      else
        this.message += ` ${ emoji.data }`

      this.toggleDialogEmoji();
    },

    emojiAway(){
      if (this.showEmojiDialog)
        this.showEmojiDialog = false
    },

    openUploadFileDialog(){
      // open upload files dialog
      this.uploadFileDialog = true;

      // close menu
      this.showAttachmentsMenu = false
    },

    openResourcesDialog(){},

    uploadFile(){
      //@todo: ... handle the upload file

      // close upload files dialog after the file was uploaded successfully
      this.uploadFileDialog = false;
    },

    openUpdateLanguageDialog(event){
      // open upload language menu
      this.selectedElement = event.target
      this.updateLanguageDialog = true
    },

    messageLanguageChanged(languageId) {
      this.$emit('change-language', languageId)
      this.languageIdSelected = languageId
    }
  },
}
</script>

<style lang="scss">
.emoji-picker #Categories{
  .category.active {
    border-bottom: 3px solid var(--v-primary-base) !important;
  }
}

.scale-icon:hover {
  transform: scale(1.1);
}
</style>
