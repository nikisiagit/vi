export const state = () => ({
  loaded: false,
  loading: false,
  error: undefined,
  languages: [
    //
  ],
});

export const mutations = {
  /**
   * @param state
   * @param roles
   */
  languages (state, languages = []) {
    state.languages = languages;
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

  token (state, token = undefined) {
    state.token = token;
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

  languageWithId: (state) => (languageId) => {
    return state.languages.find(language => language.languageId === languageId);
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
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    console.log(`## ADMIN API - REGION LANGUAGES LOAD`);
    try {
      commit('loading', true);
      commit('loaded', false);

      const {languages, token} = await this.$api('admin').region.listLanguages();

      commit('languages', languages.map(language => {
        return Object.assign({}, language, {
          loading: false,
          loaded: true,
          error: undefined,
        })
      }));

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

  async unload ({commit}) {
    commit('loading', false);
    commit('loaded', false);
    commit('token', undefined);
    commit('error', undefined);
    commit('languages', []);
  },

  async reload ({dispatch}) {
    console.log(`## REGIONS STORE - RELOAD`);
    dispatch('unload');
    dispatch('load');
  },
};
