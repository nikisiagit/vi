<template>
  <v-card>
    <v-toolbar flat>
      <v-icon left>mdi-pound</v-icon>
      <v-toolbar-title>{{ templateId }}</v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <pre>
            {{ template }}
          </pre>
          <v-list>
            <v-subheader>settings</v-subheader>

            <v-list-item ripple>
              <v-list-item-avatar>
                <v-avatar>
                  <v-icon>mdi-format-title</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ fromAddress }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('from-address') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- description -->
            <v-list-item ripple>
              <v-list-item-avatar>
                <v-avatar>
                  <v-icon>mdi-format-text</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ $t('description') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('description') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>

        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import dayjs from "dayjs";

export default {
  name: "Details",

  props: {
    templateId: {
      type: String,
      required: true,
    },
  },

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadTemplateWithTemplateId: 'apps/admin/templates/loadTemplateWithTemplateId',
    }),

    async load() {
      return await (this.templateId) ? this.loadTemplateWithTemplateId(this.templateId) : undefined;
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
    }),

    template() {
      return (this.templateId) ? this.templateWithTemplateId(this.templateId) : undefined;
    },

    loaded() {
      return (this.template) ? this.template.loaded : false;
    },

    loading() {
      return (this.template) ? this.template.loading : false;
    },

    error() {
      return (this.template) ? this.template.error : undefined;
    },

    name() {
      return (this.template) ? this.template.name : undefined;
    },

    fromAddress() {
      return (this.template) ? this.template.fromAddress : undefined;
    }
  }
}
</script>
