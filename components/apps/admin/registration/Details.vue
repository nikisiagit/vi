<!--
Admin Registration Details

A smart component that renders the details of the specified Registration.
-->
<template>
  <v-card rounded :loading="loading">
    <v-card-title>
      <v-icon left>mdi-eye</v-icon>
      {{ $t('admin-registrations-title')}}
    </v-card-title>

    <v-card-subtitle>
      {{ $t('admin-registrations-subtitle')}}
    </v-card-subtitle>

    <v-list two-line>
      <!-- name -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-registration-name') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('name')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- title -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-registration-title') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('title')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <!-- description -->
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ description }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('admin-registration-description') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="primary" @click="onEdit('description')">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <!-- status -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ registrationStatus }}</v-list-item-title>
        <v-list-item-subtitle>{{ $t('admin-registration-status') }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-switch
          v-model="registrationStatusLocal"
          true-value="open"
          false-value="closed"
          color="primary"
          @change="submit"
        />
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Details",
  props: {
    registrationId: {
      type: String,
      required: true,
    },
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    registrationStatus: {
      immediate: true,
      handler () {
        this.registrationStatusLocal = this.registrationStatus;
      },
    },
  },

  methods: {
    ...mapActions({
      loadRegistrationWithRegistrationId: 'apps/admin/registrations/loadRegistrationWithRegistrationId',
      updateRegistration: 'apps/admin/registrations/updateRegistration',
    }),

    async load () {
      return await (this.registrationId) ? this.loadRegistrationWithRegistrationId(this.registrationId) : undefined;
    },

    async reload () {
      return await this.load();
    },

    onEdit(property){
      this.$emit('update-registration-property', property)
    },
    async submit () {
      try {
        const registrationUpdate = {
          registrationId: this.registrationId,
          registrationStatus: this.registrationStatusLocal,
        };
        await this.updateRegistration(registrationUpdate);
      } catch (error) {
        console.log("Updating Registration failed");
      }
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
      return this.registration?.name
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

    title () {
      return this.registration?.title || this.registration?.titleId;
    },

    description () {
      return this.registration?.description || this.registration?.descriptionId;
    },
    registrationStatus() {
      return this.registration?.registrationStatus || false
    }
  },

  data: () => ({
    showHelp: true,
    updateNameDialog: false,
    updateTitleDialog: false,
    updateDescriptionDialog: false,
    valid: true,
    registrationStatusLocal: false,
  }),
}
</script>

