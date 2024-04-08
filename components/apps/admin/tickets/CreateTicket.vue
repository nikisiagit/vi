<template>
  <!-- Create ticket Card -->
  <v-card>

    <!-- Create A ticket Card -->
    <v-card :loading="loading">

      <template slot="progress">
        <v-progress-linear color="primary" height="4" indeterminate />
      </template>

      <v-card-title>
        <v-icon left>mdi-calendar-plus</v-icon>
        {{ $t('create-ticket') }}
      </v-card-title>

      <v-card-subtitle>
        {{ $t('create-ticket') }}

        <!-- Progress bar -->
        <!--  (Hides when step machines step finishes. Last step/'Create another one')-->
        <v-list v-show="this.currentStep !== 5">
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

<!--     -DEBUG TICKET-->
<!--    <v-card>-->
<!--      <v-card-text>-->
<!--        <div>-->
<!--          DEBUG:-->
<!--        </div>-->

<!--        <pre>-->
<!--          {{ ticket }}-->
<!--        </pre>-->

<!--      </v-card-text>-->
<!--    </v-card>-->
<!--    / DEBUG TICKET-->

    <!-- TicketName step -->
    <apps-admin-tickets-steps-ticket-name
      ref="stepName"
      v-show="showTicketNameStep"
      @submitted="ticketNameSubmitted"
      @cancel="cancel"
    />
    <!--/ TicketName step -->


    <!-- TicketType step -->
    <apps-admin-tickets-steps-ticket-type
      ref="stepType"
      v-show="showTicketTypeStep"
      @submitted="ticketTypeSubmitted"
      @cancel="cancel"
      @back="back"
    />
    <!--/ TicketType step -->

    <!-- TicketAvailability step -->
    <apps-admin-tickets-steps-ticket-availability
      ref="stepAvailability"
      v-show="showTicketAvailabilityStep"
      @submitted="ticketAvailabilitySubmitted"
      @cancel="cancel"
      @back="back"
    />
    <!--/ TicketAvailability step -->


    <!-- review step -->
    <v-card v-show="showReviewStep">
      <v-card-title>
        {{ $t('Finally, let’s review everything.') }}
      </v-card-title>

      <v-card-text>

        <v-container fluid>
          <v-row>
            <v-col>

              <v-row>
                <v-col cols="12">
                  <v-list>
                    <v-list-item class="pa-0">
                      <v-list-item-content>
                        <v-list-item-title class="mb-2">
                          <strong>{{ $t('preview-ticket') }}</strong>
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          <!-- Preview Ticket component  -->
                          <apps-admin-tickets-ticket-list-item
                            :title="ticket.title.text"
                            :name="ticket.name"
                            :id="`${Math.floor(100000 + Math.random() * 900000)}`"
                            :date="formatDate(ticket.saleStartDatetime)"
                            :price="`${ticket.price ? '£'+ticket.price: ''}`"
                            :show-q-r-code="ticket.showQRCode"
                            holder="Holder's name"
                          />
                          <!--/ Preview Ticket component  -->
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                </v-col>
              </v-row>

              <v-list>
                <!-- TicketName step  -->
              <v-row>
                <v-col cols="6" lg="3">
                  <span class="text--disabled">{{ $t(`What's the name of this ticket?`) }}</span>
                </v-col>
                <v-col cols="6" lg="9" align-self="center">
                  <v-divider />
                </v-col>
              </v-row>

               <v-row>
                 <v-col>
                   <v-list-item>
                     <v-list-item-content>
                       <v-list-item-title>{{ ticket.name }}</v-list-item-title>
                       <v-list-item-subtitle>{{ $t('ticket-name') }}</v-list-item-subtitle>
                     </v-list-item-content>
                   </v-list-item>
                 </v-col>

                 <v-col>
                   <v-list-item>
                     <v-list-item-content>
                       <v-list-item-title>{{ ticket.title.text }}</v-list-item-title>
                       <v-list-item-subtitle>{{ $t('ticket-title') }}</v-list-item-subtitle>
                     </v-list-item-content>
                     <v-list-item-action>
                       <v-btn icon @click="currentStep = 1">
                         <v-icon>mdi-pencil</v-icon>
                       </v-btn>
                     </v-list-item-action>
                   </v-list-item>
                 </v-col>

                 <v-col>
                   <v-list-item>
                     <v-list-item-content>
                       <v-list-item-title>{{ ticket.description.text }}</v-list-item-title>
                       <v-list-item-subtitle>{{ $t('ticket-description') }}</v-list-item-subtitle>
                     </v-list-item-content>
                     <v-list-item-action>
                       <v-btn icon @click="currentStep = 1">
                         <v-icon>mdi-pencil</v-icon>
                       </v-btn>
                     </v-list-item-action>
                   </v-list-item>
                 </v-col>

                 <v-col>
                   <v-list-item>
                     <v-list-item-content>
                       <v-list-item-title>{{ ticket.language }}</v-list-item-title>
                       <v-list-item-subtitle>{{ $t('ticket-language') }}</v-list-item-subtitle>
                     </v-list-item-content>
                     <v-list-item-action>
                       <v-btn icon @click="currentStep = 1">
                         <v-icon>mdi-pencil</v-icon>
                       </v-btn>
                     </v-list-item-action>
                   </v-list-item>
                 </v-col>
               </v-row>

                <!--/ TicketName step  -->

                <!-- TicketType step  -->
                <v-row>
                  <v-col cols="6" lg="3">
                    <span class="text--disabled">{{ $t(`What type of ticket is this?`)  }}</span>
                  </v-col>
                  <v-col cols="6" lg="9" align-self="center">
                    <v-divider />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ ticket.pricingType }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('ticket-type') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ ticket.access }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('ticket-access') }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon @click="currentStep = 2">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ ticket.showQRCode ? $t('include'): $t(`don't include`) }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('ticket-qr-code') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col v-show="ticket.pricingType === 'paid'">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ ticket.price }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('ticket-price') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
                <!--/ TicketType step  -->

                <!-- TicketAvailability step  -->
                <v-row>
                  <v-col cols="6" lg="3">
                    <span class="text--disabled">{{ $t(`Choose ticket availability`)  }}</span>
                  </v-col>
                  <v-col cols="6" lg="9" align-self="center">
                    <v-divider />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ ticket.quantity || '∞' }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('ticket-quantity-available') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                </v-row>

                <v-row>
                  <v-col>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ formatDate(ticket.saleStartDatetime) }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('ticket-sale-starts') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ formatDate(ticket.saleEndDatetime) }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('ticket-sale-ends') }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon @click="currentStep = 2">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-col>
                </v-row>
                  <!-- /TicketAvailability step  -->

              </v-list>

            </v-col>
          </v-row>

        </v-container>
      </v-card-text>

