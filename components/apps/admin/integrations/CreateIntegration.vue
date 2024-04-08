<template>
  <v-card>
    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-server-plus</v-icon>
      {{ $t('create-integration') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('create-integration-subtitle') }}</v-card-subtitle>

    <!-- the form -->
    <template v-if="! executionArn">

      <!-- select the integration -->
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-select
                v-model="name"
                :items="integrations"
                :label="integrationLabel"
                :hint="integrationHint"
                persistent-hint
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- stripe -->
      <!-- apikey -->
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-text-field
                v-model="apiKey"
                :label="apiKeyLabel"
                :hint="apiKeyHint"
                persistent-hint
                required
                :rules="[v => !!v || 'Api Key is required']"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-btn @click="reset">{{ $t('reset') }}</v-btn>
        <v-spacer/>
        <v-btn @click="submit" :loading="submitting" :disabled="submitting">
          {{ $t('create-integration') }}
        </v-btn>
      </v-card-actions>
    </template>

    <!-- the creatingIntegration -->
    <template v-if="executionArn">
      <!-- the error -->
      <v-card-text v-show="error">
        <v-alert type="error">
          {{ error }}
        </v-alert>
      </v-card-text>

      <!-- the loader -->
      <v-card-text v-show="creating">
<!--        <v-progress-linear class="mt-2" indeterminate />-->

        <v-container fluid>
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              {{ $t('creating-integration') }} {{ name }}
            </v-col>
            <v-col cols="6">
              <v-progress-linear indeterminate rounded height="6" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- debug -->
<!--      <v-card-text v-show="debug">-->
<!--        <pre>{{ creatingIntegration }}</pre>-->
<!--      </v-card-text>-->

      <v-card-text v-if="integrationId">
        <v-list two-line>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ integrationId }}</v-list-item-title>
              <v-list-item-title>{{ $t('integration') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="cancel">{{ $t('close') }}</v-btn>
        <v-spacer/>
        <v-btn @click="reset">{{ $t('create-another-integration') }}</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateIntegration",

  methods: {
    ...mapActions({
      createIntegration: 'apps/admin/integrations/createIntegration',
    }),

    cancel() {
      this.reset();
      this.$emit('close');
    },

    reset () {
      this.name = undefined;
      this.apiKey = undefined;
    },

    async submit () {
      try {
        const integrationToCreate = {
          integrationType: this.name,
          apiKey: this.apiKey
        };

        this.submitting = true;
        const creatingIntegration = await this.createIntegration(integrationToCreate);
        this.submitting = false;

        const {executionArn, startDate} = creatingIntegration;

        this.executionArn = executionArn;
        this.startDate = startDate;

      } catch (error) {
        this.submitting = false;
      }
    },
  },

  computed: {
    ...mapGetters({
      creatingIntegrationWithExecutionArn: 'apps/admin/integrations/creatingIntegrationWithExecutionArn',
    }),

    creatingIntegration () {
      return (this.executionArn) ? this.creatingIntegrationWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return (this.creatingIntegration) ? this.creatingIntegration.creating : false;
    },

    created () {
      return (this.creatingIntegration) ? this.creatingIntegration.created : false;
    },

    error () {
      return (this.creatingIntegration) ? this.creatingIntegration.error : false;
    },

    loaded () {
      return (this.creatingIntegration) ? this.creatingIntegration.loaded : false;
    },

    loading () {
      return (this.creatingIntegration) ? this.creatingIntegration.loading : false;
    },

    integrationId () {
      return (this.creatingIntegration) ? this.creatingIntegration.integrationId : undefined;
    },



    integrationLabel () {
      return this.$i18n.t('integration');
    },

    integrationHint () {
      return this.$i18n.t('integration');
    },

    apiKeyLabel () {
      return this.$i18n.t('api-key');
    },

    apiKeyHint () {
      return this.$i18n.t('api-key');
    },
  },

  data: () => ({
    // the name of the selected integration
    name: undefined,

    // the apiKey for the integration
    apiKey: undefined,

    // the available integrations
    integrations: [
      {
        text: 'Stripe',
        value: 'stripe',
      },
      {
        text: 'Daily',
        value: 'daily',
      }
    ],

    // the executionArn returned when the form is submitted
    executionArn: undefined,

    // the datetime the execution was started
    startDate: undefined,

    // is the form being submitted
    submitting: false,

    debug: true,
  })
}
</script>

