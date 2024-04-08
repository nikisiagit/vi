<template>
  <v-card flat rounded="t-lg b-0">
    <v-card-title>
      {{ title }}

      <template v-if="button">
        <v-spacer></v-spacer>

        <v-btn color="primary" text>{{ button }}</v-btn>
      </template>

    </v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  name: "Heading",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
    },
    button: {
      type: String,
    },
  }
}
</script>
