<!--
Auth Sign In

This smart component is used to authenticate the user with Amplify.
-->
<template>
  <v-card height="100%" rounded>
    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-login</v-icon>

      <v-fade-transition>
        <span v-if="signingIn">{{ $t('auth-signing-in-title') }}</span>
        <span v-else>{{ $t('auth-sign-in-title') }}</span>
      </v-fade-transition>

      <v-spacer />

      <!-- @todo remove this active state from this button -->
      <!-- https://stackoverflow.com/questions/57830767/is-it-default-for-vuetify-to-keep-active-state-on-buttons-after-click-how-do-yo -->
<!--      <v-btn icon @click="showHelp = !showHelp;">-->
<!--        <v-icon>mdi-help-circle</v-icon>-->
<!--      </v-btn>-->
    </v-card-title>

    <v-card-subtitle>
      <v-fade-transition>
        <span v-if="signingIn">{{ $t('auth-signing-in-subtitle') }}</span>
        <span v-else>{{ $t('auth-sign-in-subtitle') }}</span>
      </v-fade-transition>
    </v-card-subtitle>

    <!-- error -->
    <v-slide-y-transition>
      <v-container fluid v-show="error">
        <v-row no-gutters>
          <v-col>
            <v-alert text rounded outlined border="left" elevation="2" type="error">
              {{ error }}
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>


    <!-- help -->
<!--    <v-slide-y-transition>-->
<!--      <v-container fluid v-if="showHelp">-->
<!--        <v-row>-->
<!--          <v-col class="px-4">-->
<!--            <p>-->
<!--              {{ $t('sign-in-help') }}-->
<!--            </p>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->
<!--    </v-slide-y-transition>-->

    <!-- form -->
    <v-form v-model="valid" ref="form" lazy-validation>

      <v-container fluid>
        <!-- email -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="email"
                          :label="emailLabel"
                          :hint="emailHint"
                          :rules="emailRules"
                          persistent-hint
                          required
                          prepend-icon="mdi-at"
            />
          </v-col>
        </v-row>

        <!-- password -->
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="password"
                          :rules="passwordRules"
                          :type="passwordVisible ? 'text' : 'password'"
                          :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                          :label="passwordLabel"
                          :hint="passwordHint"
                          @click:append="passwordVisible = !passwordVisible"
              name="password"
              prepend-icon="mdi-lock"
              required
              error-count="6"
              persistent-hint
            />
          </v-col>
        </v-row>

        <!-- remember me -->
        <!-- @todo  https://5-guys.atlassian.net/browse/PRK-131 -->
        <v-row v-show="rememberMeEnabled">
          <v-col class="pa-4">
            <v-checkbox :label="$t('remember-me')" hide-details class="mt-0" />
          </v-col>

          <!-- forgot-password -->
          <v-col v-show="forgotPasswordEnabled">
            <v-btn block plain large @click="changeShowResetPassword(true)">
              {{ $t('forgot-password')}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- the submit button -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">

          <v-fade-transition>
            <!-- submit -->
            <v-btn block large @click="submit" v-if="! signingIn" color="primary">
              {{ $t('sign-in')}}
            </v-btn>

            <!-- signingIn -->
            <v-btn block large v-else>
              <v-progress-circular indeterminate
                                   color="primary"
                                   :size="20"
                                   :width="3"
                                   class="mr-2"
              />
              {{ $t('signing-in')}}
            </v-btn>

          </v-fade-transition>
        </v-col>
      </v-row>
    </v-container>

    <!-- sign-up -->
    <v-slide-y-transition>
      <v-container fluid v-show="signUpEnabled">
        <v-row>
          <v-col>
            <v-btn block large @click="changeShowSignUp(true)">
              {{ $t('sign-up')}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- social login -->
    <v-slide-y-transition>
      <v-container fluid>
        <!-- google -->
        <v-row class="d-flex justify-center">
          <v-col>
            <v-btn block large @click="signInWithGoogle">
              <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
              {{ $t('continue-with-google') }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- facebook -->
        <v-row class="d-flex justify-center">
          <v-col>
            <v-btn block large @click="signInWithFacebook" disabled>
              <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#3578E5"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              {{ $t('continue-with-facebook') }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- apple -->
        <v-row class="d-flex justify-center">
          <v-col>
            <v-btn block large @click="signInWithApple" disabled>
              <v-icon class="mr-2">
                mdi-apple
              </v-icon>
              {{ $t('continue-with-apple') }}
            </v-btn>
          </v-col>
        </v-row>
        <!-- / social login -->
        <!-- / END - If has social sign in enabled -->
      </v-container>
    </v-slide-y-transition>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {Auth} from "aws-amplify";
import {CognitoHostedUIIdentityProvider} from "@aws-amplify/auth/lib-esm/types/Auth";


export default {
  name: "SignIn",

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
    //
    // const result = await Auth.fetchDevices();
    // console.log(result, "#####DEVICES");
  },

  watch: {
    user: {
      immediate: true,
      handler () {
        this.disabled = !! this.user;
      },
    }
  },

  methods: {
    ...mapActions({
      load: 'auth/load',
      signIn: 'auth/signIn',

      changeShowResetPassword: 'auth/changeShowResetPassword',
      changeShowSignUp: 'auth/changeShowSignUp',
    }),

    reset () {
      this.$refs.form?.reset();
      this.$refs.form?.resetValidation();

      this.valid = true;
      this.email = undefined;
      this.password = undefined;
      this.rememberMe = false;
    },

    async submit() {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      const user = await this.signIn({
        username: this.email,
        password: this.password
      });

      if (user) {
        console.log(`## SIGN IN - USER`);
        console.log(user);
        this.reset();
      }
    },

    async signInWithGoogle () {
      try {
        const user = await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
      } catch (error) {
        console.log('federatedSignIn error:', error);
      }
    },

    async signInWithApple () {
      // @todo
    },

    async signInWithFacebook () {
      try {
        const user = await Auth.federatedSignIn({ provider: 'Facebook' });
      } catch (error) {
        console.log('federatedSignIn error:', error);
      }
    },
  },

  computed: {
    ...mapGetters({
      error: 'auth/error',
      user: 'auth/user',
      signingIn: 'auth/signingIn',
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

  data: () => ({
    disabled: true,
    valid: false,

    showHelp: true,

    email: undefined,
    password: undefined,
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
      v => /(?=.*[\W_])/.test(v) || 'Must have one special character [!@#$%]'
    ],

    // @todo https://5-guys.atlassian.net/browse/PRK-50
    rememberMeEnabled: true, // false, @todo:
    forgotPasswordEnabled: true, // false @todo:
    signUpEnabled: true, // false @todo: is this a venue config, private/public?
    socialSignInEnabled: false,
  }),

}
</script>
