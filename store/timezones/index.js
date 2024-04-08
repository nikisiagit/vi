/**
 * Timezones Store.
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
  loading: false,
  error: undefined,
  timezones: [],
});

export const mutations = {
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

  async initialise ({commit, getters, dispatch}, mode = 'public') {
    console.log(`## TIMEZONES STORE - INITIALISE - ${mode}`);

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
   * @param commit
   * @return {Promise<void>}
   */
  async load({commit, getters}) {
    const mode = getters['mode'];
    console.log(`## TIMEZONES - LOAD ${mode}`);

    try {
      commit('loading', true);
      commit('loaded', false);

      const {timezones, token} = await this.$api(mode).timezones.listTimezones();

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
    console.log(`## TIMEZONES STORE - UNLOAD`);

    commit('loading', false);
    commit('loaded', false);
    commit('token', undefined);
    commit('error', undefined);
    commit('timezones', []);
  },

  async reload ({dispatch}) {
    console.log(`## TIMEZONES STORE - RELOAD`);

    dispatch('unload');
    dispatch('load');
  },
}

