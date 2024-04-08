export const state = () => ({
  loaded: false,

  loading: false,

  error: undefined,
});

export const mutations = {
  /**
   *
   * @param state
   * @param loaded
   */
  loaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   *
   * @param state
   * @param loading
   */
  loading (state, loading = false) {
    state.loading = loading;
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
  loaded: (state) => {
    return state.loaded || false;
  },

  loading: (state) => {
    return state.loading || false;
  },

  error: (state) => {
    return state.error || undefined;
  }
};

export const actions = {
  /**
   * Load the Owners App Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    console.log(`## ADMIN LOAD`)
    try {
      await commit('loading', true);

      await commit('loaded', true);
    } catch (error) {
      console.log(error);
      await commit('error', error);
      await commit('loaded', false);
    } finally {
      await commit('loading', false);
    }
  },

  /**
   * Unload the Admin App Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    await commit('loaded', false);
  },

  /**
   * Reload the Admin App Store.
   *
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },
};
