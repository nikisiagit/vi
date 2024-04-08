<!--
Chats Select

A smart component that renders a list of Chats to select from.
-->

<template>
  <v-select
    v-model="chatId"
    item-text="name"
    item-value="chatId"
    :loading="loading"
    :items="chats"
    :label="chatLabel"
    :hint="chatHint"
    :atts="$attrs"
    persistent-hint
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:item="{on, attrs, item}">
      <v-list-item two-line v-bind="attrs" v-on="on">
        <v-list-item-content>
          <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.chatId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",

  props: {
    value: {
      type: String,
    },
  },

  /**
   * @returns {Promise<void>}
   */
  async created () {
    if ( this.initialised) {
      if (! this.loaded && ! this.loading) {
        await this.load();
      }
    }
  },

  data: () => ({
    chatId: undefined,
  }),

  watch: {
    value: {
      immediate: true,
      handler () {
        this.chatId = this.value;
      }
    },

    initialised: {
      immediate: true,
      handler () {
        if ( this.initialised) {
          if (! this.loaded && ! this.loading) {
            this.load();
          }
        }
      }
    },
  },

  methods: {
    ...mapActions({
      load: 'chats/load',
      reload: 'chats/reload',
    })
  },

  computed: {
    ...mapGetters({
      chats: 'chats/chats',
      mode: 'chats/mode',
      error: 'chats/error',
      initialised: 'chats/initialised',
      initialising: 'chats/initialising',
      loading: 'chats/loading',
      loaded: 'chats/loaded',
    }),

    chatLabel () {
      return this.$i18n.t('chat-label');
    },

    chatHint () {
      return this.$i18n.t('chat-hint');
    },
  },
}
</script>
