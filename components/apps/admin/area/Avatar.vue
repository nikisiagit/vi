<template>
  <base-avatar size="xs"
               :icon="icon"
  />
</template>

<script>

export default {
  name: "Avatar",
  props: {
    icon: {
      type: String,
      default: 'mdi-page-layout-header'
    }
  }
}
</script>
