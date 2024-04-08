<!-- Venue App (Admin) Registration - Title A smart component that renders the Registration Title.-->
<template>
  <v-card rounded :loading="loading">
    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-form-select</v-icon>
      {{ $t(title) }}
      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t(description) }}
    </v-card-subtitle>

  </v-card>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },

}
</script>
