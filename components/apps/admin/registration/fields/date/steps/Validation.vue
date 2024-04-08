<template>
  <v-card>
    <v-card-text>
      <!-- Date Range -->
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col>
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="minDateRange"
                  :label="minDateRangeLabel"
                  prepend-icon="mdi-calendar"
                  readonly
                  :hint="minDateRangeHint"
                  v-bind="attrs"
                  :rules="minDateRangeRules"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="minDateRange"
                no-title
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>

          </v-col>
          <v-col>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="maxDateRange"
                  :label="maxDateRangeLabel"
                  prepend-icon="mdi-calendar"
                  readonly
                  :rules="maxDateRangeRules"
                  :hint="maxDateRangeHint"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="maxDateRange"
                no-title
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

      </v-form>
      <!-- Properties-->
      <v-row>
        <v-col>
          <v-list>
            <!-- Required-->
            <v-list-item class="pa-0">
              <v-list-item-content>
                <v-list-item-title>{{requiredLabel}}</v-list-item-title>
                <v-list-item-subtitle>{{requiredHint}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="required" @change="changeRequired" />
              </v-list-item-action>
            </v-list-item>

            <!-- Visible-->
            <v-list-item class="pa-0">
              <v-list-item-content>
                <v-list-item-title>{{visibleLabel}}</v-list-item-title>
                <v-list-item-subtitle>{{visibleHint}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="visible" @change="changeVisible" />
              </v-list-item-action>
            </v-list-item>

            <!-- Editable-->
            <v-list-item class="pa-0">
              <v-list-item-content>
                <v-list-item-title>{{editableLabel}}</v-list-item-title>
                <v-list-item-subtitle>{{editableHint}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="editable" @change="changeEditable" />
              </v-list-item-action>
            </v-list-item>

          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>

      <!-- cancel  -->
      <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />

      <!-- back -->
      <v-btn text large class="pa-4" color="primary" rounded @click="back">
        <v-icon small >
          mdi-arrow-left
        </v-icon>
        <v-spacer></v-spacer>
        {{ $t('back') }}
      </v-btn>

      <!-- next -->
      <v-btn :disabled="!isFormValid" large class="pa-4 primary" rounded @click="submit">
        {{ $t('next') }}
        <v-spacer></v-spacer>
        <v-icon small >
          mdi-arrow-right
        </v-icon>
      </v-btn>

    </v-card-actions>
  </v-card>


</template>


<script>
export default {
  name: "Validation",

  data: () => ({
    minDateRange: undefined,
    maxDateRange: undefined,
    required: false,
    visible: false,
    editable: false,

    menu1: false,
    menu2: false,
    valid:false,
  }),

  methods: {
    changeRequired() {
      this.$emit('required', this.required);
    },
    changeVisible() {
      this.$emit('visible', this.visible);
    },
    changeEditable() {
      this.$emit('editable', this.editable);
    },
    cancel () {
      this.$emit('cancel');
      this.$emit('reset');
    },
    back () {
      this.$emit('back');
    },
    submit() {
      this.$emit('submitted', {
        minDateRange: this.minDateRange,
        maxDateRange: this.maxDateRange,
        required: this.required,
        visible: this.visible,
        editable: this.editable,
      });
    },
  },

  computed: {
    minDateRangeLabel() {
      return this.$t('min-date-range');
    },
    minDateRangeHint() {
      return this.$t('min-date-range-hint');
    },
    maxDateRangeLabel() {
      return this.$t('max-date-range');
    },
    maxDateRangeHint() {
      return this.$t('max-date-range-hint');
    },
    requiredLabel() {
      return this.$t('required-label');
    },
    requiredHint() {
      return this.$t('required-hint');
    },
    visibleLabel() {
      return this.$t('visible-label');
    },
    visibleHint() {
      return this.$t('visible-hint');
    },
    editableLabel() {
      return this.$t('editable-label');
    },
    editableHint() {
      return this.$t('editable-hint');
    },
    minDateRangeRules() {
      return [
        v => !v || !this.maxDateRange || v <= this.maxDateRange || 'Minimum date must be earlier or equal to the Maximum date.',
      ]
    },
    maxDateRangeRules() {
      return [
        v => !this.maxDateRange || !this.minDateRange || this.maxDateRange >= this.minDateRange || 'Maximum date must be later or equal to the Minimum date.'
      ]
    },
    isFormValid() {
      this.valid = this.$refs.form?.validate();
      return this.valid;
    },
  },
}
</script>
