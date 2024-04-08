<!--
Admin - Chat Nav List Item

A smart component that renders the Chat as a Nav List Item.
-->
<template>
  <v-list-item nuxt
               ripple
               :to="{name: 'apps-admin-chats-chatId', params: {chatId: chatId}}">
    <v-list-item-avatar>
      <apps-admin-chat-avatar :chat-id="chatId" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ chatId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('admin-chat-chat-id') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "NavListItem",

  props: {
    chatId: {
      type: String,
      required: true,
    },
  },

  watch: {
    chatId: {
      handler () {

      }
    },
  },
}
</script>
