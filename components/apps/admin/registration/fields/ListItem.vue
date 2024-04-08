<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ name }}</v-list-item-title>
      <v-list-item-subtitle>{{ type }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon>
        <v-icon v-if="required">mdi-check</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>


<script>
export default {
  name: "ListItem",
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: true,
    },
  },

}
</script>
