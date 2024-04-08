<!--
Venue App (Admin) - Event Page

The Event Page is used by Admins to manage the Event.
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <apps-admin-event-details :event-id="eventId" @update-event-property="openUpdateEventDialog"/>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <apps-admin-event-delete-event :event-id="eventId" />
      </v-col>
    </v-row>

<!--    <v-row>-->
<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-update-address-id :event-id="eventId" />-->
<!--      </v-col>-->

<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-update-timezone-id :event-id="eventId" />-->
<!--      </v-col>-->

<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-update-dates :event-id="eventId" />-->
<!--      </v-col>-->

<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-update-title :event-id="eventId" />-->
<!--      </v-col>-->

<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-update-description :event-id="eventId" />-->
<!--      </v-col>-->

<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-update-tag-ids :event-id="eventId" />-->
<!--      </v-col>-->

<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-update-theme-id :event-id="eventId" />-->
<!--      </v-col>-->

<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-update-currency-id :event-id="eventId" />-->
<!--      </v-col>-->

<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-update-language-id :event-id="eventId" />-->
<!--      </v-col>-->

<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-update-format :event-id="eventId" />-->
<!--      </v-col>-->
<!--    </v-row>-->

<!--    <v-row>-->
<!--      <v-col cols="12" md="4">-->
<!--        <apps-admin-event-debug :event-id="eventId" />-->
<!--      </v-col>-->
<!--    </v-row>-->

    <!-- Update Event Dialog -->
    <v-dialog
      v-model="updateEventDialog"
      width="800px"
    >

      <template v-if="updateEventDialog && updateEventProperty === 'title'">
        <apps-admin-event-update-title
          :event-id="eventId"
          @close="onClose"
        />
      </template>

      <template v-if="updateEventDialog && updateEventProperty === 'description'">
        <apps-admin-event-update-description
          :event-id="eventId"
          @close="onClose"
        />
      </template>

      <template v-if="updateEventDialog && updateEventProperty === 'tags'">
        <apps-admin-event-update-tag-ids
          :event-id="eventId"
          @close="onClose"
        />
      </template>

      <template v-if="updateEventDialog && updateEventProperty === 'theme'">
        <apps-admin-event-update-theme-id
          :event-id="eventId"
          @close="onClose"
        />
      </template>

      <template v-if="updateEventDialog && updateEventProperty === 'event-dates'">
        <apps-admin-event-update-dates
          :event-id="eventId"
          @close="onClose"
        />
      </template>

      <template v-if="updateEventDialog &&  updateEventProperty === 'currency'">
        <apps-admin-event-update-currency-id
          :event-id="eventId"
          @close="onClose"
        />
      </template>

      <template v-if="updateEventDialog && updateEventProperty === 'format'">
        <apps-admin-event-update-format
          :event-id="eventId"
          @close="onClose"
        />
      </template>

      <template v-if="updateEventDialog &&  updateEventProperty === 'language'">
        <apps-admin-event-update-language-id
          :event-id="eventId"
          @close="onClose"
        />
      </template>

      <template v-if="updateEventDialog &&  updateEventProperty === 'timezone'">
        <apps-admin-event-update-timezone-id
          :event-id="eventId"
          @close="onClose"
        />
      </template>

      <template v-if="updateEventDialog &&  updateEventProperty === 'address'">
        <apps-admin-event-update-address-id
          :event-id="eventId"
          @close="onClose"
        />
      </template>

    </v-dialog>

  </v-container>
</template>

<script>
export default {
  name: "Event",
  layout: 'admin',
  data(){
    return {
      updateEventDialog: false,
      updateEventProperty: ''
    }

  },

  computed: {
    eventId () {
      return this.$route.params.eventId || undefined;
    },
  },
  methods: {
    openUpdateEventDialog(property){
      this.updateEventProperty = property
      this.updateEventDialog = true;
    },

    onClose(){
      this.updateEventDialog = false;
      this.updateEventProperty = ''

    }

  }
}
</script>
