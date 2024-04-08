<template>
  <div class="fill-height primary">


    <v-container fluid class="fill-height pa-0">
      <v-row no-gutters>
        <v-col
          lg="4"
          cols="12"
          class="pa-0"
        >
          <v-card class="rounded-0" min-height="100vh">

            <!-- logo -->
            <v-card-title class="justify-center py-7">

              <template v-if="isUniProDemo">
                <v-img
                  src="https://s3.eu-west-2.amazonaws.com/attendees.luis.ivent-pro.com/demo/uni-logo.png"
                  max-height="180px"
                  max-width="180px"
                  alt="logo"
                  contain
                ></v-img>
              </template>

              <template v-else>
                <v-img
                  :src="require('~/assets/pro-logo.svg')"
                  max-height="200px"
                  max-width="200px"
                  alt="logo"
                  contain
                ></v-img>
              </template>

<!--              <v-skeleton-loader-->
<!--                v-if="venueLoading || ! name"-->
<!--                type="button"-->
<!--              ></v-skeleton-loader>-->

<!--              <h2 >-->
<!--                Eventheads-->
<!--&lt;!&ndash;                {{ name }}&ndash;&gt;-->
<!--              </h2>-->

            </v-card-title>
            <v-divider></v-divider>

            <!-- subtitle -->
            <v-card-subtitle>
<!--              <h3 class="primary&#45;&#45;text text-center">{{ $t('to-continue-log-in-to') }} {{ name }}.</h3>-->
              <h3 class="primary--text text-center">To continue, sign in to {{ isUniProDemo ? 'University Venue': 'iVent Pro' }}.</h3>
            </v-card-subtitle>

            <!-- login form -->
            <v-card-text class="pb-0">
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
                  <v-row>
                    <v-col>
                      <v-text-field
                        prepend-icon="mdi-at"
                        v-model="username"
                        :label="emailLabel"
                        :rules="emailRules"
                        clearable
                        required
                      />
                      <v-text-field
                        v-model="password"
                        :type="passwordVisible ? 'text' : 'password'"
                        prepend-icon="mdi-lock"
                        :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="passwordVisible = !passwordVisible"
                        name="password"
                        :label="passwordLabel"
                        required
                        error-count="6"
                        clearable
                        :rules="passwordRules"
                      />
                    </v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-col cols="12">
                      <nuxt-link :class="`${$vuetify.theme.isDark ? 'white': 'black'}--text`" :to="{name: 'forgot-password'}">
                        {{ $t('forgot your password?')}}
                      </nuxt-link>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-checkbox
                        :label="$t('remember me')"
                        hide-details
                        class="mt-0"
                      >
                      </v-checkbox>
                    </v-col>
                  </v-row>

                </v-container>
              </v-form>

            </v-card-text>

            <v-card-actions >

              <v-container fluid>
                <v-row>
                  <v-col align="end">
                    <v-btn large rounded block color="primary" :disabled="isDisabled" @click="submit">
                      <v-progress-circular
                        v-show="loading"
                        indeterminate
                        color="primary"
                        :size="20"
                        :width="3"
                        class="mr-2"
                      ></v-progress-circular>
                      {{ $t('sign in')}}
                    </v-btn>


                  </v-col>
                </v-row>

                <!-- If has social sign in enabled -->
                <template v-if="socialsEnabled">

                  <!-- divider -->
                  <v-row class="d-flex justify-center">
                    <v-col cols="12" lg="9" class="d-flex align-center">
                      <v-divider></v-divider>
                      <span class="ma-3">{{ $t('or').toUpperCase() }}</span>
                      <v-divider></v-divider>
                    </v-col>
                  </v-row>

                  <!-- social login -->
                  <v-row v-if="venue && venue.socialSignInProviders.google" no-gutters class="d-flex justify-center">
                    <v-col cols="12" lg="9">
                      <v-btn large rounded block light @click="signInWithGoogle">
                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
                        {{ $t('continue-with-google') }}
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row v-if="venue && venue.socialSignInProviders.facebook" class="d-flex justify-center">
                    <v-col cols="12" lg="9">
                      <v-btn large rounded block light @click="signInWithFacebook">
                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#3578E5"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                        {{ $t('continue-with-facebook') }}
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row v-if="venue && venue.socialSignInProviders.apple" class="d-flex justify-center">
                    <v-col cols="12" lg="9">
                      <v-btn large rounded block light @click="signInWithApple">
                        <v-icon class="mr-2">
                          mdi-apple
                        </v-icon>
                        {{ $t('continue-with-apple') }}
                      </v-btn>
                    </v-col>

                  </v-row>

                  <!-- / social login -->

                </template>
                <!-- / END - If has social sign in enabled -->



                <!-- If has sign up enabled -->
                <template v-if="signUpEnabled">

                  <!-- sign up button -->
                  <!-- divider -->
                  <v-row class="mt-8">
                    <v-col>
                      <v-divider></v-divider>
                    </v-col>
                  </v-row>

                  <v-row no-gutters>

                    <v-col cols="12">
                      <v-card-title class="justify-center">{{ $t('dont-have-an-account?') }}</v-card-title>
                    </v-col>

                    <v-col>
                      <v-btn large rounded block dark link nuxt :to="{ name: 'sign-up'}">
                        {{ $t('create-an-account') }}
                      </v-btn>
                    </v-col>
                  </v-row>
                  <!-- / sign up button -->



                </template>
                <!-- / END - If has sign up enabled -->

              </v-container>

            </v-card-actions>

            <v-footer absolute color="transparent" class="d-flex justify-center">
              <a class="mr-2" href="/privacy">Privacy Policy</a>
              <a href="/terms-and-conditions">Terms and Conditions</a>
            </v-footer>

          </v-card>
        </v-col>

        <v-col class="pa-0">

