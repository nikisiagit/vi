<template>
  <v-card>
    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>


    <v-card-title>
      <v-icon left>mdi-email-edit</v-icon>
      {{ $t('change-email') }}
    </v-card-title>

    <v-card-subtitle>{{ $t('change-email-subtitle') }}</v-card-subtitle>

    <template v-if="! executionArn">
      <v-card-text>
        <v-list two-line>
          <v-list-item>
            <v-list-item-content>
              <v-text-field v-model="email"
                            :label="emailLabel"
                            :hint="emailHint"
                            persistent-hint
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-btn @click="reset">{{ $t('reset') }}</v-btn>
        <v-spacer/>
        <v-btn @click="submit" :loading="submitting" :disabled="submitting">
          {{ $t('update-email') }}
        </v-btn>
      </v-card-actions>
    </template>


  </v-card>
</template>

<script>
export default {
  name: "ChangeEmail",

  computed: {

    emailLabel () {
      return this.$i18n.t('email-label');
    },

    emailHint () {
      return this.$i18n.t('email-hint');
    },
  },


  methods: {

    cancel () {
      this.reset();
      this.$emit('close');
    },

    reset () {
      this.email = undefined;

      // this.executionArn = undefined;
      // this.startDate = undefined;
      // this.submitting = false;
    },

    async submit () {
      try {
        const emailToUpdate = {
          email: this.email,
        };

        this.submitting = true;
        // change or update ??
        const updatingEmail = await this.changeEmail(emailToUpdate);
        this.submitting = false;

        console.log(`## CHANGE EMAIL - `);
        console.log(updatingEmail);

        const {executionArn, startDate} = updatingEmail;

        this.executionArn = executionArn;
        this.startDate = startDate;

      } catch (error) {
        console.log(`## CREATE THEME ERROR`);
        console.log(error);

        this.submitting = false;
      }
    },
  },

  data: () => ({
    email: undefined,

    debug: false,

    submitting: false,

    executionArn: undefined,
    startDate: undefined,
  }),
}
</script>
