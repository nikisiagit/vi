<template>
  <v-card :loading="false">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      {{ $t('update-language') }}
    </v-card-title>
    <v-card-subtitle>
      {{ $t('update-language-subtitle') }}
    </v-card-subtitle>

    <v-card-text>
      <!-- form -->
      <template>
        <v-container fluid>
          <!-- language-id -->
          <v-row>
            <v-col>
              <languages-select :language-id="languageIdLocal" @change="changeLanguageId" />
            </v-col>
          </v-row>

        </v-container>
      </template>

    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="false" @click="cancel">{{ $t('cancel') }}</v-btn>
      <v-spacer />

      <v-btn :loading="false" @click="submit">{{ $t('update') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UpdateLanguage",

  async created () {
    if (! this.venueLoaded && ! this.venueLoading) {
      await this.load();
    }
  },

  watch: {
    languageId: {
      immediate: true,
      handler () {
        this.languageIdLocal = this.languageId;
      }
    },
  },

  data: () => ({
    languageIdLocal: undefined,

    submitting: false,
  }),

  computed: {
    ...mapGetters({
      venueLoaded: 'apps/admin/venue/loaded',
      venueLoading: 'apps/admin/venue/loading',
      venue: 'apps/admin/venue/venue',
    }),

    languageId () {
      return (this.venue) ? this.venue.languageId: undefined;
    },
  },

  methods: {
    ...mapActions({
      load: 'apps/admin/venue/load',
    }),

    changeLanguageId (languageId = undefined) {
      this.languageIdLocal = languageId;
    },

    cancel () {
      this.reset();
      this.$emit('close');
    },

    reset () {
      this.languageIdLocal = this.languageId;

      this.submitting = false;
    },

    async submit () {
      this.$emit('change-language', this.languageIdLocal);
      this.$emit('close');
    },
  }
}
</script>
