<template>
  <v-row>
    <v-col cols="12" lg="12">
      <v-subheader class="subtitle-1 font-weight-bold">
        <v-icon left>
          mdi-account-edit
        </v-icon>
        User Preferences
      </v-subheader>

      <v-form v-model="userFormValid" ref="userForm" lazy-validation>
        <v-container>

          <v-row >
            <v-col cols="12" lg="6">
              <v-text-field
                disabled
                dense
                type="text"
                :value="me.email || 'ash@eventheads.com'"
                required
                :label="emailLabel"
                :hint="emailHint"
                persistent-hint
              />
            </v-col>


            <v-col cols="12" lg="6">
              <v-text-field
                dense
                type="text"
                v-model="me.name || 'Ash Kibir'"
                required
                :label="nameLabel"
                :hint="nameHint"
                persistent-hint
                clearable
                :rules="nameRules"
              />
            </v-col>

            <v-col cols="12" lg="6">
              <timezones-select
                @change="changePreferencesTimezone"
                :timezoneId="userPreferences.timezoneId"
                hide-refresh
              />
            </v-col>

            <v-col cols="12" lg="6">
              <v-select
                v-model="userPreferences.languageId"
                :items="languages"
                item-text="name"
                item-value="languageId"
                required
                :hint="languageHint"
                :label="languageLabel"
                persistent-hint
                dense
                :rules="languageRules"
              />
            </v-col>

            <v-col cols="12" lg="6">
              <v-select
                v-model="userPreferences.timeFormat"
                :items="timeFormats"
                required
                :hint="timeFormatHint"
                :label="timeFormatLabel"
                persistent-hint
                dense
                :rules="timeFormatRules"
              />
            </v-col>

            <v-col cols="12" lg="6">
              <v-select
                v-model="userPreferences.themeMode"
                :items="themeMode"
                required
                :hint="themeModeHint"
                :label="themeModeLabel"
                persistent-hint
                dense
                :rules="themeModeRules"
              />
            </v-col>

            <v-col cols="12" lg="6">
              <v-list-item-title>
                {{ notificationsLabel }}
              </v-list-item-title>
              <v-switch
                class="mt-0"
                dense
                color="primary"
                v-model="userPreferences.enableNotifications"
              ></v-switch>
            </v-col>

          </v-row>

        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserPreferencesForm',
  props: {
    me: {
      type: Object
    }
  },
  data(){
    return {
      userFormValid: true,
      userPreferences: {
        timezoneId: 'europe_london', // @todo: get from browser
        languageId: 'ucas.en', //  @todo: get from browser and get venue'
        timeFormat: '12h', // 24h or 12h - // @todo: get from browser
        themeMode: 'light',
        enableNotifications: true
      },

      timeFormats: [
        {
          text: '24h',
          value: '24h'
        },
        {
          text: '12h',
          value: '12h'
        },
      ],

      themeMode: [
        {
          text: 'Light',
          value: 'light'
        },
        {
          text: 'Dark',
          value: 'dark'
        },
      ],

    }
  },
  computed: {
    languages(){
      return []
    },

    nameLabel () {
      return this.$i18n.t('Name_Label');
    },
    nameHint () {
      return this.$i18n.t('Name_Hint');
    },
    nameRules() {
      //TODO: Handle i18n.
      return [
        v => !!v || 'Name_Is_Required', // @todo make i18n compat
      ]
    },
    notificationsLabel () {
      return this.$i18n.t('Notifications_Enabled_Label');
    },
    emailLabel () {
      return this.$i18n.t('Email_Label');
    },

    emailHint () {
      return this.$i18n.t('Email_Hint');
    },

    roleLabel () {
      return this.$i18n.t('Role_Label');
    },

    roleHint () {
      return this.$i18n.t('Role_Hint');
    },

    languageLabel () {
      return this.$i18n.t('Language_Label');
    },

    languageHint () {
      return this.$i18n.t('Language_Hint');
    },

    languageRules() {
      //TODO: Handle i18n.
      return [
        v => !!v || 'Language_Is_Required', // @todo make i18n compat
      ]
    },

    timeFormatLabel () {
      return this.$i18n.t('Time_Format_Label');
    },

    timeFormatHint () {
      return this.$i18n.t('Time_Format_Hint');
    },

    themeModeLabel () {
      return this.$i18n.t('Theme_Mode_Label');
    },

    themeModeHint () {
      return this.$i18n.t('Theme_Mode_Hint');
    },

    timeFormatRules() {
      //TODO: Handle i18n.
      return [
        v => !!v || 'Time_Format_Is_Required', // @todo make i18n compat
      ]
    },

    themeModeRules() {
      //TODO: Handle i18n.
      return [
        v => !!v || 'Theme_Mode_Is_Required', // @todo make i18n compat
      ]
    },
  },
  methods: {
    changePreferencesTimezone (timezoneId) {
      this.userPreferences.timezoneId = timezoneId;
    },

  }
}
</script>