<!--          <v-container v-if="isUniProDemo" fluid :style="styles" class="elevation-2 fill-height image-container pa-0"></v-container>-->

          <video-background
            :src="isUniProDemo ? 'https://d17w02ph6kdf4e.cloudfront.net/uol-homepagevid-remote-edit-color-bs-190606-v5.mp4': 'https://s3.eu-west-2.amazonaws.com/attendees.luis.ivent-pro.com/demo/2000x1100px.mp4'"
            style=" height: 100vh; "
          >


          </video-background>

<!--&lt;!&ndash;            <v-card class="align-self-end glass-effect" color="trasnparent" width="100%">&ndash;&gt;-->
<!--&lt;!&ndash;              <v-card-title>Hi</v-card-title>&ndash;&gt;-->
<!--&lt;!&ndash;              <v-card-text>hi</v-card-text>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-card>&ndash;&gt;-->

<!--&lt;!&ndash;                    <v-card dark rounded="0" flat width="100%" class=" align-self-end glass-effect" :color="'black'" >&ndash;&gt;-->
<!--&lt;!&ndash;                      <v-card-title class="pa-0 justify-center">&ndash;&gt;-->

<!--&lt;!&ndash;                        <pro-logo style="width: 200px; height: 50px"></pro-logo>&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;                        <v-img :src="require('~/assets/ivent-pro-teal.png')" contain class="mr-2" max-height="30px"&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                               max-width="30px"></v-img>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                        iVent&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                      </v-card-title>&ndash;&gt;-->
<!--&lt;!&ndash;                      <v-card-text class="pa-0 text-center">&ndash;&gt;-->
<!--&lt;!&ndash;                        <small>&copy; Copyright {{ new Date().getFullYear() }}. All rights reserved.</small>&ndash;&gt;-->
<!--&lt;!&ndash;                      </v-card-text>&ndash;&gt;-->
<!--&lt;!&ndash;                    </v-card>&ndash;&gt;-->

<!--          </v-container>-->

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
import { Auth } from 'aws-amplify';
import colors from "../mixins/colors";

