<template>
  <v-list v-if="numberOfChats > 0">
    <apps-admin-chat-nav-list-item
      v-for="chat in chats"
      :key="chat.chatId"
      :chat-id="chat.chatId"
    />
  </v-list>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "List",

  methods: {
    ...mapActions({
      load: 'apps/admin/chats/load',
      reload: 'apps/admin/chats/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/chats/loading',
      loaded: 'apps/admin/chats/loaded',
      error: 'apps/admin/chats/error',
      chats: 'apps/admin/chats/chats',
      numberOfChats: 'apps/admin/chats/numberOfChats',
    })
  },
}
</script>
