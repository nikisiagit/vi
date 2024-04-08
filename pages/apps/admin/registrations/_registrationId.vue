<!--Venue App (Admin) - Registration Page The Registration Page is used by Admins to manage the Registration.-->
<template>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-sheet width="100%"
                   height="100%"
                   elevation="1"
                   rounded="lg"
                   :color="$vuetify.theme.dark ? '#00000033': '#FFFFFF33'">
            <v-container fluid class="fill-height">

              <v-row>
                <v-col>
                  <apps-admin-registration-title :title="title" :description="description" :loading="loading"/>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <apps-admin-registration-tabs :registration-id="registrationId" />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <apps-admin-registration-delete-registration-list-item :registration-id="registrationId" />
                </v-col>
              </v-row>

            </v-container>
          </v-sheet>
        </v-col>
      </v-row>

    </v-container>
  </template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Registration",

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
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

    registrationId () {
      return this.$route.params.registrationId || undefined;
    },

    registration() {
      return (this.registrationId) ? this.registrationWithRegistrationId(this.registrationId) : undefined;
    },

    name() {
      return this.registration?.name
    },

    createdBy() {
      return this.registration?.createdBy;
    },

    createdAt() {
      return this.registration?.createdAt;
    },

    loaded() {
      return (this.registration) ? this.registration.loaded : false;
    },

    loading() {
      return (this.registration) ? this.registration.loading : false;
    },

    error() {
      return (this.registration) ? this.registration.error : undefined;
    },

    title() {
      return this.registration?.title || this.registration?.titleId;
    },

    description() {
      return this.registration?.description || this.registration?.descriptionId;
    },
  },
}
</script>
