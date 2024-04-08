<template>
  <v-card>

    <v-list>
      <v-slide-y-transition
        group
      >
        <chats-messages-list-item-with-name
          v-for="message in messages"
          :key="message.messageId"
          :message-id="message.messageId"


        />
      </v-slide-y-transition>
    </v-list>
  </v-card>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: 'MessagesListName',
  data(){
    return {
      messages: [
        {
          messageId: '45312',
          from: 'me',
          seen: true,

        },
        {
          messageId: '8984',
          from: 'you',
          seen: false,

        },
        {
          messageId: '12345',
          from: 'me',
          seen: true,

        },
      ],
    }
  },
  methods: {
    add(){
      this.messages.push( {
        messageId: Math.random(),
        from: 'you',
      })
    },
  }
}
</script>

