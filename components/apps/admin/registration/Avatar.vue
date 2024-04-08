<!--
Registration Avatar
-->
<template>
  <v-avatar color="primary">
    <v-icon>mdi-form-select</v-icon>
  </v-avatar>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Avatar",

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
      loadRegistrationWithRegistrationId: 'apps/admin/registrations/loadRegistrationWithRegistrationId',
      loadThemeWithThemeId: 'apps/admin/themes/loadThemeWithThemeId',
    }),

    async load () {
      return await (this.registrationId) ? this.loadRegistrationWithRegistrationId(this.registrationId) : undefined;
    },

    async loadTheme () {
      return await (this.themeId) ? this.loadThemeWithThemeId(this.themeId) : undefined;
    },
  },

  computed: {
    ...mapGetters({
      registrationWithRegistrationId: 'apps/admin/registrations/registrationWithRegistrationId',
      themeWithThemeId: 'apps/admin/registrations/registrationWithRegistrationId',
    }),

    registration () {
      return (this.registrationId) ? this.registrationWithRegistrationId(this.registrationId) : undefined;
    },

    themeId () {
      return this.registration?.themeId;
    },

    theme () {
      return (this.themeId) ? this.themeWithThemeId(this.themeId): undefined;
    },

  },
}
</script>
