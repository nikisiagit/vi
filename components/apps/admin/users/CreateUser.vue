<template>
  <v-card>
    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>
    <v-card-title>
      <v-icon left>mdi-account-plus</v-icon>
      {{ $t('create-user')}}
    </v-card-title>
    <v-card-subtitle>{{ $t('create-user-subtitle') }}</v-card-subtitle>
    <!-- the form -->
    <template v-if="! executionArn">
      <v-card-text>
        <v-container fluid>
          <!-- fullname -->
          <v-row>
            <v-col>
              <v-text-field v-model="fullname"
                            :label="fullnameLabel"
                            :hint="fullnameHint"
                            persistent-hint
                            required
                            :rules="[v => !!v || 'A name is required.']" />
            </v-col>
          </v-row>

          <!-- email -->
          <v-row>
            <v-col>
              <v-text-field
                v-model="email"
                :label="emailLabel"
                :hint="emailHint"
                persistent-hint
                required
                :rules="emailRules"
              />
            </v-col>
          </v-row>

          <!-- roles -->
<!--          <v-row>-->
<!--            <v-col>-->
<!--              <apps-admin-region-roles-select />-->
<!--            </v-col>-->
<!--          </v-row>-->
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-btn @click="reset">{{ $t('reset') }}</v-btn>
        <v-spacer/>
        <v-btn @click="submit"
               :loading="submitting"
               :disabled="submitting">
          {{ $t('create-user') }}
        </v-btn>
      </v-card-actions>
    </template>

    <!-- the creatingUser -->
    <template v-if="creatingUser">
      <!-- the loader -->
      <template v-if="creating">
        <v-card-text >
          <v-progress-linear class="mt-2" indeterminate />
        </v-card-text>
      </template>

      <!-- the error -->
      <template v-if="error">
        <v-card-text>
          <v-alert type="error">
            {{ error }}
          </v-alert>
        </v-card-text>
      </template>

      <!-- the new user -->
      <template v-if="userId">
        <v-card-text>
          <v-list two-line>
            <apps-admin-users-nav-list-item :userId="userId" />
          </v-list>
        </v-card-text>
      </template>

      <template>
        <v-card-actions>
          <v-btn @click="cancel">{{ $t('close') }}</v-btn>
          <v-spacer/>
          <v-btn @click="reset">{{ $t('create-another-user') }}</v-btn>
        </v-card-actions>
      </template>
    </template>


    <template v-if="false">

      <v-stepper>
        <v-stepper-header>
          <v-stepper-step
            :complete="currentStep > 1"
            step="1"
            :rules="[() => nameFormValid]">
            <template>
              <span class="text-center d-block">{{ $t('name') }}</span>
              <small>{{ $t('name')}}</small>
            </template>
          </v-stepper-step>

          <v-stepper-step
            :complete="currentStep > 2"
            step="2"
            :rules="[() => rolesFormValid]">
            <template>
              <span class="text-center d-block">{{ $t('roles') }}</span>
              <small>{{ $t('roles')}}</small>
            </template>
          </v-stepper-step>

          <v-stepper-step
            :complete="currentStep > 3"
            step="3"
            :rules="[() => valid]">
            <template>
              <span class="text-center d-block">{{ $t('review') }}</span>
              <small>{{ $t('review')}}</small>
            </template>
          </v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-card-text>
                <v-form v-model="nameFormValid" ref="nameForm" lazy-validation>
                  <v-container fluid>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="name"
                                      :label="nameLabel"
                                      :hint="nameHint"
                                      persistent-hint
                                      required
                                      :rules="[v => !!v || 'A name is required.']" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="email"
                          :label="emailLabel"
                          :hint="emailHint"
                          persistent-hint
                          required
                          :rules="emailRules"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="cancel">{{ $t('cancel') }}</v-btn>
                <!--                <v-btn @click="reset">{{ $t('reset') }}</v-btn>-->
                <v-spacer />
                <v-btn @click="submitNameForm">{{ $t('continue') }}</v-btn>
              </v-card-actions>
            </v-card>
            <!-- name, email -->
          </v-stepper-content>

         <!--          <v-stepper-content step="2">
            <v-card>
              <v-card-text>
                <v-form v-model="rolesFormValid" ref="rolesForm" lazy-validation>
                  <v-container fluid>
                    <v-row>
                      <v-col>
                        <v-select :items="roles"
                                  :label="rolesLabel"
                                  :hint="rolesHint"
                                  multiple
                                  persistent-hint
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
            &lt;!&ndash; roles &ndash;&gt;
          </v-stepper-content>-->

          <v-stepper-content step="3">
            <!-- review -->
          </v-stepper-content>

          <v-stepper-content step="4">

          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>

    </template>
  </v-card>



</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateUser",

  // async created() {
    // if (! this.loaded && ! this.loading) {
    //   await this.load();
    // }
  // },


  data: () => ({
    debug: true,
    submitting: false,

    fullname: undefined,
    email: undefined,

    executionArn: undefined,
    startDate: undefined,

    emailRules: [
      v => !!v || 'Email is required',
      v => /^.+@.+\..+$/.test(v) || 'Email must be valid'
    ],
  }),

  methods: {
    ...mapActions({
      createUser: 'apps/admin/users/createUser',
    }),

    cancel () {
      this.$emit('close');
      this.reset();
    },

    reset () {
      this.fullname = undefined;
      this.email = undefined;
      this.executionArn = undefined;
      this.startDate = undefined;
      this.submitting = false;
    },

    async submit () {
      const userToCreate = {
        fullname: this.fullname,
        email: this.email,
      };

      this.submitting = true;
      const creatingUser = await this.createUser(userToCreate);
      this.submitting = false;

      const {executionArn, startDate} = creatingUser;

      this.executionArn = executionArn;
      this.startDate = startDate;
    },
  },

  computed: {
    ...mapGetters({
      creatingUserWithExecutionArn: 'apps/admin/users/creatingUserWithExecutionArn',
      userWithUserId: 'apps/admin/users/userWithUserId'
    }),

    creatingUser () {
      return (this.executionArn) ? this.creatingUserWithExecutionArn(this.executionArn) : undefined;
    },

    creating () {
      return (this.creatingUser) ? this.creatingUser.creating : false;
    },

    created () {
      return (this.creatingUser) ? this.creatingUser.created : false;
    },

    error () {
      return (this.creatingUser) ? this.creatingUser.error : false;
    },

    loaded () {
      return (this.creatingUser) ? this.creatingUser.loaded : false;
    },

    loading () {
      return (this.creatingUser) ? this.creatingUser.loading : false;
    },

    userId () {
      return (this.creatingUser) ? this.creatingUser.userId : undefined;
    },

    user () {
      return (this.userId) ? this.userWithUserId(this.userId) : undefined;
    },

    fullnameLabel () {
      return this.$i18n.t('fullname');
    },

    fullnameHint () {
      return this.$i18n.t('fullname');
    },


    emailLabel () {
      return this.$i18n.t('email');
    },

    emailHint () {
      return this.$i18n.t('email');
    },

  }
}
</script>
