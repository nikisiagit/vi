export const state = () => ({
  loaded: false,
  loading: false,
  error: undefined,
  roles: [
    // {
    //  name: 'owner',
    //  roleId: 'role:owner'
    // }
  ],
});

export const mutations = {
  /**
   * @param state
   * @param roles
   */
  roles (state, roles = []) {
    state.roles = roles;
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
  roles: (state) => {
    return state.roles || [];
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
    console.log(`## ADMIN API - REGION ROLES LOAD`);
    try {
      commit('loading', true);
      commit('loaded', false);

      const {roles, token} = await this.$api('admin').region.listRoles();

      commit('roles', roles.map(role => {
        return Object.assign({}, role, {
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
};

