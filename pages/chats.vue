<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <chats-details />
      </v-col>
    </v-row>

<!--    <v-row>-->
<!--      <v-col>-->
<!--        <chats-view chat-id="chat:eventheads:church-chat" />-->
<!--      </v-col>-->
<!--    </v-row>-->


    <div v-if="true" style="margin-top: 40rem">
      <v-row>
        <v-col cols="12">
          <h3>ChatList (compose of ChatListItem)</h3>
        </v-col>
        <v-col>
          <chats-chat-list

          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>ChatListItem - (Last Message inside a Chat)</h3>
          <chats-chat-list-item
            :number-of-unseen-messages="100"
            :is-active="false"

            :avatar="{ src: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' }"
            :datetime="'2022-09-27T15:39:31.255Z'"
            :title="'John Doe'"
            :text="'Yes my lord 👍'"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>ChatListItem with menu - (Last Message inside a Chat)</h3>
          <chats-chat-list-item-with-menu
            :number-of-unseen-messages="1"
            :is-active="false"

            :avatar="{ src: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' }"
            :datetime="'2022-09-27T15:39:31.255Z'"
            :title="'John Doe'"
            :text="'Yes my lord 👍'"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h3>MessagesList (compose of MessagesListItem)</h3>
        </v-col>
        <v-col>
          <chats-messages-list
            :messages="[
              {
                messageId: Math.floor(Math.random() * (100 - 1) + 1).toString(),
                from: 'you',
                text: 'Hi how are you?',
                datetime: '2022-09-06T23:41:35.761Z'

                // languageId: ''
              },
              {
                messageId: Math.floor(Math.random() * (100 - 1) + 1).toString(),
                from: 'me',
                text: 'all good, thanks',
                datetime: '2022-09-06T23:45:35.761Z'

                // languageId: ''
              },
            ]"
          />
        </v-col>
      </v-row>

      <v-row >
        <v-col>
          <h3>MessagesListItemDivider (Use to divide messages by date)</h3>
        </v-col>

        <v-col cols="12">
          <chats-messages-list-item-divider

          />
        </v-col>
      </v-row>

      <v-row >
        <v-col cols="12">
          <h3>Variation of MessagesListItem</h3>
        </v-col>

        <v-col cols="12">
          <chats-messages-list-item
            align-to="left"
          />
        </v-col>

        <v-col cols="12">
          <chats-messages-list-item
            align-to="right"
          />
        </v-col>
      </v-row>

      <v-row >
        <v-col cols="12">
          <chats-messages-list-item-with-seen
            align-to="right"
            :seen="true"


            :text="'There many variations of passages of Loream'"
            :datetime="'2022-09-06T23:41:35.761Z'"
          />
        </v-col>
        <v-col cols="12">
          <chats-messages-list-item-with-seen
            align-to="left"
            :seen="false"

            :text="'There many variations of passages of Loream'"
            :datetime="'2022-09-06T23:41:35.761Z'"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h3>ComposeMessage</h3>
        </v-col>
        <v-col >
          <!-- list conversations/chats -->
          <chats-compose-message
            @send-message="sendMessage"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h3>ComposeMessage Advanced</h3>
        </v-col>
        <v-col >
          <!-- list conversations/chats -->
          <chats-compose-message-advanced
            @send-message="sendMessage"
          />
        </v-col>
      </v-row>


<!--      <v-row class="mt-14">-->
<!--        <v-col cols="12">-->
<!--          <h3>Conversations component Composable of ChatList</h3>-->
<!--        </v-col>-->
<!--        <v-col>-->
<!--          &lt;!&ndash; list conversations/chats &ndash;&gt;-->
<!--          <chats-conversations-list-->

<!--          />-->
<!--        </v-col>-->
<!--      </v-row>-->

      <!--    <v-row>-->
      <!--      <v-col>-->
      <!--        &lt;!&ndash; list people &ndash;&gt;-->
      <!--        <chats-people-list />-->
      <!--      </v-col>-->
      <!--    </v-row>-->

      <v-row>
        <v-col cols="12">
          <h3>Avatar Group</h3>
        </v-col>
        <v-col >
          <!-- list conversations/chats -->
          <chats-avatar-group

          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h3>MessagesListItemWithName</h3>
        </v-col>
        <v-col >
          <chats-messages-list-item-with-name

          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h3>MessagesListName</h3>
        </v-col>
        <v-col >
          <chats-messages-list-name

          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>Chat Detail Toolbar</h3>
          <chats-chat-detail-toolbar
            :title="`Nikita Smith`"
            :avatar="'https://cdn.vuetifyjs.com/images/lists/2.jpg'"
          >

            <template v-slot:toolbar-after>
              <v-spacer></v-spacer>
              <chats-avatar-group />

              <v-btn icon>
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>

          </chats-chat-detail-toolbar>
        </v-col>
      </v-row>
    </div>


  </v-container>

</template>

<script>
export default {
  name: 'chats',
  data(){
    return {
      messages: [
        {
          text: 'Hey! Very good and educative session 👍️',
          profileName: 'Luis Carbajal',
          createdAt: '12 min ago'
        },
        {
          text: 'Hey!',
          profileName: 'Nik Oz',
          createdAt: '15 min ago'
        },
        {
          text: 'Cool beans',
          profileName: 'David White',
          createdAt: '30 min ago'
        },
        {
          text: 'Another beer please!',
          profileName: 'Luis Carbajal',
          createdAt: '1 hour ago'
        }
      ],
    }
  },
  methods: {
    sendMessage(message){
      alert(message)
    }
  }
}
</script>

