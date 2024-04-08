/**
 * The User Store
 */
export const state = () => ({
  /**
   * The User
   */
  user: undefined,
  users: [],

  /**
   * The User Search
   */
  search: undefined,


  /**
   * The most recent error.
   */
  error: undefined,

  /**
   * Is this store loading?
   */
  loading: false,

  /**
   * Has this store loaded?
   */
  loaded: false,
});

export const mutations = {
  /**
   * Set the User to whatever is supplied.
   *
   * @param state
   * @param me {{ name: string }}
   */
  setUser (state, user) {
    state.user = user;
  },

 setUsers (state, users=[]) {
  state.users = users;
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
   * Set the error to whatever is supplied.
   *
   * @param state
   * @param error
   */
  setError (state, error = undefined) {
    state.error = error;
  },

  /**
   * Set the search value to whatever is supplied.
   *
   * @param state
   * @param search
   */
  setSearch (state, search = undefined) {
    state.search = search;
  },

};

/**
 * @type {{myProfileLoading: (function(*): boolean|mutations.myProfileLoading|string|*), myProfile: (function(*): mutations.myProfile|string|*)}}
 */
export const getters = {
  /**
   * users/user
   * @param state
   * @return {*}
   */
  user: (state) => {
    return state.user || undefined;
  },

  users: (state) => {
    return state.users || undefined;
  },

  /**
   * Return the loading state.
   *
   * @param state
   * @returns {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Return the loaded state.
   *
   * @param state
   * @returns {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Return the last error that this store had.
   *
   * @param state
   * @returns {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },

  /**
   * Return the search term.
   *
   * @param state
   * @returns {undefined}
   */
  search: (state) => {
    return state.search || undefined;
  },
};

/**
 * @type {{load(*): Promise<void>, unload(*): void}}
 */
export const actions = {
  /**
   * Get the User
   *
   * OperationId: GetUser
   *
   * @param context
   */
  async load({commit,dispatch},id) {
    try {
      commit('setLoaded', false);
      commit('setLoading', true);

      let user = await this.$api("protected").users.getUser(id);
      commit('setUser', user);
      commit('setLoaded', true);

    } catch (error) {
      await this.$router.push({name: '404'});
      commit('setError', error);
      commit('setLoaded', false);

    } finally {
      commit('setLoading', false);
    }
  },

  /**
   * Reload the user state.
   *
   * @param dispatch
   * @returns {Promise<void>}
   */
  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Unload the User store
   *
   * @param context
   */
  unload({commit}) {
    commit('setUser', undefined);
    commit("setUsers", undefined)
    commit('setError', undefined);
    commit('setLoaded', false);
    commit('setLoading', false);
  },

  /**
   * Change User Search
   *
   * @param context
   */
  changeUserSearch({commit}) {
    commit('setSearch', undefined);
    commit('setError', undefined);
    commit('setLoaded', false);
    commit('setLoading', false);
  },

  async getAllUsers({commit}, searchTerm) {
    try {
      commit('setSearch', searchTerm);

      const allUsers = await this.$api('protected').users.getAllUsers(searchTerm);
      commit('setUsers', allUsers);
      return allUsers;

    } catch (error) {
      throw error;
    }
  },

};
