<!--
Me - Nav List Item

A smart component that renders a list item link to the Me Profile page.
-->
<template>
  <v-list-item :to="{name: 'me' }" ripple exact nuxt>
    <v-list-item-avatar>
      <me-avatar/>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ fullname }}</v-list-item-title>
      <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      loading: 'me/loading',
      loaded: 'me/loaded',
    }),

    email () {
      return (this.me) ? this.me.email : undefined;
    },

    fullname () {
      return (this.me) ? this.me.fullname : undefined;
    },
  },

  methods: {
    ...mapActions({
      load: 'me/load',
    })
  },
}
</script>
