<template>
  <v-list-item two-line >



    <v-list-item-avatar >
      <apps-admin-user-avatar :userId="userId" />
    </v-list-item-avatar>

    <v-list-item-content>

      <v-container v-if="loading">
        <v-skeleton-loader
          type="text@2"
        ></v-skeleton-loader>
      </v-container>

      <v-list-item-title>{{ fullname }}</v-list-item-title>
      <v-list-item-subtitle>{{ headline }}</v-list-item-subtitle>
    </v-list-item-content>

    <user-list-item-action :user-id="userId" :bookmark-id="bookmarkId"></user-list-item-action>

  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "BookmarkUserListItem",

  props: {
    userId: {
      type: String,
      required: true,
    },
    bookmarkId: {
      type: String,
    }
  },

  data(){
    return {
      action: null

    }

  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    userId: {
      handler () {
        if (!this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadUserWithUserId: 'apps/admin/users/loadUserWithUserId',
    }),

    async load () {
      return await (this.userId) ? this.loadUserWithUserId(this.userId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      userWithUserId: 'apps/admin/users/userWithUserId',
    }),

    user () {
      return (this.userId) ? this.userWithUserId(this.userId) : undefined;
    },

    loading () {
      return (this.user) ? this.user.loading : false;
    },

    loaded () {
      return (this.user) ? this.user.loaded : false;
    },

    fullname () {
      return (this.user) ? this.user.fullname : undefined;
    },

    headline () { //@todo: might need changing to headlineId and get the label from label store.
      return (this.user) ? this.user.headline : undefined;
    }
  },
}
</script>
