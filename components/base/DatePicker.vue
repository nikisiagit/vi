<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :disabled="disabled"
        :prepend-icon="icon"
        :label="label"
        :hint="hint"
        readonly
        v-model="date"
        v-on="on"
        clearable
        persistent-hint
        :rules="rules"
      ></v-text-field>
    </template>

    <v-date-picker
      :disabled="disabled"
      v-model="date"
      no-title
      :min="min"
      :max="max"
      @input="dateMenu = false"
      @change="$emit('input', date)"
    ></v-date-picker> <!-- :max="endDateTime && new Date(endDateTime).toISOString()" -->
  </v-menu>
</template>

<script>

export default {
  name: "DatePicker",
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    rules: {
      type: Array,
      default: () => ([]),
    },
    label: {
      type: String,
    },
    hint: {
      type: String,
    },
    min: {
      type: String,
    },
    max: {
      type: String,
    },
    icon: {
      type: String,
      default: 'mdi-calendar-start'
    }
  },

  data: () => ({
    // menu flags
    dateMenu: false,
    date: undefined
  }),

  created(){
    this.date = this.value
  }
}
</script>
