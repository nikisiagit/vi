<template>
  <v-list>
    <apps-admin-registration-fields-list-item
      v-for="(field, index) in fields"
      :key="index"
      :name="field.name"
      :type="field.fieldType"
      :required="field.required"
    />
  </v-list>
</template>

<script>
export default {
  name: "List",
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
};
</script>
