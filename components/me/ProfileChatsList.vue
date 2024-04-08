<!--

Me ProfileChatsList

A smart component that renders that ProfileChats that have been created for
the Me Profile.

-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-forum</v-icon>
      {{ $t('me-profile-chats-list') }}
      <v-spacer />

    </v-card-title>

    <v-list v-for="profileChat in profileChats" :key="profileChat.chatId">
      <!-- Me - ProfileChat -->
<!--      <me-profile-chat />-->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ profileChat.chatId }}</v-list-item-title>
          <v-list-item-subtitle>{{ profileChat.profileId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-list>


  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ProfileChatsList",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'me/load',
    })
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      loading: 'me/loading',
      loaded: 'me/loaded',
    }),

    /**
     * Return a list of the ProfileChats.
     *
     * @returns {any}
     */
    profileChats () {
      return (this.me) ? this.me.profileChats : [];
    },
  },
}
</script>

