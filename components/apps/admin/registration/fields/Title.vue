<!--
Venue App (Admin) Fields - Title | A smart component that renders the Fields Title.
-->
<template>
  <v-card rounded>
    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-format-list-bulleted</v-icon>
      {{ $t('admin-fields-title') }}
      <v-spacer />
      <!-- field types dropdown -->
      <apps-admin-registration-fields-field-types  :registrationId="registrationId"/>
    </v-card-title>

    <!-- subtitle -->
    <v-card-subtitle>
      {{ $t('admin-fields-subtitle')}}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Title",
  props: {
    registrationId: {
      type: String,
      required: true,
    },
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/registrations/fields/load',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/registrations/fields/loading',
      loaded: 'apps/admin/registrations/fields/loaded',
    })
  },
}
</script>
