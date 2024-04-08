<!--
Me Update Language Id

A smart component that enables the Me Profile to update the languageId
-->
<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-card-title>
      <v-icon left>mdi-account-circle</v-icon>
      {{ $t('me-update-language-id') }}
    </v-card-title>

    <!-- form -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <languages-select @change="changeLanguageId"
                            :language-id="languageIdLocal" />
        </v-col>
      </v-row>
    </v-container>

    <!-- submit button -->
    <v-container fluid>
      <v-row>
        <v-col class="px-4">
          <v-btn large block
                 class="primary"
                 @click="submit"
                 :loading="submitting"
                 :disabled="submitting">
            {{ $t('me-update-language-id')}}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-card>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "UpdateLanguageId",

  data: () => ({
    submitting: false,
    valid: true,
    languageIdLocal: undefined,
  }),

  async created () {
    if (! this.loaded && ! this.loading) {
      await this.load();
    }
  },

  watch: {
    languageId: {
      immediate: true,
      handler () {
        this.languageIdLocal = this.languageId;
      },
    },
  },

  methods: {
    ...mapActions({
      load: 'me/load',
      updateMe: 'me/updateMe',
    }),

    async changeLanguageId (languageId = undefined) {
      this.languageIdLocal = languageId;
    },

    async submit () {
      try {
        const update = {
          languageId: this.languageIdLocal,
        };
        this.submitting = true;
        this.updatingMe = await this.updateMe(update);
        this.submitting = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapGetters({
      loading: 'me/loading',
      loaded: 'me/loaded',
      me: 'me/me',
    }),

    /**
     * The languageId attribute.
     *
     * @returns {*|undefined}
     */
    languageId () {
      return (this.me) ? this.me.languageId : undefined;
    },


    // i18n
    languageIdLabel () {
      return this.$i18n.t('me-language-id-label');
    },

    languageIdHint () {
      return this.$i18n.t('me-language-id-hint');
    },
  }
}
</script>
