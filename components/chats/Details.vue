<!--
Venue App - Chats Details

This smart component renders the main UI for the Chats module.
-->
<template>
  <v-card flat :loading="loading" height="93%">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

<!--    <v-toolbar flat>-->
<!--      <v-icon left>mdi-pound</v-icon>-->

<!--      <v-toolbar-title>-->
<!--        {{ $t('chats') }} ({{ numberOfChats }})-->
<!--      </v-toolbar-title>-->

<!--      <v-spacer />-->

<!--      <v-btn icon @click="reload" :loading="loading" :disabled="loading">-->
<!--        <v-icon>mdi-reload</v-icon>-->
<!--      </v-btn>-->

<!--    </v-toolbar>-->

    <v-container fluid style="height: calc(100vh - 88px)">
      <v-row>
        <v-col>
          <v-tabs

            centered
            class="mb-2"
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tabs >
              <v-tab>
                Private
              </v-tab>
              <v-tab disabled>
                Public
              </v-tab>
            </v-tabs>
          </v-tabs>

          <chats-list :chat-id="chatId" @change-chat-id="chatIdChanged"/>
        </v-col>
      </v-row>

      <v-navigation-drawer
        v-model="viewChatDialog"
        width="100%"
        absolute
      >
        <chats-view-chat :chat-id="chatId" @close="viewChatDialog = false;"/>
      </v-navigation-drawer>
    </v-container>

    <!-- ViewChat -->
<!--    <v-dialog v-model="viewChatDialog" max-width="1000px" overlay-color="accent">-->
<!--      <chats-view-chat :chat-id="chatId" @close="viewChatDialog = false;"/>-->
<!--    </v-dialog>-->
    <!-- /ViewChat -->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ChatsDetails",

  data: () => ({
    viewChatDialog: false,
    chatId: undefined,
  }),

  methods: {
    ...mapActions({
      reload: 'chats/reload',
    }),

    chatIdChanged(chatId){
      if (chatId) {
        this.chatId = chatId
        this.openViewChatDialog()
      }
    },
    closeChat(){
      this.chatId = undefined
    },

    openViewChatDialog(){
      this.viewChatDialog = true;
    },
  },

  computed: {
    ...mapGetters({
      loading: 'chats/loading',
      loaded: 'chats/loaded',
      numberOfChats: 'chats/numberOfChats',
    })
  },
}
</script>
