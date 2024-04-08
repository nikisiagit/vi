<template>
  <v-card>
    <v-card-text class="pa-0">

      <v-container fluid>
        <v-row>
          <v-col>
            <v-list>
              <v-row>
                <v-col cols="6" lg="3">
                  <span class="text--disabled">{{ $t(`field-details`) }}</span>
                </v-col>
                <v-col cols="6" lg="9" align-self="center">
                  <v-divider />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('field-name') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ title }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('field-title') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ description }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('field-description') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ label  }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('field-label') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ hint }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('field-hint') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{  placeholder }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('field-placeholder') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" lg="3">
                  <span class="text--disabled">{{ $t(`field-validations`) }}</span>
                </v-col>
                <v-col cols="6" lg="9" align-self="center">
                  <v-divider />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ minCharacter }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('min-character-limit') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ maxCharacter }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('max-character-limit') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ required }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('required') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ visible }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('visible') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{ editable }}</v-list-item-title>
                      <v-list-item-subtitle>{{ $t('editable') }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <!--Actions-->
    <v-card-actions>
      <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />

      <v-btn text large class="pa-4" rounded @click="back" :disabled="creating">
        <v-icon small >
          mdi-arrow-left
        </v-icon>
        <v-spacer></v-spacer>
        {{ $t('back') }}
      </v-btn>

      <v-btn large class="primary" @click="submit" :loading="creating">
        {{ $t('create') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "Review",
  props: {
    field: {
      type: Object,
      required: true
    },
    creating: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    valid: true,
  }),

  methods: {
    reset () {
      this.valid = true
      this.$refs.form.reset();
    },

    submit () {
      this.valid = true;
      this.$emit('submitted', {
        field: this.field
      });
    },
    cancel () {
      this.$emit('close');
      this.$emit('reset');
    },
    back () {
      this.$emit('back');
    },
    submitForm () {
      this.$emit('submit');
    },
  },
  computed: {
    required () {
      return this.field.required ? this.$t("enabled") : this.$t('disabled')
    },
    visible () {
      return this.field.visible ? this.$t("enabled") : this.$t('disabled')
    },
    editable () {
      return this.field.editable ? this.$t("enabled") : this.$t('disabled')
    },
    minCharacter () {
      return this.field?.minCharacter
    },
    maxCharacter () {
      return this.field?.maxCharacter
    },
    placeholder () {
      return this.field.placeholder ? this.field.placeholder.text : '-'
    },
    hint() {
      return this.field.hint ? this.field.hint.text : '-'
    },
    label() {
      return this.field.label ? this.field.label.text : '-'
    },
    description() {
      return this.field.description ? this.field.description.text : '-'
    },
    title() {
      return this.field.title ? this.field.title.text : '-'
    },
    name() {
      return this.field.name ? this.field.name : '-'
    },
  }
}
</script>
