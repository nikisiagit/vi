/**
 * i18n Store.
 */
export const state = () => ({
  /**
   * Which mode is this store in?
   *
   * public | protected
   */
  mode: 'public', // protected

  /**
   * Is this store initialising?
   */
  initialising: false,

  /**
   * Has this store been initialised?
   */
  initialised: false,

  /**
   * All i18n languages loaded by the select
   */
  i18nLanguages: [],

  /**
   * i18n Language selected / current applied to labels/messages. i.e. en, es, it.
   */
  i18nLanguageSelected: '',

  /**
   * Has the i18n languages store been loaded?
   */
  loaded: false,

  /**
   * Is the i18n languages store loading?
   */
  loading: false,

  /**
   * The last error seen by this store.
   */
  error: undefined,
});

export const mutations = {
  /**
   * Set the mode of this store.
   *
   * @param state
   * @param mode {string}
   */
  setMode (state, mode = 'public') {
    state.mode = mode;
  },

  /**
   * Set the initialising value.
   *
   * @param state
   * @param initialising {boolean}
   */
  setInitialising (state, initialising = false) {
    state.initialising = initialising;
  },

  /**
   * Set the initialised value.
   *
   * @param state
   * @param initialised {boolean}
   */
  setInitialised (state, initialised = false) {
    state.initialised = initialised;
  },


  /**
   * Set the i18nLanguages state to whatever is supplied.
   *
   * @param state
   * @param i18nLanguages
   */
  setI18nLanguages (state, i18nLanguages = []) {
    state.i18nLanguages = i18nLanguages;
  },

  /**
   * Update the specified i18nLanguage.
   *
   * @param state
   * @param i18nLanguage {{ languageId: string}}
   */
  updateI18nLanguage (state, i18nLanguage) {
    // const {languageId} = i18nLanguage;  //@todo: revert
    const {languageCode} = i18nLanguage;

    //@todo: revert
    // const index = state.i18nLanguages.findIndex(item => item.languageId === languageId);
    const index = state.i18nLanguages.findIndex(item => item.languageCode === languageCode);

    if (index < 0) {
      state.i18nLanguages.push(i18nLanguage);
    } else {
      state.i18nLanguages.splice(index, 1, {...state.i18nLanguages[index], ...i18nLanguage})
    }
  },

  /**
   * @param state
   * @param token
   */
  token (state, token = undefined) {
    state.token = token;
  },

  /**
   * @param state
   * @param loading
   */
  loading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * @param state
   * @param loaded
   */
  loaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * @param state
   * @param error
   */
  error (state, error = undefined) {
    state.error = error;
  },
};

export const getters = {

  /**
   * Return the store mode.
   *
   * @param state
   * @returns {string|undefined}
   */
  mode: (state) => {
    return state.mode || undefined;
  },


  /**
   * @param state
   * @return {[]|*[]}
   */
  i18nLanguages: (state) => {
    return state.i18nLanguages || [];
  },

  /**
   * Return the number of Languages.
   *
   * @param state
   * @returns {number|number}
   */
  numberOfI18nLanguages: (state) => {
    return state.i18nLanguages.length || 0;
  },

  /**
   * Return the i18nLanguage identified by the supplied LanguageId.
   *
   * @param state
   * @return {function(*): *}
   */
  i18nLanguageWithLanguageId: (state) => (languageId) => {
    return state.i18nLanguages.find(language => language.languageId === languageId);
  },

  i18nLanguageWithLanguageCode: (state) => (languageCode) => {
    return state.i18nLanguages.find(language => language.languageCode === languageCode);
  },

  /**
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * @param state
   * @return {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * @param state
   * @return {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },

  /**
   * Return the initialised state.
   *
   * @param state
   * @return {boolean}
   */
  initialised: (state) => {
    return state.initialised || false;
  },

};

export const actions = {
  /**
   * Init the store.
   *
   * @param commit
   * @param getters
   * @param dispatch
   * @param mode
   * @returns {Promise<void>}
   */
  async initialise ({commit, getters, dispatch}, mode = 'public') {
    console.log(`## THEMES STORE - INITIALISE - ${mode}`);

    const currentInitialised = getters['initialised'];
    const currentMode = getters['mode'];

    console.log(currentMode, currentInitialised);

    if (currentInitialised && mode === currentMode) {
      return;
    }

    if (currentInitialised) {
      await dispatch('unload');
      await commit('setInitialised', false);
      await commit('setInitialising', false);
    }

    commit('setInitialising', true);
    commit('setMode', mode);

    // do initialisation work

    commit('setInitialising', false);
    commit('setInitialised', true);
  },

  /**
   * Load the Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {


    } catch (error) {

    }
  },

  /**
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setI18nLanguages', []);
  },

  /**
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the i18nLanguage with the specified LanguageId.
   *
   * @param commit
   * @param languageId
   * @return {Promise<void>}
   */
  async loadLanguageWithLanguageId({commit}, languageId) {
    console.log(`## I18N VENUE PUBLIC APP - I18N LANGUAGES STORE - loadLanguageWithLanguageId`);

    let i18nLanguage = {
      languageId,

      languageCode: languageId, //@todo: revert

      loading: true,
      loaded: false,
    };
    commit('updateI18nLanguage', i18nLanguage);

    try {
      i18nLanguage = await this.$api('public').i18n.getI18nLanguageFileWithLanguageId(languageId);

      commit('updateI18nLanguage',
        {
          ...i18nLanguage,
          ...{
            loading: false,
            loaded: true,
            error: undefined
          }
        }
      );

    } catch (error) {
      console.log(error);
    }
  }
};


