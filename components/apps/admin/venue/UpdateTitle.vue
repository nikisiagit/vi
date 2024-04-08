<!--
Admin Venue - Update Title

A smart component that enables the Admin to update the Venue Title Label.
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-store</v-icon>
      {{ $t('admin-venue-update-title')}}

      <v-spacer />

      <v-btn icon @click="showHelp = !showHelp">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-card-title>

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
                 color="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('admin-venue-update-title') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateTitle",

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
      loading: 'apps/admin/venue/loading',
      loaded: 'apps/admin/venue/loaded',
      venue: 'apps/admin/venue/venue',

      labelWithLabelId: 'apps/admin/labels/labelWithLabelId',
    }),

    titleId () {
      return (this.venue) ? this.venue.titleId : undefined;
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


    //

    titleLabel () {
      return this.$i18n.t('admin-venue-title-label');
    },

    titleHint () {
      return this.$i18n.t('admin-venue-title-hint');
    },
  },
}
</script>
