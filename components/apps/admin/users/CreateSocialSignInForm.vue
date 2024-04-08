<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ $t('admin-user-social-sign-in') }}</span>
    </v-card-title>
    <v-card-text>

    <v-list-item>
     <v-list-item-content>
      <v-list-item-title>{{ google }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('admin-user-google')}}</v-list-item-subtitle>
     </v-list-item-content>
     <v-list-item-action>
      <v-switch v-model="googleLocal" :value="googleLocal"  @change="handleGoogleChange" />
     </v-list-item-action>
    </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ facebook }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-user-facebook')}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="facebookLocal" :value="facebookLocal" @change="handleFacebookChange" />
        </v-list-item-action>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ apple }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-user-apple')}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="appleLocal" :value="appleLocal" @change="handleAppleChange" />
        </v-list-item-action>
      </v-list-item>

    </v-card-text>
    <v-card-actions>
      <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />
      <v-btn :disabled="!enableNext" large class="pa-4" rounded @click="submit">
        {{ $t('next') }}
        <v-spacer></v-spacer>
        <v-icon small >
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: "CreateSocialSignInForm",
  data() {
    return {
      googleLocal: false,
      facebookLocal: false,
      appleLocal: false,
    }
  },
  watch: {
    google: {
      immediate: true,
      handler () {
        this.googleLocal = this.google;
      },
    },
    facebook: {
      immediate: true,
      handler () {
        this.facebookLocal = this.facebook;
      },
    },
    apple: {
      immediate: true,
      handler () {
        this.appleLocal = this.apple;
      },
    },
  },
  methods: {
    handleGoogleChange (value) {
      this.googleLocal = value
    },
    handleFacebookChange (value) {
      this.facebookLocal = value
    },
    handleAppleChange (value) {
      this.appleLocal = value
    },
    cancel () {
      this.$emit('cancel');
    },
    submit () {
      this.$emit('submitted', {
        google: this.googleLocal,
        facebook: this.facebookLocal,
        apple: this.appleLocal,
      });
      this.next();
    },
    next () {
    this.$emit('next');
    },
  },

  computed: {
    ...mapGetters({
      usersSettings: 'apps/admin/users-settings/usersSettings',
    }),
    socialSignInProviders () {
      return (this.usersSettings) ? this.usersSettings.socialSignInProviders : undefined;
    },
    facebook () {
      return (this.socialSignInProviders) ? this.socialSignInProviders.facebook : undefined;
    },
    google () {
      return (this.socialSignInProviders) ? this.socialSignInProviders.google : undefined;
    },
    apple () {
      return (this.socialSignInProviders) ? this.socialSignInProviders.apple : undefined;
    },
    enableNext() {
      return this.googleLocal || this.facebookLocal || this.appleLocal;
    }
  }
}

</script>
