<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-lock-reset</v-icon>
      {{ $t('change-password')}}
    </v-card-title>

    <v-card-subtitle>
      {{ $t('change-password-hint')}}
    </v-card-subtitle>

    <v-card-text>

<!--        <v-container fluid v-if="userError">-->
<!--          <v-row no-gutters>-->
<!--            <v-col>-->

<!--              <v-card>-->
<!--                <v-card-text>-->
<!--                  <v-alert class="mt-3" border="left" outlined elevation="1" type="error">-->
<!--&lt;!&ndash;                    {{ userError }}&ndash;&gt;-->
<!--                  </v-alert>-->
<!--                </v-card-text>-->
<!--              </v-card>-->

<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-container>-->

        <v-container fluid class="">
           <v-form v-model="formValid" ref="form" lazy-validation>
            <v-row>
              <v-col>
                <!-- current password -->
                <v-text-field
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-icon="isCurrentPasswordVisible ? 'mdi-eye-off-outline':'mdi-eye-outline'"
                  :label="currentPasswordLabel"
                  :hint="currentPasswordHint"
                  persistent-hint
                  :rules="passwordRules"
                  error-count="6"
                  @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <!-- new password -->
                <v-text-field
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-icon="isNewPasswordVisible ? 'mdi-eye-off-outline':'mdi-eye-outline'"
                  :label="newPasswordLabel"
                  :hint="newPasswordHint"
                  :rules="passwordRules"
                  error-count="6"
                  persistent-hint
                  @click:append="isNewPasswordVisible = !isNewPasswordVisible"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <!-- confirm password -->
                <v-text-field
                  v-model="cPassword"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-icon="isCPasswordVisible ? 'mdi-eye-off-outline':'mdi-eye-outline'"
                  :label="newPasswordConfirmLabel"
                  :hint="newPasswordConfirmHint"
                  persistent-hint
                  :rules="passwordRules.concat(passwordConfirmationRule)"
                  error-count="6"
                  @click:append="isCPasswordVisible = !isCPasswordVisible"
                ></v-text-field>
              </v-col>
            </v-row>
           </v-form>
        </v-container>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="cancel">
        {{ $t('cancel')}}
      </v-btn>

      <v-spacer />
      <v-btn :disabled="!formValid" @click="submitForm">
        {{ $t('change-password')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ChangePassword",
  watch: {
    newPassword(value) {
      this.anyChanges = true;
      this.resetChangePassword();
    },
    currentPassword(value) {
      this.anyChanges = true;
      this.resetChangePassword();
    },
    cPassword(value) {
      this.anyChanges = true;
      this.resetChangePassword();
    },
    loading(value) {
      console.log("loading");
    }
  },
  data(){
    return {

      openChangePasswordDialog: false,
      formValid: true,
      isCurrentPasswordVisible: false,
      isNewPasswordVisible: false,
      isCPasswordVisible: false,
      currentPassword: '',
      newPassword: '',
      cPassword: '',
      successfullyChanged: false,
      anyChanges: false,

    }
  },

  computed: {
    ...mapGetters({
      me: 'me/me',
      user: 'auth/user',
      // userError: 'me/userErrorChangePassword',
      // serverError: 'me/serverErrorChangePassword',
      // loading: 'me/loadingChangePassword'
    }),

    currentPasswordLabel () {
      return this.$i18n.t('current-password-label');
    },

    currentPasswordHint () {
      return this.$i18n.t('current-password-hint');
    },

    newPasswordLabel () {
      return this.$i18n.t('new-password');
    },

    newPasswordHint () {
      return this.$i18n.t('new-password-hint');
    },

    newPasswordConfirmLabel () {
      return this.$i18n.t('confirm-new-password-label');
    },

    newPasswordConfirmHint () {
      return this.$i18n.t('confirm-new-password-hint');
    },

    /**
     * Return the password rules.
     *
     * @todo - https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-56
     *
     * @return {(function(*=))[]}
     */
    passwordRules() {

      return [
        v => !!v || this.$i18n.t('password-is-required'),
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
        this.newPassword === this.cPassword || "The password you entered don't match";
    }
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout',
      updateMe: 'me/updateMe',
      load: 'languages/load',
      // changePassword: 'me/changePassword',
      // resetChangePassword: 'me/resetChangePassword'
    }),

    async submitForm() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.successfullyChanged = await this.changePassword({
        user: this.user,
        oldPassword: this.currentPassword,
        newPassword: this.newPassword
      });

      // if (this.successfullyChanged) {
      //   console.log("successful so emit close");
      //   this.$emit('close');
      // }
    },

    cancel() {
      console.log("cancel");
      this.$emit('close');
      this.reset();
    },

    reset() {
      console.log("reset");

      this.$refs.form.reset();
      this.anyChanges = false;
      this.successfullyChanged = false;
      this.resetChangePassword();
    },
  }
}
</script>
