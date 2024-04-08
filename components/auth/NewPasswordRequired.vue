<!--
Auth - New Password Required


This smart component is used when a user attempting to authenticate needs to supply
a new password.

The Require New Password process requires a localUser to be in the auth store.
-->
<template>
  <!-- :disabled="disabled" -->
  <v-card >
    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>
    <!-- /loading -->

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-account-lock</v-icon>

      <span>{{ $t('auth-new-password-required') }}</span>

<!--      <v-fade-transition>-->
<!--&lt;!&ndash;        <span v-if="signingIn">{{ $t('auth-new-password-required') }}</span>&ndash;&gt;-->
<!--        <span v-else>{{ // $t('auth-new-password-required') }}</span>-->
<!--      </v-fade-transition>-->

      <v-spacer />

      <!-- @todo remove this active state from this button -->
      <!-- https://stackoverflow.com/questions/57830767/is-it-default-for-vuetify-to-keep-active-state-on-buttons-after-click-how-do-yo -->
      <v-btn icon @click="showHelp = !showHelp;">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('auth-new-password-required-subtitle') }}
    </v-card-subtitle>
    <!-- /subtitle -->

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>
              {{ $t('auth-new-password-required-help') }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>

<!--        <v-row v-if="action === 'forgot'">-->
<!--          <v-col>-->
<!--            <v-text-field prepend-icon="mdi-at" clearable v-if="action === 'forgot'" v-model="username" :rules="emailRules" :label="$t('email-address')" required/>-->
<!--          </v-col>-->
<!--        </v-row>-->

<!--        <v-row  v-if="action === 'forgot'">-->
<!--          <v-col>-->
<!--            <v-text-field prepend-icon="mdi-numeric" clearable v-if="action === 'forgot'" v-model="code" :rules="codeRules" :label="$t('verification-code')" required/>-->
<!--          </v-col>-->
<!--        </v-row>-->

        <v-row>
          <v-col>
            <!--              :rules="passwordRules"-->
            <!--              :type="passwordVisible ? 'text' : 'password'"-->

            <v-text-field
              v-model="passwordLocal"
              prepend-icon="mdi-lock"
              :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="passwordVisible = !passwordVisible"
              name="new_password"
              :label="$t('new-password')"
              required
              error-count="6"
              clearable
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
<!--              :rules="passwordRules.concat(passwordConfirmationRule)"-->
<!--              :type="confirmPasswordVisible ? 'text' : 'password'"-->
            <v-text-field
              v-model="confirmPasswordLocal"
              prepend-icon="mdi-lock"
              :append-icon="confirmPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="confirmPasswordVisible = !confirmPasswordVisible"
              name="confirm_new_password"
              :label="$t('confirm-new-password')"
              required
              error-count="6"
              clearable
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- /form -->

    <!-- the submit button -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">

          <v-fade-transition>
            <!-- submit -->
            <v-btn block large @click="submit" v-if="! submitting" color="primary">
              {{ $t('auth-new-password-required-submit')}}
            </v-btn>

            <!-- signingIn -->
            <v-btn block large v-else>
              <v-progress-circular indeterminate
                                   color="primary"
                                   :size="20"
                                   :width="3"
                                   class="mr-2"
              />
              {{ $t('auth-new-password-required-submit')}}
            </v-btn>

          </v-fade-transition>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NewPasswordRequired",

  data: () => ({
    disabled: true,
    showHelp: false,
    submitting: false,
    valid: true,

    passwordLocal: undefined,
    passwordVisible: false,

    confirmPasswordLocal: undefined,
    confirmPasswordVisible: false,
  }),

  watch: {
    localUser: {
      immediate: true,
      handler () {
        this.disabled = ! this.localUser;
      },
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
      localUser: 'auth/localUser',
      error: 'auth/error',
      loading: 'auth/loading',
      loaded: 'auth/loaded',
      completingNewPassword: 'auth/completingNewPassword',
    }),
  },

  methods: {
    ...mapActions({
      completeNewPassword: 'auth/completeNewPassword',
    }),

    reset () {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();

      this.valid = true;

      this.passwordLocal = undefined;
      this.confirmPasswordLocal = undefined;
    },

    async submit () {
      if (! this.$refs.form.validate()) {
        return;
      }

      const completeNewPasswordResult = await this.completeNewPassword({
        user: this.localUser,
        password: this.passwordLocal
      });

      console.log(`## COMPLETE NEW PASSWORD RESULT`);
      console.log(completeNewPasswordResult);
    },
  },
}
</script>
