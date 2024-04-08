<!--
Me - CreateProfileChat

A smart component that enables the Me Profile to join a Chat.
-->
<template>
  <v-card :loading="loading">

    <v-card-title>
      <v-icon left>mdi-forum</v-icon>
      {{ $t('me-create-profile-chat') }}
      <v-spacer />
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>

    </v-card-title>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('create-profile-chat-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>


    <!-- the form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <chats-select :value="chatIdLocal" @change="changeChatId" />
        </v-col>
      </v-row>
    </v-container>

    <!-- the submit  -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-btn large block
                 @click="submit">
            {{ $t('me-create-profile-chat') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateProfileChat",

  methods: {
    ...mapActions({
      createProfileChat: 'me/createProfileChat',
    }),

    /**
     * Change the local chatId.
     *
     * @param chatId {string|undefined}
     * @returns {Promise<void>}
     */
    async changeChatId (chatId = undefined) {
      this.chatIdLocal = chatId;
    },

    /**
     * Submit the form - join the Chat.
     *
     * @returns {Promise<void>}
     */
    async submit () {
      if (! this.chatIdLocal) {
        return;
      }

      const profileChatToCreate = {
        chatId: this.chatIdLocal,
      };

      const creatingProfileChat = await this.createProfileChat(profileChatToCreate);
      const {executionArn, startDate} = creatingProfileChat;

      this.executionArn = executionArn;
      this.startDate = startDate;
    },
  },

  computed: {
    ...mapGetters({
      loading: 'me/loading',
    })
  },

  data: () => ({
    chatIdLocal: undefined,

    showHelp: true,
  }),
}
</script>
