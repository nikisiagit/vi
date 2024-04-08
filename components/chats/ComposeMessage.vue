<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-form autocomplete="off" v-model="valid" ref="form" lazy-validation>


        <v-row no-gutters>
          <v-col cols="auto" align-self="center">
            <v-btn icon @click="sendVoiceMessage" color="primary">
              <v-icon class="scale-icon">
                mdi-microphone
              </v-icon>
            </v-btn>
          </v-col>
          <v-col >
            <v-textarea
              auto-grow
              rows="1"
              row-height="15"
              v-model.trim="message"
              dense
              placeholder="Type message"
              type="text"
              filled
              hide-details
              rounded
            ></v-textarea>
          </v-col>
          <v-col cols="auto" align-self="center">
            <v-btn icon @click.stop="toggleDialogEmoji" color="primary" >
              <v-icon class="scale-icon">
                mdi-emoticon-outline
              </v-icon>
            </v-btn>
          </v-col>

          <v-col cols="auto" align-self="center">
            <v-btn icon @click="openAttachment" color="primary" >
              <v-icon class="scale-icon">
                mdi-paperclip
              </v-icon>
            </v-btn>
          </v-col>

          <v-col cols="auto" align-self="center">
            <v-btn icon @click="sendMessage" color="primary" :disabled="! message">
              <v-icon class="scale-icon">
                mdi-send
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>

      </v-form>

      <!-- Emoji picker -->
      <VEmojiPicker
        v-show="showEmojiDialog"

        :style="{
          position: 'absolute',
          zIndex: 1,
          bottom: '3.4rem',
          right: '1rem'
          // width: '100%'
        }"

        :dark="true"
        :show-search="false"
        @select="onSelectEmoji"
      />
      <!-- -->

      <!-- upload files-images attachments-resources -->
      <v-menu
        v-model="showAttachmentsMenu"
        :activator="selectedElement"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
        transition="slide-y-transition"
        top
      >
        <v-card>
          <v-card-text class="pa-0">
            <v-list>
              <v-list-item @click="openResourcesDialog">
                <v-list-item-avatar>
                  <v-icon>mdi-file-multiple</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    Choose from Resources
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="openUploadFileDialog">
                <v-list-item-avatar>
                  <v-icon>mdi-upload</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    Upload from my computer
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list>
          </v-card-text>

        </v-card>
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
  name: 'ComposeMessage',
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
      uploadFileDialog: false
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
