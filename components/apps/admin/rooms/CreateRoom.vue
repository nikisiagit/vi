<template>
  <!-- Create room Card -->
  <v-card rounded elevation="4">

   <v-card color="primary" dark :loading="loading">
     <template slot="progress">
       <v-progress-linear color="primary" height="4" indeterminate />
     </template>

     <v-card-title>
       <v-icon left>mdi-human-male-board</v-icon>
       {{ $t('create-room-title') }}
     </v-card-title>

     <v-card-subtitle>
       {{ $t('create-room-subtitle') }}

       <!--        <pre>-->
       <!--          {{ room }}-->
       <!--        </pre>-->

     </v-card-subtitle>
   </v-card>

    <template>
      <v-stepper v-model="createRoomSteps" v-if="! creatingRoom">
        <v-stepper-header>
          <v-stepper-step :complete="createRoomSteps > 1" step="1">Room Details</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="createRoomSteps > 2" step="2">Room Features</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="createRoomSteps > 3" step="3">Room Configuration</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="createRoomSteps > 4" step="4">Review</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">

            <!-- RoomName step -->
            <apps-admin-rooms-steps-room-name
              ref="stepName"
              @submitted="roomNameSubmitted"
              @cancel="cancel"
            />

          </v-stepper-content>

          <v-stepper-content step="2">
            <!-- RoomType step -->
            <apps-admin-rooms-steps-room-type
              ref="stepType"
              @submitted="roomTypeSubmitted"
              @cancel="cancel"
              @back="back"
            />
            <!--/ RoomType step -->
          </v-stepper-content>

          <v-stepper-content step="3">

            <!-- RoomConfig step -->
            <apps-admin-rooms-steps-room-config
              ref="stepConfig"
              @submitted="roomConfigSubmitted"
              @cancel="cancel"
              @back="back"
            />
            <!--/ RoomConfig step -->
          </v-stepper-content>

          <v-stepper-content step="4">

            <!-- RoomReview step -->
            <!-- review step -->
            <apps-admin-rooms-steps-room-review
              ref="stepReview"
              @submitted="submitForm"
              @cancel="cancel"
              @back="back"
              :room = "room"
              :creating = "creating"
            />
            <!--/ review step -->
            <!--/ RoomReview step -->
          </v-stepper-content>



        </v-stepper-items>
      </v-stepper>
    </template>



    <!-- creating room step -->
    <v-card v-if="showCreatingStep">

      <!-- spinner -->

      <!-- error -->

      <!-- createdRoom -->
      <v-card-text v-if="creatingRoom.creating">
        <v-container fluid>
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              {{ $t('creating-room') }} {{ room.name }}
            </v-col>
            <v-col cols="6">
              <v-progress-linear indeterminate rounded height="6" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-text v-if="creatingRoom.created">
        <v-container fluid>
          <v-row>
            <v-col>
              <v-list two-line>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ creatingRoom.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('room-name') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ creatingRoom.description && creatingRoom.description.text }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('room-description') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>


      <v-card-actions>
        <v-btn plain large rounded @click="cancel">{{ $t('close') }}</v-btn>
        <v-btn text large rounded @click="reset">{{ $t('create-another-room') }}</v-btn>

        <template v-if="creatingRoom.room">
          <v-spacer />
          <v-btn large class="pa-4" rounded :to="{name: 'rooms-roomId', params: {'roomId': creatingRoom.room.roomId}}">
            {{ $t('view-room') }}

            <v-spacer></v-spacer>
            <v-icon small >
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </template>

      </v-card-actions>

    </v-card>
    <!--/ creating roomId step -->

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import dayjs from "dayjs";

export default {
  name: "CreateRoom",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    createRoomSteps: 1,
    currentStep: 1,
    numberOfSteps: 4,

    room: {
      name: '',
      itemId: '', // i.e. venue:eventheads

      title: {
        text: '',
        languageId: '',
      },

      description: {
        text: '',
        languageId: '',
      },

      //
      // startDate: '',
      // endDate: '',

      chat: false,
      daily: false,

      dailyProperties: {} // dailyConfig
    },

    // loading: false,
    creating: false,

    executionArn: undefined,
  }),

  computed: {
    ...mapGetters({
      creatingRoomWithExecutionArn: 'apps/admin/rooms/creatingRoomWithExecutionArn',
      venue: 'apps/admin/venue/venue',
      loading: 'apps/admin/venue/loading',
      loaded: 'apps/admin/venue/loaded',
    }),

    /**
     * Return the ID of the Venue.
     *
     * @return {*|undefined}
     */
    venueId() {
      return (this.venue) ? this.venue.venueId : undefined;
    },

    progressBar(){
      return this.currentStep / this.numberOfSteps * 100
    },


    showRoomNameStep() {
      return this.currentStep === 1
    },

    showRoomTypeStep() {
      return this.currentStep === 2
    },

    showRoomConfigStep() {
      return this.currentStep === 3
    },

    showReviewStep() {
      return this.currentStep === 4
    },

    showCreatingStep() {
      return this.createRoomSteps === 5
    },

    creatingRoom () {
       return (this.executionArn) ? this.creatingRoomWithExecutionArn(this.executionArn) : undefined;
    },
  },

  methods: {
    ...mapActions({
      createRoom: 'apps/admin/rooms/createRoom',

      load: 'apps/admin/venue/load',
    }),

    formatDate(date, toMonth, toDay) {
      if(!date) return

      if (toMonth) return dayjs(date).format("MM");
      else if (toDay) return dayjs(date).format("DD");

      return dayjs(date).format("D MMMM, YYYY | hh:mma");
    },

    reset () {
      this.currentStep = 1;
      this.room = {
        name: '',
        itemId: '', // i.e. venue:eventheads

        title: {
          text: '',
          languageId: '',
        },

        description: {
          text: '',
          languageId: '',
        },

        //
        // startDate: '',
        // endDate: '',

        chat: false,
        daily: false,

        dailyProperties: {} // dailyConfig
      }

      this.$refs.stepName.reset();
      this.$refs.stepType.reset();
      this.$refs.stepConfig.reset();
    },

    cancel () {
      this.$emit('close');
      this.reset();
    },

    back(){
      // back to previous step
      if (this.createRoomSteps !== 1)
        this.createRoomSteps = this.createRoomSteps -1
    },

    roomNameSubmitted ({ name, title, description, titleLanguageId, descriptionLanguageId }) {
      this.room = {
        ...this.room,
        itemId: this.venueId,
        name,
        title: {
          text: title,
          languageId: titleLanguageId
        },
      }

      if (description && description !== '') {
        this.room.description = {
          text: description,
          languageId: descriptionLanguageId
        }
      }

      this.createRoomSteps = 2
    },

    roomTypeSubmitted ({ chat, daily }) {
      this.room = {
        ...this.room,
        chat,
        daily,
      }

      if (! daily)
        this.createRoomSteps = 4
      else
        this.createRoomSteps = 3
    },

    roomConfigSubmitted ({  dailyProperties }) {
      this.room = {
        ...this.room,
        dailyProperties: {
          ...dailyProperties.basicProperties,
          ...dailyProperties.advancedProperties
        }, // dailyConfig


      }

      this.createRoomSteps = 4
    },


    async submitForm () {
      console.log("submitted")
      console.log(this.room)

      const roomToCreate = {
        ...this.room,
      };

      const creatingRoom = await this.createRoom(roomToCreate);

      if (creatingRoom) {
        const {executionArn, startDate} = creatingRoom;

        //@todo: handle errors
        //@todo: add snackbar to show messages success/failure

        this.createRoomSteps = 5;
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
