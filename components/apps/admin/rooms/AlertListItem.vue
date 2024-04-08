<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title :class="[type === 'success' ? 'primary--text' : 'error--text']">{{ alerts }}</v-list-item-title>
      <v-list-item-subtitle>{{generated}}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "AlertListItem",
  props: {
    alerts: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    generated: {
      type: String,
      required: true,
    },
  },

}
</script>
