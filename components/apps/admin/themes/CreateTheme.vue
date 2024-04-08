<template>
  <v-card>
    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-palette</v-icon>
      {{ $t('create-theme') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('create-theme-subtitle') }}</v-card-subtitle>

    <!-- the form -->
    <template v-if="! executionArn">
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="name"
                  :label="nameLabel"
                  :hint="nameHint"
                  persistent-hint
                  clearable
                  required
                  :rules="[v => !!v || 'Name is required']"
                />
              </v-col>
            </v-row>


            <v-row>
              <v-col>
                <v-tabs
                  v-model="themeMode"
                >
                  <v-tab
                    v-for="t in Object.keys(theme)"
                    :key="t"
                  >
                    {{ $t(`${t}-mode`) }}
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="themeMode">
                  <v-tab-item
                    v-for="t in Object.keys(theme)"
                    :key="t"
                  >

                    <v-container fluid>

                      <v-row>

                        <v-col cols="12" lg="4">
                          <apps-admin-themes-blueprints-main
                            :app-bar-color="theme[t].primary"
                            :is-dark="t === 'dark'"
                            :is-light="t === 'light'"
                          />
                        </v-col>

                        <v-col cols="12" lg="8">

                          <v-row>

                            <v-col>
                              <base-color-picker :label="primaryColorLabel"
                                                 :hint="primaryColorHint"
                                                 :color="theme[t].primary"
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
                                                         :color="theme[t].secondary"
                                                         @change-colour="(color) => changePaletteColor('secondary', color)" />
                                    </v-col>
                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="accentColorLabel"
                                                         :hint="accentColorHint"
                                                         :color="theme[t].accent"
                                                         @change-colour="(color) => changePaletteColor('accent', color)" />
                                    </v-col>

                                  </v-row>

                                  <v-row>
                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="infoColorLabel"
                                                         :hint="infoColorHint"
                                                         :color="theme[t].info"
                                                         @change-colour="(color) => changePaletteColor('info', color)" />
                                    </v-col>
                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="warningColorLabel"
                                                         :hint="warningColorHint"
                                                         :color="theme[t].warning"
                                                         @change-colour="(color) => changePaletteColor('warning', color)" />
                                    </v-col>

                                  </v-row>

                                  <v-row>
                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="errorColorLabel"
                                                         :hint="errorColorHint"
                                                         :color="theme[t].error"
                                                         @change-colour="(color) => changePaletteColor('error', color)" />
                                    </v-col>
                                    <v-col>
                                      <base-color-picker :label="successColorLabel"
                                                         :hint="successColorHint"
                                                         :color="theme[t].success"
                                                         @change-colour="(color) => changePaletteColor('success', color)" />
                                    </v-col>
                                  </v-row>

                                  <v-row>
                                    <v-col cols="12" lg="6">
                                      <base-color-picker :label="backgroundColorLabel"
                                                         :hint="backgroundColorHint"
                                                         :color="theme[t].background"
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
        </v-container>
      </v-card-actions>

      <v-card-actions>
        <v-btn @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-btn @click="reset">{{ $t('reset') }}</v-btn>
        <v-spacer/>
        <v-btn @click="submit" :loading="submitting" :disabled="submitting">
          {{ $t('create-theme') }}
        </v-btn>
      </v-card-actions>
    </template>


    <template v-if="executionArn">

      <!-- the error -->
      <v-card-text v-show="error">
        <v-alert type="error">
          {{ error }}
        </v-alert>
      </v-card-text>

      <!-- the loader -->
      <v-card-text v-show="creating">
        <v-progress-linear class="mt-2" indeterminate />
      </v-card-text>

      <!-- debug -->
      <v-card-text v-show="debug">
        <pre>{{ creatingTheme }}</pre>
      </v-card-text>

      <v-card-text v-if="themeId">
        <!-- link to the newly created theme -->
        <v-list two-line>
          <!-- apps-admin-theme-nav-list-item :theme="themeId" /> -->
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ themeId }}</v-list-item-title>
              <v-list-item-title>{{ $t('theme') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="cancel">{{ $t('close') }}</v-btn>
        <v-spacer/>
        <v-btn @click="reset">{{ $t('create-another-theme') }}</v-btn>
      </v-card-actions>

    </template>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateTheme",

  methods: {
    ...mapActions({
      createTheme: 'apps/admin/themes/createTheme',
    }),

    cancel () {
      this.reset();
      this.$emit('close');
    },

    reset () {
      this.name = undefined;

      this.themeMode = undefined;

      this.theme = {
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

      this.executionArn = undefined;
      this.startDate = undefined;
      this.submitting = false;
      this.valid = false
    },

    async submit () {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      this.valid = true;

      try {
        const themeToCreate = {
          name: this.name,
          ...this.theme,
        };

        this.submitting = true;
        const creatingTheme = await this.createTheme(themeToCreate);
        this.submitting = false;

        console.log(`## CREATE THEME - CREATING THEME`);
        console.log(creatingTheme);

        const {executionArn, startDate} = creatingTheme;

        this.executionArn = executionArn;
        this.startDate = startDate;

      } catch (error) {
        console.log(`## CREATE THEME ERROR`);
        console.log(error);

        this.submitting = false;
      }
    },

    changePaletteColor(paletteColor, color){
      const t = this.themeMode ? 'dark': 'light'

      this.theme[t][paletteColor] = color.hexa ? color.hexa : color;
      console.log(this.theme)
    }
  },

  computed: {
    ...mapGetters({
      creatingThemeWithExecutionArn: 'apps/admin/themes/creatingThemeWithExecutionArn',
    }),

    creatingTheme () {
      return (this.executionArn) ? this.creatingThemeWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return (this.creatingTheme) ? this.creatingTheme.creating : false;
    },

    created () {
      return (this.creatingTheme) ? this.creatingTheme.created : false;
    },

    error () {
      return (this.creatingTheme) ? this.creatingTheme.error : false;
    },

    loaded () {
      return (this.creatingTheme) ? this.creatingTheme.loaded : false;
    },

    loading () {
      return (this.creatingTheme) ? this.creatingTheme.loading : false;
    },

    themeId () {
      return (this.creatingTheme) ? this.creatingTheme.themeId : undefined;
    },

    //

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

    theme: {
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

    debug: false,
    submitting: false,
    executionArn: undefined,
    startDate: undefined,
    valid: false,
  }),
}
</script>
