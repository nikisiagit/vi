<template>
  <v-card rounded="lg" flat>
    <v-card-text class="pa-0">
      <v-list-item
        :value="chatId"
        link
        :class="{
        'v-list-item--active primary--text': isActive,
        'font-weight-bold': numberOfUnseenMessages
        }"
      >
        <v-list-item-icon class="mr-2">
          <base-avatar
            :avatar="avatarSrc"

            :color="color"
            :icon="icon"

            size="xs"
            :status-indicator="!!avatar"
          ></base-avatar>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ title }} <small class="text--disabled"> {{ time }}</small>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ text }}
          </v-list-item-subtitle>

        </v-list-item-content>

        <v-list-item-action class="ma-0">
          <v-list-item-action-text>
            <v-row no-gutters>
<!--              <v-col cols="auto" align-self="center" class="mr-1">-->
<!--                <v-badge-->
<!--                  v-if="numberOfUnseenMessages"-->
<!--                  color="error darken-1"-->
<!--                  class="d-flex"-->
<!--                  inline-->
<!--                  :dot="numberOfUnseenMessages && numberOfUnseenMessages.toString().length > 2"-->
<!--                  :content="numberOfUnseenMessages"-->
<!--                >-->
<!--                </v-badge>-->
<!--              </v-col>-->
              <v-col >
<!--                <div>-->
<!--                  {{ time }}-->
<!--                </div>-->

                <!-- chat message menu -->
                <v-menu
                  disabled
                  :nudge-width="200"
                  offset-y
                  transition="slide-y-transition"
                  bottom
                  :close-on-content-click="false"
                  close-on-content-click
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      class="mt-n5"
                    >
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>

                  <!-- chat list actions -->
                  <chats-chat-list-actions

                  />
                  <!-- -->


                </v-menu>
                <!-- -->

                <v-badge
                  v-if="numberOfUnseenMessages"
                  color="error darken-1"
                  class="d-flex"
                  inline
                  :dot="numberOfUnseenMessages && numberOfUnseenMessages.toString().length > 2"
                  :content="numberOfUnseenMessages"
                >
                </v-badge>

              </v-col>
            </v-row>


          </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: 'ChatListItemWithMenu',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    numberOfUnseenMessages: {
      type: Number,
      default: 0
    },



    chatId: {
      type: String,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    datetime: {
      type: String,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
    avatar: {
      type: Object,
    }
  },
  data(){
    return {
      time: '',
      date: '',

      avatarSrc: '',
    }
  },
  created() {
    this.formatDate()
    this.formatTime()
  },
  computed: {

  },
  watch: {
    avatar: {
      immediate: true,
      handler(){
        this.avatarSrc = this.avatar?.src || undefined
      }
    }
  },
  methods: {
    formatDate(){
      this.date = dayjs(this.datetime).format('YYYY-MM-DD')
    },
    formatTime(){
      this.time = dayjs(this.datetime).format('HH:mm')
    }
  }
}
</script>
