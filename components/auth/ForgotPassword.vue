<!--
Auth - Forgot Password

This smart component is used by an unauthenticated user to request a
reset code from Amplify.
-->
<template>
  <v-card flat :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account-lock</v-icon>

      <v-fade-transition>
        <span v-if="sendingForgotPassword">{{ $t('auth-sending-forgot-password') }}</span>
        <span v-else>{{ $t('auth-forgot-password') }}</span>
      </v-fade-transition>

      <v-spacer />

      <!-- @todo remove this active state from this button -->
      <!-- https://stackoverflow.com/questions/57830767/is-it-default-for-vuetify-to-keep-active-state-on-buttons-after-click-how-do-yo -->
      <v-btn icon @click="showHelp = !showHelp;">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

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
    <!-- /error -->

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>
              {{ $t('forgot-password-help') }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-text-field prepend-icon="mdi-at"
                          clearable
                          v-model="email"
                          :rules="emailRules"
                          :label="emailLabel"
                          :hint="emailHint"
                          persistent-hint
                          required />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <!-- /form -->

    <!-- submit -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-btn block @click="submit" color="primary" large>
            <v-progress-circular v-show="loading"
                                 indeterminate
                                 color="primary"
                                 :size="20"
                                 :width="3"
                                 class="mr-2"
            />
            {{ $t('forgot-password') }}
          </v-btn>
        </v-col>
      </v-row>

      <!-- sign-in button -->
      <v-row>
        <v-col class="px-4">
          <v-btn block large @click="changeShowResetPassword(false)">
            {{ $t('sign-in')}}
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
    <!-- /submit -->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ForgotPassword",

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
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
      sendForgotPassword: 'auth/sendForgotPassword',

      changeShowResetPassword: 'auth/changeShowResetPassword'
    }),

    reset () {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();

      this.valid = true;
      this.email = undefined;
    },

    async submit () {
      if (! this.$refs.form.validate()) {
        return;
      }

      const forgotPasswordResult = await this.sendForgotPassword({
        username: this.email,
      });

      console.log(`## FORGOT PASSWORD RESULT`);
      console.log(forgotPasswordResult);
    },
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
      error: 'auth/error',
      loading: 'auth/loading',
      loaded: 'auth/loaded',
      sendingForgotPassword: 'auth/sendingForgotPassword',
    }),

    emailLabel () {
      return this.$i18n.t('email-label');
    },

    emailHint () {
      return this.$i18n.t('email-hint');
    },
  },

  data: () => ({
    disabled: true,
    valid: true,

    showHelp: true,

    email: undefined,

    emailRules: [
      v => !!v || 'email-is-required',
    ],
  }),

  destroyed() {
    this.changeShowResetPassword(false)
  }
}
</script>
