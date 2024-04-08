<!--
[PRO-236] Venue App (Admin) - Email - Identities - CreateEmailIdentity

Create a new Email Identity.

A smart component that enables an Admin to create an EmailIdentity.
-->
<template>
  <v-card>
    <!-- progress -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title/actions -->
    <v-card-title>
      <v-icon left>mdi-email</v-icon>
      {{ $t('admin-email-identities-create-email-identity') }}
      <v-spacer />

      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>

    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-email-identities-create-email-identity') }}
    </v-card-subtitle>

<!--    &lt;!&ndash; help &ndash;&gt;-->
<!--    <v-slide-y-transition>-->
<!--      <v-container fluid v-if="showHelp">-->
<!--        <v-row>-->
<!--          <v-col class="px-4">-->
<!--            <p>{{ $t('admin-email-identities-create-email-identity-help') }}</p>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->
<!--    </v-slide-y-transition>-->

    <!-- error -->


    <!-- form -->
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="emailAddressLocal"
                          :label="emailAddressLabel"
                          :hint="emailAddressHint"
                          :placeholder="emailAddressPlaceholder"
                          :rules="emailRules"
                          persistent-hint
                          persistent-placeholder
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- submit -->
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-btn large
                   block
                   color="primary"
                   @click="submit"
                   :loading="submitting"
                   :disabled="submitting">
              {{ $t('admin-email-identity-create-email-identity-submit') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateEmailIdentity",

  data: () => ({
    valid: true,
    submitting: false,
    emailAddressLocal: undefined,
    executionArn: undefined,
    startDate: undefined,
    debug: false,

    emailRules: [
      v => !!v || 'Email is required',
      v => /^.+@.+\..+$/.test(v) || 'Email must be valid'
    ],
  }),

  computed: {
    ...mapGetters({
      creatingEmailIdentityWithExecutionArn: 'apps/admin/email-identities/creatingEmailIdentityWithExecutionArn',
    }),

    creatingEmailIdentity () {
      return (this.executionArn) ? this.creatingEmailIdentityWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return (this.creatingEmailIdentity) ? this.creatingEmailIdentity.creating : false;
    },

    created () {
      return (this.creatingEmailIdentity) ? this.creatingEmailIdentity.created : false;
    },

    error () {
      return (this.creatingEmailIdentity) ? this.creatingEmailIdentity.error : false;
    },

    emailIdentityId () {
      return (this.creatingEmailIdentity) ? this.creatingEmailIdentity.emailIdentityId : undefined;
    },



    // i18n labels
    emailAddressLabel () {
      return this.$i18n.t('admin-create-email-identity-email-address-label');
    },

    emailAddressHint () {
      return this.$i18n.t('admin-create-email-identity-email-address-hint');
    },

    emailAddressPlaceholder () {
      return this.$i18n.t('admin-create-email-identity-email-address-placeholder');
    },
  },

  methods: {
    ...mapActions({
      createEmailIdentity: 'apps/admin/email-identities/createEmailIdentity'
    }),

    close () {
      console.log(`## ADMIN EMAIL IDENTITIES CREATE EMAIL IDENTITY - CLOSE`)
      this.$emit('close');
    },

    reset () {
      this.submitting = false;
      this.emailAddressLocal = undefined;
      this.executionArn = undefined;
      this.startDate = undefined;
    },

    async submit () {
      console.log('CREATE EMAIL IDENTITY SUBMITTING');

      try {
        if (! this.$refs.form.validate()) {
          console.log('## INVALID');
          this.valid = false;
          return;
        }

        this.valid = true;

        const emailIdentityToCreate = {
          emailAddress: this.emailAddressLocal,
        };

        console.log(`## EMAIL IDENTITY TO CREATE`);
        console.log(emailIdentityToCreate);

        this.submitting = true;
        const creatingEmailIdentity = await this.createEmailIdentity(emailIdentityToCreate);
        this.submitting = false;

        const {executionArn, startDate} = creatingEmailIdentity;

        this.executionArn = executionArn;
        this.startDate = startDate;

      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  }
}
</script>
