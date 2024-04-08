<!--
Venue App Admin - Chats Details

This smart component renders the main UI for the Chats module.
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-pound</v-icon>
      {{ $t('admin-chats-details') }} ({{ numberOfChats }})

      <v-spacer />

      <v-btn icon @click="reload" :loading="loading" :disabled="loading">
        <v-icon>mdi-reload</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>

      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-chats-details-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <apps-admin-chats-list />

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",

  data: () => ({
    showHelp: true,

    showSearch: true,

    createChatDialog: false,
  }),

  methods: {
    ...mapActions({
      reload: 'apps/admin/chats/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/chats/loading',
      loaded: 'apps/admin/chats/loaded',
      error: 'apps/admin/chats/error',
      numberOfChats: 'apps/admin/chats/numberOfChats',
    })
  },
}
</script>

