<!--

Admin Venue - Update Description

A smart component that enables an Admin to update the Venue Description Label.
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-store</v-icon>

      {{ $t('admin-venue-update-description')}}

      <v-spacer />

      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

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
                 color="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('admin-venue-update-description') }}
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

  data: () => ({
    submitting: false,
    showHelp: false,
    textLocal: undefined,
    languageIdLocal: undefined,
  }),

  async created () {
    if (! this.loading && ! this.loaded) {
      await this.load();
    }
  },

  watch: {
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
      load: 'apps/admin/venue/load',
      loadLabelWithLabelId: 'apps/admin/labels/loadLabelWithLabelId',
      updateLabel: 'apps/admin/labels/updateLabel',
    }),

    async changeLanguageId (languageId = undefined) {
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
  },

  computed: {
    ...mapGetters({
      loading: 'apps/admin/venue/loading',
      loaded: 'apps/admin/venue/loaded',
      venue: 'apps/admin/venue/venue',

      labelWithLabelId: 'apps/admin/labels/labelWithLabelId',
    }),

    descriptionId () {
      return (this.venue) ? this.venue.descriptionId : undefined;
    },


    // the Label

    label () {
      return (this.descriptionId) ? this.labelWithLabelId(this.descriptionId) : undefined;
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


    //

    descriptionLabel () {
      return this.$i18n.t('admin-venue-description-label');
    },

    descriptionHint () {
      return this.$i18n.t('admin-venue-description-hint');
    },
  },
}
</script>
