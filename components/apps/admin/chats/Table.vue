<template>
  <v-data-table :items="chats" :headers="headers" :loading="loading">
    <template v-slot:top>

      <v-dialog v-model="removeChatDialog" max-width="1000px">
        <apps-admin-chat-remove-chat :chat-id="chatIdToRemove" @close="removeChatDialog = false;"/>
      </v-dialog>

      <v-container fluid class="px-0 pt-6">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field v-model="search" dense hide-details="auto"
                          rounded filled prepend-inner-icon="mdi-magnify"
                          :placeholder="placeholder"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-slot:item.actions="{ item }">
        <v-btn icon nuxt :to="{name: 'apps-admin-chats-chatId', params: {chatId: item.chatId}}">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon color="error" @click="openRemoveChatDialog(item.chatId)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Table",

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    headers: [
      {
        text: 'name',
        align: 'start',
        value: 'name',
        sortable: true,
      },
      {
        text: 'actions',
        align: 'right',
        value: 'actions',
        sortable: false,
      }
    ],
    search: '',
    removeChatDialog: false,
    chatIdToRemove: undefined,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/chats/load',
      reload: 'apps/admin/chats/reload',
    }),

    openRemoveChatDialog(chatId) {
      this.removeChatDialog = true;
      this.chatIdToRemove = chatId;
    }
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/chats/loading',
      loaded: 'apps/admin/chats/loaded',
      error: 'apps/admin/chats/error',
      chats: 'apps/admin/chats/chats',
    }),

    placeholder () {
      return this.$i18n.t('search');
    },
  },
}
</script>
