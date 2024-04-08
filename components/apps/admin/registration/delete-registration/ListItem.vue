<template>
  <v-card rounded>
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ $t('delete-registration-title') }}</v-list-item-title>
        <v-list-item-subtitle> {{ $t('delete-registration-subtitle') }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn v-if="$vuetify.breakpoint.mobile" icon color="error" @click="openDialog">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn v-else class="error" @click="openDialog">
          {{ $t('delete') }}
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <!-- Dialog component -->
    <v-dialog v-model="dialog" max-width="800px">
     <apps-admin-registration-delete-registration-confirm
       :registration-id="registrationId"
       @close="onClose"
     />
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    registrationId: {
      type: String,
      required: true,
    }
  },
  data: () => ({
    dialog: false,
  }),

  methods: {
    openDialog () {
      this.dialog = true;
    },
    onClose(){
      this.dialog = false;
    }
  }
}
</script>
