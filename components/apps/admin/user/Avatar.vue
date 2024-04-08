<template>
  <base-avatar
    :size="size"
    :label="fullname"
    :color="colour"
    :icon="icon"
    :status-indicator="onlineStatus"
    status-indicator-color="success"
  />
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Avatar",
  props: {
    userId: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'sm'
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
        if (! this.loaded && ! this.loading) {
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

    avatar () {
      return (this.user) ? this.user.avatar : undefined;
    },

    colour () {
      return (this.avatar) ? this.avatar.colour : 'primary';
    },

    icon () {
      return (this.avatar) ? this.avatar.icon : undefined;
    },

    onlineStatus () {
      return (this.avatar) ? this.avatar.onlineStatus : undefined;
    },

    fullname () {
      return (this.user) ? this.user.fullname : undefined;
    },
  },
}
</script>
