<!--
Admin - Area - Component - Update About Title

A smart component that enables an Admin to update the About title.
-->
<template>
  <v-card :loading="loading">

    <!-- loading -->
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <!-- title -->
    <v-card-title>
      <v-icon left>mdi-calendar</v-icon>
      {{ $t('admin-component-about-update-title')}}
      <v-spacer />
      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

    <!-- help -->
    <v-slide-y-transition>
      <v-container fluid v-if="showHelp">
        <v-row>
          <v-col class="px-4">
            <p>{{ $t('admin-component-about-update-title-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-text-field v-model="textLocal"
                        :label="titleLabel"
                        :hint="titleHint"
                        persistent-hint
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-4">
          <apps-admin-languages-select :value="languageIdLocal"
                                       @change="changeLanguageId" />
        </v-col>
      </v-row>
    </v-container>

    <!-- submit -->
    <v-container>
      <v-row>
        <v-col class="px-4">
          <v-btn large
                 block
                 @click="close"
          >
            {{ $t('close') }}
          </v-btn>


        </v-col>

        <v-col class="px-4">

          <v-btn large
                 block
                 color="primary"
                 @click="submit"
                 :disabled="updatingComponent && updatingComponent.updating"
                 :loading="updatingComponent && updatingComponent.updating"
          >
            {{ $t('admin-component-about-update-title') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateAboutTitle",

  props: {
    areaId: {
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
    areaId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    },
    titleId: {
      immediate: true,
      handler () {
        if (this.titleId) {
          if (! this.labelLoading && ! this.labelLoaded) {
            this.loadLabelWithLabelId(this.titleId);
          }
        }
      }
    },
    text: {
      immediate: true,
      handler () {
        this.textLocal = this.text;
      }
    },
    languageId: {
      immediate: true,
      handler () {
        this.languageIdLocal = this.languageId;
      }
    }
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/areas/loadComponentWithComponentId',

      updateComponent: 'apps/admin/areas/updateComponent',
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
      updateLabel: 'apps/admin/labels/updateLabel',
    }),

    async load() {
      return await (this.areaId) ? this.load({
        areaId: this.areaId,
        componentId: this.componentId
      }) : undefined;
    },

    async reload() {
      return await this.load();
    },

    async changeLanguageId(languageId = undefined) {
      this.languageIdLocal = languageId;
    },

    close(){
      this.$emit('close')

    },

    /**
     * Submit the label update.
     *
     * @returns {Promise<void>}
     */
    async submit () {
      if (! this.titleId) {
        console.log(`## NO TITLE ID AVAILABLE TO UPDATE`);
        return;
      }

      try {
        const update = {
          labelId: this.titleId,
          text: this.textLocal,
          languageId: this.languageIdLocal,
        };

        this.submitting = true;
        const updatingLabel = await this.updateLabel(update);
        this.submitting = false;

      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      componentWithAreaIdAndComponentType: 'apps/admin/areas/componentWithAreaIdAndComponentType',

      updatingComponentWithExecutionArn: 'apps/admin/areas/updatingComponentWithExecutionArn',
      labelWithLabelId: 'apps/admin/labels/labelWithLabelId',
    }),

    aboutComponent () {
      return (this.areaId) ? this.componentWithAreaIdAndComponentType(this.areaId, 'about') : undefined;
    },

    componentId () {
      return (this.aboutComponent) ? this.aboutComponent.componentId : undefined;
    },

    updatingComponent () {
      return (this.executionArn) ? this.updatingComponentWithExecutionArn(this.executionArn) : undefined;
    },

    loaded () {
      return (this.aboutComponent) ? this.aboutComponent.loaded : false;
    },

    loading () {
      return (this.aboutComponent) ? this.aboutComponent.loading : true;
    },

    error () {
      return (this.aboutComponent) ? this.aboutComponent.error : undefined;
    },

    titleId () {
      return (this.aboutComponent) ? this.aboutComponent.titleId : undefined;
    },

    // the Label

    label () {
      return (this.titleId) ? this.labelWithLabelId(this.titleId) : undefined;
    },

    labelLoading () {
      return (this.label) ? this.label.loading : false;
    },

    labelLoaded () {
      return (this.label) ? this.label.loaded : false;
    },

    text () {
      return (this.label) ? this.label.text : undefined;
    },

    languageId () {
      return (this.label) ? this.label.languageId : undefined;
    },

    titleLabel () {
      return this.$i18n.t('admin-component-about-title-label');
    },

    titleHint () {
      return this.$i18n.t('admin-component-about-title-hint');
    },
  },

  data: () => ({
    submitting: false,
    showHelp: false,
    textLocal: undefined,
    languageIdLocal: undefined,
  }),
}
</script>
