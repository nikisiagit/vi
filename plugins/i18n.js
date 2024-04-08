/**
 * @param context
 * @returns {Promise<{}>}
 */
export default async function (context) {

  // // get i18nLanguage file with messages in the specific Language

  // @todo: remove setTimeout and handle the async/await as soon as languages store is INITIALISED
  setTimeout(async () => {
    try {
      const { store } = context

      // retrieve the default language from partition
      const defaultLanguage = store.getters['languages/defaultLanguage']
      console.log(defaultLanguage, "defaultLanguage")

      const code = defaultLanguage?.code

      /**
       * MANDATORY for the i18n library to work and setup/initialise all the internal functions. (mergeLocaleMessage) (vars: i18n)
       * Setup the default Locale and the fallback locale.
       */
      context.app.i18n.locale = code
      context.app.i18n.fallbackLocale = code

      // load default i18n language that needs to load at first page load.
      //@todo: change to languageId. i.e. 'language:eventheads:en'
      await store.dispatch('i18n/loadLanguageWithLanguageId', code) // defaultLanguageId

      const i18nLanguage = store.getters['i18n/i18nLanguageWithLanguageCode'](code)  // defaultLanguageId
      console.log("i18nLanguage", i18nLanguage)

      // get messages from i18nLanguage
      const { messages } = i18nLanguage
      console.log('messages', messages)

      // // get locale of current page
      const locale = context.app.i18n.locale

      // // set/merge the messages from the i18nLanguage
      context.app.i18n.mergeLocaleMessage(locale, messages)
      // context.app.i18n.setLocaleMessage(locale, messages)

      // @todo: commit to the store the selected language
      // ..

    } catch (error) {
      console.log(error);
    }

  }, 400)

  //@todo: An alternative in case we want to use the i18n library objects-variables like locales, locale and fallbackLocale. (Just need wire-up in case)
  // context.app.i18n.locales = [  // list of available languages...
  //   // @todo: schema could be anything we want, as soon as has code and label to render it in the LanguageSwitcher component.
  //   {
  //     code: 'en',
  //     label: 'English'
  //   },
  //   {
  //     code: 'it',
  //     label: 'Italiano'
  //   },
  //   {
  //     code: 'tr',
  //     label: 'Türkçe'
  //   }
  // ]
  // context.app.i18n.locale = 'en'
  // context.app.i18n.fallbackLocale = 'en'


  /**
   * Ignore bellow as was part of investigation/testing.
   */
  // load the default languages to have them ready before any page renders.
  // context.app.i18n = {
  //   ...context.app.i18n,
  //   lazy: true,
  //   // locales: [ // list of available languages...
  //   //   {
  //   //     code: 'en',
  //   //     name: 'English'
  //   //   },
  //   //   // {
  //   //   //   code: 'es',
  //   //   //   name: 'Español'
  //   //   // },
  //   //   // {
  //   //   //   code: 'fr',
  //   //   //   name: 'Français'
  //   //   // }
  //   // ],
  //   locale: 'en', // context.store.state.i18n.locale,
  //   fallbackLocale: 'en',
  //   messages: {
  //     'en': await axios.get('http://localhost:3000/en').then((res) => {
  //       return res.data
  //     }),
  //     // 'it': await axios.get('http://localhost:3000/it').then((res) => {
  //     //   return res.data
  //     // })
  //   }
  // }
}
