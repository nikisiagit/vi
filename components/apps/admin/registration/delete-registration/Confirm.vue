<template>
  <v-card rounded elevation="4">
    <v-card-title class="primary">
      <v-icon left>mdi-form-select</v-icon>
      {{$t("admin-delete-registration-title")}}
    </v-card-title>

    <v-card-subtitle class="primary">
      {{$t("admin-delete-registration-subtitle")}}
    </v-card-subtitle>

    <v-card-text>
      <v-container v-if="!deleting">
        <v-row>
          <v-col>
            {{$t("admin-delete-registration-confirm-text")}}
          </v-col>
        </v-row>
      </v-container>

      <!-- DELETING REGISTRATION -->
      <v-container v-if="deleting" fluid>
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            {{ $t('admin-deleting-registration') }}
          </v-col>
          <v-col cols="6">
            <v-progress-linear indeterminate rounded height="6" />
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn text @click="$emit('close')">
        {{$t("cancel")}}
      </v-btn>
      <v-btn plain large class="primary" @click="deleteConfirmed">
        {{$t("confirm")}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name:"Confirm",
  props: {
    registrationId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    executionArn: undefined,
  }),

  watch: {
    deleted() {
      this.$router.push({name: 'apps-admin-registrations'});
   }
  },

  methods: {
    ...mapActions({
      deleteRegistration: 'apps/admin/registrations/deleteRegistration',
    }),

    async deleteConfirmed () {
      const {executionArn} = await this.deleteRegistration(this.registrationId);
      this.executionArn = executionArn;
    },
  },
  computed: {
    ...mapGetters({
      deletingRegistrationWithExecutionArn: 'apps/admin/registrations/deletingRegistrationWithExecutionArn',
    }),

    deletingRegistration() {
      return (this.executionArn) ? this.deletingRegistrationWithExecutionArn(this.executionArn) : undefined;
    },

    deleting() {
      return this.deletingRegistration?.deleting;
    },

    deleted() {
      return this.deletingRegistration?.deleted
    },
  }
}

</script>
