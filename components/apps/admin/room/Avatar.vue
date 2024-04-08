<!--
Admin - Chat Avatar

A smart component that renders the Chat as an Avatar.
-->
<template>
  <base-avatar size="xs"
               icon="mdi-human-male-board"
  />
</template>

<script>

export default {
  name: "Avatar",

  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
}
</script>
