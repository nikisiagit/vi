<template>
  <v-menu offset-y close-on-content-click transition="slide-y-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ml-2 btn-lang"
             v-bind="attrs"
             v-on="on">
        <v-icon left>
          mdi-web
        </v-icon>

        {{ defaultLanguageCode }}

<!--        {{ $i18n.locale }}-->
      </v-btn>
    </template>
    <v-card style="max-height: 500px" class="overflow-y-auto">
      <v-list>

        <v-list-item v-for="(language, index) in languages"
                     :key="index"
                     @click="changeLanguage(language.code)">
          <v-list-item-title>{{ $t(language.name) }}</v-list-item-title>
        </v-list-item>

        <!--        <v-list-item v-for="(locale, index) in availableLocales"-->
        <!--                     :key="index"-->
        <!--                     @click="changeLanguage(locale.code)">-->
        <!--          <v-list-item-title>{{ $t(locale.label) }}</v-list-item-title>-->
        <!--        </v-list-item>-->

      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LanguagePicker",
  data() {
    return {

    };
  },
  async created() {
    if (this.initialised) {
      if (! this.loaded && ! this.loading ) {
        await this.load();
      }
    }
  },
  methods: {
    ...mapActions({
      loadLanguageWithLanguageId: 'i18n/loadLanguageWithLanguageId',
      load: 'languages/load',
    }),

    async changeLanguage(code){
      const locale = code
      this.$i18n.locale = locale
      let localeMessages = null

      // check if languages hasn't been loaded.
      const i18nLanguage = this.i18nLanguageWithLanguageCode(code) // defaultLanguageId
      console.log("i18nLanguage", i18nLanguage)

      if (i18nLanguage) {

        // get messages from i18nLanguage store (pre-loaded)
        const { messages } = i18nLanguage
        localeMessages = messages
        console.log('messages', localeMessages)

      } else {

        // LOAD i18nLanguage file with messages in the specific Language
        //@todo: change to languageId. i.e. 'language:eventheads:en'
        await this.loadLanguageWithLanguageId(code) // defaultLanguageId

        const i18nLanguage = this.i18nLanguageWithLanguageCode(code) // defaultLanguageId
        console.log("i18nLanguage", i18nLanguage)

        // get messages from i18nLanguage store (pre-loaded)
        const { messages } = i18nLanguage
        localeMessages = messages
        console.log('messages', localeMessages)

      }


      // // set/merge the messages from the i18nLanguage
      this.$i18n.mergeLocaleMessage(locale, localeMessages)
      // this.$i18n.mergeLocaleMessage(locale, messages)
    }
  },

  computed: {
    ...mapGetters({
      i18nLanguageWithLanguageCode: 'i18n/i18nLanguageWithLanguageCode',
      languages: 'languages/languages',
      loading: 'languages/loading',
      loaded: 'languages/loaded',
      initialised: 'languages/initialised',
      defaultLanguage: 'languages/defaultLanguage',
    }),

    defaultLanguageCode(){
      return this.defaultLanguage?.code
    }

    // /**
    //  ** Retrieve the list of available languages in the Public Venue App.
    //  * @returns {*}
    //  */
    // availableLocales () {
    //   return this.$i18n.locales
    // }
  },
};
</script>

<style>
.btn-lang:focus::before { opacity: 0 !important; }
.btn-lang:hover::before { opacity: 0.08 !important; }
</style>
