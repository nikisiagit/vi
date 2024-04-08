<template>
  <v-card>
    <v-card-title>
      <v-icon left>
        mdi-message-text
      </v-icon>

      Conversations / Chats

      <v-spacer></v-spacer>

      <v-fade-transition leave-absolute>
        <v-hover
          v-show="chatIdSelected"
          v-slot="{ hover }"
          open-delay="50"
        >
          <v-btn color="primary" @click="joinChat">
            Join

            <v-expand-x-transition>
              <v-icon right v-show="hover">
                mdi-arrow-right
              </v-icon>
            </v-expand-x-transition>

          </v-btn>
        </v-hover>
      </v-fade-transition>


    </v-card-title>

    <v-card-text>
      <!-- Test transitions -->
      <v-btn @click="add" block large>
        <v-icon left>mdi-plus</v-icon>
        Add chat message
      </v-btn>
      <!-- -->


      <v-list>
        <v-list-item-group v-model="chatIdSelected">
          <v-slide-y-transition
            group
          >
            <chats-chat-list-item
              v-for="chat in chats"
              :key="chat.chatId"
              :chat-id="chat.chatId"
              :value="chat.chatId"

              :number-of-unseen-messages="chat.numberOfUnseenMessages"
              :is-active="chat.isActive"
            />
          </v-slide-y-transition>
        </v-list-item-group>

      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: 'ConversationsList',
  data(){
    return {
      chatIdSelected: null,

      chats: [
        {
          chatId: '45312',
          numberOfUnseenMessages: 1,
          isActive: false,

        },
        {
          chatId: '8984',
          numberOfUnseenMessages: 0,
          isActive: false,

        },
        {
          chatId: '12345',
          numberOfUnseenMessages: 2,
          isActive: false,
        },
      ],
    }
  },
  methods: {
    add(){
      this.chats.push( {
        chatId: Math.random(),
        numberOfUnseenMessages: 0,
        isActive: false,
      })
    },

    joinChat(){
      alert(`Joining chat: ${this.chatIdSelected}`)
    }

  }
}
</script>

