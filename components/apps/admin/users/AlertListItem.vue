<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ message }}</v-list-item-title>
      <v-list-item-subtitle>{{time}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-icon  v-if="type === 'success'">
      <v-icon color="primary">mdi-check-circle</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  name: "AlertListItem",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
}
</script>
