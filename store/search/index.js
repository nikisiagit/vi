/**
 * Venue App Search Store.
 *
 * This store handles the Search.
 */
export const state = () => ({
  /**
   * The list of Results that have been searched.
   */
  results: [],

  loaded: false,

  loading: false,

  error: undefined,
});

export const mutations = {
  /**
   * Set the Results
   *
   * @param state
   * @param results []
   *
   */
  setResults (state, results = []) {
    state.results = results || [];
  },

  clearResults (state) {
    state.results = [];
  },

  loading (state, loading = false) {
    state.loading = loading;
  },

  /**
   *
   * @param state
   * @param loaded {boolean}
   */
  loaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * Set the error string.
   *
   * @param state
   * @param error {undefined|string}
   */
  error (state, error = undefined) {
    state.error = error;
  },

  /**
   * Set th stores token.
   *
   * @param state
   * @param token
   */
  token (state, token = undefined) {
    state.token = token;
  },

};

export const getters = {

  /**
   * Return the results.
   *
   * @param state
   * @return {[]|*[]}
   */
  results: (state) => {
    return state.results || [];
  },

  numberOfResults: (state) => {
    return state.results.length || 0;
  },

  /**
   * Is the store loading?
   *
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Is the store loaded?
   *
   * @param state
   * @return {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Return the error.
   *
   * @param state
   * @return {undefined|string}
   */
  error: (state) => {
    return state.error || undefined;
  },

};

export const actions = {

  /**
   * Load the store with a list of results.
   *
   * @param commit
   * @param searchTerm
   * @return {Promise<void>}
   */
  async load ({commit}, searchTerm) {
    try {
      commit('loading', true);

      let response = await this.$api('protected').search.listResults(searchTerm);

      const results = response.hits.map(({ _source }) => _source)

      commit('setResults',  results);
      commit('loaded', true);
    } catch (error) {
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  clearResults({commit}) {
    commit('clearResults');
  }

};

