/**
 * Venue App Admin Tags Store.
 *
 * This Store handles the Admin Tags.
 */

export const state = () => ({
  /**
   * The list of country codes that have been added to the Venue/Partition Rule
   */
  countryCodes: [],

  /**
   * Has this store loaded data from the Api.
   */
  loaded: false,

  /**
   * Is this store loading data from the Api.
   */
  loading: false,

  /**
   * The last error that this Store received.
   */
  error: undefined,
})

export const mutations = {
  /**
   * Set the country codes to whatever is supplied.
   *
   * @param state
   * @param countryCodes [string]
   */
  setCountryCodes (state, countryCodes = []) {
    state.countryCodes = countryCodes;
  },

  /**
   * Update the supplied Rule.
   *
   * @param state
   * @param countryCodes [string]
   */
  updateCountryCodes (state, countryCodes) {
    state.countryCodes = countryCodes;
  },

  /**
   * @param state
   * @param loading {boolean}
   */
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
   * Set the stores token.
   *
   * @param state
   * @param token
   */
  token (state, token = undefined) {
    state.token = token;
  },
};

export const getters = {
  // Country codes

  /**
   * Return the country codes.
   *
   * @param state
   * @return {[]|*[]}
   */
  countryCodes: (state) => {
    return state.countryCodes || [];
  },

  /**
   * Return the number of country codes.
   *
   * @param state
   * @return {number|number}
   */
  numberOfCountryCodes: (state) => {
    return state.countryCodes.length || 0;
  },

  /**
   * Return the loading state.
   *
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Return the loaded state.
   *
   * @param state
   * @return {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Return the last error.
   *
   * @param state
   * @return {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },
};

export const actions = {

  updateCountryCodes ({commit}, countryCodes) {
    commit('setCountryCodes', countryCodes);
  },

  /**
   * Load the store with a list of country codes.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loading', true);
      commit('loaded', false);

      const {countryCodes, token} = await this.$api('admin').waf.listRuleCountryCodes();

      commit('setCountryCodes', countryCodes);

      commit('token', token);
      commit('loaded', true);
    } catch (error) {
      const {message} = error;
      commit('error', message);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  /**
   * Unload this Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setRule', []);
    commit('setCountryCodes', []);
  },

  /**
   * Reload this Store.
   *
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Create a rule with country codes.
   * if a rules already exists then the country codes will replace the existing list
   * if you pass an empty array of countries then the rule will be removed
   *
   * @param commit
   * @param countryCodes [string]
   * @return {Promise<void>}
   */
  async createRule ({commit}, countryCodes) {
    if (countryCodes.length === 0) {
      this.$api('admin').waf.deleteRule();
      return;
    }

    commit('loading', true);
    commit('loaded', false);
    try {
      const request = { "countryCodes": countryCodes};
      const creatingRule = await this.$api('admin').waf.createRuleWithCountryCodes(request);

      commit('loading', false);
      commit('loaded', true);
      commit('updateCountryCodes', countryCodes);

      return creatingRule;

    } catch (error) {
      commit('loading', false);
      commit('loaded', true);
      //TODO: @luis this request can throw a custom error message re WAF'ing yourself
      throw error;
    }
  },
};
