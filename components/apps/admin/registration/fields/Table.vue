<template>
    <v-data-table
      :items="fields"
      :headers="headers">

      <template v-slot:item.required="{ item }">
        <v-btn icon>
          <v-icon>{{ item.required ? 'mdi-check' : null }}</v-icon>
        </v-btn>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon>
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
</template>

<script>
export default {
  name: "Table",
  props: {
    fields: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
}
</script>


