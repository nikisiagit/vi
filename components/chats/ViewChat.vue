<!--
Venue App - View specific Chat details - Messages.

This smart component renders the messages and manage the chat itself for the Chats module.
-->
<template>
  <v-card :flat="publicChat" :loading="loading" height="100%">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <chats-chat-detail-toolbar
      v-if="loaded && !publicChat"
      :title="getProfile(toolbarInfo) && getProfile(toolbarInfo).fullname"
      :text="chat.descriptionId"
      :icon="chat.icon"
      :color="chat.color"
      :avatar="getProfile(toolbarInfo).avatar && getProfile(toolbarInfo).avatar.image"
      datetime=""
    >
      <!-- append back button to the toolbar -->
      <template v-slot:toolbar-after>
        <v-btn icon class="ml-auto" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <!-- -->

    </chats-chat-detail-toolbar>

    <v-card rounded="0" flat :height="publicChat ? '100%': null">
      <v-container fluid style="height: 100%; display: grid; padding: 0;">

        <v-row v-if="publicChat">
          <v-col>
            <chats-chat-filters @user-filter-change="changeUserFilters"></chats-chat-filters>

          </v-col>
        </v-row>

        <v-slide-x-reverse-transition mode="out-in">
          <v-row no-gutters key="standard" v-if="chatUserFilterSelected === 'Moderated'">
            <v-col class="d-flex flex-column">
              <v-responsive :height="publicChat ? 'calc(100vh - 320px)':'calc(100vh - 260px)'" class="overflow-y-auto" style="position: relative">
                <!-- debug and remove after -->
                <!--              <h4 v-if="languageIdSelected">Language selected: {{ languageIdSelected }}</h4>-->
                <!-- debug and remove after -->

                <!-- pinned chats-->
                <chats-messages-list-item-with-seen
                  v-if="publicChat"
                  align-to="left"
                  :avatar="{ image: 'https://cdn.hubilo.com/speaker/2116606/150/1549_8254_024241001636454559.png' }"
                  fullname="Marvin McKinney"
                  :text="'The live sessions will start in a little less than 8 hours.'"
                  :datetime="'2022-09-06T07:20:35.761Z'"
                  style="position: sticky;top: 0px;z-index: 9999;"
                  pinned
                />
                <!--/ pinned chats -->


                <template v-if="publicChat">
                  <chats-messages-list-item-with-seen
                    align-to="left"
                    :avatar="{ image: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }"
                    fullname="Kiara Howard"
                    :text="'Can someone help me please?'"
                    :datetime="'2022-09-06T16:05:35.761Z'"
                  />

                  <chats-messages-list-item-with-seen
                    align-to="left"
                    :avatar="{ image: 'https://silicon.createx.studio/assets/img/team/25.jpg' }"
                    fullname="Albert McKinney"
                    :text="'How do I find presentations?'"
                    :datetime="'2022-09-06T14:41:35.761Z'"
                  />
                </template>


                <chats-messages-list
                  v-if="loaded"
                  :messages="messages"
                  private-chat
                />

              </v-responsive>


              <small class="text--disabled ml-3"  v-if="publicChat">
                <v-icon small>
                  mdi-shield-check
                </v-icon>
                This chat is moderated.
              </small>

              <chats-compose-message-advanced
                @send-message="sendMessage"
                @change-language="languageChanged"
              />
            </v-col>
          </v-row>

          <v-row no-gutters  key="moderation" v-else>

            <v-col class="d-flex flex-column">
              <v-responsive :height="publicChat ? 'calc(100vh - 295px)':'calc(100vh - 308px)'" class="overflow-y-auto">
                <chats-messages-list-item-with-seen
                  align-to="left"
                  :avatar="{ image: 'https://silicon.createx.studio/assets/img/team/30.jpg' }"
                  fullname="John Howard"
                  :text="'Happy to be in the Event.'"
                  :datetime="'2022-09-06T09:05:35.761Z'"

                  moderation-mode
                />
              </v-responsive>
            </v-col>
          </v-row>
        </v-slide-x-reverse-transition>

      </v-container>
    </v-card>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ViewChat",
  props: {
    chatId: {
      type: String
    },
    noToolbar: {
      type: Boolean
    },
    publicChat: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    viewChatDialog: false,
    languageIdSelected: null,

    chatUserFilterSelected: 'Moderated'
  }),

  methods: {
    ...mapActions({
      load: 'me/chats/load',
      sendMessageToChat: 'chats/sendMessage',
      setLanguage: 'chats/setLanguage',
    }),

    changeUserFilters(val){
      this.chatUserFilterSelected = val
    },

    sendMessage(message) {
      this.sendMessageToChat({
        chatId: this.chatId,
        message: {
          profileId: this.profileId,
          fullname: this.fullname.value,
          avatar: this.avatar?.value,
          text: message,
          datetime: new Date().toISOString()
        }
      });
    },

    close(){
      this.$emit('close')
    },

    languageChanged(languageId){
      this.languageIdSelected = languageId;
      this.setLanguage({
        chatId: this.chatId,
        languageId
      });
    },

    getProfile (profileId) {
      return this.userWithUserId(profileId) || {}
    },
  },

  computed: {
    ...mapGetters({
      loading: 'me/chats/loading',
      loaded: 'me/chats/loaded',
      chatWithChatId: 'me/chats/chatWithChatId',
      me: 'me/me',

      userWithUserId: 'apps/admin/users/userWithUserId'
    }),

    chat () {
      return this.chatId ? this.chatWithChatId(this.chatId) : {};
    },

    messages () {
      return (this.chat) ? this.chat.messages : [];
    },

    toolbarInfo () {
      return (this.messages) ? this.chat.messages[0].profileId : undefined;
    },

    name () {
      return (this.me) ? this.me.name : undefined;
    },

    profileId () {
      return (this.me) ? this.me.profileId : undefined;
    },

    fullname () {
      return (this.me) ? this.me.fullname : undefined;
    },

    avatar () {
      return (this.me) ? this.me.avatar : undefined;
    },
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }

    if (this.chatId) {
      await this.setLanguage({
        chatId: this.chatId,
        languageId: `language:demo:en`
      });
    }
  }
}
</script>
