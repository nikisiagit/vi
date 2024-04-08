<template>
  <!-- Create event Card -->
  <v-card>

    <!-- Create A event Card -->
    <v-card :loading="loading">

      <template slot="progress">
        <v-progress-linear color="primary" height="4" indeterminate />
      </template>

      <v-card-title>
        <v-icon left>mdi-calendar-plus</v-icon>
        {{ $t('create-event') }}
      </v-card-title>

      <v-card-subtitle>
        {{ $t('create-event') }}

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

<!--     -DEBUG EVENT-->
<!--    <v-card>-->
<!--      <v-card-text>-->
<!--        <div>-->
<!--          DEBUG:-->
<!--        </div>-->

<!--        <pre>-->
<!--          {{ event }}-->
<!--        </pre>-->

<!--      </v-card-text>-->
<!--    </v-card>-->
<!--    / DEBUG EVENT-->

    <!-- EventName step -->
    <apps-admin-events-steps-event-name
      v-show="showEventNameStep"
      :language-id-value="languageId"
      @submitted="eventNameSubmitted"
      @cancel="cancel"
    />
    <!--/ EventName step -->


    <!-- EventDates step -->
    <apps-admin-events-steps-event-dates
      :title="event.title.text"
      :timezone-id-value="timezoneId"
      v-show="showEventDatesStep"
      @submitted="eventDatesSubmitted"
      @cancel="cancel"
      @back="back"
    />
    <!--/ EventDates step -->

    <!-- EventLocale step -->
    <apps-admin-events-steps-event-locale
      :title="event.title.text"
      :language-id-value="languageId"
      :currency-id-value="currencyId"
      v-show="showEventLocaleStep"
      @submitted="eventLocaleSubmitted"
      @cancel="cancel"
      @back="back"
    />
    <!--/ EventLocale step -->


    <!-- review step -->
    <v-card v-show="showReviewStep">
      <v-card-title>
        {{ $t('Finally, let’s review everything.') }}
      </v-card-title>

      <v-card-text>

        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-list>
                <v-list-item class="pa-0">
                                    <v-list-item-content>
                                      <v-list-item-title class="mb-2">
                                        <strong>{{ $t('preview-event') }}</strong>
                                      </v-list-item-title>
                                      <v-list-item-subtitle>
                                        <!-- Preview Event component  -->
                                        <events-event-list-item
                                          :date-day="formatDate(event.startDateTime, false, true)"
                                          :date-month="getMonthLabelFromNumber(formatDate(event.startDateTime, true, false))"
                                          :title="event.title.text"
                                          :description="event.description.text"
                                          :event-type="event.format"
                                          :members="[]"
                                          :address="event.addressId || '-'"
                                        />
                                        <!--/ Preview Event component  -->
                                      </v-list-item-subtitle>
                                    </v-list-item-content>
                </v-list-item>
              </v-list>

            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-list>
                <!-- EventName step  -->
              <v-row>
                <v-col cols="6" lg="3">
                  <span class="text--disabled">{{ $t('Whats the event called?') }}</span>
                </v-col>
                <v-col cols="6" lg="9" align-self="center">
                  <v-divider />
                </v-col>
              </v-row>

               <v-row>
                 <v-col>
                   <v-list-item>
                     <v-list-item-content>
                       <v-list-item-title>{{ event.name }}</v-list-item-title>
                       <v-list-item-subtitle>{{ $t('event-name') }}</v-list-item-subtitle>
                     </v-list-item-content>
                   </v-list-item>
                 </v-col>

                 <v-col>
                   <v-list-item>
                     <v-list-item-content>
                       <v-list-item-title>{{ event.description && event.description.text  }}</v-list-item-title>
                       <v-list-item-subtitle>{{ $t('event-description') }}</v-list-item-subtitle>
                     </v-list-item-content>
                     <v-list-item-action>
                       <v-btn icon @click="currentStep = 1">
                         <v-icon>mdi-pencil</v-icon>
                       </v-btn>
                     </v-list-item-action>
                   </v-list-item>
                 </v-col>
               </v-row>

                <!--/ EventName step  -->

                <!-- EventDates step  -->
                <v-row>
                  <v-col cols="6" lg="3">
                    <span class="text--disabled">{{ $t(`When is ${event.title.text} happening?`)  }}</span>
                  </v-col>
                  <v-col cols="6" lg="9" align-self="center">
                    <v-divider />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ formatDate(event.startDateTime) }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('event-starts') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ formatDate(event.endDateTime) }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('event-ends') }}</v-list-item-subtitle>
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
                        <v-list-item-title>{{ event.timezoneId }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('event-timezone') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
                <!--/ EventDates step  -->

                <!-- EventLocale step  -->
                <v-row>
                  <v-col cols="6" lg="3">
                    <span class="text--disabled">{{ $t(`How will attendees access ${event.title.text}?`)  }}</span>
                  </v-col>
                  <v-col cols="6" lg="9" align-self="center">
                    <v-divider />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Free, Paid</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('event-tickets') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col >
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ event.currencyId }}</v-list-item-title>
                        <v-list-item-subtitle v-show="event.ticketAccess.paid">{{ $t('event-currency') }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon @click="currentStep = 3">
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
                        <v-list-item-title>{{ event.format }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('event-format') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col v-show="event.format !== 'virtual'">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ event.addressId || '-' }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('event-location') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ event.languageId }}</v-list-item-title>
                        <v-list-item-subtitle>{{ $t('event-language') }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
                  <!-- /EventLocale step  -->

              </v-list>

            </v-col>
          </v-row>

        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-container fluid >
          <v-row>
            <v-col cols="12">
              <base-preview-alert
                :title="$t('All new Events created are always set to Draft mode, until they go Live.')"
                :action-text="$t('learn-more')"
              />
            </v-col>
          </v-row>
        </v-container>

      </v-card-actions>

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


    <!-- creating event step -->
    <v-card v-if="showCreatingStep">

      <!-- spinner -->

      <!-- error -->

      <!-- createdEvent -->

      <v-card-text v-if="creatingEvent.creating">
        <v-container fluid>
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              {{ $t('creating-event') }} {{ event.name }}
            </v-col>
            <v-col cols="6">
              <v-progress-linear indeterminate rounded height="6" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-text v-if="creatingEvent.event">
        <v-container fluid>
          <v-row>
            <v-col>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ creatingEvent.event.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('event-name') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

<!--                <v-list-item>-->
<!--                  <v-list-item-content>-->
<!--                    <v-list-item-title>{{ creatingEvent.event.description }}</v-list-item-title>-->
<!--                    <v-list-item-subtitle>{{ $t('event-description') }}</v-list-item-subtitle>-->
<!--                  </v-list-item-content>-->
<!--                </v-list-item>-->
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>


      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('close') }}</v-btn>
        <v-btn text large rounded @click="reset">{{ $t('create-another-event') }}</v-btn>

        <template v-if="creatingEvent.event">
          <v-spacer />
          <v-btn large class="pa-4" rounded :to="{name: 'events-eventId', params: {'eventId': creatingEvent.event.eventId}}">
            {{ $t('view-event') }}

            <v-spacer></v-spacer>
            <v-icon small >
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </template>

      </v-card-actions>

    </v-card>
    <!--/ creating eventId step -->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import dayjs from "dayjs";

