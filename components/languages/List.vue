<template>
  <v-card height="300" :loading="loading">
    <template slot="progress">
      <v-progress-linear height="4" indeterminate />
    </template>
    <v-card-text class="pa-0">

      <p class="text-center pa-6" v-if="loading">Loading...</p>

      <v-list subheader dense>
        <v-subheader v-if="loaded" class="pa-4 pt-6 font-weight-medium">Select the Language</v-subheader>
        <v-list-item :class="{ 'v-list-item--active primary--text': languageId === language.languageId }" v-for="(language, i) in languages" @click="change(language.languageId)" :key="i">
          <v-list-item-icon>
            <v-icon >mdi-translate</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">{{ language.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t(language.text) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>

  </v-card>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LanguagesList",
  props: {
    languageId: {
      type: String
    }
  },

  /**
   * Created
   *
   * @return {Promise<void>}
   */
  async created () {
    if (! this.loading && ! this.loaded) {

      await this.load();
      this.languageIdLocal = this.languageId;
    }
  },

  watch : {
    // languageId () {
    //   this.languageIdLocal = this.languageId;
    // }
  },

  data: () => ({
    // languageIdLocal: undefined,
  }),

  computed: {
    ...mapGetters({
      loading: 'languages/loading',
      loaded: 'languages/loaded',
      languages: 'languages/languages',

      initialised: 'languages/initialised',
      error: 'languages/error',
    }),

    isError () {
      return !!this.error;
    }
  },
  methods: {
    ...mapActions({
      load: 'languages/load',
      reload: 'languages/reload',
    }),

    /**
     *
     */
    change (languageId) {
      this.$emit('change-language', languageId)
    },
  },
  // updated() {
  //   this.languageIdLocal = this.languageId
  // }
}
</script>
