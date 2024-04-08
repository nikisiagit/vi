<template>
  <v-list-item two-line>
    <v-list-item-content>
      <v-list-item-title>{{ resourceId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('resource') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "ListItem",

  props: {
    resourceId: {
      type: String,
      required: true,
    },
  },
}
</script>
