<!--
Event Avatar
-->
<template>
  <v-avatar color="primary">
    <v-icon>mdi-calendar</v-icon>
  </v-avatar>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Avatar",

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
    },

    themeId: {
      immediate: true,
      handler () {
        if (! this.loaded && ! this.loading) {
          this.loadTheme();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
      loadThemeWithThemeId: 'apps/admin/themes/loadThemeWithThemeId',
    }),

    async load () {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    async loadTheme () {
      return await (this.themeId) ? this.loadThemeWithThemeId(this.themeId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      eventWithEventId: 'apps/admin/events/eventWithEventId',
      themeWithThemeId: 'apps/admin/events/eventWithEventId',
    }),

    event () {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    themeId () {
      return this.event?.themeId;
    },

    theme () {
      return (this.themeId) ? this.themeWithThemeId(this.themeId): undefined;
    },

  },
}
</script>
