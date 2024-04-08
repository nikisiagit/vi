<template>
  <v-card>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-account-lock</v-icon>
      {{ $t('auth-sign-up-confirm')}}
    </v-card-title>

    <!-- error -->
    <v-slide-y-transition>
      <v-container fluid v-show="error">
        <v-row>
          <v-col class="px-4">
            <v-alert text rounded outlined border="left" elevation="2" type="error">
              {{ error }}
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <v-container fluid class="">
      <v-row>
        <v-col class="px-4">
          <p>
            {{ $t('auth-sign-up-confirm') }}
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-text-field
              prepend-icon="mdi-at"
              v-model="email"
              :label="emailLabel"
              :hint="emailHint"
              :rules="emailRules"
              clearable
              persistent-hint
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field v-model="code"
                          :rules="codeRules"
                          :label="codeLabel"
                          :hint="codeHint"
                          prepend-icon="mdi-numeric"
                          required
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-btn block @click="submit" color="primary" large>
            <v-progress-circular v-show="confirmingSignUp" indeterminate color="primary" :size="20" :width="3" class="mr-2"/>
            {{ $t('sign-up-confirm')}}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SignUpConfirm",

  data: () => ({
    valid: true,

    email: undefined,

    code: undefined,

    emailRules: [
      v => !!v || 'email-is-required',
      v => !v || /^.+@.+\..+$/.test(v) || 'email-must-be-valid'
    ],

    codeRules: [
      v => !!v || 'code-is-required',
      v => (v && v.length === 6) || 'code-must-be-six-digits'
    ],
  }),

  methods: {
    ...mapActions({
      confirmSignUp: 'auth/confirmSignUp',
      resendSignUp: 'auth/resendSignUp',
    }),


    reset () {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();

      this.email = undefined;
      this.code = undefined;
      this.valid = true;
    },

    /**
     * @returns {Promise<void>}
     */
    async submit () {
      console.log(`## SIGNUP CONFIRM`);
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      const username = this.email;
      const code = this.code;

      try {
        const confirmSignUpResult = await this.confirmSignUp({username, code});
        console.log(confirmSignUpResult);

        if (confirmSignUpResult === 'SUCCESS') {

        }

        this.reset();

      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      error: 'auth/error',
      confirmingSignUp: 'auth/confirmingSignUp',
    }),

    emailLabel () {
      return this.$i18n.t('email-label');
    },

    emailHint () {
      return this.$i18n.t('email-hint');
    },

    codeLabel () {
      return this.$i18n.t('code-label');
    },

    codeHint () {
      return this.$i18n.t('code-hint');
    },
  }
}
</script>
