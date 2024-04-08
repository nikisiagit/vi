<template>
  <v-card class="rounded-0" flat :color="pinned ? 'blue lighten-4': null" >
    <v-card-text class="pa-0">

      <v-container fluid class="d-flex align-start" :class="pinned ? 'pt-0 pb-4': null">


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
                  <v-list-item-subtitle :class="! pinned ? 'primary--text text--darken-1': null">
                    <strong>{{ fullname }}</strong> • {{ time }}

                    <v-chip v-if="pinned" color="blue" outlined small class="my-1 ml-1">
                      <v-icon small left >mdi-pin</v-icon>
                      <span class="font-weight-medium">Organizer</span>
                    </v-chip>

                  </v-list-item-subtitle>
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
            <v-card rounded="lg" outlined max-width="350px" :color="pinned ? 'blue lighten-3': null">
              <v-list-item >
                <v-list-item-content class="align-self-start" >
                  <v-list-item-title class="text-wrap" :class="alignTo !== 'right' ? 'pb-1': null">
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

                  <chats-message-list-item-actions @menu-opened="handleActionsMenuOpened" v-if="actionsMenuOpened || hover && alignTo !== 'right' && !privateChat && !moderationMode" :qa-mode="qaMode" :moderation-mode="moderationMode"></chats-message-list-item-actions>

                  <div class="d-flex" v-if="moderationMode">
                    <v-btn-toggle dense  mandatory :color="moderationAction === 'approve' ? 'green': 'error'" v-model="moderationAction">
                      <v-tooltip open-on-focus bottom open-delay="300"  transition="slide-y-transition" >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn value="approve" icon v-bind="attrs" v-on="on">
                            <v-icon color="green">mdi-check</v-icon>
                          </v-btn>
                        </template>

                        <span>Approve</span>
                      </v-tooltip>

                      <v-tooltip open-on-focus bottom open-delay="300"  transition="slide-y-transition" >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn value="reject" icon  v-bind="attrs" v-on="on">
                            <v-icon color="error">mdi-close</v-icon>
                          </v-btn>
                        </template>

                        <span>Reject</span>
                      </v-tooltip>
                    </v-btn-toggle>
                  </div>

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


        <div v-if="alignTo === 'right'" class="d-flex align-self-end mb-2">

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

    <!-- messages reply thead-->
    <v-slide-y-transition mode="out-in">
      <v-card-text class="pt-1"  v-if="openThread">
        <v-container class="pt-0">
<!--          <v-row dense>-->
<!--            <v-col>-->
<!--              <div class="d-flex align-center">-->
<!--                &lt;!&ndash;              <v-divider></v-divider>&ndash;&gt;-->
<!--                <span class="mr-4">-->
<!--&lt;!&ndash;                <v-icon left color="primary">mdi-reply</v-icon>&ndash;&gt;-->
<!--                1 Reply-->
<!--                </span>-->
<!--                <v-divider ></v-divider>-->

<!--              </div>-->
<!--            </v-col>-->
<!--          </v-row>-->
          <v-row  dense>
            <v-col>
              <v-sheet class="pa-2" rounded="lg" outlined >
                <v-subheader class="mb-2">
                  <h4>1 Reply</h4>
                </v-subheader>

                <chats-messages-list-thread
                  align-to="left"
                  :avatar="{ image: 'https://ivent-hq.com/wp-content/uploads/2021/06/Ash-Selfie-ForWeb.png' }"
                  fullname="Ash Kibir"
                  :text="'Sure, I\'ll send you a message'"
                  :datetime="'2022-09-06T14:41:35.761Z'"
                />

                <v-btn v-if="! replying" text color="primary" rounded @click="replying = !replying">
                  <v-icon left>mdi-reply</v-icon>
                  Reply
                </v-btn>

                <v-fade-transition mode="out-in">
                  <chats-compose-message-advanced
                    v-if="replying"
                    placeholder="Reply message"
                    qa-mode
                    cancel-btn
                    @cancel="replying = false"
                  >
                  </chats-compose-message-advanced>
                </v-fade-transition>

              </v-sheet>


            </v-col>
          </v-row>
        </v-container>



      </v-card-text>
    </v-slide-y-transition>
    <!--/ end thread -->

  </v-card>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: 'MessagesListItemWithSeen',
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
    moderationMode: {
      type: Boolean,
    },

    privateChat: {
      type: Boolean
    },
    pinned: {
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
      moderationAction: null,

      time: '',
      date: '',

      avatarColour: null,
      avatarIcon: null,
      avatarImage: null,

      numberOfVotes: 0,

      openThread: false,

      actionsMenuOpened: false,

      replying: false,
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
