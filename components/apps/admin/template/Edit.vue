<template>
  <v-card>
    <v-toolbar flat>
      <v-icon left>mdi-email</v-icon>
      <v-toolbar-title>{{ templateId }}</v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-form v-model="valid" ref="form"></v-form>
      <v-row>
        <v-col class="px-4">
          <v-text-field v-model="template.fromAddress"
                        label="fromAddressLabel"
                        hint="fromAddressHint"
                        persistent-hint
                        :disabled="true"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-4">
          <v-text-field v-model="template.fromName"
                        label="fromNameLabel"
                        hint="fromNameHint"
                        persistent-hint
                        :disabled="true"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-4">
          <v-text-field v-model="template.emailSubject"
                        label="emailSubjectLabel"
                        hint="emailSubjectHint"
                        persistent-hint
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-4">
          <v-text-field v-model="template.audience"
                    label="audienceLabel"
                    hint="audienceHint"
                    persistent-hint
                    :disabled="true"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-4">
          <v-text-field v-model="template.trigger"
                    label="triggerLabel"
                    hint="triggerHint"
                    persistent-hint
                    :disabled="true"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-4">
          <v-alert type="error" v-if="!validTags">The template content must contain "code" tag.</v-alert>
          <pro-text-editor v-model="template.content" :tags="tagsForTrigger" />
        </v-col>
        <v-col>
          <img :src="emailHeaderUrl" :style="{width: '100%', 'max-height': '200px'}" />
          <span v-html="template.content"></span>
          <span v-html="emailFooter" />
        </v-col>
      </v-row>


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
import dayjs from "dayjs";

