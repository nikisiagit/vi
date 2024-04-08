<template>
  <v-menu
    ref="menu"
    v-model="timeMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :disabled="disabled"
        v-model="time"
        :label="label"
        :hint="hint"
        :rules="rules"
        :prepend-icon="icon"
        readonly
        persistent-hint
        v-bind="attrs"
        v-on="on"
        clearable
      ></v-text-field>
    </template>

    <v-time-picker
      :disabled="disabled"
      v-if="timeMenu"
      v-model="time"
      full-width
      format="ampm"
      @click:minute="$refs.menu.save(time)"
      @change="$emit('input', time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>

export default {
  name: "TimePicker",
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    rules: {
      type: Array,
      default: () => ([])
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
    timeMenu: false,
    time: undefined
  }),

  created(){
    this.time = this.value
  }
}
</script>
