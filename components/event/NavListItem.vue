<template>
  <v-list-item link nuxt exact :to="{name: 'events-eventId', params: {eventId: eventId}}">
    <v-list-item-avatar>
      <event-avatar :event-id="eventId" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ titleId }}</v-list-item-title>
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
    },
  },

  async created () {
    if (this.initialised) {
      if (! this.loaded && ! this.loading) {
        return await this.load();
      }
    }
  },

  watch: {
    initialised: {
      handler () {
        if (this.initialised) {
          if (! this.loaded && ! this.loading) {
            this.load();
          }
        }
      }
    }
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'events/loadEventWithEventId',
    }),

    async load () {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    }
  },

  computed: {
    ...mapGetters({
      initialised: 'events/initialised',
      eventWithEventId: 'events/eventWithEventId',
    }),

    /**
     * The Event.
     *
     * @returns {*|undefined}
     */
    event() {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    /**
     * @returns {*|boolean}
     */
    loaded () {
      return (this.event) ? this.event.loaded : false;
    },

    /**
     * @returns {*|boolean}
     */
    loading () {
      return (this.event) ? this.event.loading : false;
    },

    /**
     * The titleId.
     *
     * @returns {*|undefined}
     */
    titleId() {
      return (this.event) ? this.event.titleId : undefined;
    },
  }
}
</script>
