<template>
  <v-card color="" flat>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-account-lock</v-icon>
      {{ $t('auth-sign-up') }}
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


<!--    <v-slide-y-transition>-->
<!--      <v-container fluid v-show="signUp">-->
<!--        <v-row>-->
<!--          <v-col class="px-4">-->
<!--            <pre>-->
<!--              {{ signUpResult }}-->
<!--            </pre>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->
<!--    </v-slide-y-transition>-->


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
          <v-col class="px-4">
            <v-text-field
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              :label="passwordLabel"
              :hint="passwordHint"
              :rules="passwordRules"
              :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-icon="mdi-lock"
              @click:append="passwordVisible = !passwordVisible"
              name="password"
              required
              error-count="6"
              clearable
              persistent-hint
            />
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row>
          <v-col>
            <v-btn block :disabled="isDisabled" @click="submit" color="primary" large>
              <v-progress-circular
                v-show="sendingSignUp"
                indeterminate
                color="primary"
                :size="20"
                :width="3"
                class="mr-2"
              />
              {{ $t('sign-up')}}
            </v-btn>
          </v-col>
        </v-row>

        <!-- sign-in button -->
        <v-row>
          <v-col class="px-4">
            <v-btn block large @click="changeShowSignUp(false)">
              {{ $t('sign-in')}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SignUp",

  data: () => ({

    valid: false,

    email: undefined,
    password: undefined,


    loading: false,

    isDisabled: false,
    passwordVisible: false,

    emailRules: [
      v => !!v || 'email-is-required',
      v => !v || /^.+@.+\..+$/.test(v) || 'email-must-be-valid',
    ],

    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must have 8+ characters',
      v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
      v => /(?=.*[a-z])/.test(v) || 'Must have one lowercase character',
      v => /(?=.*\d)/.test(v) || 'Must have one number',
      v => /(?=.*\W)/.test(v) || 'Must have one special character [!@#$%]'
    ],
  }),

  methods: {
    ...mapActions({
      signUp: 'auth/signUp',

      changeShowSignUp: 'auth/changeShowSignUp'
    }),


    async submit () {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      const email = this.email;
      const password = this.password;

      try {
        const signUpResult = await this.signUp({username: email, password})
        console.log(`## SIGNUP - SIGN UP RESULT`);
        console.log(signUpResult);

      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      error: 'auth/error',
      user: 'auth/user',
      signUpResult: 'auth/signUp',
      sendingSignUp: 'auth/sendingSignUp',
    }),

    emailLabel () {
      return this.$i18n.t('email-label');
    },

    emailHint () {
      return this.$i18n.t('email-hint');
    },

    passwordLabel () {
      return this.$i18n.t('password-label');
    },

    passwordHint () {
      return this.$i18n.t('password-hint');
    },
  },

  destroyed() {
    this.changeShowSignUp(false)
  }
}
</script>
