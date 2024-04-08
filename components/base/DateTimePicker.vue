<template>
  <v-dialog
    @click:outside="closeDialog"
    v-model="datetimeDialog"
    :persistent="persistent"
    width="290px"
    :fullscreen="fullscreen"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="datetimeFormatted"
        readonly
        v-bind="{ ...attrs, ...$attrs }"
        v-on="on"

        :rules="rules"
        :disabled="disabled"
        :label="label"
        :hint="hint"
        persistent-hint
        :clearable="clearable"
        :prepend-icon="icon"
        @click:clear="$emit('clear')"
      ></v-text-field>
    </template>

    <v-card >
      <v-toolbar height="50" color="primary" dark flat class="px-1">
        <v-tabs v-model="tab" grow height="40" class="mt-1">
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#date">
            <v-icon>mdi-calendar</v-icon>
          </v-tab>
          <v-tab href="#time" class="mr-1">
            <v-icon>mdi-clock</v-icon>
          </v-tab>
          <v-btn text icon class="rounded-0" height="40" @click="closeDialog">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item value="date">
          <v-date-picker
            v-model="date"
            class="rounded-0"
            @input="tab = 'time'"
            full-width
            no-title
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            :min="min"
            :max="max"
          ></v-date-picker>
        </v-tab-item>
        <v-tab-item value="time">
          <v-time-picker
            :key="tab"
            v-model="time"
            format="ampm"
            class="rounded-0"
            full-width
            @click:minute="onMinuteChange"
          >
          </v-time-picker>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
import dayjs from "dayjs";
export default {
  inheritAttrs: false,
  name: "DateTimePicker",
  props: {
    value: {
      type: String
    },

    fullscreen: {
      type: Boolean,
      default: false
    },

    persistent: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean
    },

    label: {
      type: String,
    },

    hint: {
      type: String,
    },

    clearable: {
      type: Boolean
    },

    icon: {
      type: String,
    },

    rules: {
      type: Array,
      default: () => ([]),
    },

    min: {
      type: String,
    },

    max: {
      type: String,
    },

    // dateFormat: {
    //   type: String,
    //   default: "DD/MM/YYYY"
    // },
    // timeFormat: {
    //   type: String,
    //   default: "HH:mm"
    // },
  },

  computed: {
    datetimeFormatted(){
      /**
       ** @todo: consider 12hr/24hr to apply as format hh:mm A (12) or HH:mm (24)
       ** @todo: consider date format that depends on language/country/timezone.
       */

      if (! this.date && ! this.time) {
        return dayjs(this.value).format("DD/MM/YYYY hh:mm A")
      }

      return `${dayjs(this.date).format("DD/MM/YYYY")} ${dayjs(this.date + this.time).format("hh:mm A")}`
    }

  },

  data: () => ({
    date: null,
    time: null,
    tab: false,
    datetimeDialog: false
  }),

  watch: {
    datetimeDialog(val) {
      // load into separated models as dialog opens
      if (val && this.value) {
        this.date = dayjs(this.value).format("YYYY-MM-DD")

        this.time = dayjs(this.value).format("HH:mm")
      }
    }
  },
  methods: {
    onMinuteChange(){
      if (this.date) {
        this.closeDialog()
      }
    },

    closeDialog() {
      this.datetimeDialog = false;

      this.$emit(
        "change-DateTime",
          `${dayjs(this.date).format("YYYY-MM-DD")}T${this.time}:00`,
      );

      // prevents animate to date tab when closing
      setTimeout(() => (this.tab = "date"), 300);
    }
  }
}
</script>