export default {
  name: "Edit",
  props: {
    templateId: {
      type: String,
      required: true,
    },
  },

  // watch: {
  //   template(val) {
  //     if (this.validateTags()) {
  //       this.validTags = true;
  //     }
  //   }
  // },

  data: () => ({
    currentStep: 1,
    debug: true,

    // fromAddress: undefined,
    // fromName: undefined,
    // emailSubject: undefined,
    // audience: undefined,
    // trigger: undefined,
    // content: undefined,

    template: {
      fromAddress: '',
      fromName: '',
      emailSubject: '',
      audience: '',
      trigger: '',
      content: ''
    },

    tags: {
      signUp: [
        {
          name: 'code',
          label: 'Email verification code'
        },
        {
          name: 'venue_name',
          label: 'Name of the venue'
        },
        {
          name: 'profile_name',
          label: 'Full user name'
        },
        {
          name: 'event_name',
          label: "Name of the event"
        },
        {
          name: 'venue_url',
          label: "Link to the venue"
        },
        {
          name: 'setup_profile_url',
          label: "Link to the page to setup profile"
        }
      ],
      forgotPassword: [
        {
          name: 'code',
          label: 'Email verification code'
        },
        {
          name: 'venue_name',
          label: 'Name of the venue'
        },
        {
          name: 'profile_name',
          label: 'Full user name'
        },
        {
          name: 'event_name',
          label: "Name of the event"
        },
        {
          name: 'venue_url',
          label: "Link to the venue"
        },
        {
          name: 'setup_profile_url',
          label: "Link to the page to setup profile"
        }
      ]
    },

    valid: true,
    validTags: true,

    executionArn: undefined,
    startDate: undefined,
  }),

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  async updated () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadTemplateWithTemplateId: 'apps/admin/templates/loadTemplateWithTemplateId',
      updateTemplate: 'apps/admin/templates/updateTemplate',
      loadVenue: 'apps/admin/venue/load',
      loadEmailSettingsWithPartition: 'apps/admin/email/loadEmailSettingsWithPartition',
      loadResourceWithResourceId: 'apps/admin/resources/loadResourceWithResourceId',
      loadResourceUrlWithResourceId: 'apps/admin/resources/loadResourceUrlWithResourceId'
    }),

    cancel () {
      this.reset();
      this.$emit('close');
    },

    updateContent (content) {
      console.log("updateContent content", content);

      this.template.content = content;
    },

    validateTags()
    {
      return /{{\s*code\s*}}/.test(this.template.content);
    },

    async submit () {
      this.validTags = this.validateTags();

      if (! this.$refs.form.validate() || !this.validTags) {
        this.valid = false;
        return;
      }

      this.valid = true;
      this.validTags = true;

      try {
        const templateToUpdate = {...this.template, templateId: this.templateId};
        const updatingTemplate = await this.updateTemplate(templateToUpdate);
        const {executionArn, startDate} = updatingTemplate;

        this.executionArn = executionArn;
        this.startDate = startDate;

      } catch (error) {
        console.log(error);
      }
    },

    async load() {
      if (!this.templateId) {
        return;
      }
      await this.loadTemplateWithTemplateId(this.templateId);
      this.template = this.templateWithTemplateId(this.templateId);

      // load venue to get the partition name
      await this.loadVenue();

      // load email settings to display header and footer
      const partition = this.venue.partition;
      await this.loadEmailSettingsWithPartition(partition);
      const emailSettings = this.emailSettingsWithPartition(partition);

      // load email header resource
      if (emailSettings.emailHeader) {
        const resourceId = emailSettings.emailHeader.resourceId;
        await this.loadResourceWithResourceId(resourceId);
        await this.loadResourceUrlWithResourceId(resourceId);
      }
    },

    async reload () {
      return await (this.templateId) ? this.loadTemplateWithTemplateId(this.templateId) : undefined;
    },

    convertDateFormat(date) {
      if (date === null || date === undefined) {
        return "";
      }

      return dayjs(date).format("D MMMM YYYY");
    }
  },

  computed: {
    ...mapGetters({
      templateWithTemplateId: 'apps/admin/templates/templateWithTemplateId',
      updatingTemplateWithExecutionArn: 'apps/admin/templates/updatingTemplateWithExecutionArn',
      emailSettingsWithPartition: 'apps/admin/email/emailSettingsWithPartition',
      resourceWithResourceId: 'apps/admin/resources/resourceWithResourceId',
      venue: 'apps/admin/venue/venue'
    }),

    emailSettings() {
      if (this.venue === undefined) {
        return undefined;
      }
      const partition = this.venue.partition;
      return partition ? this.emailSettingsWithPartition(partition) : undefined;
    },

    emailHeaderUrl() {
      if (this.emailSettings === undefined || this.emailSettings.emailHeader === undefined) {
        return "";
      }
      const resourceId = this.emailSettings.emailHeader.resourceId;
      const resource = this.resourceWithResourceId(resourceId);
      if (!resource) {
        return "";
      }
      return resource.url;
    },

    emailFooter() {
      if (!this.emailSettings) {
        return "";
      }
      return this.emailSettings.emailFooter;
    },

    backgroundColor() {
      if (!this.emailSettings) {
        return "";
      }
      return this.emailSettings.backgroundColor;
    },

    /**
     * @returns {*|undefined}
     */
    updatingTemplate () {
      return (this.executionArn) ? this.updatingTemplateWithExecutionArn(this.executionArn) : undefined;
    },

    updating () {
      console.log("this.updatingTemplate", this.updatingTemplate);

      return (this.updatingTemplate) ? this.updatingTemplate.updating : false;
    },

    updated () {
      return (this.updatingTemplate) ? this.updatingTemplate.updated : false;
    },

    error () {
      return (this.updatingTemplate) ? this.updatingTemplate.error : false;
    },

    loaded() {
      return (this.template) ? this.template.loaded : false;
    },

    loading() {
      return (this.template) ? this.template.loading : false;
    },

    /**
     * Return the tags for a given trigger (e.g. for sign up template, the
     * tags can be different from the tags for a different template)
     *
     * @returns {*[]|*}
     */
    tagsForTrigger() {
      if (!this.template.trigger) {
        return [];
      }

      return this.tags[this.template.trigger];
    }
  }
}
</script>