<!--      <v-card-actions>-->
<!--        <v-container fluid >-->
<!--          <v-row>-->
<!--            <v-col cols="12">-->
<!--              <base-preview-alert-->
<!--                :title="$t('All new Tickets created are always set to Draft mode, until they go Live.')"-->
<!--                :action-text="$t('learn-more')"-->
<!--              />-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-container>-->

<!--      </v-card-actions>-->

      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
        <v-spacer />

        <v-btn text large class="pa-4" rounded @click="currentStep = 3" :disabled="creating">
          <v-icon small >
            mdi-arrow-left
          </v-icon>

          <v-spacer></v-spacer>

          {{ $t('back') }}
        </v-btn>
        <v-btn large rounded @click="submitForm" :loading="creating">
          {{ $t('create') }}
        </v-btn>
      </v-card-actions>

    </v-card>
    <!--/ review step -->


    <!-- creating ticket step -->
    <v-card v-if="showCreatingStep">

      <!-- spinner -->

      <!-- error -->

      <!-- createdTicket -->
      <v-card-text v-if="creatingTicket.creating">
        <v-container fluid>
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              {{ $t('creating-ticket') }} {{ ticket.name }}
            </v-col>
            <v-col cols="6">
              <v-progress-linear indeterminate rounded height="6" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-text v-if="creatingTicket.created">
        <v-container fluid>
          <v-row>
            <v-col>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ creatingTicket.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('ticket-name') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ creatingTicket.title.text }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('ticket-title') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ creatingTicket.description.text }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('ticket-description') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>


      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('close') }}</v-btn>
        <v-btn text large rounded @click="reset">{{ $t('create-another-ticket') }}</v-btn>

        <template v-if="creatingTicket.ticket">
          <v-spacer />
          <v-btn large class="pa-4" rounded :to="{name: 'tickets-ticketId', params: {'ticketId': creatingTicket.ticket.ticketId}}">
            {{ $t('view-ticket') }}

            <v-spacer></v-spacer>
            <v-icon small >
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </template>

      </v-card-actions>

    </v-card>
    <!--/ creating ticketId step -->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import dayjs from "dayjs";

