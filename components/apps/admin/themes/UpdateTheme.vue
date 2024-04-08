<template>
  <v-card>
    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-palette</v-icon>
      {{ $t('update-theme') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('update-theme-subtitle') }}</v-card-subtitle>

    <!-- the form -->
    <template>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-text-field
                  :value="name"
                  :label="nameLabel"
                  :hint="nameHint"
                  persistent-hint
                  readonly
                />
              </v-col>
            </v-row>


            <v-row>
              <v-col>
                <v-tabs
                  v-model="themeMode"
                >
                  <v-tab
                    v-for="t in Object.keys(localTheme)"
                    :key="t"
                  >
                    {{ $t(`${t}-mode`) }}
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="themeMode">
                  <v-tab-item
                    v-for="t in Object.keys(localTheme)"
                    :key="t"
                  >

                    <v-container fluid>

                      <v-row>

                        <v-col cols="12" lg="4">
                          <apps-admin-themes-blueprints-main
                            :app-bar-color="localTheme[t].primary"
                            :is-dark="t === 'dark'"
                            :is-light="t === 'light'"
                          />
                        </v-col>

                        <v-col cols="12" lg="8">

                          <v-row>

                            <v-col>
                              <base-color-picker :label="primaryColorLabel"
                                                 :hint="primaryColorHint"
                                                 :color="localTheme[t].primary"
                                                 @change-colour="(color) => changePaletteColor('primary', color)" />
                            </v-col>

                          </v-row>

                        </v-col>
                      </v-row>


                      <v-row>
                        <v-col>
                          <v-expansion-panels accordion>
                            <v-expansion-panel>
                              <v-expansion-panel-header class="pa-0">
                                <h3>
                                  <v-icon left>
                                    mdi-marker
                                  </v-icon>

                                  {{ $t('advanced-colours') }}
                                </h3>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>

                                <v-container fluid>
                                  <v-row>

                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="secondaryColorLabel"
                                                         :hint="secondaryColorHint"
                                                         :color="localTheme[t].secondary"
                                                         @change-colour="(color) => changePaletteColor('secondary', color)" />
                                    </v-col>
                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="accentColorLabel"
                                                         :hint="accentColorHint"
                                                         :color="localTheme[t].accent"
                                                         @change-colour="(color) => changePaletteColor('accent', color)" />
                                    </v-col>

                                  </v-row>

                                  <v-row>
                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="infoColorLabel"
                                                         :hint="infoColorHint"
                                                         :color="localTheme[t].info"
                                                         @change-colour="(color) => changePaletteColor('info', color)" />
                                    </v-col>
                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="warningColorLabel"
                                                         :hint="warningColorHint"
                                                         :color="localTheme[t].warning"
                                                         @change-colour="(color) => changePaletteColor('warning', color)" />
                                    </v-col>

                                  </v-row>

                                  <v-row>
                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="errorColorLabel"
                                                         :hint="errorColorHint"
                                                         :color="localTheme[t].error"
                                                         @change-colour="(color) => changePaletteColor('error', color)" />
                                    </v-col>
                                    <v-col>
                                      <base-color-picker :label="successColorLabel"
                                                         :hint="successColorHint"
                                                         :color="localTheme[t].success"
                                                         @change-colour="(color) => changePaletteColor('success', color)" />
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="backgroundColorLabel"
                                                         :hint="backgroundColorHint"
                                                         :color="localTheme[t].background"
                                                         @change-colour="(color) => changePaletteColor('background', color)" />
                                    </v-col>
                                  </v-row>
                                </v-container>

                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </v-col>
                      </v-row>


                    </v-container>

                  </v-tab-item>
                </v-tabs-items>
              </v-col>
            </v-row>

          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-container fluid >
          <v-row>
            <v-col cols="12">
              <base-preview-alert
                :title="$t('Always keep in mind Accessibility and Readability of your content when changing colours.')"
                :action-text="$t('learn-more')"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-scroll-x-transition>
                <v-container fluid v-show="error">
                  <v-row no-gutters>
                    <v-col>

                      <v-alert
                        text
                        rounded
                        outlined
                        border="left"
                        elevation="2"
                        type="error"
                      >
                        {{ error }}
                      </v-alert>
                    </v-col>
                  </v-row>
                </v-container>
              </v-scroll-x-transition>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>

      <v-card-actions>
        <v-btn @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer/>
        <v-btn @click="submit" :loading="submitting" :disabled="submitting">
          {{ $t('update-theme') }}
        </v-btn>
      </v-card-actions>
    </template>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateTheme",
  props: {
    theme: {
      type: Object
    }
  },

  watch: {
    theme: {
      deep: true,
      immediate: true,
      handler(theme){
        this.name = theme?.name

        if (theme?.light && Object.keys(theme.light).length) {
          this.localTheme.light = {
            ...this.localTheme.light,
            ...theme.light
          }
        }

        if (theme?.dark && Object.keys(theme.dark).length) {
          this.localTheme.dark = {
            ...this.localTheme.dark,
            ...theme.dark
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      updateTheme: 'apps/admin/themes/updateTheme',
    }),

    cancel () {
      this.$emit('close');
    },

    async submit () {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      this.valid = true;

      if (! this.theme?.themeId) {
        throw new Error('ThemeId is required for update the theme')
      }

      try {
        const themeToUpdate = {
          name: this.theme.name,
          ...this.localTheme,
        };

        this.submitting = true;
        const updatingTheme = await this.updateTheme(themeToUpdate);
        this.submitting = false;

        console.log(`## UPDATING THEME`);
        console.log(updatingTheme);

        this.reset()
        this.cancel()

      } catch (error) {
        console.log(`## UPDATING THEME ERROR`);
        console.log(error);

        this.submitting = false;
        this.error = error.response.data?.message || error?.message
      }
    },

    changePaletteColor(paletteColor, color){
      const t = this.themeMode ? 'dark': 'light'

      this.localTheme[t][paletteColor] = color.hexa ? color.hexa : color;
      console.log(this.localTheme)
    },

    reset () {
      this.name = undefined;

      this.themeMode = undefined;

      this.localTheme = {
        light: {
          background: undefined,
          primary: undefined,
          secondary: undefined,
          accent: undefined,
          warning: undefined,
          success: undefined,
          error: undefined,
          info: undefined,
          anchor: undefined,
        },
        dark: {
          background: undefined,
          primary: undefined,
          secondary: undefined,
          accent: undefined,
          warning: undefined,
          success: undefined,
          error: undefined,
          info: undefined,
          anchor: undefined,
        }
      };

      this.submitting = false;
      this.valid = false;
    },
  },

  computed: {

    nameLabel () {
      return this.$i18n.t('theme-name');
    },

    nameHint () {
      return this.$i18n.t('theme-name');
    },

    backgroundColorLabel() {
      return this.$i18n.t('background-colour');
    },
    backgroundColorHint() {
      return this.$i18n.t('background-colour');
    },

    primaryColorLabel () {
      return this.$i18n.t('primary-colour');
    },
    primaryColorHint () {
      return this.$i18n.t('primary-colour');
    },

    secondaryColorLabel () {
      return this.$i18n.t('secondary-colour');
    },
    secondaryColorHint () {
      return this.$i18n.t('secondary-colour');
    },

    accentColorLabel () {
      return this.$i18n.t('accent-colour');
    },
    accentColorHint () {
      return this.$i18n.t('accent-colour');
    },

    errorColorLabel () {
      return this.$i18n.t('error-colour');
    },
    errorColorHint () {
      return this.$i18n.t('error-colour');
    },

    infoColorLabel () {
      return this.$i18n.t('info-colour');
    },

    infoColorHint () {
      return this.$i18n.t('info-colour');
    },

    successColorLabel () {
      return this.$i18n.t('success-colour');
    },

    successColorHint () {
      return this.$i18n.t('success-colour');
    },

    warningColorLabel () {
      return this.$i18n.t('warning-colour');
    },
    warningColorHint () {
      return this.$i18n.t('warning-colour');
    },

  },

  data: () => ({
    name: undefined,

    themeMode: undefined,

    localTheme: {
      light: {
        background: undefined,
        primary: undefined,
        secondary: undefined,
        accent: undefined,
        warning: undefined,
        success: undefined,
        error: undefined,
        info: undefined,
        anchor: undefined,
      },
      dark: {
        background: undefined,
        primary: undefined,
        secondary: undefined,
        accent: undefined,
        warning: undefined,
        success: undefined,
        error: undefined,
        info: undefined,
        anchor: undefined,
      }
    },

    submitting: false,
    error: undefined, // Error when submitting
    valid: false,
  }),
  beforeDestroy() {
    this.reset()
  }
}
</script>
