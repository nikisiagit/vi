<template>
  <v-card
    rounded
    height="100%"
    width="100%"
    elevation="4"
  >

    <v-card-title>
      <v-icon left>
        mdi-view-list
      </v-icon>
      {{ $t('fields-list') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('fields-list-subtitle') }}</v-card-subtitle>

    <v-divider></v-divider>

    <!--                <div class="pa-2">-->
    <!--                  <v-btn block>-->
    <!--                    back-->
    <!--                  </v-btn>-->
    <!--                </div>-->


    <v-list class="overflow-y-auto" height="400">
      <draggable
        @change="log"
        v-model="items"
        :group="{ name: 'fields', pull: 'clone', put: false }"
      >
        <transition-group
          type="transition"
          name="flip-list"
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </transition-group>

      </draggable>
    </v-list>

  </v-card>
</template>

<script>
export default {
  data(){
    return {
      /**
       * Text - Single line text input
       * Number - Text field that only allows numbers
       * Email address - Text field that expects an email
       * Phone number - Text field that expects a phone number
       * Password - Text field that expects a password
       * URL - Text field that expects an URL
       * Textarea - Paragraph text
       * Checkbox - Checkbox input (Legal)
       * Checkbox group - Checkbox input with multiple options
       * Radio - Radio input
       * Radio group - Radio input with multiple options
       * Toggle - Switch button
       * Single select - Select input
       * Multi select - Multiselect input
       * Date - Datepicker input
       * Datetime - Date & time picker input
       * Time - Time picker input
       *
       *
       * * OTHERS *
       * Hidden field
       * Tags
       */
      items: [
        { name: 'name', label: 'Text', hint: 'hint', type: 'text', title: 'Text', subtitle: 'Single line text input', icon: 'mdi-alphabetical' },
        { name: 'name', label: 'text', hint: 'hint', type: 'number', title: 'Number', subtitle: 'Text field that only allows numbers', icon: 'mdi-numeric' },
        { name: 'name', label: 'text', hint: 'hint', type: 'email', title: 'Email', subtitle: 'Text field that expects an email', icon: 'mdi-at' },
        { name: 'name', label: 'text', hint: 'hint', type: 'phone', title: 'Phone', subtitle: 'Text field that expects a phone number', icon: 'mdi-phone' },
        { name: 'name', label: 'text', hint: 'hint', type: 'password', title: 'Password', subtitle: 'Text field that expects a password', icon: 'mdi-lock' },
        { name: 'name', label: 'text', hint: 'hint', type: 'url', title: 'URL', subtitle: 'Text field that expects an URL', icon: 'mdi-link-variant' },
        { name: 'name', label: 'text', hint: 'hint', type: 'textarea', title: 'Textarea', subtitle: 'Paragraph text', icon: 'mdi-text-long' },
        { name: 'name', label: 'text', hint: 'hint', type: 'checkbox', title: 'Checkbox', subtitle: 'Checkbox input (Legal)', icon: 'mdi-checkbox-marked' },
        { name: 'name', label: 'text', hint: 'hint', type: 'checkboxgroup', title: 'Checkbox', subtitle: 'Checkbox input with multiple options', icon: 'mdi-checkbox-multiple-marked' },
        { name: 'name', label: 'text', hint: 'hint', type: 'radio', title: 'Radio', subtitle: 'Radio input', icon: 'mdi-radiobox-marked' },
        { name: 'name', label: 'text', hint: 'hint', type: 'radiogroup', title: 'Radio', subtitle: 'Radio input with multiple options', icon: 'mdi-order-bool-ascending' },
        { name: 'name', label: 'text', hint: 'hint', type: 'toggle', title: 'Toggle', subtitle: 'Switch button', icon: 'mdi-toggle-switch' },
        { name: 'name', label: 'text', hint: 'hint', type: 'select', title: 'Single Select', subtitle: 'Select input', icon: 'mdi-chevron-down-box' },
        { name: 'name', label: 'text', hint: 'hint', type: 'multiselect', title: 'Multiselect', subtitle: 'Multiselect input', icon: 'mdi-plus-box' },
        { name: 'name', label: 'text', hint: 'hint', type: 'date', title: 'Date', subtitle: 'Datepicker input', icon: 'mdi-calendar-month' },
        { name: 'name', label: 'text', hint: 'hint', type: 'datetime', title: 'Datetime', subtitle: 'Date & time picker input', icon: 'mdi-calendar' },
        { name: 'name', label: 'text', hint: 'hint', type: 'time', title: 'Time', subtitle: 'Time picker input', icon: 'mdi-calendar-clock' },
      ],

    }

  },
  methods: {
    log(evt) {
      console.log(evt);
    },

  }

}
</script>