export default {
  name: "CreateEvent",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    currentStep: 1,
    numberOfSteps: 4,

    event: {
      name: '',
      title: {
        text: '',
        languageId: '',
      },

      description: {
        text: '',
        languageId: '',
      },

      startDateTime: '',
      endDateTime: '',
      timezoneId: '',

      format: '',
      addressId: '',
      ticketAccess: {
        free: false,
        paid: false
      },
      languageId: '',
      currencyId: '',

      tagIds: []
    },

    // loading: false,
    creating: false,

    executionArn: undefined,
  }),

  computed: {
    ...mapGetters({
      creatingEventWithExecutionArn: 'apps/admin/events/creatingEventWithExecutionArn',
      venue: 'apps/admin/venue/venue',
      loading: 'apps/admin/venue/loading',
      loaded: 'apps/admin/venue/loaded',
    }),

    // default timezoneId of the Venue
    timezoneId () {
      return (this.venue) ? this.venue.timezoneId : undefined;
    },

    languageId () {
      return (this.venue) ? this.venue.languageId : undefined;
    },

    currencyId () {
      return (this.venue) ? this.venue.currencyId : undefined;
    },

    progressBar(){
      return this.currentStep / this.numberOfSteps * 100
    },


    showEventNameStep() {
      return this.currentStep === 1
    },

    showEventDatesStep() {
      return this.currentStep === 2
    },

    showEventLocaleStep() {
      return this.currentStep === 3
    },

    showReviewStep() {
      return this.currentStep === 4
    },

    showCreatingStep() {
      return this.currentStep === 5
    },

    creatingEvent () {
       return (this.executionArn) ? this.creatingEventWithExecutionArn(this.executionArn) : undefined;
    },
  },

  methods: {
    ...mapActions({
      createEvent: 'apps/admin/events/createEvent',

      load: 'apps/admin/venue/load',
    }),

    // addressFormat(address){
    //   if (! address.city || ! address.country ) return;
    //   return `${address.city}, ${address.country}`
    // },

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
      if (! date) return '-'

      if (toMonth) return dayjs(date).format("MM");
      else if (toDay) return dayjs(date).format("DD");

      return dayjs(date).format("DD/MM/YYYY hh:mm");
    },

    reset () {
      this.currentStep = 1;
      this.event = {
        name: '',
        title: {
          text: '',
          languageId: '',
        },

        description: {
          text: '',
          languageId: '',
        },

        startDateTime: '',
        endDateTime: '',
        timezoneId: '',

        format: '',
        addressId: '',
        ticketAccess: {
          free: false,
          paid: false
        },
        languageId: '',
        currencyId: '',

        tagIds: []
      }

      // this.$refs.stepForm.reset();
      // this.$refs.stepForm.reset();
      // this.$refs.stepForm.reset();
    },

    cancel () {
      console.log('cancelling CreateEvent');

      this.$emit('close');
      this.reset();
    },

    back(){
      // back to previous step
      if (this.currentStep !== 1)
        this.currentStep = this.currentStep -1
    },

    eventNameSubmitted ({ name, title, description, languageId }) {
      this.event = {
        ...this.event,
        name,
        title: {
          text: title,
          languageId
        },
      }

      if (description && description !== '') {
        this.event.description = {
          text: description,
          languageId
        }
      }

      this.currentStep = 2
    },

    eventDatesSubmitted ({ startDateTime, endDateTime, timezoneId }) {
      this.event = {
        ...this.event,
        startDateTime,
        endDateTime,
        timezoneId,
      }

      this.currentStep = 3
    },

    eventLocaleSubmitted ({ format, addressId, ticketAccess, languageId, currencyId, tagIds }) {
      this.event = {
        ...this.event,
        format,
        addressId,
        ticketAccess,
        languageId,
        currencyId,

        tagIds
      }

      this.currentStep = 4
    },

    async submitForm () {
      // console.log("submitForm");
      // console.log("this.eventTextValid", this.eventTextValid);
      // console.log("this.eventLinkFormValid", this.eventLinkFormValid);
      // console.log("this.eventBrandingFormValid", this.eventBrandingFormValid);
      //
      // if (!this.eventTextValid || ! this.eventLinkFormValid || ! this.eventBrandingFormValid) {
      //   this.valid = false;
      //   return;
      // }
      //
      // this.valid = true;

      // create event
      console.log("## eventToCreate")
      console.log(this.event)

      const eventToCreate = {...this.event};

      const creatingEvent = await this.createEvent(eventToCreate);

      if (creatingEvent) {

        const {executionArn, startDate} = creatingEvent;

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
