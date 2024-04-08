<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ registrationId }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('registration-id') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "ListItem",

  props: {
    registrationId: {
      type: String,
      required: true, // false
    },
  },
}
</script>

