<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-chat-details :chat-id="chatId" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Chat",
  layout: 'admin',

  computed: {
    ...mapGetters({

    }),

    chatId () {
      return this.$route.params.chatId || undefined;
    },
  }
}
</script>
