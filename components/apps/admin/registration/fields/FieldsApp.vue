<template>
  <v-card rounded>
   <apps-admin-registration-fields-title :registration-id="registrationId" />

    <apps-admin-registration-fields-list
      v-if="$vuetify.breakpoint.mobile"
      :fields="fields" />

    <apps-admin-registration-fields-table
         v-else
         :fields="fields"
         :headers="headers"/>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "FieldsApp",
  props: {
    registrationId: {
      type: String,
      required: true,
    },
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      await this.load(this.registrationId);
    }
  },
  methods: {
    ...mapActions({
      load: 'apps/admin/registrations/fields/load',
      reload: 'apps/admin/registrations/fields/reload',
    }),
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/registrations/fields/loading',
      loaded: 'apps/admin/registrations/fields/loaded',
      fields: 'apps/admin/registrations/fields/fields',
    }),

  },

  data: () => ({
    headers: [
      {
        text: 'Field Name',
        align: 'start',
        value: 'name',
        sortable: true,
        width: '45%'
      },
      {
        text: 'Field Type',
        align: 'start',
        value: 'fieldType',
        sortable: true,
        width: '25%'
      },
      {
        text: 'Required',
        align: 'start',
        value: 'required',
        sortable: true,
        width: '15%'
      },
      {
        text: 'Actions',
        align: 'start',
        value: 'actions',
        sortable: false,
        width: '15%'
      }
    ],
  }),
}
</script>
