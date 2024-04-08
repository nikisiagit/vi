<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <apps-admin-language-details :language-id="languageId" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Name",
  layout: 'admin',

  async created () {
    if (! this.loaded && ! this.loading) {
      console.log(`## LANGUAGE ID CREATED`);
      await this.load();
    }
  },

  methods: {
    ...mapActions({
      loadLanguageWithLanguageId: 'apps/admin/languages/loadLanguageWithLanguageId',
    }),

    async load() {
      return await (this.languageId) ? this.loadLanguageWithLanguageId(this.languageId) : undefined;
    }
  },

  computed: {
    ...mapGetters({
      languageWithLanguageId: 'apps/admin/languages/languageWithLanguageId',
    }),

    language () {
      return (this.languageId) ? this.languageWithLanguageId(this.languageId) : undefined;
    },

    languageId () {
      return this.$route.params.languageId || undefined;
    },

    loaded () {
      return (this.language) ? this.language.loaded : false;
    },

    loading () {
      return (this.language) ? this.language.loading : false;
    },
  }
}
</script>
