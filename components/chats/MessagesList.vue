<template>
  <v-list>
    <v-slide-y-transition
      group
    >
      <!--      :message-id="message.messageId"  -->
      <chats-messages-list-item-with-seen
        v-for="(message, i) in messages"
        :key="i"


        :align-to="alignmentTo(message)"
        :seen="message && message.seen"

        :text="message && message.text"
        :datetime="message && message.datetime"

        :avatar="getProfile(message.profileId).avatar"
        :fullname="getProfile(message.profileId).fullname"

        :private-chat="privateChat"
      />
    </v-slide-y-transition>
  </v-list>
</template>

<script>
import dayjs from "dayjs";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'MessagesList',
  props: {
    messages: {
      type: Array,
    },
    privateChat: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      me: 'me/me',

      userWithUserId: 'apps/admin/users/userWithUserId'
    }),

    profileId () {
      return (this.me) ? this.me.profileId : undefined;
    },
  },
  methods: {
    ...mapActions({
      loadProfiles: 'apps/admin/users/load',
    }),

    getProfile (profileId) {
      return this.userWithUserId(profileId) || {}
    },

    alignmentTo(message){
      if (! message?.profileId) return

      return message.profileId === this.profileId ? 'right': 'left'
    },
  }
}
</script>

