<template>
  <v-card>
    <v-card-text>
      <!-- Character Limit -->
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col>
            <v-text-field
              v-model="minCharacter"
              :label="minCharacterLabel"
              :hint="minCharacterHint"
              persistent-hint
              clearable
              required
              :rules="minCharacterRules"
            />

          </v-col>
          <v-col>
            <v-text-field
              v-model="maxCharacter"
              :label="maxCharacterLabel"
              :hint="maxCharacterHint"
              persistent-hint
              clearable
              required
              :rules="maxCharacterRules"
            />
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
    minCharacter: '',
    maxCharacter: '',
    required: false,
    visible: false,
    editable: false,

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
        minCharacter: this.minCharacter || 0,
        maxCharacter: this.maxCharacter || 524288,
        required: this.required,
        visible: this.visible,
        editable: this.editable,
      });
    },
  },

  computed: {
    minCharacterLabel() {
      return this.$t('min-character-label');
    },
    minCharacterHint() {
      return this.$t('min-character-hint');
    },
    maxCharacterLabel() {
      return this.$t('max-character-label');
    },
    maxCharacterHint() {
      return this.$t('max-character-hint');
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
    minCharacterRules() {
      return [
        v => !v || /^[0-9]+$/.test(v) || 'Minimum Character Limit must contain only numbers.',
        v => !this.minCharacter || !this.maxCharacter || parseInt(this.minCharacter) <= parseInt(this.maxCharacter) || 'Minimum must be less than or equal to Maximum.',
      ]
    },
    maxCharacterRules() {
      return [
        v => !v || /^[0-9]+$/.test(v) || 'Maximum Character Limit must contain only numbers.',
        v => !this.maxCharacter || !this.minCharacter || parseInt(this.maxCharacter) >= parseInt(this.minCharacter) || 'Maximum must be larger than or equal to Minimum.',
        v => !this.maxCharacter || parseInt(this.maxCharacter) <= 524288 || 'Maximum length cannot exceed 524288 characters.'
      ]
    },
    isFormValid() {
       this.valid = this.$refs.form?.validate();
       return this.valid;
    },
  },
}
</script>
