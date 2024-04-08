<template>
  <v-container>
    <v-row>
      <v-col>
        <template v-if="status === 'SUCCEEDED'">
          <v-alert dense outlined type="success">
            You have successfully {{ action }} the {{ name }}.
          </v-alert>
        </template>
        <template v-if="status === 'FAILED'">
          <v-alert dense outlined type="error">
            Error - we have been unable to {{ action }} your {{name}}. Please click retry to try again.
          </v-alert>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  methods: {
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>
