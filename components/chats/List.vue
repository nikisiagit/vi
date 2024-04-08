<template>

  <v-card flat :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

<!--    <v-card-title>-->
<!--      <v-icon left>mdi-pound</v-icon>-->
<!--      {{ $t('chats-list') }}-->
<!--    </v-card-title>-->

    <v-list>
      <v-list-item-group v-model="chatIdSelected">
        <v-fade-transition leave-absolute
                           group
        >
          <!-- 'chat:demo:TRRkh99YnbyjF5dJkuQqA', 'chat:demo:gRCTmyxSUfssnMwTovpYo' -->
          <chat-list-item v-for="chat in chats"
                          v-if="! ['chat:demo:Ig05jOGaNQTP8Asx2TY8J', 'chat:demo:Ij_523vnug-L6dSx77fc3'].includes(chat.chatId)"
                               :key="chat.chatId"
                               :chat-id="chat.chatId" />

        </v-fade-transition>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<!--        <chats-chat-list-item  v-if="false"-->
<!--          v-for="chat in chats"-->
<!--          :key="chat.chatId"-->
<!--          :chat-id="chat.chatId"-->
<!--          :value="chat.chatId"-->


<!--          :title="`${chat.name /* name or should be titleId */ }`"-->
<!--          :text="chat.descriptionId"-->
<!--          :icon="chat.icon"-->
<!--          :color="chat.color"-->
<!--          avatar=""-->
<!--          datetime=""-->
<!--        />-->


<script>
import dayjs from "dayjs";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ChatsList',
  props: {
    chatId: {
      type: String
    },
  },

  data (){
    return {
      chatIdSelected: null,
    }
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      return await this.load();
    }
  },

  watch: {
    loaded: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      }
    },

    chatIdSelected() {
      this.$emit('change-chat-id', this.chatId ? this.chatId :this.chatIdSelected)
    }
  },

  methods: {
    ...mapActions({
      load: 'me/chats/load',
    })
  },

  computed: {
    ...mapGetters({
      chats: 'me/chats/chats',
      loaded: 'me/chats/loaded',
      loading: 'me/chats/loading',
      error: 'me/chats/error',
    }),
  },
}
</script>
