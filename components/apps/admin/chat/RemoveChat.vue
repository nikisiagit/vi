<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-delete</v-icon>
      {{ $t('remove-chat')}}
    </v-card-title>
    <v-card-subtitle>{{ $t('remove-chat') }}</v-card-subtitle>

    <v-card-text>
      <v-container fluid>
        <v-list two-line>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="removingChatInProgress" @click="cancel()">{{ $t('cancel') }}</v-btn>
      <v-spacer />
      <v-btn :loading="removingChatInProgress" @click="confirm">{{ $t('remove') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RemoveChat",
  props: {
    chatId: {
      type: String,
    }
  },

  data: () => ({
    executionArn: undefined
  }),

  async created() {
    if (! this.loaded && !this.loading) {
      await this.load();
    }
  },

  watch: {
    chatId() {
      if (! this.loaded && !this.loading) {
        this.load();
      }
    },
    async removingChat(removingChat) {
      console.log("removingChatInWatch", removingChat);

      // if the chat has been removed, then close the component
      if (removingChat && removingChat.removing === false) {
        this.reset();
        await this.$router.push({
          name: 'apps-admin-chats'
        });
        this.$emit('close');
      }
    }
  },

  methods: {
    ...mapActions({
      loadChatWithChatId: 'apps/admin/chats/loadChatWithChatId',
      removeChatWithChatId: 'apps/admin/chats/removeChatWithChatId'
    }),

    load () {
      console.log("load");
      if (this.chatId) {
        console.log("loadChat");
        this.loadChatWithChatId(this.chatId);
      }
    },

    reload () {
      if (this.chatId) {
        this.loadChatWithChatId(this.chatId);
      }
    },

    reset() {
      this.executionArn = undefined;
    },

    cancel() {
      this.reset();
      this.$emit('close');
    },

    async confirm() {
      try {
        const {chatId} = this.chat;
        console.log("chatId", chatId);

        await this.removeChatWithChatId(chatId);

        const {executionArn} = await this.removeChatWithChatId(chatId);
        console.log("executionArn", executionArn);
        this.executionArn = executionArn;
      } catch (error) {
        console.log(error);
        const removingChat = undefined;
      }
    }
  },

  computed: {
    ...mapGetters({
      chatWithChatId: 'apps/admin/chats/chatWithChatId',
      removingChatWithExecutionArn: 'apps/admin/chats/removingChatWithExecutionArn'
    }),

    /**
     * Return the removingChat.
     *
     * @return {*|undefined}
     */
    removingChat() {
      return (this.executionArn) ? this.removingChatWithExecutionArn(this.executionArn) : undefined;
    },

    removingChatInProgress() {
      return this.removingChat && this.removingChat.removing;
    },

    chat () {
      if (this.chatId) {
        return this.chatWithChatId(this.chatId);
      }
    },

    name () {
      return (this.chat) ? this.chat.name : undefined;
    },

    loaded () {
      if (this.chat) {
        return this.chat.loaded || false;
      }
      return false;
    },

    loading () {
      if (this.chat) {
        return this.chat.loading || false;
      }
      return false;
    },

    removing () {
      return (this.chat) ? this.chat.removing : false;
    },

    removed () {
      return (this.chat) ? this.chat.removed : false;
    }
  },
}
</script>
