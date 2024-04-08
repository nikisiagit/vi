/**
 * region/timezones
 */


export const state = () => ({
  loaded: false,
  loading: false,
  error: undefined,

  /**
   *
   */
  timezones: [
    // {
    //     timezoneId: 'timezone:gmt',
    // }
  ],
});

export const mutations = {
  /**
   * @param state
   * @param timezones
   */
  timezones(state, timezones = []) {
    state.timezones = timezones;
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
   * Return the list of Timezones.
   *
   * @param state
   * @return {[]|*[]}
   */
  timezones: (state) => {
    return state.timezones || [];
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
    console.log(`## ADMIN REGION TIMEZONES - LOAD`);

    try {
      commit('loading', true);
      commit('loaded', false);

      const {timezones, token} = await this.$api('admin').region.listTimezones();

      commit('timezones', timezones.map(timezone => {
        return Object.assign({}, timezone, {
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
    console.log(`## ADMIN REGION TIMEZONES STORE - UNLOAD`);

    commit('loading', false);
    commit('loaded', false);
    commit('token', undefined);
    commit('error', undefined);
    commit('timezones', []);
  },

  async reload ({dispatch}) {
    console.log(`## ADMIN REGION TIMEZONES STORE - RELOAD`);

    dispatch('unload');
    dispatch('load');
  },
}

