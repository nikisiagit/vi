/**
 * Languages Store.
 */

/**
 * @return {{loaded: boolean, languages: *[], error: undefined, loading: boolean}}
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

  loaded: false,
  error: undefined,
  loading: false,
  languages: [],
});

export const mutations = {
  /**
   * @param state
   * @param languages
   */
  languages (state, languages = []) {
    state.languages = languages;
  },

  /**
   * Update the specified Language.
   *
   * @param state
   * @param language {{ languageId: string}}
   */
  updateLanguage (state, language) {
    const {languageId} = language;

    const index = state.languages.findIndex(item => item.languageId === languageId);

    if (index < 0) {
      state.languages.push(language);
    } else {
      state.languages.splice(index, 1, {...state.languages[index], ...language})
    }
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
   * Set the mode of this store.
   *
   * @param state
   * @param mode {string}
   */
  setMode (state, mode = 'public') {
    state.mode = mode;
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
   * @param state
   * @return {[]|*[]}
   */
  languages: (state) => {
    return state.languages || [];
  },

  languageWithLanguageId: (state) => (languageId) => {
    return state.languages.find(language => language.languageId === languageId);
  },

  defaultLanguage: (state) => {
    return state.languages.find(language => language.default);
  },

  numberOfLanguages: (state) => {
    return state.languages.length || 0;
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
};

export const actions = {

  /**
   * Initialise this Languages store.
   *
   * @param commit
   * @param getters
   * @param dispatch
   * @param mode
   * @returns {Promise<void>}
   */
  async initialise ({commit, getters, dispatch}, mode = 'public') {
    console.log(`## LANGUAGES STORE - INITIALISE - ${mode}`);

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
    // load the languages enabled in Partition
    dispatch('load');

    commit('setInitialising', false);
    commit('setInitialised', true);
  },

  /**
   * Load the Store.
   *
   * @param commit
   * @param getters
   * @return {Promise<void>}
   */
  async load ({commit, getters}) {

    const mode = getters['mode'];
    console.log(`## LANGUAGES STORE - MODE ${mode}`);

    try {
      commit('loading', true);
      commit('loaded', false);

      const {languages, token} = await this.$api('protected').languages.listLanguages();

      commit('languages',
        languages.map(language => {
          return Object.assign({}, language, {
            loading: true,
            loaded: true,
            error: undefined,
          })
        })
      );
      commit('token', token);
      commit('loaded', true);
    } catch (error) {
      console.log('error');
      console.log(error);
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },


  /**
   * Load the Language with the specified LanguageId.
   *
   * @param commit
   * @param languageId
   * @return {Promise<void>}
   */
  async loadLanguageWithLanguageId({commit}, languageId) {
    console.log(`## VENUE PUBLIC APP - LANGUAGES STORE - loadLanguageWithLanguageId`);

    const mode = getters['mode'];
    console.log(`## LANGUAGES STORE - MODE ${mode}`);

    let language = {
      languageId,
      loading: true,
      loaded: false,
    };
    commit('updateLanguage', language);

    try {
      language = await this.$api(mode).languages.getLanguageWithLanguageId(languageId);

      commit('updateLanguage',
        {
          ...language,
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
    commit('languages', []);
  },

  /**
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },
};
