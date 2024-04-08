/**
 * The Venue Store.
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
   * The Venue
   */
  venue: undefined,

  /**
   * Has the Venue store been loaded?
   */
  loaded: false,

  /**
   * Is the Venue store loading?
   */
  loading: false,

  /**
   * The last error seen by this store.
   */
  error: undefined,
});

export const mutations = {
  /**
   * Set the Venue to whatever is supplied.
   *
   * @param state
   * @param venue {{venueId: string, name:string}}
   */
  setVenue (state, venue  = {}) {
    state.venue = venue;
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
   * Set the loading value.
   *
   * @param state
   * @param loading {boolean}
   */
  setLoading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * Set the loaded value.
   *
   * @param state
   * @param loaded {boolean}
   */
  setLoaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * Set the last error.
   *
   * @param state
   * @param error {undefined}
   */
  setError (state, error = undefined) {
    state.error = error;
  },
}

export const getters = {
  /**
   * Return the Venue.
   *
   * @param state
   * @return {undefined}
   */
  venue: (state) => {
    return state.venue || undefined;
  },

  /**
   * Return the initialising value.
   *
   * @param state
   * @returns {boolean}
   */
  initialising: (state) => {
    return state.initialising || false;
  },

  /**
   * Return the initialise value.
   *
   * @param state
   * @returns {boolean}
   */
  initialised: (state) => {
    return state.initialised || false;
  },

  /**
   * Return the loading value.
   *
   * @param state
   * @returns {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Get the loaded value.
   *
   * @param state
   * @returns {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Return the last error seen by this store.
   *
   * @param state
   * @returns {undefined}
   */
  error: (state) => {
    return state.error || undefined;
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
}

export const actions = {
  /**
   * Initialise the Store.
   *
   * The store can be initialised as `public` or `protected`.
   *
   * Initialise is akin to `starting up` the store.
   *
   * @param commit
   * @param getters
   * @param dispatch
   * @param mode {string}
   * @return {Promise<void>}
   */
  async initialise ({commit, getters, dispatch}, mode = 'public') {
    console.log(`## VENUE STORE - INITIALISE - ${mode}`);

    const currentInitialised = getters['initialised'];
    const currentMode = getters['mode'];

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

    // this.subscribe(async(mutation) => {
    //   if (mutation.type === 'sockets/socket') {
    //     const {payload} = mutation;
    //     const {name, state} = payload;
    //
    //     if (name === mode) {
    //       if (state === 'open') {
    //         console.log(`## VENUE STORE - ${mode} SOCKET HAS OPENED`);
    //
    //         await this.$socket(mode).subscribe('venue');
    //
    //         await this.$socket(mode).addListener('venue', (type, subtype, message) => {
    //           switch (subtype) {
    //             default:
    //               console.log(`## VENUE STORE - EVENT ${subtype} NOT RECOGNISED`);
    //           }
    //         });
    //       }
    //
    //       if (state === 'close') {
    //         console.log(`## VENUE STORE - ${mode} SOCKET HAS CLOSED`);
    //       }
    //     }
    //   }
    // });

    commit('setInitialising', false);
    commit('setInitialised', true);
  },



  /**
   * Unload all state/data from the store.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async unload ({commit}) {
    commit('setLoading', false);
    commit('setLoaded', false);
    commit('setVenue', {});
    commit('setError', undefined);
  },

  /**
   * Reload the store.
   *
   * @param commit
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({commit, dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the Store.
   *
   * This function will load the Venue.
   *
   * @param commit
   * @param getters
   * @return {Promise<void>}
   */
  async load ({commit, getters}) {
    console.log(`## VENUE STORE - LOAD`);

    const mode = getters['mode'];
    console.log(`## VENUE STORE - MODE ${mode}`);

    try {
      commit('setLoading', true);
      commit('setLoaded', false);

      const venue = await this.$api(mode).venue.getVenue();
      commit('setVenue', {
        ...venue,
        ...{
          //
        }
      });
      commit('setLoaded', true);
    } catch (error) {
      commit('setError', error);
      commit('setLoaded', false);
    } finally {
      commit('setLoading', false);
    }
  },
};
