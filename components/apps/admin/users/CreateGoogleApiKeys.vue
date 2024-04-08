<template>
  <v-card>
    <v-card-title>
      {{ $t('add-your-api-keys') }}
    </v-card-title>
    <v-card-subtitle>
      {{ $t('google-api-keys-subtitle') }}
    </v-card-subtitle>
    <v-card-text>
      <v-form  ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field
                v-if="this.cognitoDomain"
                v-model="cognitoDomain"
                label="Cognito Domain"
                readonly
                append-icon="mdi-content-copy"
                @click:append="copyToClipboard"
              />
              <v-text-field
                v-if="googleLocal"
                v-model="googleClientId"
                :label="'Google Client Id'"
                persistent-hint
                clearable
                variant="outlined"
                required
              />
              <v-text-field
                v-if="googleLocal"
                v-model="googleClientSecret"
                :label="'Google Client Secret'"
                persistent-hint
                :type="showPassword ? 'text' : 'password'"
                clearable
                variant="outlined"
                required>
                <template #append>
                  <v-icon @click="showPassword = !showPassword">{{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CreateGoogleApiKeys",
  props: {
    google: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      googleLocal: this.google || false,
      googleClientSecret: "",
      googleClientId: "",
      showPassword: false,
      cognitoDomain:"",
    };
  },
  created() {
    this.loadGoogleApiKey();
  },
  watch: {
    google: {
      immediate: true,
      handler () {
        this.googleLocal = this.google;
      },
    },
    googleClientId: function() {
      this.checkFormValidity();
    },
    googleClientSecret: function() {
      this.checkFormValidity();
    },
  },
  methods: {
    ...mapActions({
      loadIntegrationWithName: 'apps/admin/integrations/loadIntegrationWithName',
    }),
    checkFormValidity: function() {
      if (this.googleClientId && this.googleClientSecret) {
        this.submit()
      }
    },
    copyToClipboard() {
      const input = document.createElement('input');
      input.value = this.cognitoDomain;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      this.successMessage = 'Cognito domain copied to clipboard.';
    },
    submit() {
      this.$emit("submitted", {
        googleApiKey: {
          client_id: this.googleClientId,
          client_secret: this.googleClientSecret
        }
      });
      this.$emit('close')
    },
    async loadGoogleApiKey() {
      const response = await this.loadIntegrationWithName('google');
      this.googleClientId = response?.apiKey.client_id || '';
      this.googleClientSecret = response?.apiKey.client_secret || '';
      this.cognitoDomain = response?.cognitoDomain || '';
    },
  },
}
</script>
