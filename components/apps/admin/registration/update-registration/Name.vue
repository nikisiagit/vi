<!--
Admin - Registration - Update Name | A smart component that enables the Admin to update the Registration name attribute.
-->
<template>
  <v-card>
    <!-- title -->
    <v-card-title class="primary">
      <v-icon left>mdi-form-select</v-icon>
      {{ $t('admin-registration-update-name')}}
      <v-spacer />
    </v-card-title>

    <v-card-subtitle class="primary">{{$t('admin-registration-update-name')}}</v-card-subtitle>

    <v-card-text>
      <v-form  v-if="!updating && !updated" ref="form" v-model="valid">
      <v-container fluid>
        <v-row>
          <v-col class="px-4">
            <v-text-field
              :label="nameLabel"
              persistent-hint
              clearable
              required
              v-model="nameLocal"
              :rules="[v => !!v || $t('required')]"
            />
          </v-col>
        </v-row>
      </v-container>
      </v-form>

      <!-- UPDATING REGISTRATION -->
      <v-container v-if="updating" fluid>
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            {{ $t('admin-updating-registration') }}
          </v-col>
          <v-col cols="6">
            <v-progress-linear indeterminate rounded height="6" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <!--UPDATED REGISTRATION-->
    <v-container v-if="updated" fluid>
      <apps-admin-registration-status
        :name="'registration'"
        :action="'updated'"
        :status="updatingRegistration.status"
      />
    </v-container>

    <v-card-actions class="justify-end">
      <v-btn plain large rounded @click="close">{{ $t('close') }}</v-btn>
      <v-btn v-if="!updated" large
             color="primary"
             @click="submit"
             :loading=" updating || submitting"
             :disabled=" updating || submitting || !valid">
        {{ $t('update') }}
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Name",
  props: {
    registrationId: {
      type: String,
      required: true,
    },
  },

  async mounted() {
    this.registration = await this.loadRegistrationWithRegistrationId(this.registrationId);
    this.nameLocal = this.registration?.name;
  },

  methods: {
    ...mapActions({
      loadRegistrationWithRegistrationId: 'apps/admin/registrations/loadRegistrationWithRegistrationId',
      updateRegistration: 'apps/admin/registrations/updateRegistration',
    }),

    close(){
      this.$emit('close')
    },

    async submit () {
      try {
        const registrationUpdate = {
          name: this.nameLocal,
          registrationId: this.registrationId,
        };

        this.submitting = true;
        const {executionArn} = await this.updateRegistration(registrationUpdate);

        this.executionArn = executionArn;
        this.submitting = false;

      } catch (error) {
        this.submitting = false;
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      updatingRegistrationWithExecutionArn: 'apps/admin/registrations/updatingRegistrationWithExecutionArn',
    }),

    name () {
      return (this.registration) ? this.registration.name : undefined;
    },

    nameLabel () {
      return this.$i18n.t('name-label');
    },

    updatingRegistration () {
      return (this.executionArn) ? this.updatingRegistrationWithExecutionArn(this.executionArn) : undefined;
    },

    updating () {
      return this.updatingRegistration?.updating;
    },

   updated () {
     return this.updatingRegistration?.updated;
    },
  },

  data: () => ({
    submitting: false,
    valid:false,
    nameLocal: undefined,
    executionArn: undefined,
    registration: undefined,
  }),
}
</script>
