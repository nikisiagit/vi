<!--
Admin - Event - UpdateDescription

A smart component that enables the Admin to update the Event description.
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
      {{ $t('admin-event-update-description')}}
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
            <p>{{ $t('admin-event-update-description-help') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-y-transition>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-textarea v-model="textLocal"
                      :label="descriptionLabel"
                      :hint="descriptionHint"
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
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('admin-event-update-description') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateDescription",

  props: {
    eventId: {
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
    eventId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    },
    descriptionId: {
      immediate: true,
      handler () {
        if (this.descriptionId) {
          if (! this.labelLoading && ! this.labelLoaded) {
            this.loadLabelWithLabelId(this.descriptionId);
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
      loadEventWithEventId: 'apps/admin/events/loadEventWithEventId',
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
      updateLabel: 'apps/admin/labels/updateLabel',
    }),

    async load() {
      return await (this.eventId) ? this.loadEventWithEventId(this.eventId) : undefined;
    },

    async reload() {
      return await this.load();
    },

    async changeLanguageId(languageId = undefined) {
      this.languageIdLocal = languageId;
    },

    /**
     * Submit the label update.
     *
     * @returns {Promise<void>}
     */
    async submit () {
      if (! this.descriptionId) {
        console.log(`## NO DESCRIPTION ID AVAILABLE TO UPDATE`);
        return;
      }

      try {
        const update = {
          labelId: this.descriptionId,
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

    close(){
      this.$emit('close')

    },
  },

  computed: {
    ...mapGetters({
      eventWithEventId: 'apps/admin/events/eventWithEventId',
      labelWithLabelId: 'apps/admin/labels/labelWithLabelId',
    }),

    event() {
      return (this.eventId) ? this.eventWithEventId(this.eventId) : undefined;
    },

    loaded() {
      return (this.event) ? this.event.loaded : false;
    },

    loading() {
      return (this.event) ? this.event.loading : false;
    },

    descriptionId() {
      return (this.event) ? this.event.descriptionId : undefined;
    },

    // the Label

    label() {
      return (this.descriptionId) ? this.labelWithLabelId(this.descriptionId) : undefined;
    },

    labelLoading() {
      return (this.label) ? this.label.loading : false;
    },

    labelLoaded() {
      return (this.label) ? this.label.loaded : false;
    },

    text() {
      return (this.label) ? this.label.text : undefined;
    },

    languageId() {
      return (this.label) ? this.label.languageId : undefined;
    },

    descriptionLabel() {
      return this.$i18n.t('admin-event-description-label');
    },

    descriptionHint() {
      return this.$i18n.t('admin-event-description-hint');
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
