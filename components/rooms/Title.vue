<template>
  <v-card rounded="t">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
    },
  }
}
</script>
