<template>
  <v-list>
    <apps-admin-event-nav-list-item
      v-for="event in events"
      :key="event.eventId"
      :event-id="event.eventId"
    />
  </v-list>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavList",

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/events/load',
    }),
  },

  computed: {
    ...mapGetters({
      events: 'apps/admin/events/events',
      loading: 'apps/admin/events/loading',
      loaded: 'apps/admin/events/loaded',
    })
  }
}
</script>
