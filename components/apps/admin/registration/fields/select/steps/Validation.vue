<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col>
            <v-text-field
              v-model="minOption"
              :label="minOptionLabel"
              :hint="minOptionHint"
              persistent-hint
              clearable
              required
              :rules="minOptionRules"/>
          </v-col>
          <v-col>
            <v-text-field
              v-model="maxOption"
              :label="maxOptionLabel"
              :hint="maxOptionHint"
              persistent-hint
              clearable
              required
              :rules="maxOptionRules"/>
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
      <v-btn text large class="pa-4" rounded @click="back">
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
  props: {
    fieldType: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    required: false,
    visible: false,
    editable: false,
    minOption: '',
    maxOption: '',

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
        minOption: this.minOption || 0,
        maxOption: this.maxOption,
        required: this.required,
        visible: this.visible,
        editable: this.editable,
      });
    },
  },

  computed: {
    minOptionLabel() {
      return this.$t('min-option-label');
    },
    minOptionHint() {
      return this.$t('min-option-hint');
    },
    maxOptionLabel() {
      return this.$t('max-option-label');
    },
    maxOptionHint() {
      return this.$t('max-option-hint');
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
    minOptionRules() {
      return [
        v => !v || /^[0-9]+$/.test(v) || 'Minimum Option Limit must contain only numbers.',
        v => !this.minOption || !this.maxOption || parseInt(this.minOption) <= parseInt(this.maxOption) || 'Minimum must be less than or equal to Maximum.',
      ]
    },
    maxOptionRules() {
      return [
        v => !v || /^[0-9]+$/.test(v) || 'Maximum Option Limit must contain only numbers.',
        v => !this.maxOption || !this.minOption || parseInt(this.maxOption) >= parseInt(this.minOption) || 'Maximum must be larger than or equal to Minimum.',
      ]
    },
    isFormValid() {
        this.valid = this.$refs.form?.validate();
        return this.valid;
    },
  },
}
</script>
