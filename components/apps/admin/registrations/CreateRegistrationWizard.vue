<template>
  <!-- Create registration Card -->
  <v-card :loading="loading">

    <template slot="progress">
      <v-progress-linear color="primary" height="4" indeterminate />
    </template>


    <v-toolbar
      dark
      color="primary"
    >

      <v-toolbar-title class="font-weight-bold">
<!--        <v-icon left>mdi-form-select</v-icon>-->
        <v-btn
          icon
          @click="cancel"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        {{ $t('Create-registration') }}

      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
<!--        <v-btn-->
<!--          plain-->
<!--          @click="cancel"-->
<!--        >-->
<!--          <strong>{{ $t('cancel') }}</strong>-->
<!--        </v-btn>-->

        <v-btn
          text
          @click="submitForm"
        >
          <h3>{{ $t('create') }}</h3>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <v-stepper v-model="currentStep" class="fill-height">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1" >
          <template>
            <span class="text-center d-block">{{ $t('registration-details') }}</span>
            <small>{{ $t('registration-details-subtitle')}}</small>
          </template>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="currentStep > 2" step="2" >
          <template>
            <span class="text-center d-block">{{ $t('registration-fields') }}</span>
            <small>{{ $t('registration-fields') }}</small>
          </template>
        </v-stepper-step>

      </v-stepper-header>

      <v-stepper-items class="fill-height">

        <v-stepper-content step="1" class="pa-0 fill-height">

          <v-container fluid >
            <v-row >
              <v-col cols="12" lg="4" >

                <!-- registration name form -->
                <apps-admin-registrations-registration-form></apps-admin-registrations-registration-form>

              </v-col>

              <v-col cols="12" lg="8">
                <apps-admin-registrations-live-preview></apps-admin-registrations-live-preview>
              </v-col>
            </v-row>
          </v-container>


        </v-stepper-content>

        <v-stepper-content step="2">
          <v-container fluid >
            <v-row >
              <v-col cols="12" lg="4" >

                <v-slide-y-transition>

                  <apps-admin-registrations-fields-list v-show="! isEditing"></apps-admin-registrations-fields-list>

                </v-slide-y-transition>

                <v-slide-y-transition>
                  <!-- field is in edit mode -->
                  <apps-admin-registrations-edit-field v-if="isEditing" @change="fieldChanged" @close="isEditing = false"></apps-admin-registrations-edit-field>
                </v-slide-y-transition>

              </v-col>

              <v-col cols="12" lg="8">
                <apps-admin-registrations-live-preview @edit="editField"></apps-admin-registrations-live-preview>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>

      </v-stepper-items>

    </v-stepper>




  </v-card>

<!--     -DEBUG REGISTRATION-->
<!--    <v-card>-->
<!--      <v-card-text>-->
<!--        <div>-->
<!--          DEBUG:-->
<!--        </div>-->

<!--        <pre>-->
<!--          {{ registration }}-->
<!--        </pre>-->

<!--      </v-card-text>-->
<!--    </v-card>-->
<!--    / DEBUG EVENT-->

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateRegistration",

  data: () => ({
    currentStep: 1,
    registration: undefined,

    isEditing: false,
    editingIndex: undefined,

    executionArn: undefined,
  }),

  computed: {
    ...mapGetters({
      creatingRegistrationWithExecutionArn: 'apps/admin/registrations/creatingRegistrationWithExecutionArn',
    }),

    creatingRegistration () {
       return (this.executionArn) ? this.creatingRegistrationWithExecutionArn(this.executionArn) : undefined;
    },
  },

  methods: {
    ...mapActions({
      createRegistration: 'apps/admin/registrations/createRegistration',
    }),

    cancel () {
      console.log('cancelling CreateRegistration');

      this.$emit('close');
      this.reset();
    },

    editField({ isEditing, editingIndex}){
      this.isEditing = isEditing
      this.editingIndex = editingIndex

    },

    async submitForm () {
      // console.log("submitForm");
      // console.log("this.registrationTextValid", this.registrationTextValid);
      // console.log("this.registrationLinkFormValid", this.registrationLinkFormValid);
      // console.log("this.registrationBrandingFormValid", this.registrationBrandingFormValid);
      //
      // if (!this.registrationTextValid || ! this.registrationLinkFormValid || ! this.registrationBrandingFormValid) {
      //   this.valid = false;
      //   return;
      // }
      //
      // this.valid = true;

      // create registration
      console.log("## registrationToCreate")
      console.log(this.registration)

      const registrationToCreate = {...this.registration};

      const creatingRegistration = await this.createRegistration(registrationToCreate);

      if (creatingRegistration) {

        const {executionArn, startDate} = creatingRegistration;

        //@todo: handle errors
        //@todo: add snackbar to show messages success/failure

        this.currentStep = 5;
        this.executionArn = executionArn;
        // this.startDate = startDate;
      } else {
        console.log("throw error from step function...")
      }

    },

    fieldChanged({ value, attribute }){

      if (attribute === 'label') {

        const i = this.editingIndex
        this.formBuilderFields = this.formBuilderFields.map(function (element, index) {
          if (index === i) {
            return {
              ...element,
              label: value
            }
          }

          return element
        })
      }

      if (attribute === 'hint') {

        const i = this.editingIndex
        this.formBuilderFields = this.formBuilderFields.map(function (element, index) {
          if (index === i) {
            return {
              ...element,
              hint: value
            }
          }

          return element
        })
      }

      if (attribute === 'name') {

        const i = this.editingIndex
        this.formBuilderFields = this.formBuilderFields.map(function (element, index) {
          if (index === i) {
            return {
              ...element,
              name: value
            }
          }

          return element
        })
      }

      if (attribute === 'required') {

        const i = this.editingIndex
        this.formBuilderFields = this.formBuilderFields.map(function (element, index) {
          if (index === i) {
            return {
              ...element,
              required: value
            }
          }

          return element
        })
      }

    },

  },
}
</script>
