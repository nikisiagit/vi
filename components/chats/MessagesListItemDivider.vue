<template>
  <v-card>
    <v-card-text class="d-flex align-center mt-2">
      <v-divider></v-divider>
      <span class="mx-5">{{ date }}</span>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MessagesListItemDivider",
  props: {
    date: {
      type: String,
      default: '20/09/2022'
    }
  }
}
</script>
