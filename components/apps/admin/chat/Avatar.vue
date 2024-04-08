<template>
  <base-avatar icon="mdi-pound" size="xs" color="primary"/>
</template>

<script>
export default {
  name: "Avatar",

  props: {
    chatId: {
      type: String,
      required: true,
    },
  },

  watch: {
    chatId: {
      handler () {

      }
    },
  },


}
</script>
