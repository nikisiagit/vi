<!--
Event NavList Item
Render a ListItem view of the Event wrapped in a link to the EventPage.
-->
<template>
  <v-list-item two-line :to="{name: 'apps-admin-events-eventId', params: {eventId: eventId}}">

    <v-list-item-avatar>
      <apps-admin-event-avatar :event-id="eventId" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ $t(titleId) }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t('event') }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",

  props: {
    eventId: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    eventId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
    }),

    async load () {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      eventWithEventId: 'apps/admin/events/eventWithEventId',
    }),

    event () {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    name () {
      return (this.event) ? this.event.name : undefined;
    },

    titleId () {
      return this.event?.titleId
    },

    descriptionId () {
      return this.event?.descriptionId
    },

    startDate () {
      return this.event?.startDateTime
    },

    endDate () {
      return this.event?.endDateTime
    },

    loaded () {
      return (this.event) ? this.event.loaded : false;
    },

    loading () {
      return (this.event) ? this.event.loading : false;
    },

    error () {
      return (this.event) ? this.event.error : undefined;
    },
  },
}
</script>
