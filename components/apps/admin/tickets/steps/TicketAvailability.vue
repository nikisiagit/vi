<template>
  <v-card>
    <v-card-title>
      {{ $t('Choose ticket availability') }}
    </v-card-title>

    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <v-row>
            <v-col cols="12" lg="12">
              <v-text-field
                v-model="quantity"
                :label="quantityLabel"
                :hint="quantityHint"
                :placeholder="'∞'"
                persistent-hint
                clearable
              />
            </v-col>
          </v-row>

          <!-- start date -->
          <!-- start time -->
          <v-row>
            <v-col cols="12" md="6">
              <base-date-picker
                v-model="startDate"
                :label="startDateLabel"
                :hint="startDateHint"
                icon=""
                :rules="startDateRules"
                :max="endDateTime && new Date(endDateTime).toISOString()"
              />
            </v-col>

            <v-col cols="12" md="6">
              <base-time-picker
                v-model="startTime"
                :label="startTimeLabel"
                :hint="startTimeHint"
                icon=""
                :rules="startTimeRules"
              />
            </v-col>
          </v-row>

          <!-- end date -->
          <!-- end time -->
          <v-row>
            <v-col cols="12" md="6">
              <base-date-picker
                v-model="endDate"
                :label="endDateLabel"
                :hint="endDateHint"
                icon=""
                :rules="endDateTimeRules"
                :min="new Date(startDateTime).toISOString()"
              />
            </v-col>

            <v-col cols="12" md="6">
              <base-time-picker
                v-model="endTime"
                :label="endTimeLabel"
                :hint="endTimeHint"
                icon=""
                :rules="endDateTimeRules"
              />
            </v-col>
          </v-row>

        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn plain large rounded @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />

      <v-btn text large class="pa-4" rounded @click="back">
        <v-icon small >
          mdi-arrow-left
        </v-icon>

        <v-spacer></v-spacer>

        {{ $t('back') }}
      </v-btn>
      <v-btn large class="pa-4" rounded @click="submit">
        {{ $t('next') }}

        <v-spacer></v-spacer>
        <v-icon small >
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TicketAvailability",
  computed: {
    quantityLabel () {
      return this.$i18n.t('ticket-quantity-available');
    },

    quantityHint () {
      return this.$i18n.t('leave-blank-for-unlimited-tickets');
    },

    startDateLabel () {
      return this.$i18n.t('ticket-sale-starts-date');
    },

    startDateHint () {
      return this.$i18n.t('this-is-when-the-ticket-sale-starts-in-date');
    },

    startTimeLabel () {
      return this.$i18n.t('ticket-sale-starts-time');
    },

    startTimeHint () {
      return this.$i18n.t('this-is-when-the-ticket-sale-starts-in-time');
    },

    endDateLabel () {
      return this.$i18n.t('ticket-sale-ends-date');
    },

    endDateHint () {
      return this.$i18n.t('this-is-when-the-ticket-sale-ends-in-date');
    },

    endTimeLabel () {
      return this.$i18n.t('ticket-sale-ends-time');
    },

    endTimeHint () {
      return this.$i18n.t('this-is-when-the-ticket-sale-ends-in-time');
    },

    startDateTime(){
      return this.startDate && this.startTime ? this.startDate + 'T' + this.startTime + ':00': null;
    },

    endDateTime(){
      return this.endDate && this.endTime ? this.endDate + 'T' + this.endTime + ':00': null;
    },
  },
  data: () => ({
    valid: true,

    quantity: null, // number or null. (If is 'null' means that is unlimited).
    startDate: undefined,
    endDate: undefined,
    startTime: undefined,
    endTime: undefined,

    startDateRules: [],
    startTimeRules: [],
    endDateTimeRules: [],
  }),
  methods: {
    reset () {
      this.valid = true
      this.quantity = null
      this.startDate = undefined
      this.endDate = undefined
      this.startTime = undefined
      this.endTime = undefined

      this.$refs.form.reset();
    },

    addStartDateRules(){
      this.startDateRules = [
        v => !!v || 'ticket-sale-starts date is required',
        v => this.startDateTime  ?  !(this.startDateTime < new Date().toISOString()) || 'ticket-sale-starts date and time need to be in the future': true,
        v => this.endDateTime  ? ( this.startDateTime <= this.endDateTime ) || 'ticket-sale-starts date and time need to be less than the ticket-sale-ends date and time': true,
      ]
    },

    addStartTimeRules(){
      this.startTimeRules = [
        v => !!v || 'ticket-sale-starts time is required',
        v => this.endDateTime ? ( this.startDateTime <= this.endDateTime ) || 'ticket-sale-starts date and time need to be less than the ticket-sale-ends date and time': true,
      ]
    },

    addEndDateTimeRules(){
      this.endDateTimeRules = [
        v => !!v || 'ticket-sale-ends date is required',
        v => this.startDateTime !== null ? !( this.endDateTime <= this.startDateTime ) || 'ticket-sale-ends date and time need to be greater than ticket-sale-starts date and time': true,
      ]
    },

    submit () {
      // this.addStartDateRules();
      // this.addStartTimeRules();
      // this.addEndDateTimeRules();

      // after rules has been added, it requires to update the template to pick up validation.
      this.$nextTick(() => {
        if (! this.$refs.form.validate()) {
          this.valid = false;
          return;
        }

        this.valid = true;
        this.$emit('submitted', {
          saleStartDatetime: this.startDateTime,
          saleEndDatetime: this.endDateTime,
          quantity: this.quantity
        });
      })
    },
    cancel () {
      this.$emit('close');
      this.$emit('reset');
    },
    back () {
      this.$emit('back');
    },
  }
}
</script>
