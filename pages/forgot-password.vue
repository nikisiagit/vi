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
              <h3 class="primary--text">{{ $t('reset-your-password') }}</h3>
              <span>
                    Enter your email address and we will send you an email with a verification code and link to reset your password.
              </span>
            </v-card-subtitle>

            <!-- forgot password form -->
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
                  <v-row>
                    <v-col>
                      <v-text-field prepend-icon="mdi-at"
                                    clearable
                                    v-model="username"
                                    :rules="emailRules"
                                    :label="$t('email-address')"
                                    required />
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

                      {{ $t('send_code') }}
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
  name: "ForgotPassword",
  layout: 'public',
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  data() {
    return {
      valid: false,
      username: '',
      loading: false,

      emailRules: [],

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
    }
  },
  computed: {
    ...mapGetters({
      error: 'auth/error',

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
  },
  methods: {
    ...mapActions({
      forgotPasswordRequest: 'auth/forgotPasswordRequest',
      clearError: 'auth/clearError',
    }),

    addEmailRules(){
      this.emailRules = [
        v => !!v || 'Enter your e-mail address',
        v => !v || /^.+@.+\..+$/.test(v) || 'Enter a valid e-mail address.'
      ]
    },

    submit() {
      this.addEmailRules();

      // after rules has been added, it requires to update the template to pick up validation.
      this.$nextTick(async () => {
        if (this.$refs.form.validate()) {
          await this.clearError();

          this.loading = true
          await this.forgotPasswordRequest({
            username: this.username
          });

          this.loading = false
        }
      })

    },
  },

  destroyed() {
    this.clearError();
  }
}
</script>


<style lang="scss">
.image-container{
  //filter: blur(8px);
  //-webkit-filter: blur(8px);
  position: absolute;
}
</style>
