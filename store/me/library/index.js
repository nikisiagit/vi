export const state = () => ({
  library: [],
  token: undefined,
  initialising: false,
  initialised: false,
  loading: false,
  loaded: false,
  error: undefined
})


export const mutations = {
  /**
   * Set the Library to whatever is supplied.
   *
   * @param state
   * @param tickets []
   */
  setLibrary (state, library = [] ) {
    state.library = library;
  },

  /**
   * Set the Library Resource in the Store.
   *
   * @param state
   * @param libraryResource {{ libraryId: string}}
   */
  setLibraryResource(state, libraryResource) {
    const {resourceId} = libraryResource;
    const index = state.library.findIndex(item => item.resourceId === resourceId);

    if (index < 0) {
      state.library.push(libraryResource);
    } else {
      state.library.splice(index, 1, libraryResource);
    }
  },

  /**
   * Update the LibraryResource in the Store.
   * @param state
   * @param libraryResourceToUpdate
   */
  updateLibraryResource (state,libraryResourceToUpdate) {
    const {resourceId} = libraryResourceToUpdate;
    const index = state.library.findIndex(item => item.resourceId === resourceId);
    if (index < 0) {
      state.library.push(libraryResourceToUpdate);
    } else {
      state.library.splice(index, 1, {
          ...state.library[index],
          ...libraryResourceToUpdate
        }
      );
    }
  },

  /**
   * Set the pagination token
   * @param state
   * @param token
   */
  setToken (state, token) {
    state.token = token;
  },

  /**
   * Set the initialising state
   * @param state
   * @param initialising
   */
  setInitialising (state, initialising) {
    state.initialising = initialising;
  },

  /**
   * Set the initialised state
   * @param state
   * @param initialised
   */
  setInitialised (state, initialised) {
    state.initialised = initialised;
  },

  /**
   * Set the loading state
   * @param state
   * @param loading
   */
  setLoading (state, loading) {
    state.loading = loading;
  },

  /**
   * Set the loaded state
   * @param state
   * @param loaded
   */
  setLoaded (state, loaded) {
    state.loaded = loaded;
  },

  /**
   * Set the error message
   * @param state
   * @param error
   */
  setError (state, error) {
    state.error = error;
  }
}

export const getters = {

  /**
   * Return the Library.
   * @param state
   * @returns {[]}
   */
  library: state => state.library,

  /**
   * Return the Library Resource identified by the specified resourceId.
   *
   * @param state
   * @returns {function(*): *}
   */
  libraryResourceWithResourceId: state => resourceId => state.library.find(item => item.resourceId === resourceId),

  token: state => state.token,

  initialising: state => state.initialising,

  initialised: state => state.initialised,

  loading: state => state.loading,

  loaded: state => state.loaded,

  error: state => state.error
}

export const actions = {
  /**
   * Unload the store of all state.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async unload ({commit}) {
    commit('setLoading', false);
    commit('setLoaded', false);
    commit('setLibrary', []);
    commit('setError', undefined);
  },


  /**
   * Reload the stores state.
   *
   * @param dispatch
   * @returns {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the Store with state from the api.
   *
   * @param commit
   * @param getters
   * @returns {Promise<void>}
   */
  async load ({commit, getters}) {
    console.log(`## LIBRARY STORE - LOAD`);

    try {
      commit('setLoading', true);
      commit('setLoaded', false);

      const {library, token} = await this.$api().me.listLibrary();

      commit('setLibrary', library.map(libraryResource => {
        return Object.assign({}, libraryResource, {
          loading: false,
          loaded: true,
          error: undefined,
        });
      }));

      commit('setToken', token);
      commit('setLoaded', true);

    } catch (error) {
      console.log(error);

      commit('setError', error);
      commit('setLoaded', false);
    } finally {
      commit('setLoading', false);
    }
  },
}
