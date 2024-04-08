<template>
  <div>
  <v-menu
    v-model="menuOpen"
    :close-on-content-click="false"
    offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="$vuetify.breakpoint.mobile" v-bind="attrs" v-on="on" icon color="primary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn v-else v-bind="attrs" v-on="on" medium color="primary">
        {{$t('create-field')}}
        <v-icon right>mdi-plus</v-icon>
      </v-btn>

    </template>
    <v-list dense>
      <v-list-item
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)">
        <v-list-item-title v-text="option.text" />
      </v-list-item>
    </v-list>
  </v-menu>
    <v-dialog v-model="showDialog" max-width="800">
      <component
        :is="selectedOption ? selectedOption.component : null"
        :field-type="selectedOption ? selectedOption.value : null"
        @close="dialogClosed"
        :registration-id="registrationId"
      />
    </v-dialog>
  </div>
</template>

<script>
import TextFieldForm from './text/CreateField.vue';
import SelectFieldForm from './select/CreateField.vue';
import DateFieldForm from './date/CreateField.vue';
import TimeFieldForm from "./time/CreateField.vue";
import DateTimeFieldForm from "./date-time/CreateField.vue";
import CheckboxFieldForm from './checkbox/Form.vue';
export default {
  name: 'FieldTypes',
  components: {
    TextFieldForm,
    SelectFieldForm,
    DateFieldForm,
    TimeFieldForm,
    DateTimeFieldForm,
  },
  props: {
    registrationId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menuOpen: false,
      selectedOption: null,
      options: [
        { text: 'Text', component: 'TextFieldForm', value: 'text' },
        { text: 'Text Area', component: 'TextFieldForm', value: 'text-area' },
        { text: 'Select', component: 'SelectFieldForm', value: 'select' },
        { text: 'Checkbox', component: 'SelectFieldForm', value: 'checkbox' },
        { text: 'Radio', component: 'SelectFieldForm', value: 'radio' },
        { text: 'Date', component: 'DateFieldForm', value: 'date' },
        { text: 'Date Time', component: 'DateTimeFieldForm', value: 'date-time' },
        { text: 'Time', component: 'TimeFieldForm', value: 'time' },
      ],
      showDialog: false,
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.menuOpen = false;
      this.showDialog = true;
    },
    dialogClosed() {
      this.selectedOption = null;
      this.showDialog = false;
    },
  },
};
</script>




