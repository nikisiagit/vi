<template>
  <v-card>
    <v-toolbar flat>
      <v-icon left>mdi-email</v-icon>
      <v-toolbar-title>{{ $t('venue-email-settings') }}</v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="settings.fromAddress"
                          label="fromAddressLabel"
                          hint="fromAddressHint"
                          persistent-hint
                          :disabled="true"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="settings.fromName"
                          label="fromNameLabel"
                          hint="fromNameHint"
                          persistent-hint
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            Email header
  <!--          <apps-admin-resource-nav-list-item-->
  <!--            :resource-id="settings.emailHeader.resourceId"-->
  <!--          />-->
            <apps-admin-resources-create-resource
                          v-if="!settings.emailHeader.resourceId"
                          item-id="email-header"
                          @resource-created="updateEmailHeader"
                          :display-as-card="false"
            />
            <apps-admin-resources-select
                          v-if="settings.emailHeader.resourceId"
                          :value="settings.emailHeader.resourceId"
                          @change="updateEmailHeader"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            Email Footer
            <pro-text-editor v-model="settings.emailFooter"
                          label="emailFooterLabel"
                          hint="emailFooterHint"
                          :tags="[]"
                          persistent-hint
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="px-4">
            <v-text-field v-model="settings.emailBackground"
                          label="emailBackgroundLabel"
                          hint="emailBackgroundHint"
                          persistent-hint
                          :rules="emailBackgroundRules"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col class="d-flex px-4">
          <v-spacer />
          <v-btn @click="submit" >
            {{ $t('submit')}}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Edit",
  props: { },
  data: () => ({
    settings: {
      fromAddress: "",
      fromName: "",
      emailHeader: { resourceId: "" },
      emailFooter: "",
      emailBackground: "",
    },
    valid: true,
    emailBackgroundRules: [
      v => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(v) || "Please enter a valid color."
    ]
  }),
  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },
  computed: {
    ...mapGetters({
      venueLoaded: 'venue/loaded',
      venueLoading: 'venue/loading',
      venue: 'venue/venue',
      emailSettingsWithPartition: 'apps/admin/email/emailSettingsWithPartition'
    }),

    // fromAddressLabel () {
    //
    // }
  },
  methods: {
    ...mapActions({
      venueLoad: 'apps/admin/venue/load',
      load: 'apps/admin/email/load',
      updateEmailSettings: 'apps/admin/email/updateEmailSettings',
      loadEmailSettingsWithPartition: 'apps/admin/email/loadEmailSettingsWithPartition'
    }),

    async load() {
      console.log("email load");

      console.log("venueLoaded loading", this.venueLoaded, this.venueLoading);

      if (!this.venueLoaded) {
        console.log("load venue");
        await this.venueLoad();
      }
      console.log("this.venue", this.venue);
      const partition = this.venue.partition;

      await this.loadEmailSettingsWithPartition(partition);
      this.settings = this.emailSettingsWithPartition(partition);
      console.log("this.settings", this.settings);
    },

    async submit () {
      if (! this.$refs.form.validate()) {
        this.valid = false;
        return;
      }

      this.valid = true;

      try {
        if (!this.venueLoaded && !this.venueLoading) {
          await this.venueLoad();
        }
        const partition = this.venue.partition;
        const emailSettingsToUpdate = {...this.settings, partition};
        const updatingEmailSettings = await this.updateEmailSettings(emailSettingsToUpdate);
        const {executionArn, startDate} = updatingEmailSettings;

        this.executionArn = executionArn;
        this.startDate = startDate;
      } catch (error) {
        console.log(error);
      }
    },

    updateEmailHeader (resourceId) {
      this.settings.emailHeader = {
        resourceId: resourceId
      };
    }
  }
}
</script>