export default {
  name: "CreateTicket",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    currentStep: 1,
    numberOfSteps: 4,

    ticket: {
      name: '',
      title: '',
      description: '',
      pricingType: '', // free - paid
      access: '', // public - private
      showQRCode: true,
      quantity: null, // 0 || null, // is is 'null' means that is unlimited.
      saleStartDatetime: '',
      saleEndDatetime: '',
      price: 0,
      currencyId: '' // matches the venue currenId for now...
    },

    loading: false,
    creating: false,

    executionArn: undefined,
  }),

  computed: {
    ...mapGetters({
      creatingTicketWithExecutionArn: 'apps/admin/tickets/creatingTicketWithExecutionArn',
      venue: 'apps/admin/venue/venue',
    }),

    // default timezoneId of the Venue
    timezoneId () {
      return (this.venue) ? this.venue.timezoneId : undefined;
    },

    // timezoneId value of the Venue
    timezoneIdValue () {
      return (this.timezoneId) ? this.timezoneId.value : undefined;
    },

    languageId () {
      return (this.venue) ? this.venue.languageId : undefined;
    },

    languageIdValue () {
      return (this.languageId) ? this.languageId.value : undefined;
    },

    currencyId () {
      return (this.venue) ? this.venue.currencyId : undefined;
    },

    currencyIdValue () {
      return (this.currencyId) ? this.currencyId.value : undefined;
    },

    progressBar(){
      return this.currentStep / this.numberOfSteps * 100
    },


    showTicketNameStep() {
      return this.currentStep === 1
    },

    showTicketTypeStep() {
      return this.currentStep === 2
    },

    showTicketAvailabilityStep() {
      return this.currentStep === 3
    },

    showReviewStep() {
      return this.currentStep === 4
    },

    showCreatingStep() {
      return this.currentStep === 5
    },

    creatingTicket () {
       return (this.executionArn) ? this.creatingTicketWithExecutionArn(this.executionArn) : undefined;
    },
  },

  methods: {
    ...mapActions({
      createTicket: 'apps/admin/tickets/createTicket',

      load: 'apps/admin/venue/load',
    }),

    addressFormat(address){
      if (! address.city || ! address.country ) return;
      return `${address.city}, ${address.country}`
    },

    getMonthLabelFromNumber(monthNumber) {
      //@todo: needs handling i18n - months
      switch (monthNumber) {
        case '01':
          return this.$t('january').substring(0, 3).toUpperCase()

        case '02':
          return this.$t('february').substring(0, 3).toUpperCase()

        case '03':
          return this.$t('march').substring(0, 3).toUpperCase()

        case '04':
          return this.$t('april').substring(0, 3).toUpperCase()

        case '05':
          return this.$t('may').substring(0, 3).toUpperCase()

        case '06':
          return this.$t('june').substring(0, 3).toUpperCase()

        case '07':
          return this.$t('july').substring(0, 3).toUpperCase()

        case '08':
          return this.$t('august').substring(0, 3).toUpperCase()

        case '09':
          return this.$t('september').substring(0, 3).toUpperCase()

        case '10':
          return this.$t('october').substring(0, 3).toUpperCase()

        case '11':
          return this.$t('november').substring(0, 3).toUpperCase()

        case '12':
          return this.$t('december').substring(0, 3).toUpperCase()

      }
    },

    formatDate(date, toMonth, toDay) {
      if(!date) return

      if (toMonth) return dayjs(date).format("MM");
      else if (toDay) return dayjs(date).format("DD");

      return dayjs(date).format("D MMMM, YYYY | hh:mma");
    },

    reset () {
      this.currentStep = 1;
      this.ticket = {
        name: '',
        title: {
          text: '',
          languageId: null
        },
        description: {
          text: '',
          languageId: null
        },
        pricingType: '',
        access: '',
        showQRCode: true,
        quantity: null,
        saleStartDatetime: '',
        saleEndDatetime: '',
        price: 0,
        currencyId: ''
      }

      this.$refs.stepName.reset();
      this.$refs.stepType.reset();
      this.$refs.stepAvailability.reset();
    },

    cancel () {
      this.$emit('close');
      this.reset();
    },

    back(){
      // back to previous step
      if (this.currentStep !== 1)
        this.currentStep = this.currentStep -1
    },

    ticketNameSubmitted ({ name, title, description, language }) {
      // this.ticket = {
      //   ...this.ticket,
      //   name,
      //   title,
      //   description
      // }

      this.ticket = {
        ...this.ticket,
        name,
        title: {
          text: title,
          languageId: language
        },
        description: {
          text: description,
          languageId: language
        }
      }

      this.currentStep = 2
    },

    ticketTypeSubmitted ({ pricingType, access, showQRCode, price }) {
      this.ticket = {
        ...this.ticket,
        pricingType,
        price,
        access,
        showQRCode,
      }

      this.currentStep = 3
    },

    ticketAvailabilitySubmitted ({ saleStartDatetime, saleEndDatetime, quantity }) {
      this.ticket = {
        ...this.ticket,
        saleStartDatetime,
        saleEndDatetime,
        quantity
      }

      this.currentStep = 4
    },

    async submitForm () {
      // console.log("submitForm");
      // console.log("this.ticketTextValid", this.ticketTextValid);
      // console.log("this.ticketLinkFormValid", this.ticketLinkFormValid);
      // console.log("this.ticketBrandingFormValid", this.ticketBrandingFormValid);
      //
      // if (!this.ticketTextValid || ! this.ticketLinkFormValid || ! this.ticketBrandingFormValid) {
      //   this.valid = false;
      //   return;
      // }
      //
      // this.valid = true;

      // create ticket
      console.log("## ticketToCreate")
      console.log(this.ticket)

      const ticketToCreate = {
        ...this.ticket,
        itemId: 'event',
      };

      const creatingTicket = await this.createTicket(ticketToCreate);

      if (creatingTicket) {
        const {executionArn, startDate} = creatingTicket;

        //@todo: handle errors
        //@todo: add snackbar to show messages success/failure

        this.currentStep = 5;
        this.executionArn = executionArn;
        // this.startDate = startDate;
      } else {
        console.log("throw error from step function...")
      }

    },
  },

  beforeDestroy() {
    this.reset();
  }
}
</script>
