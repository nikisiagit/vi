<template>
  <!--        :avatar="avatarSrc"-->
  <!--        :status-indicator="!!avatar"-->
  <base-avatar
    :avatar="avatar"
    color="primary"
    icon="mdi-pound"
    size="xs"
  />
</template>

<script>
export default {
  name: "Avatar",
  props: {
    avatar: {
      type: String
    }
  }
}
</script>
