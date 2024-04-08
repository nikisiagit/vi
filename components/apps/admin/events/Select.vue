<template>
  <v-select
    v-model="eventId"
    :loading="loading"
    :items="events"
    item-text="name"
    item-value="eventId"
    :label="$attrs['label'] ? $attrs['label']: eventLabel"
    :hint="$attrs['hint'] ? $attrs['hint']: eventHint"
    clearable
    required
    persistent-hint
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Select",

  props: {
    value: {
      type: String,
      required: false,
    }
  },

  async created () {
    if (!this.loaded && ! this.loading) {
      await this.load();
    }
  },

  data: () => ({
    eventId: undefined,
  }),

  methods: {
    ...mapActions({
      load: 'apps/admin/events/load',
    })
  },

  computed: {
    ...mapGetters({
      loaded: 'apps/admin/events/loaded',
      loading: 'apps/admin/events/loading',
      events: 'apps/admin/events/events',
    }),

    eventLabel () {
      return this.$i18n.t('event-label');
    },

    eventHint () {
      return this.$i18n.t('event-hint');
    }
  },
}
</script>
