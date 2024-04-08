<!--
Me - Avatar

A smart component that renders the Me Avatar.
-->
<template>
  <base-avatar
    :onClick="onClick"
    :size="size"
    :label="label"
    :color="colour"
    :icon="icon"
    :avatar="image"
    :status-indicator="onlineStatus"
    status-indicator-color="success"
  />
</template>

<script>
// @link https://vuetifyjs.com/en/components/avatars/#default

import {mapActions, mapGetters} from "vuex";

export default {
  name: "Avatar",

  props: {
    size: {
      type: String,
      default: 'sm'
    },
    onClick: {
      type: Function,
    }
  },

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();


    }
  },

  data(){
    return {
      defaultIcon: 'mdi-account-circle'
    }
  },

  watch: {
    avatar(){
      if (this.avatar){
        this.defaultIcon = null
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'me/load',
    }),

    handleClick(){
      this.$emit('avatar-click')
    }
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      loading: 'me/loading',
      loaded: 'me/loaded',
    }),

    // avatar
    avatar () {
      return (this.me) ? this.me.avatar : undefined;
    },

    colour () {
      return (this.avatar) ? this.avatar.colour : undefined;
    },

    icon () {
      return (this.avatar) ? this.avatar.icon : undefined;
    },

    image () {
      return (this.avatar) ? this.avatar.image : undefined;
    },

    onlineStatus () {
      return (this.avatar) ? this.avatar.onlineStatus : undefined;
    },

    // fullname
    fullname () {
      return (this.me) ? this.me.fullname : undefined;
    },

    label () {
      return (this.fullname) ? this.fullname.value : undefined;
    },
  }
}
</script>
