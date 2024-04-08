<template>
  <v-alert
    class="mt-3"
    border="left"
    outlined
    elevation="1"
    type="error"
    v-if="errors.length"
  >
     <span class="text--primary">
       {{ errors }}
     </span>
  </v-alert>
</template>

<script>
export default {
  name: "FormErrorsBox",
  props: {
    errors: {
      type: [Array, String]
    }
  }
}
</script>
