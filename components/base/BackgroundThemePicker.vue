<template>
  <v-card>
    <div class="pl-9">
      <v-icon style="position: absolute; top: 1.45rem; left: 1rem;">mdi-palette</v-icon>

      <v-card-title>{{ $t('Background_Color_Theme') }}</v-card-title>
      <v-card-subtitle>{{ $t('Background_Color_Theme_Subtitle') }}</v-card-subtitle>
    </div>

    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col>
              <base-color-picker :clear="unmount" :label="lightBgColorLabel" :hint="lightBgColorHint" @change-color="changeLightColor" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <base-color-picker :clear="unmount" :label="darkBgColorLabel" :hint="darkBgColorHint" @change-color="changeDarkColor" />
            </v-col>
          </v-row>

        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BackgroundThemePicker',
  props: {
    unmount: {
      type: Boolean
    }
  },
  computed: {
    darkBgColorLabel () {
      return this.$i18n.t('Background_Dark_Color');
    },

    darkBgColorHint () {
      return this.$i18n.t('Background_Dark_Color_Hint');
    },

    lightBgColorLabel () {
      return this.$i18n.t('Background_Light_Color');
    },

    lightBgColorHint () {
      return this.$i18n.t('Background_Light_Color_Hint');
    },
  },
  data(){
    return {
      valid: true,
    }
  },
  methods: {
    changeLightColor(color){
      this.$emit('change-light-bg', color)
    },

    changeDarkColor(color){
      this.$emit('change-dark-bg', color)
    },
  }
}
</script>
