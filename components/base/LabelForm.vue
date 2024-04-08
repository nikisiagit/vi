<template>
  <v-form ref="form" v-model="valid" lazy-validation>

    <v-row dense>
      <v-col cols="12" lg="10" md="12" xs="6">
        <v-textarea
          v-if="isTextarea"
          auto-grow
          rows="1"
          row-height="15"
          v-model="textLocal"
          :label="$t(textLabel)"
          :hint="$t(textHint)"
          :rules="rules"
          persistent-hint
          clearable
          @change="textChanged"></v-textarea>

        <v-text-field
          v-else
          v-model="textLocal"
          :label="$t(textLabel)"
          :hint="$t(textHint)"
          :rules="rules"
          persistent-hint
          clearable
          @change="textChanged"/>
      </v-col>

      <v-col align-self="center" cols="auto" >
        <v-tooltip bottom open-on-focus open-delay="300"  transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="pa-1" medium outlined  color="primary"  @click="showLanguage = !showLanguage" v-bind="attrs" v-on="on">
              Language
            </v-btn>
          </template>
          <span v-show="! showLanguage">{{ $t('show-language') }}</span>
          <span v-show="showLanguage">{{ $t('hide-language') }}</span>
        </v-tooltip>
      </v-col>

    </v-row>

    <v-slide-y-transition>
      <v-row v-if="showLanguage">
        <v-col>
          <languages-select :language-id="languageIdLocal" @change="languageChanged"/>
        </v-col>
      </v-row>
    </v-slide-y-transition>

  </v-form>
</template>


<script>

export default {
  name: 'LabelForm',
  props: {
    isTextarea: {
      type: Boolean
    },
    textLabel: {
      type: String
    },

    textHint: {
      type: String
    },
    text: {
      type: String
    },
    rules: {
      type: Array,
      default: () => []
    },
    languageId: {
      type: String
    }
  },
  data: () => ({
    showLanguage: false,
    valid: true,
    textLocal: '',
    languageIdLocal: '',
  }),

  watch: {
    text(){
      this.textLocal = this.text
    },

    languageId(){
      this.languageIdLocal = this.languageId
    },
  },

  methods: {
    textChanged (value) {
      this.textLocal = value

      this.$emit('change', {
        languageId: this.languageIdLocal,
        text: this.textLocal,
      });
    },

    languageChanged (value) {
      this.languageIdLocal = value

      this.$emit('change', {
        languageId: this.languageIdLocal,
        text: this.textLocal,
      });
    },
    reset() {
      this.textLocal = '';
    },
  },
  computed: {
  },
}
</script>

