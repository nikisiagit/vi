<!--
Registration NavList Item
Render a ListItem view of the Registration wrapped in a link to the RegistrationPage.
-->
<template>
  <v-list-item two-line :to="{name: 'apps-admin-registrations-registrationId', params: {registrationId: this.registrationId}}">
    <v-list-item-content>
      <v-list-item-title>{{ $t(title) }}</v-list-item-title>
      <v-list-item-subtitle>{{ $t(status) }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon nuxt :to="{name: 'apps-admin-registrations-registrationId', params: {registrationId: this.registrationId}}">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavListItem",
  props: {
    registrationId: {
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
    registrationId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadRegistrationWithRegistrationId: 'apps/admin/registrations/loadRegistrationWithRegistrationId',
    }),

    async load () {
      return await (this.registrationId) ? this.loadRegistrationWithRegistrationId(this.registrationId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      registrationWithRegistrationId: 'apps/admin/registrations/registrationWithRegistrationId',
    }),

    registration () {
      return (this.registrationId) ? this.registrationWithRegistrationId(this.registrationId) : undefined;
    },

    name () {
      return (this.registration) ? this.registration.name : undefined;
    },

    title () {
      return this.registration?.title || this.registration?.titleId
    },

    status () {
      return this.registration?.status ? this.$t("open") : this.$t("closed");
    },

    startDate () {
      return this.registration?.startDateTime
    },

    endDate () {
      return this.registration?.endDateTime
    },

    loaded () {
      return (this.registration) ? this.registration.loaded : false;
    },

    loading () {
      return (this.registration) ? this.registration.loading : false;
    },

    error () {
      return (this.registration) ? this.registration.error : undefined;
    },
  },
}
</script>
