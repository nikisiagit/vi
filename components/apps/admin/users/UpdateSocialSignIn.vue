<!--
Admin - Users Settings Update Social SignIn Providers

A smart component that enables the Admin to update the supported social sign in providers
-->
<template>
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-account</v-icon>
      {{ $t('admin-users-settings-update-social-sign-in-providers')}}
      <v-spacer />
    </v-card-title>

    <v-card-subtitle>
      {{ $t('update-social-sign-in-providers') }}
    <!-- Progress bar -->
    <v-list v-show="this.currentStep !== 3">
      <v-list-item class="pa-0">
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('Step') }} {{ currentStep }} {{ $t('of') }} {{ this.availableProviders.length + 1 }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-progress-linear class="mt-2" v-model="progressBar"></v-progress-linear>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-card-subtitle>

    <apps-admin-users-create-social-sign-in-form
      v-show="currentStep === 1"
      @cancel="cancel"
      @submitted="socialSignInActiveSubmitted"
      @back="back"
      @next="currentStep = 2"
    />

    <component
      v-for="(provider, index) in availableProviders"
      :key="provider.name"
      :is="provider.componentName"
      v-if="currentStep === index + 2"
      :v-show="currentStep === index + 2"
      :[provider.name]="provider.config"
      @submitted="socialSignInApiKeysSubmitted"
    />

    <!--actions -->
    <v-card-actions v-if="currentStep > 1">
      <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />
      <v-btn plain large class="pa-4" rounded @click="back">
        <v-icon small >
          mdi-arrow-left
        </v-icon>
        <v-spacer></v-spacer>
        {{ $t('back') }}
      </v-btn>
      <template v-if="currentStep < availableProviders.length + 1">
        <v-btn large class="pa-4" rounded @click="next">
          {{ $t('next') }}
        </v-btn>
      </template>
      <template v-else>
        <v-btn large class="pa-4" rounded @click="update">
          {{ $t('update') }}
        </v-btn>
      </template>
    </v-card-actions>

  </v-card>
</template>

<script>
import CreateGoogleApiKeys from './CreateGoogleApiKeys.vue';
import CreateFacebookApiKeys from './CreateFacebookApiKeys.vue';
import CreateAppleApiKeys from './CreateAppleApiKeys.vue';
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateSocialSignInProviders",
  components: {
    CreateGoogleApiKeys,
    CreateFacebookApiKeys,
    CreateAppleApiKeys,
  },

  data: () => ({
    submitting: false,
    showHelp: true,
    currentStep: 1,
    availableProviders: [],
    selectedSocialSignIn: {},
    apiKeys: {}
  }),

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },
  beforeDestroy() {
    this.reset();
  },

  watch: {
    selectedSocialSignIn: {
      handler: function () {
        const providers = [
          {name: 'google', componentName: CreateGoogleApiKeys,config: this.selectedSocialSignIn.google},
          {name: 'facebook', componentName: CreateFacebookApiKeys,config: this.selectedSocialSignIn.facebook},
          {name: 'apple', componentName: CreateAppleApiKeys,config: this.selectedSocialSignIn.apple},
        ]
        this.availableProviders = providers.filter(provider => provider.config).map(provider => {
          return {
            name: provider.name,
            componentName: provider.componentName,
            config: provider.config
          }
        })
        if(this.availableProviders.length > 0) {
          this.currentStep = 2;
        }
      },
      deep: true
    }
  },


  methods: {
    ...mapActions({
      load: 'apps/admin/users-settings/load',
      updateUsersSettings: 'apps/admin/users-settings/updateUsersSettings',
      createIntegration: 'apps/admin/integrations/createIntegration',
      createSocialProvider: 'apps/admin/users-settings/createSocialProvider',
    }),

    back(){
      if (this.currentStep !== 1)
        this.currentStep = this.currentStep -1
    },
    next() {
      if (this.currentStep < this.availableProviders.length + 1) {
        this.currentStep++;
      }
    },
    reset () {
      this.currentStep = 1;
    },
    cancel () {
      this.$emit('close');
      this.reset();
    },
    capitalizeWord(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    async socialSignInActiveSubmitted (values) {
      this.selectedSocialSignIn = values;
    },
    async socialSignInApiKeysSubmitted (values) {
      this.apiKeys = Object.assign({}, this.apiKeys, values);
    },
    async update() {
      /*USERS SETTINGS*/
      const userSettingsUpdate = {
        socialSignInProviders: {
          facebook: this.selectedSocialSignIn.facebook,
          google: this.selectedSocialSignIn.google,
          apple: this.selectedSocialSignIn.apple
        }
      };
      await this.updateUsersSettings(userSettingsUpdate);

      /*INTEGRATIONS*/
      const integrations = Object.keys(userSettingsUpdate.socialSignInProviders)
        .filter(key => userSettingsUpdate.socialSignInProviders[key]);

      for (const integration of integrations) {
        const integrationToCreate = {
          integrationType: integration,
          apiKey:this.apiKeys[`${integration}ApiKey`]
        };
        await this.createIntegration(integrationToCreate);

        const params = {
          ProviderName: this.capitalizeWord(integration),
          ProviderType:  this.capitalizeWord(integration),
          client_id: this.apiKeys[`${integration}ApiKey`]?.client_id,
          client_secret: this.apiKeys[`${integration}ApiKey`]?.client_secret,
          authorize_scopes: "email profile openid", //TODO CHANGE,
          CallbackURLs: [window.location.origin],
          LogoutURLs: [window.location.origin],
          clientId:this.webClientId,
        }

        /* SOCIAL PROVIDERS*/
        await this.createSocialProvider(params);
      }
      this.$emit("close")
    }
  },

  computed: {
    ...mapGetters({
      usersSettings: 'apps/admin/users-settings/usersSettings',
      loaded: 'apps/admin/users-settings/loaded',
      loading: 'apps/admin/users-settings/loading',
      webClientId: "apps/admin/users-settings/webClientId",
    }),

    progressBar(){
      return this.currentStep / (this.availableProviders.length+1)* 100
    },

    socialSignInProviders () {
      return (this.usersSettings) ? this.usersSettings.socialSignInProviders : undefined;
    },
  },
}
</script>
