<template>
  <v-card :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>

    <v-toolbar flat>
      <v-icon left>mdi-web</v-icon>

      <v-toolbar-title>
        {{ $t('language-details') }}
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon :loading="loading" :disabled="loading" @click="reload">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>

    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col>
          <v-list>
            <!-- languageId -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ languageId }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('language-id') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- name -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ name }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('name') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- code -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ code }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('code') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- direction -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ direction }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('direction') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- enabled -->
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ enabled }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('enabled') }}</v-list-item-subtitle>
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

export default {
  name: "Details",

  props: {
    languageId: {
      type: String,
      required: true,
    }
  },

  async created() {
    if (! this.loaded && ! this.loading) {
      console.log(`## LANGUAGE DETAILS CREATED`);
      await this.load();
    }
  },

  watch: {
    languageId: {
      handler () {
        if (! this.loaded && ! this.loading) {
          this.load();
        }
      },
    }
  },

  methods: {
    ...mapActions({
      loadLanguageWithLanguageId: 'apps/admin/languages/loadLanguageWithLanguageId',
    }),

    async load () {
      return await (this.languageId) ? this.loadLanguageWithLanguageId(this.languageId) : undefined;
    },

    async reload () {
      return await this.load();
    },
  },

  computed: {
    ...mapGetters({
      languageWithLanguageId: 'apps/admin/languages/languageWithLanguageId',
    }),

    /**
     * Return the Language.
     *
     * @return {*|undefined}
     */
    language () {
      return (this.languageId) ? this.languageWithLanguageId(this.languageId) : undefined;
    },

    /**
     * Return the Language name.
     *
     * @returns {*|undefined}
     */
    name () {
      return (this.language) ? this.language.name : undefined;
    },

    /**
     * Return the Language code.
     *
     * @returns {*|undefined}
     */
    code () {
      return (this.language) ? this.language.code : undefined;
    },

    /**
     * Return the Language direction.
     *
     * @returns {*|undefined}
     */
    direction () {
      return (this.language) ? this.language.direction : undefined;
    },

    /**
     * Return the Language direction.
     *
     * @returns {*|undefined}
     */
    enabled () {
      return (this.language) ? this.language.enabled : undefined;
    },

    /**
     * Return the loading state of the Language.
     *
     * @return {*|boolean}
     */
    loading () {
      return (this.language) ? this.language.loading : false;
    },

    /**
     * Return the loaded state of the Language.
     *
     * @return {*|boolean}
     */
    loaded () {
      return (this.language) ? this.language.loaded : false;
    },


  },
}
</script>
