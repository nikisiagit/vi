<template>
  <v-list-item
    link
    :value="chatId"
    :class="{'v-list-item--active primary--text': isActive}"
  >
    <v-list-item-icon class="mr-2">
      <chat-avatar :chat-id="chatId" :avatar="profileAvatarFromChatSender"/>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ profileTitleFromChatSender }} <small>- {{ formatDate(datetimeFromLastMessage) }}</small></v-list-item-title>
      <v-list-item-subtitle>
       <span v-if="lastMessageIsFromMe">You:</span> {{ textFromLastMessage }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon disabled>
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
<!--      <v-list-item-action-text>-->
<!--        {{ $t('join') }}-->
<!--      </v-list-item-action-text>-->
    </v-list-item-action>

  </v-list-item>
</template>

<script>
import dayjs from "dayjs";

// var advancedFormat = require('dayjs/plugin/advancedFormat');
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ListItem",

  props: {
    chatId: {
      type: String,
      required: true,
    },

    // @luis - what does this mean?
    isActive: {
      type: Boolean,
      default: false
    },
  },

  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  watch: {
    chatId: {
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading) {
            this.load();
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      loadChatWithChatId: 'me/chats/loadChatWithChatId',
    }),

    async load () {
      return await (this.chatId) ? this.loadChatWithChatId(this.chatId) : undefined;
    },

    formatDate(date){
      return dayjs(date).fromNow() //.split(' ')
      // const time = fromNow[3] ? fromNow[1] : fromNow[0]
      // const del = (fromNow[3] ? fromNow[2] : fromNow[1])
      // const ago = fromNow[3] || fromNow[2]

      // return `${time}${del} ${ago}`
    },
  },

  computed: {
    ...mapGetters({
      me: 'me/me',

      chatWithChatId: 'me/chats/chatWithChatId',

      userWithUserId: 'apps/admin/users/userWithUserId'
    }),

    // My profile /me
    profileId () {
      return (this.me) ? this.me.profileId : undefined;
    },

    chat () {
      return (this.chatId) ? this.chatWithChatId(this.chatId) : undefined;
    },

    messages () {
      return (this.chat) ? this.chat.messages : [];
    },

    lastMessage () {
      return (this.messages) ? [...this.chat.messages].pop() : undefined;
    },

    lastMessageIsFromMe () {
      return (this.lastMessage) ? [...this.chat.messages].pop()?.profileId === this.profileId : undefined;
    },

    profileIdFromLastMessage () {
      return (this.lastMessage) ? this.lastMessage?.profileId : undefined;
    },

    textFromLastMessage () {
      return (this.lastMessage) ? this.lastMessage?.text : undefined;
    },

    datetimeFromLastMessage () {
      return (this.lastMessage) ? this.lastMessage?.datetime : undefined;
    },

    profileFromChatSender () {
        const senderMsg = this.messages.find(m => m.profileId !== this.profileId)
      return (this.messages) ? this.userWithUserId(senderMsg?.profileId): undefined;
    },

    profileTitleFromChatSender () {
      return (this.profileFromChatSender) ? this.profileFromChatSender?.fullname : undefined;
    },

    profileAvatarFromChatSender () {
      return (this.profileFromChatSender) ? this.profileFromChatSender?.avatar?.image : undefined;
    },

  }

}
</script>
