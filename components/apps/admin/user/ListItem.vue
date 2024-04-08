<template>
  <v-list-item>
    <v-list-item-avatar>
      <apps-admin-user-avatar :userId="user.userId" :name="name" />
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

  props: {
    name: {
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
    name: {
      handler () {
        if (!this.loaded && !this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadUserWithName: 'apps/admin/users/loadUserWithName',
    }),

    async load () {
      return await (this.name) ? this.loadUserWithName(this.name) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      userWithName: 'apps/admin/users/userWithName',
    }),

    user () {
      return (this.name) ? this.userWithName(this.name) : undefined;
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
  },
}
</script>
