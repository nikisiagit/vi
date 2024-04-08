<template>
  <v-card rounded :loading="loading">
    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-calendar</v-icon>
      {{ $t('delete-event') }}
    </v-card-title>

    <v-list two-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('delete-event') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('delete-event') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="error" @click="openConfirmationDialog">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

    </v-list>

    <!-- ConfirmationDialog component -->
    <v-dialog v-model="confirmationDialog" max-width="390">

      <v-card>
        <v-card-title>{{ $t('admin-event-delete-confirmation') }}</v-card-title>

        <v-card-text>
          {{ $t('admin-event-delete-confirmation-text') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="confirmationDialog = false">{{ $t('Cancel') }}</v-btn>
          <v-btn color="error" :loading="removing" :disabled="removing" text @click="confirm">
            {{ $t('Delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DeleteEvent",
  props: {
    eventId: {
      type: String,
      required: true,
    }
  },
  data: () => ({
    confirmationDialog: false,
    executionArn: undefined,
  }),

  computed: {
    ...mapGetters({
      removingEventWithExecutionArn: 'apps/admin/events/removingEventWithExecutionArn',
    }),

    removingEvent () {
      return (this.executionArn) ? this.removingEventWithExecutionArn(this.executionArn) : undefined;
    },

    removing () {
      return this.removingEvent?.removing;
    },

    removed () {
      return this.removingEvent?.removed;
    },

  },

  watch: {
    removed(){
      this.confirmationDialog = false;

      this.$router.push({name: 'apps-admin-events'});
    }
  },

  methods: {
    ...mapActions({
      removeEvent: 'apps/admin/events/removeEvent',
    }),

    async confirm () {
      const {executionArn} = await this.removeEvent(this.eventId);

      this.executionArn = executionArn
    },

    openConfirmationDialog () {
      this.confirmationDialog = true;
    },
  },
}
</script>
