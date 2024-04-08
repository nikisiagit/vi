<template>
  <v-card>
    <!-- Test transitions -->
    <v-btn @click="add" block large>
      <v-icon left>mdi-plus</v-icon>
      Add chat message
    </v-btn>
    <!-- -->

    <v-list>
      <v-list-item-group v-model="chatIdSelected">
        <v-fade-transition leave-absolute
          group
        >
          <chats-chat-list-item
            v-for="chat in chats"
            :key="chat.chatId"
            :chat-id="chat.chatId"
            :value="chat.chatId"

            :number-of-unseen-messages="chat.numberOfUnseenMessages"
            :is-active="chat.isActive"

            :title="retrieveTitleInChat(chat)"
            :text="chat.descriptionId"
            :datetime="chat.createdAt"
            :avatar="retrieveProfileWithProfileId(chat.profileId)"
            :icon="chat.icon"
            :color="chat.color"
          />
        </v-fade-transition>
      </v-list-item-group>

    </v-list>
  </v-card>
</template>

<script>
import dayjs from "dayjs";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ChatList',
  data(){
    return {
      chatIdSelected: null,

    }
  },
  async created() {
    // if (! this.loaded && ! this.loading) {
    //   await this.load();
    // }
  },

  methods: {
    ...mapActions({
      load: 'chats/load',
      reload: 'chats/reload',
    }),

    add(){
      this.chats.push( {
        chatId: Math.floor(Math.random() * (100 - 1) + 1).toString(),
        avatar: { src: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        datetime: '2022-09-27T15:39:31.255Z',
        title: 'John Doe',
        text: 'Yes my lord 👍',
        profileId: 'profile:441b8f82-eb4f-42f7-ab26-de7558d82882',


        numberOfUnseenMessages: 1,
        isActive: false,
      })
    },

    retrieveProfileWithProfileId(profileId){
        return this.profileWithProfileId(profileId)?.avatar || undefined
    },

    retrieveTitleInChat(chat){
      if (chat?.profileId) {
        return this.profileWithProfileId(chat.profileId)?.fullname
      }

      return chat?.name // chat?.titleId
    }
  },

  computed: {
    ...mapGetters({
      loading: 'chats/loading',
      loaded: 'chats/loaded',
      error: 'chats/error',
      chats: 'chats/chats',
      numberOfChats: 'chats/numberOfChats',

      profileWithProfileId: 'profiles/profileWithProfileId'
    }),
  },
}
</script>

