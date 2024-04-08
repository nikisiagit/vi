<template>
  <v-alert dense text type="info">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">mdi-link-variant</v-icon>
      </template>
      {{ tooltipLabel }}
    </v-tooltip>
    {{ path }}
  </v-alert>
</template>

<script>
export default {
  name: "PreviewLink",
  props: {
    path: {
      type: String
    },
    tooltipLabel: {
      type: String,
      default: 'This is the URI link'
    }
  }
}
</script>
