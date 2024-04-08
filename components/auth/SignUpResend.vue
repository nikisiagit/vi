<template>
  <v-card :loading="resendingSignUp">
    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-account-lock</v-icon>
      {{ $t('auth-sign-up-resend')}}
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

    <!-- help text -->
    <v-container fluid class="">
      <v-row>
        <v-col class="px-4">
          <p>
            {{ $t('auth-sign-up-resend-help') }}
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col>
          {{ signUpResend }}
        </v-col>
      </v-row>
    </v-container>

    <!-- the form -->
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="email"
                          :label="emailLabel"
                          :hint="emailHint"
                          :rules="emailRules"
                          prepend-icon="mdi-at"
                          clearable
                          persistent-hint
                          required
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- the buttons -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
            <v-btn block large @click="submit" color="primary">
              <v-progress-circular indeterminate
                                   color="primary"
                                   :size="20"
                                   :width="3"
                                   class="mr-2"
                                   v-show="resendingSignUp"
              />
              {{ $t('resend-sign-up')}}
            </v-btn>

        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SignUpResend",

  data: () => ({
    valid: false,

    email: undefined,

    emailRules: [
      v => !!v || 'email-is-required',
      v => !v || /^.+@.+\..+$/.test(v) || 'email-must-be-valid',
    ],
  }),

  methods: {
    ...mapActions({
      resendSignUp: 'auth/resendSignUp',
    }),

    async submit () {
      console.log(`## SUBMIT`);

      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      const username = this.email;

      try {
        const resendSignUpResult = await this.resendSignUp({username});

        console.log(`## SIGNUP RESEND RESULT`);
        console.log(resendSignUpResult);

      } catch (error) {
        console.log(`## SIGNUP RESEND - ERROR`);
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      error: 'auth/error',
      resendingSignUp: 'auth/resendingSignUp',
      signUpResend: 'auth/signUpResend',
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
