export const state = () => ({
  loaded: false,
  loading: false,
  error: undefined,
  currencies: [
    // {
    //     currencyId: 'currency:gbp',
    // }
  ],
});

export const mutations = {
  /**
   * @param state
   * @param currencies
   */
  currencies(state, currencies = []) {
    state.currencies = currencies;
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
   * Return the list of Currencies.
   *
   * @param state
   * @return {[]|*[]}
   */
  currencies: (state) => {
    return state.currencies || [];
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
  async load({commit}) {
    console.log(`## ADMIN REGION CURRENCIES - LOAD`);

    try {
      commit('loading', true);
      commit('loaded', false);

      const {currencies, token} = await this.$api('admin').region.listCurrencies();

      commit('currencies', currencies.map(currency => {
        return Object.assign({}, currency, {
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
    console.log(`## ADMIN REGION CURRENCIES STORE - UNLOAD`);

    commit('loading', false);
    commit('loaded', false);
    commit('token', undefined);
    commit('error', undefined);
    commit('currencies', []);
  },

  async reload ({dispatch}) {
    console.log(`## ADMIN REGION CURRENCIES STORE - RELOAD`);

    dispatch('unload');
    dispatch('load');
  },
}
