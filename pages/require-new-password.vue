<template>
  <div class="fill-height black">
    <v-container fluid :style="styles" class="fill-height image-container"/>

    <v-container fluid class="fill-height">
      <v-row>
        <v-col
          lg="4"
          cols="12"
          class="pa-0"
        >
          <v-card class="rounded-0" min-height="100vh">

            <!-- logo -->
            <v-card-title class="justify-center py-7">
              <v-img
                :src="logoImage"
                max-height="30px"
                max-width="30px"
                alt="logo"
                contain
                class="me-3 "
              ></v-img>

              <v-skeleton-loader
                v-if="venueLoading || ! name"
                type="button"
              ></v-skeleton-loader>

              <h2 v-else >
                {{ name }}
              </h2>

            </v-card-title>
            <v-divider></v-divider>

            <!-- subtitle -->
            <v-card-subtitle class="text-center">
              <h3 class="primary--text">{{ $t('require-new-password') }}</h3>
              <span>
                Check your email address and enter the verification code to change your password.
              </span>
            </v-card-subtitle>

            <!-- require new password form -->
            <v-card-text>
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


              <v-form v-model="valid" ref="form" lazy-validation>
                <v-container fluid>

                  <v-row v-if="action === 'forgot'">
                    <v-col>
                      <v-text-field prepend-icon="mdi-at" clearable v-if="action === 'forgot'" v-model="username" :rules="emailRules" :label="$t('email-address')" required/>
                    </v-col>
                  </v-row>

                  <v-row  v-if="action === 'forgot'">
                    <v-col>
                      <v-text-field prepend-icon="mdi-numeric" clearable v-if="action === 'forgot'" v-model="code" :rules="codeRules" :label="$t('verification-code')" required/>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        :type="passwordVisible ? 'text' : 'password'"
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
                      <v-text-field
                        v-model="confirmPassword"
                        :rules="passwordRules.concat(passwordConfirmationRule)"
                        :type="confirmPasswordVisible ? 'text' : 'password'"
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

            </v-card-text>

            <v-card-actions>

              <v-container fluid>
                <v-row>
                  <v-col>
                    <v-btn large rounded block color="primary" :disabled="!valid || loading" @click="submit">
                      <v-progress-circular
                        v-show="loading"
                        indeterminate
                        color="primary"
                        :size="20"
                        :width="3"
                        class="mr-2"
                      ></v-progress-circular>

                      {{ $t('change') }}
                    </v-btn>

                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-btn plain nuxt :to="{ name: 'sign-in'}">
                      <v-icon left>
                        mdi-arrow-left
                      </v-icon>
                      {{ $t('back_to_sign_in')}}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>

            </v-card-actions>

          </v-card>
        </v-col>

        <!--        <v-col-->
        <!--          lg="8"-->
        <!--          class="pa-0"-->
        <!--          v-if="! $vuetify.breakpoint.mdAndDown"-->
        <!--        >-->
        <!--          <v-row >-->
        <!--            <v-col-->
        <!--              cols="12"-->
        <!--              sm="8"-->
        <!--              md="6"-->
        <!--              lg="12"-->
        <!--              class="mx-auto"-->
        <!--            >-->

        <!--              <v-carousel class="pa-0" cycle height="100vh" :show-arrows="false">-->
        <!--                <v-carousel-item-->

        <!--                  v-for="(item,i) in items"-->
        <!--                  :key="i"-->
        <!--                  :src="item.src"-->
        <!--                  reverse-transition="fade-transition"-->
        <!--                  transition="fade-transition"-->
        <!--                ></v-carousel-item>-->
        <!--              </v-carousel>-->

        <!--            </v-col>-->
        <!--          </v-row>-->
        <!--        </v-col>-->
      </v-row>

    </v-container>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RequireNewPassword",
  layout: 'public',
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  data() {
    return {
      valid: false,
      username: '',
      code: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      confirmPasswordVisible: false,
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      error: 'auth/error',
      localCognitoUser: 'auth/localUser',

      venue: 'venue/venue',
      venueLoading: 'venue/loading'
    }),

    /**
     * Return the name of the Venue.
     *
     * @return {*|undefined}
     */
    name() {
      return (this.venue) ? this.venue.name : undefined;
    },

    logoImage(){
      return this.venue?.logoImage
    },

    styles(){
      return {
        backgroundImage: `url(${this.venue?.backgroundImage})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',

        backgroundColor: this.$vuetify.theme.themes.light[this.venue?.backgroundColor] || undefined,
      }
    },

    action(){
      return this.$route.query.action
    },

    title(){
      return this.action === 'forgot' ? 'Reset your password' : 'Require new password'
    },

    emailRules() {
      if (this.action === 'forgot') {
        return [
          v => !!v || 'E-mail is required', //TODO: Handle i18n.
          v => !v || /^.+@.+\..+$/.test(v) || 'E-mail must be valid'
        ]
      }

      return []
    },

    codeRules() {
      if (this.action === 'forgot') {
        return [
          v => !!v || 'Code is required', //TODO: Handle i18n.
          v => (v && v.length === 6) || 'Code must be 6 digits'
        ]
      }

      return []
    },

    passwordRules() {
      //TODO: Handle i18n.
      return [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must have 8+ characters',
        v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
        v => /(?=.*[a-z])/.test(v) || 'Must have one lowercase character',
        v => /(?=.*\d)/.test(v) || 'Must have one number',
        v => /(?=.*\W)/.test(v) || 'Must have one special character [!@#$%]'
      ]
    },

    passwordConfirmationRule() {
      //TODO: Handle i18n.
      return () =>
          this.password === this.confirmPassword || "The password you entered don't match";
    }
  },
  methods: {
    ...mapActions({
      confirmPasswordRequested: 'auth/confirmPasswordRequested',
      completeNewPassword: 'auth/completeNewPassword',
      clearError: 'auth/clearError',
    }),

    async submit() {
      if (this.$refs.form.validate()) {
        await this.clearError();

        this.loading = true

        if (this.action === 'forgot') {
          await this.confirmPasswordRequested({
            username: this.username,
            code: this.code,
            password: this.password
          });
        } else {

          await this.completeNewPassword({
            user: this.localCognitoUser,
            password: this.password
          });
        }

        this.loading = false
      }
    },
  },

  destroyed() {
    this.clearError();
  }
}
</script>


<style lang="scss" scoped>
.image-container{
  //filter: blur(8px);
  //-webkit-filter: blur(8px);
  position: absolute;
}
</style>
