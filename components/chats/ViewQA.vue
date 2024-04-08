<!--
Venue App - View specific QA details - Messages.

This smart component renders the messages and manage the qa itself for the QA module.
-->
<template>
  <v-card flat :loading="loading" height="100%">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card rounded="0" flat height="100%">
      <v-container fluid style="height: 100%; display: grid; padding: 0;">

        <v-row>
          <v-col>
            <chats-QA-filters></chats-QA-filters>

          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col class="d-flex flex-column">
            <v-responsive :height="'calc(100vh - 295px)'" class="overflow-y-auto">
              <!-- debug and remove after -->
<!--              <h4 v-if="languageIdSelected">Language selected: {{ languageIdSelected }}</h4>-->
              <!-- debug and remove after -->

              <chats-messages-list-item-with-seen
                align-to="left"
                :avatar="{ image: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }"
                fullname="Kiara Howard"
                :text="'Can someone help me please?'"
                :datetime="'2022-09-06T16:05:35.761Z'"

                qa-mode
              />


              <chats-messages-list
                v-if="loaded"
                :messages="messages"
              />

            </v-responsive>

          </v-col>
        </v-row>
      </v-container>
    </v-card>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ViewQA",
  props: {
    chatId: {
      type: String
    },
    noToolbar: {
      type: Boolean
    },
  },

  data: () => ({
    viewChatDialog: false,
    languageIdSelected: null,
  }),

  methods: {
    ...mapActions({
      load: 'me/chats/load',
      sendMessageToChat: 'chats/sendMessage',
      setLanguage: 'chats/setLanguage',
    }),

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
