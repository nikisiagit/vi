<template>
  <v-card flat>
    <v-card-text class="pa-0">

      <v-container fluid class="d-flex align-start">


        <div v-if="alignTo === 'left'" class="d-flex align-self-end mb-2">

          <!-- render avatar to the left side in a list -->
          <base-avatar

            size="xs"
            :status-indicator="true"
            :avatar="avatarImage"
            :color="avatarColour"
            :icon="avatarIcon"
            :label="fullname"
          ></base-avatar>
          <!-- -->

        </div>

        <!-- push content to the right side in a list if is needed -->
        <template v-if="alignTo === 'right'">
          <v-spacer></v-spacer>
        </template>
        <!-- -->

        <!-- render message content list item in a card -->
        <div :class="{'mr-2': alignTo === 'right', 'ml-2': alignTo === 'left'}">

          <v-row >
            <v-col class="mt-1" cols="12">

              <v-row>
                <v-col cols="12">
                  <v-list-item-subtitle class="text--disabled"><strong>{{ fullname }}</strong> • {{ time }} </v-list-item-subtitle>
                </v-col>
                <!--                <v-col cols="2">-->
                <!--                  &lt;!&ndash; if seen is true &ndash;&gt;-->
                <!--                  <v-icon v-if="seen" small color="success">mdi-check-all</v-icon>-->
                <!--                  &lt;!&ndash; &ndash;&gt;-->
                <!--                </v-col>-->
              </v-row>


            </v-col>
          </v-row>

          <v-hover v-slot="{ hover }">
            <v-card rounded="lg" outlined max-width="350px" :color=" alignTo === 'left' ? '': ''">
              <v-list-item >
                <v-list-item-content class="align-self-start" >
                  <v-list-item-title class="text-wrap pt-1 pb-2">
                    {{ text }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-show="hover || numberOfVotes" style="position:absolute;bottom:-.75rem;" >
                    <div v-if="! moderationMode && !privateChat">
                      <v-tooltip open-on-focus bottom open-delay="300"  transition="slide-y-transition" :disabled="!numberOfVotes">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" height="25" elevation="0" rounded x-small class="mt-2" @click="!numberOfVotes ? voteUp(): voteDown()">
                            <v-icon color="primary darken-1" v-if="numberOfVotes" small left>mdi-thumb-up</v-icon>
                            <v-icon v-else small>mdi-thumb-up-outline</v-icon>

                            <strong v-if="numberOfVotes">{{ numberOfVotes }}</strong>
                          </v-btn>
                        </template>

                        <span>Gavin Newman</span>
                      </v-tooltip>
                    </div>
                  </v-list-item-subtitle>

                </v-list-item-content>

                <v-list-item-action  class="pt-5 mb-2 mt-4">
                  <chats-message-list-item-actions @menu-opened="handleActionsMenuOpened" v-if="actionsMenuOpened || hover && alignTo !== 'right' && !privateChat" :qa-mode="qaMode" :moderation-mode="moderationMode"></chats-message-list-item-actions>

                  <div v-if="qaMode && alignTo !== 'right'" class="d-flex justify-end align-self-end">
                    <v-btn  elevation="0" rounded text small class="mt-2" @click="openThread = !openThread">
                      <v-icon color="primary" left>mdi-reply</v-icon>
                      1

                      <v-fade-transition mode="out-in">
                        <v-icon v-if="openThread" right  key="up" >mdi-chevron-up</v-icon>
                        <v-icon v-else right  key="down" >mdi-chevron-down</v-icon>
                      </v-fade-transition>
                    </v-btn>
                  </div>
                </v-list-item-action>

              </v-list-item>
            </v-card >
          </v-hover>




        </div>
        <!-- -->


        <div v-if="alignTo === 'right'">

          <!-- render avatar to the right side in a list -->
          <base-avatar

            size="xs"
            :status-indicator="true"
            :avatar="avatarImage"
            :color="avatarColour"
            :icon="avatarIcon"
            :label="fullname"
          ></base-avatar>
          <!-- -->

          <template v-if="! moderationMode && !privateChat">
            <v-tooltip open-on-focus z-index="99" bottom open-delay="300"  transition="slide-y-transition" :disabled="!numberOfVotes">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" height="25" width="25" elevation="0" rounded small class="mt-2" @click="!numberOfVotes ? voteUp(): voteDown()">
                  <v-icon color="primary" v-if="numberOfVotes" small left>mdi-thumb-up</v-icon>
                  <v-icon v-else small>mdi-thumb-up-outline</v-icon>

                  <span v-if="numberOfVotes">{{ numberOfVotes }}</span>
                </v-btn>
              </template>

              <span>Gavin Newman</span>
            </v-tooltip>
          </template>

        </div>




      </v-container>

    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: 'MessagesListThread',
  props: {
    messageId: {
      type: String,
    },
    alignTo: {
      type: String,
      default: 'left' // 'left' || 'right'
    },
    seen: {
      type: Boolean,
      default: false
    },

    text: {
      type: String
    },
    datetime: {
      type: String,
    },

    avatar: {
      type: Object,
    },
    fullname: {
      type: String,
    },

    qaMode: {
      type: Boolean,
    },
  },
  watch: {

    avatar: {
      immediate: true,
      handler(){
        this.avatarColour = this.avatar?.colour || 'primary'
        this.avatarIcon = this.avatar?.icon
        this.avatarImage = this.avatar?.image
      }
    },
  },
  data(){
    return {
      time: '',
      date: '',

      avatarColour: null,
      avatarIcon: null,
      avatarImage: null,

      numberOfVotes: 0,

      openThread: false,

      actionsMenuOpened: false
    }
  },
  created() {
    this.formatDate()
    this.formatTime()
  },
  methods: {
    handleActionsMenuOpened(opened){
      this.actionsMenuOpened = opened
    },

    voteUp(){
      this.numberOfVotes = this.numberOfVotes +1
    },
    voteDown(){
      this.numberOfVotes = this.numberOfVotes -1
    },
    formatDate(){
      if(! this.datetime) return

      this.date = dayjs(this.datetime).format('YYYY-MM-DD')
    },
    formatTime(){
      if(! this.datetime) return

      this.time = dayjs(this.datetime).format('HH:mm')
    }
  }
}
</script>
