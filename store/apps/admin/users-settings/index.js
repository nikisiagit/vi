export const state = () => ({
  /**
   * The list of UsersSettings that have been added to the Partition.
   */
  usersSettings: undefined,

  webClientId: '',

  /**
   * The list of UserSettings that are being/have been updated.
   */
  creatingUsersSettings: [],

  /**
   * The list of UsersSettings that are being/have been updated.
   */
  updatingUsersSettings: [],

  /**
   * The list of UsersSettings that are being/have been removed.
   */
  removingUsersSettings: [],
  loaded: false,

  loading: false,

  error: undefined,
})

export const getters = {
  /**
   * @param state
   * @returns {[]|*[]}
   */
  usersSettings: (state) => {
    return state.usersSettings || undefined;
  },

  webClientId: state => state.webClientId,

  /**
   * @param state
   * @returns {function(*): *}
   */
  usersSettingsWithUsersSettingsId: (state) => (usersSettingsId) => {
    return state.usersSettings.find(usersSettings => usersSettings.usersSettingsId === usersSettingsId);
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
}
export const mutations = {
  /**
   * Set the UsersSettings to whatever is supplied.
   *
   * @param state
   * @param usersSettings []
   */
  setUsersSettings (state, usersSettings = {}) {
    state.usersSettings = usersSettings || {};
  },


  /**
   * Update the UsersSettings in the store.
   *
   * @param state
   * @param UsersSettings {{userSettingsId: string}}
   */
  updateUsersSettings (state, usersSettings = {}) {
    state.usersSettings = {
        ...state.usersSettings,
        ...usersSettings
      }
  },

  updateWebClientId (state, webClientId) {
    state.webClientId = webClientId;
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
   * Set the creatingUsersSettings state to whatever is supplied.
   *
   * @param state
   * @param creatingUserSettings []
   */
  creatingUsersSettings (state, creatingUsersSettings = []) {
    state.creatingUsersSettings = creatingUsersSettings;
  },

}

export const actions = {
  /**
   * Load the Store with the UsersSettings.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loaded', false);
      commit('loading', true);

      const usersSettings = await this.$api('admin').usersSettings.getUsersSettings();

      commit('setUsersSettings', usersSettings);
      commit('loaded', true);
    } catch (error) {
      console.log(error);
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },


  /**
   * Unload the entire Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setUsersSettings', undefined);
  },

  async createUsersSettings({ commit }, usersSettings) {
    try {
      const existingRecord = await this.$api('admin').usersSettings.getUsersSettings();
      if (!existingRecord) {
        await this.$api('admin').usersSettings.createUsersSettings(usersSettings);
      }
      commit('updateUsersSettings', usersSettings);
    } catch (error) {
      console.log(error);
      commit('error', error);
    }
  },


  async updateUsersSettings ({commit}, usersSettings) {
    try {
      await this.$api('admin').usersSettings.updateUsersSettings(usersSettings);
      commit('updateUsersSettings', usersSettings);
    }
    catch (error) {
      console.log(error);
      commit('error', error);
    }
  },

  async createAccessConfig ({commit}, payload) {
    commit('updateWebClientId', payload.webClientId);
  },

  /**
   * Create a new SocialProvider.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async createSocialProvider ({commit}, socialProvider) {
    try {
      await this.$api('admin').usersSettings.createSocialProvider(socialProvider);
    }
    catch (error) {
      console.log(error);
      commit('error', error);
    }
  }
}

