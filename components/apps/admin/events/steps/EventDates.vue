<template>
  <v-card>
    <v-card-title>
      {{ $t(`When is ${title} happening?`) }}
    </v-card-title>

    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-container fluid>
          <!-- start date -->
          <!-- start time -->
          <v-row>
            <v-col cols="12" md="12">
              <base-date-time-picker
                :value="startDateTime"
                :label="startDateTimeLabel"
                :hint="startDateTimeHint"
                clearable
                @change-DateTime="changeStartDateTime"
                @clear="clearStartDateTime"
              ></base-date-time-picker>

            </v-col>

          </v-row>

          <!-- end date -->
          <!-- end time -->
          <v-row>
            <v-col cols="12" md="12">
              <base-date-time-picker
                :value="endDateTime"
                :label="endDateTimeLabel"
                :hint="endDateTimeHint"
                clearable
                @change-DateTime="changeEndDateTime"
                @clear="clearEndDateTime"
              ></base-date-time-picker>

            </v-col>

          </v-row>

          <v-row>
            <v-col>
              <apps-admin-region-timezones-select :value="timezoneIdValue" @change="change" />
            </v-col>
          </v-row>

        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
<!--      <v-btn plain large rounded @click="back">{{ $t('cancel') }}</v-btn>-->
<!--      <v-spacer />-->

<!--      <v-btn large @click="back" class="grow">-->
<!--        <v-icon small >-->
<!--          mdi-arrow-left-->
<!--        </v-icon>-->
<!--        {{ $t('back') }}-->
<!--        <v-spacer></v-spacer>-->
<!--      </v-btn>-->

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

<!--      <v-btn large @click="submit" class="grow">-->
<!--        <v-spacer></v-spacer>-->
<!--        {{ $t('next') }}-->
<!--        <v-icon small >-->
<!--          mdi-arrow-right-->
<!--        </v-icon>-->
<!--      </v-btn>-->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "EventDates",
  props: {
    title: {
      type: String,
      required: true
    },
    timezoneIdValue: {
      type: String,
      required: false
    }
  },
  computed: {
    startDateTimeLabel () {
      return this.$i18n.t('event-starts-date-time');
    },

    startDateTimeHint () {
      return this.$i18n.t('this-is-when-the-event-starts-in-date-time');
    },

    endDateTimeLabel () {
      return this.$i18n.t('event-ends-date-time');
    },

    endDateTimeHint () {
      return this.$i18n.t('this-is-when-the-event-ends-in-date-time');
    },
  },
  data: () => ({
    valid: true,

    startDateTime: new Date(),
    endDateTime: new Date(),
    timezoneId: undefined,

    // startDateRules: [],
    // startTimeRules: [],
    // endDateTimeRules: [],
  }),
  watch: {
    timezoneIdValue: {
      immediate: true,
      handler(){
        this.timezoneId = this.timezoneIdValue
      }
    }
  },
  methods: {
    clearStartDateTime(){
      this.startDateTime = new Date()
    },

    changeStartDateTime(datetime){
      this.startDateTime = datetime
    },

    clearEndDateTime(){
      this.endDateTime = new Date()
    },

    changeEndDateTime(datetime){
      this.endDateTime = datetime
    },

    // addStartDateRules(){
    //   this.startDateRules = [
    //     v => !!v || 'event-starts date is required',
    //     v => this.startDateTime  ?  !(this.startDateTime < new Date().toISOString()) || 'event-starts date and time need to be in the future': true,
    //     v => this.endDateTime  ? ( this.startDateTime <= this.endDateTime ) || 'event-starts date and time need to be less than the event-ends date and time': true,
    //   ]
    // },
    //
    // addStartTimeRules(){
    //   this.startTimeRules = [
    //     v => !!v || 'event-starts time is required',
    //     v => this.endDateTime ? ( this.startDateTime <= this.endDateTime ) || 'event-starts date and time need to be less than the event-ends date and time': true,
    //   ]
    // },
    //
    // addEndDateTimeRules(){
    //   this.endDateTimeRules = [
    //     v => !!v || 'event-ends date is required',
    //     v => this.startDateTime !== null ? !( this.endDateTime <= this.startDateTime ) || 'event-ends date and time need to be greater than event-starts date and time': true,
    //   ]
    // },

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
          startDateTime: this.startDateTime,
          endDateTime: this.endDateTime,
          timezoneId: this.timezoneId
        });
      })
    },
    cancel () {
      this.$emit('cancel');
      this.$emit('reset');
    },
    back () {
      this.$emit('back');
    },

    change (timezoneId) {
      this.timezoneId = timezoneId;
    },
  }
}
</script>
