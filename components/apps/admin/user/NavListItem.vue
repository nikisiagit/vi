<template>
  <v-list-item two-line :to="{name: 'apps-admin-users-userId', params: {userId: userId}}">

    <v-list-item-avatar>
      <apps-admin-user-avatar :userId="userId" />
    </v-list-item-avatar>


    <v-list-item-content>
      <v-list-item-title>{{ fullname }}</v-list-item-title>
      <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-icon v-if="isAdmin">
      <v-icon>mdi-shield-account</v-icon>
    </v-list-item-icon>


  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    userId: {
      type: String,
      required: true,
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

    email () {
      return (this.user) ? this.user.email : undefined;
    },

    fullname () {
      return (this.user) ? this.user.fullname : undefined;
    },

    isAdmin () {
      return (this.user) ? this.user.isAdmin : undefined;
    }
  },
}
</script>
