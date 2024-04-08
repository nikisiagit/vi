<template>
  <!-- Create A Venue Card -->
  <v-card>

    <!-- Create A Venue Card -->
    <v-card :loading="loading">

      <template slot="progress">
        <v-progress-linear color="primary" height="4" indeterminate />
      </template>

      <v-card-title>
        <v-icon left>mdi-store-plus</v-icon>
        {{ $t('create-venue') }}
      </v-card-title>

      <v-card-subtitle>
        {{ $t('create-venue-subtitle') }}

        <!-- Progress bar -->
        <v-list v-show="this.currentStep < 6">
          <v-list-item class="pa-0">
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('Step') }} {{ currentStep }} {{ $t('of') }} {{ numberOfSteps }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-progress-linear class="mt-2" v-model="progressBar"></v-progress-linear>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <!--/ Progress bar -->

      </v-card-subtitle>
    </v-card>

    <!-- Card with the form for each step. (VenueName & VenueOwner step)  -->
    <v-card v-show="showVenueNameStep">
      <v-card-title>
        {{ $t('Enter Venue title and Owner details') }}
      </v-card-title>

      <v-card-text>
        <v-form v-model="nameAndOwnerValid" ref="nameAndOwnerForm" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="venueTitle"
                  :label="venueTitleLabel"
                  :hint="venueTitleHint"
                  persistent-hint
                  required
                  :rules="[v => !!v || 'A Venue title is required']"
                />
              </v-col>
              <v-col cols="12" v-show="venueName">
                <base-preview-alert :title="venueUrl" :text="venueUrlHint" icon="mdi-web"/>
              </v-col>

            </v-row>

            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field
                  v-model="ownerName"
                  :label="$t('owner-name')"
                  :hint="$t('Please enter your name')"
                  persistent-hint
                  required
                  :rules="[v => !!v || 'A Owner name is required']"
                />
              </v-col>

              <v-col cols="12" lg="6">
                <v-text-field
                  v-model="ownerEmail"
                  :label="$t('owner-email')"
                  :hint="$t('Please enter your email address')"
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
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />
        <v-btn large class="pa-4" rounded @click="submitNameAndOwnerForm">
          {{ $t('next') }}

          <v-spacer></v-spacer>
          <v-icon small >
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!--/ VenueName & VenueOwner step -->

    <!-- RegionId step -->
    <v-card v-show="showRegionIdStep">
      <v-card-title>
        {{ $t('In which region is') }} {{ venueName }} {{ $t('located?') }}
      </v-card-title>

      <v-card-text>
        <v-form v-model="regionIdFormValid" ref="regionIdForm" lazy-validation>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-select
                  v-model="regionId"
                  :label="regionLabel"
                  :hint="regionHint"
                  :items="regionOptions"
                  icon="mdi-map"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-container fluid >
          <v-row>
            <v-col cols="12">
              <base-preview-alert
                :title="$t('All data will be stored in the region you select for legal purposes and to comply with local data protection laws.')"
                :action-text="$t('learn-more')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>

      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />

        <v-btn text large class="pa-4" rounded @click="currentStep = 1" :disabled="purchasingLicence">
          <v-icon small >
            mdi-arrow-left
          </v-icon>

          <v-spacer></v-spacer>

          {{ $t('back') }}
        </v-btn>
        <v-btn large class="pa-4" rounded @click="submitRegionIdForm" :loading="purchasingLicence">
          {{ $t('next') }}

          <v-spacer></v-spacer>
          <v-icon small >
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-card-actions>

    </v-card>
    <!--/ RegionId step -->

    <!-- licence step -->
    <v-card v-show="showLicenseStep">
      <v-card-title>
        {{ $t('Configure License for') }} {{ venueName }}
      </v-card-title>

      <v-card-text>
        <v-form v-model="licenceFormValid" ref="licenceForm" lazy-validation>
          <v-container fluid>

            <v-row>
              <v-col cols="4" md="6">
                <base-date-picker
                  v-model="licenceStartDate"
                  :label="startDateLabel"
                  :hint="startDateHint"
                  icon="mdi-calendar-start"
                  :rules="startDateRules"
                  @input="updatePaymentIntent()"
                />
              </v-col>

              <v-col cols="5" md="6">
                <v-select
                  v-model="licenceId"
                  :label="durationLabel"
                  :hint="durationHint"
                  :items="licenceOptions"
                  icon="mdi-calendar-end"
                  @change="updatePaymentIntent()"
                />
              </v-col>

              <v-col cols="3" md="6">
                <v-checkbox
                  v-model="licenceRecurring"
                  :label="recurringLabel"
                  @change="updatePaymentIntent()"
                />
              </v-col>
            </v-row>

          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />
        <v-btn text large class="pa-4" rounded @click="currentStep = 2" :disabled="purchasingLicence">
          <v-icon small >
            mdi-arrow-left
          </v-icon>

          <v-spacer></v-spacer>

          {{ $t('back') }}
        </v-btn>
        <v-btn large class="pa-4" rounded @click="submitLicenseForm" :loading="purchasingLicence">
          {{ $t('next') }}

          <v-spacer></v-spacer>
          <v-icon small >
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-card-actions>

    </v-card>
    <!--/ licence step -->

    <!-- review step -->
    <v-card v-show="showReviewStep">
      <v-card-title>
        {{ $t('Let’s review everything.') }}
      </v-card-title>

      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col>

              <!-- name review -->
              <v-list two-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t(venueTitle) }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('venue-title') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 1">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ ownerName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('owner-name') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 1">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ ownerEmail }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('owner-email') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 1">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ region }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('region') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 2">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ licenceStartDate }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('licence-start-date') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 3">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ duration }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('licence-duration') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 3">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ formattedPrice }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('price') }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="currentStep = 3">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>

            </v-col>
          </v-row>

        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />

        <v-btn text large class="pa-4" rounded @click="currentStep = 3" :disabled="purchasingLicence">
          <v-icon small >
            mdi-arrow-left
          </v-icon>

          <v-spacer></v-spacer>

          {{ $t('back') }}
        </v-btn>
        <v-btn large rounded @click="confirmReview" :loading="purchasingLicence">
          {{ $t('next') }}
        </v-btn>
      </v-card-actions>

    </v-card>
    <!--/ review step -->

    <!-- payment step -->
    <v-card v-show="showPaymentStep">
      <v-card-title>
        {{ $t('Payment') }}
      </v-card-title>

      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col id="stripe-payment-element">
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />

        <v-btn text large class="pa-4" rounded @click="currentStep = 4" :disabled="purchasingLicence">
          <v-icon small >
            mdi-arrow-left
          </v-icon>

          <v-spacer></v-spacer>

          {{ $t('back') }}
        </v-btn>
        <v-btn large rounded @click="submitForm" :loading="purchasingLicence">
          {{ $t('create') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <!--/ payment step -->

    <!-- final step -->
    <v-card v-show="showFinalStep">
      <v-card-title>
        {{ $t('Payment Complete') }}
      </v-card-title>

      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col>
              {{ $t('Your Venue is being created. You will receive an email once it is ready with further instructions.') }}
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

    </v-card>
    <!--/ final step -->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { slugify, unslugify } from '~/utils/helpers'
import { loadStripe } from "@stripe/stripe-js";
import config from 'config';

const { stripePublicKey: STRIPE_PUBLIC_KEY } = config;

export default {
  name: "PurchaseVenue",
  layout: "blank",
  data() {
    return {
      currentStep: 1,
      numberOfSteps: 6,

      loading: false,
      purchasingLicence: false,

      stripe: null,
      stripeClientSecret: null,
      stripeElements: null,
      stripeReturnUrl: window.location.href,
      stripePaymentResultHandlers: {
        succeeded: paymentIntent => {
          console.log("Payment succeeded");
          this.paymentComplete();
        },
        purchasingLicence: paymentIntent => {
          console.log("Payment purchasingLicence");
        },
        cancelled: paymentIntent => {
          console.log("Payment cancelled");
        },
        requires_payment_method: paymentIntent => {
          console.log("Payment requires payment method");
        },
        requires_confirmation: paymentIntent => {
          console.log("Payment requires confirmation");
        },
        requires_action: paymentIntent => {
          console.log("Payment requires action");
        },
      },

      nameAndOwnerValid: true,
      regionIdFormValid: true,
      licenceFormValid: true,
      valid: true,

      partition: undefined,
      venueTitle: undefined,

      ownerEmail: undefined,
      ownerName: undefined,

      vendorName: undefined,
      vendorEmail: undefined,

      regionId: undefined,

      venueId: undefined,

      licenceStartDate: undefined,
      licenceId: undefined,
      licenceRecurring: true,

      /**
       * Validation rules
       */
      emailRules: [
        v => !!v || 'A Owner email is required',
        v => /^.+@.+\..+$/.test(v) || 'Email must be valid'
      ],
    }
  },
  asyncData({$venueConfig}) {
    return {
      partition: $venueConfig.partition,
      venueTitle: unslugify($venueConfig.partition),
      paymentIntentUrl: `https://public.api.global.${$venueConfig.rootDomain}/stripe/payment-intent`
    }
  },
  computed: {
    ...mapGetters({
      regions: "regions/regions",
      regionsLoading: 'regions/loading',
      regionsLoaded: 'regions/loaded',
      licences: "licences/licences",
      licencesLoading: 'licences/loading',
      licencesLoaded: 'licences/loaded',
    }),
    progressBar(){
      return this.currentStep / this.numberOfSteps * 100
    },

    showVenueNameStep() {
      return this.currentStep === 1
    },

    showRegionIdStep() {
      return this.currentStep === 2
    },

    showLicenseStep() {
      return this.currentStep === 3
    },

    showReviewStep() {
      return this.currentStep === 4
    },

    showPaymentStep() {
      return this.currentStep === 5
    },

    showFinalStep() {
      return this.currentStep === 6
    },

    venueName () {
      if (this.venueTitle) {
        return slugify(this.venueTitle);
      }
    },

    venueUrl () {
      return `https://${this.venueName}.platform.ivent-pro.com`
    },

    venueTitleLabel () {
      return this.$i18n.t('venue-title');
    },

    venueTitleHint () {
      return this.$i18n.t('Please enter the Venue title');
    },

    venueNameLabel () {
      return this.$i18n.t('venue-name');
    },

    venueNameHint () {
      return this.$i18n.t('this-is-the-name-of-your-venue');
    },

    venueUrlLabel () {
      return this.$i18n.t('venue-url');
    },

    venueUrlHint () {
      return this.$i18n.t('this-is-the-url-of-your-venue');
    },

    regionLabel () {
      return this.$i18n.t('region');
    },

    regionHint () {
      return this.$i18n.t('region');
    },

    startDateLabel () {
      return this.$i18n.t('start-date');
    },

    startDateHint () {
      return this.$i18n.t('start-date-hint');
    },

    startTimeLabel () {
      return this.$i18n.t('start-time');
    },

    startTimeHint () {
      return this.$i18n.t('start-time-hint');
    },

    durationLabel () {
      return this.$i18n.t('duration');
    },

    durationHint () {
      return this.$i18n.t('duration');
    },

    licenceOptions() {
      return this.licences.map(licence => {
        const { licenceId, name, description, price, currency } = licence;
        const formatter = new Intl.NumberFormat(navigator.language, {style: 'currency', currency});
        return {
          text: `${name} - ${formatter.format(price)}`,
          value: licenceId
        };
      });
    },

    recurringLabel() {
      return this.$i18n.t('recurring');
    },

    region() {
      return this.regionId ? this.regions.find(region => region.regionId === this.regionId).name : null;
    },

    regionOptions() {
      return this.regions.map(({regionId, name}) => ({text: name, value: regionId}));
    },

    startDateTime(){
      return this.licenceStartDate ? this.licenceStartDate + 'T' + '00:00:00Z': null;
    },

    duration(){
      return this.licenceId ? this.licences.find(({licenceId}) => licenceId === this.licenceId).period : null;
    },

    price() {
      return this.licenceId ? this.licences.find(({licenceId}) => licenceId === this.licenceId).price : null;
    },

    formattedPrice(){
      if(!this.licenceId) return null;
      const {price, currency} = this.licences.find(({licenceId}) => licenceId === this.licenceId);
      return new Intl.NumberFormat(navigator.language, {style: 'currency', currency}).format(price);
    },

    startDateRules(){
      //TODO: Handle i18n.
      return [
        v => !!v || 'A Start Date is required',
        // v => this.startDateTime  ?  !(this.startDateTime < new Date().toISOString()) || 'Start Datetime need to be in the future': true,
      ]
    },
  },

  watch: {
    'creatingVenue.venue': function(){
      this.showSnackbar({
        type: 'success',
        text: 'New venue has been created!'
      })
    }
  },

  methods: {
    ...mapActions({
      createVenue: 'venues/createVenue',
      showSnackbar: 'snackbar/showSnackbar',
      loadRegions: 'regions/load',
      loadLicences: 'licences/load'
    }),

    changeRegionId (regionId) {
      this.regionId = regionId;
    },

    reset () {
      this.valid = true;
      this.nameAndOwnerValid = true;
      this.regionIdFormValid = true;
      this.licenceFormValid = true;

      this.currentStep = 1;

      this.venueTitle = unslugify(this.partition);
      this.ownerName = undefined;
      this.ownerEmail = undefined;
      this.regionId = undefined;
      this.licenceStartDate = undefined;
      this.licenceId = undefined;

      this.$refs.nameAndOwnerForm.reset();
      this.$refs.licenceForm.reset();

    },

    cancel () {
      this.$emit('close');
      this.reset();
    },

    submitNameAndOwnerForm () {
      if (! this.$refs.nameAndOwnerForm.validate()) {
        this.nameAndOwnerValid = false;
        return;
      }

      this.nameAndOwnerValid = true;
      this.currentStep = 2;
    },

    submitRegionIdForm () {
      if (! this.$refs.regionIdForm.validate()) {
        this.regionIdFormValid = false;
        return;
      }

      this.regionIdFormValid = true;
      this.currentStep = 3;
    },

    submitLicenseForm () {
      if (! this.$refs.licenceForm.validate()) {
        this.licenceFormValid = false;
        return;
      }

      this.licenceFormValid = true;
      this.currentStep = 4;
    },

    confirmReview () {
      this.currentStep = 5;
    },

    paymentComplete() {
      this.currentStep = 6;
      this.purchasingLicence = false;
    },

    async purchaseLicence () {
      this.purchasingLicence = true;

      const { paymentIntent, error } = await this.stripe.confirmPayment({
        elements: this.stripeElements,
        confirmParams: { return_url: this.stripeReturnUrl },
        redirect: 'if_required'
      });

      console.log("Payment intent (no redirect): ", paymentIntent);

      this.handlePaymentResult(paymentIntent);

      this.purchasingLicence = false;

      if(!error) return;

      if (error.type === "card_error" || error.type === "validation_error") {
        console.log(error.message);
      } else {
        console.log("An unexpected error occured.");
      }
      throw error;
    },

    async submitForm () {
      this.purchasingLicence = true;

      if (!this.nameAndOwnerValid || ! this.licenceFormValid) {
        this.valid = false;
        return;
      }

      this.valid = true;

      //@todo: add snackbar to show messages success/failure
      //@todo: handle errors

      try {
        await this.purchaseLicence();
      } catch(e) {
        console.log("Error purchasing licence: ", e);
      }

    },

    async updatePaymentIntent() {
      if(!this.licenceId || !this.licenceStartDate) return;

      ({ clientSecret: this.stripeClientSecret } = await this.$axios.$post(this.paymentIntentUrl, {items: [
          {
            itemId: this.licenceId,
            quantity: 1,
            recurring: this.licenceRecurring,
            metadata: {
              regionId: this.regionId,
              venueName: this.venueName,
              licenceId: this.licenceId,
              licenceStartDate: this.licenceStartDate,
              owner: {
                email: this.ownerEmail,
                fullname: this.ownerName,
              }
            }
          }
        ]}));

      console.log("Stripe client secret: ", this.stripeClientSecret);
      if(!this.stripeClientSecret) {
        throw new Error("Failed to process a payment intent.");
      }
      this.stripeElements = this.stripe.elements({ clientSecret: this.stripeClientSecret });
      const paymentElement = this.stripeElements.create("payment");
      paymentElement.mount("#stripe-payment-element");
    },

    handlePaymentResult(paymentIntent) {
      if(!paymentIntent) return;

      if(this.stripePaymentResultHandlers[paymentIntent.status]) {
        this.stripePaymentResultHandlers[paymentIntent.status](paymentIntent);
      } else {
        console.log("Ignored the following payment result: ", paymentIntent);
      }

    },

  },

  async mounted() {
    this.stripe = await loadStripe(STRIPE_PUBLIC_KEY);

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    if(!clientSecret) return;

    const paymentIntent = this.stripe.retrievePaymentIntent(clientSecret);
    console.log("Payment intent (redirect): ", paymentIntent);
    this.handlePaymentResult(paymentIntent);
  },

  created() {
    if (!this.regionsLoaded && !this.regionsLoading ) {
      this.loadRegions();
    }
    if (!this.licencesLoaded && !this.licencesLoading ) {
      this.loadLicences();
    }
  },

  beforeDestroy() {
    this.reset();
  }
}
</script>
