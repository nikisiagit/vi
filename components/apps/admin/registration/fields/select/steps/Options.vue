<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ numberOfOptions + " " + $t(`options`) }}</v-list-item-title>
                  <v-list-item-subtitle>{{$t(`manage-options`) }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="addOption" medium color="primary">
                      {{$t(`create-option`)}}
                    <v-icon right>mdi-plus</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

            <!-- Options -->
              <v-list-item-group>
                <v-list-item v-for="(option, index) in options" :key="index">
                  <v-list-item-content>
                    <v-list-item-subtitle class="d-flex align-center">
                      <div class="flex-grow-1">{{ $t(`option`) + " " + (index + 1) }}</div>
                      <v-btn x-small plain class="ml-2" @click="deleteOption(index)" text color="error">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-list-item-subtitle>

                    <base-label-form
                      :text="label"
                      :text-label="labelLabel"
                      :text-hint="labelHint"
                      @change="(payload) => changeLabel(index,payload)"
                    />
                    <v-text-field
                      v-model="option.value"
                      :label="valueLabel"
                      :hint="valueHint"
                      persistent-hint
                      clearable
                    />
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
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
    <v-btn large class="pa-4 primary" rounded @click="submit">
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
  name: "Options",
  data() {
    return {
      options: [],
      label: undefined, //{text: undefined, languageId: undefined},
    }
  },
  methods: {
    addOption() {
      this.options.push({ label: {}, value: "" })
    },
    changeLabel(index,{text, languageId}) {
      this.options[index].label.languageId = languageId
      this.options[index].label.text = text
    },
    deleteOption(index) {
      this.options.splice(index, 1)
    },
    cancel () {
      this.options = [],
      this.$emit('cancel');
      this.$emit('reset')

    },
    back () {
      this.$emit('back');
    },

    submit () {
      this.$emit('submitted', {
        options: this.options,
      });
    },
  },
  computed: {
    labelLabel () {
      return this.$i18n.t('field-label');
    },
    labelHint () {
      return this.$i18n.t('this-is-the-label-of-the-field');
    },
    valueLabel () {
      return this.$i18n.t('field-value');
    },
    valueHint () {
      return this.$i18n.t('this-is-the-value-of-the-field');
    },
    numberOfOptions() {
      return this.options.length
    }
  },
}
</script>
