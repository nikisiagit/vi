<template>
  <v-card>
    <v-card-title>
      <v-icon left>mdi-delete</v-icon>
      {{ $t('remove-template')}}
    </v-card-title>
    <v-card-subtitle>{{ $t('remove-template') }}</v-card-subtitle>

    <v-card-text>
      <v-container fluid>
        <v-list two-line>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
              <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="removingTemplateInProgress" @click="cancel()">{{ $t('cancel') }}</v-btn>
      <v-spacer />
      <v-btn :loading="removingTemplateInProgress" @click="confirm">{{ $t('remove') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RemoveTemplate",
  props: {
    templateId: {
      type: String,
    }
  },

  data: () => ({
    executionArn: undefined
  }),

  async created() {
    if (! this.loaded && !this.loading) {
      await this.load();
    }
  },

  watch: {
    templateId() {
      if (! this.loaded && !this.loading) {
        this.load();
      }
    },
    async removingTemplate(removingTemplate) {
      console.log("removingTemplateInWatch", removingTemplate);

      // if the template has been removed, then close the component
      if (removingTemplate && removingTemplate.removing === false) {
        this.reset();
        await this.$router.push({
          name: 'apps-admin-templates'
        });
        this.$emit('close');
      }
    }
  },

  methods: {
    ...mapActions({
      loadTemplateWithTemplateId: 'apps/admin/templates/loadTemplateWithTemplateId',
      removeTemplateWithTemplateId: 'apps/admin/templates/removeTemplateWithTemplateId'
    }),

    load () {
      console.log("load");
      if (this.templateId) {
        console.log("loadTemplate");
        this.loadTemplateWithTemplateId(this.templateId);
      }
    },

    reload () {
      if (this.templateId) {
        this.loadTemplateWithTemplateId(this.templateId);
      }
    },

    reset() {
      this.executionArn = undefined;
    },

    cancel() {
      this.reset();
      this.$emit('close');
    },

    async confirm() {
      try {
        const {templateId} = this.template;
        console.log("templateId", templateId);

        await this.removeTemplateWithTemplateId(templateId);

        const {executionArn} = await this.removeTemplateWithTemplateId(templateId);
        console.log("executionArn", executionArn);
        this.executionArn = executionArn;
      } catch (error) {
        console.log(error);
        const removingTemplate = undefined;
      }
    }
  },

  computed: {
    ...mapGetters({
      templateWithTemplateId: 'apps/admin/templates/templateWithTemplateId',
      removingTemplateWithExecutionArn: 'apps/admin/templates/removingTemplateWithExecutionArn'
    }),

    /**
     * Return the removingTemplate.
     *
     * @return {*|undefined}
     */
    removingTemplate() {
      return (this.executionArn) ? this.removingTemplateWithExecutionArn(this.executionArn) : undefined;
    },

    removingTemplateInProgress() {
      return this.removingTemplate && this.removingTemplate.removing;
    },

    template () {
      if (this.templateId) {
        return this.templateWithTemplateId(this.templateId);
      }
    },

    name () {
      return (this.template) ? this.template.name : undefined;
    },

    loaded () {
      if (this.template) {
        return this.template.loaded || false;
      }
      return false;
    },

    loading () {
      if (this.template) {
        return this.template.loading || false;
      }
      return false;
    },

    removing () {
      return (this.template) ? this.template.removing : false;
    },

    removed () {
      return (this.template) ? this.template.removed : false;
    }
  },
}
</script>
