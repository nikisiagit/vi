<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ eventId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('event-id') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "ListItem",

  props: {
    eventId: {
      type: String,
      required: true, // false
    },
  },
}
</script>