export default {
  name: "SignIn",
  layout: 'public',
  mixins: [colors],

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  mounted(){
    this.$nextTick(() => {
      if (this.isUniProDemo) {
        this.$vuetify.theme.themes.light.primary = '#22234E'
        this.$vuetify.theme.themes.dark.primary = '#22234E'
      } else {
        // this.$vuetify.theme.themes.light.primary = '#121212'
        // this.$vuetify.theme.themes.dark.primary = '#121212'
      }
    })
  },

  data() {
    return {
      items: [
        {
          src: 'https://dynamicmedia.livenationinternational.com/Media/m/h/l/3aa789a8-4de2-44e5-b684-e7101d52ebca.jpg',
        },
        {
          src: 'https://pbs.twimg.com/media/DCDL7LOVoAA2RMj?format=jpg&name=large',
        },
        {
          src: 'https://cdn.mos.cms.futurecdn.net/oFeKuEB4RiXDEtbfBFp7SP-1200-80.jpg',
        },
        {
          src: 'https://www.twincities.com/wp-content/uploads/2020/02/guns-n-roses-e1509999745278.jpeg?w=978',
        },
      ],

      valid: false,
      username: '',
      password: '',
      passwordVisible: false,

      emailRules: [],
      passwordRules: [],
    }
  },

  computed: {
    ...mapGetters({
      error: 'auth/error',
      loading: 'auth/signingIn',

      venue: 'venue/venue',
      venueLoading: 'venue/loading'
    }),

    qParameters(){
      return this.$route.query
    },

    isUniProDemo(){
      return this.qParameters['d'] && this.qParameters['d'] === 'uni'
    },

    vTheme(){
      return this.getComponentVTheme('primary', '', true)
    },

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
        // backgroundImage: `url(${this.venue?.backgroundImage})`,
        // backgroundImage: `url(${require('~/assets/EventHeads-hero.gif')})`,
        backgroundImage: `url(https://s3.eu-west-2.amazonaws.com/attendees.luis.ivent-pro.com/uni-pro-land.png)`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        position: 'relative',

        backgroundColor: this.$vuetify.theme.themes.light[this.venue?.backgroundColor] || undefined,
      }
    },

    isDisabled(){
      return !this.valid || this.loading
    },

    emailLabel(){
      return this.$t('email-address')
    },

    passwordLabel(){
      return this.$t('password')
    },

    socialsEnabled(){
      if (this.venue?.socialSignInProviders) {
        return Object.values(this.venue.socialSignInProviders).find((value) => {
          return value
        })
      }

      return false
    },

    signUpEnabled(){
      return this.venue?.signUpEnabled
    }
  },
  methods: {
    signOut(){
      Auth.signOut();
    },

    async checkUser(){
      try {
        const user = await Auth.currentAuthenticatedUser()
        console.log(user, "AWS Google User")
        console.log('attributes:', user.attributes);
      } catch (error) {
        console.log('federatedSignIn error:', error);
      }
    },

    signInWithGoogle(){
      try {
        Auth.federatedSignIn({ provider: 'Google' });
      } catch (error) {
        console.log('federatedSignIn error:', error);
      }
    },

    signInWithApple(){},

    signInWithFacebook(){
      try {
        Auth.federatedSignIn({ provider: 'Facebook' });
      } catch (error) {
        console.log('federatedSignIn error:', error);
      }
    },

    ...mapActions({
      authenticateUser: 'auth/signIn',
      clearError: 'auth/clearError',
      clearAuthenticating: 'auth/clearAuthenticating'
    }),

    addEmailRules(){
      this.emailRules = [
        v => !!v || 'Enter your e-mail address',
        v => !v || /^.+@.+\..+$/.test(v) || 'Enter a valid e-mail address.'
      ]
    },

    addPasswordRules(){
      this.passwordRules = [
        v => !!v || 'Enter your Password'
      ]
    },

    submit() {
      this.addEmailRules();
      this.addPasswordRules();

      // after rules has been added, it requires to update the template to pick up validation.
      this.$nextTick(() => {
        if (this.$refs.form.validate()) {
          this.clearError();

          this.authenticateUser({
            username: this.username,
            password: this.password
          });
        }
      })
    }
  },

  destroyed() {
    this.clearError();

    this.clearAuthenticating()
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
