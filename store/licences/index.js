/**
 * Licences Store
 */

export const state = () => ({
  licences: [],

  loading: false,

  loaded: false,

  token: undefined,

  initialised: false,

  error: undefined,
});

export const mutations = {
  licences (state, licences = []) {
    state.licences = licences;
  },

  licence (state, licence) {
    const index = state.licences.findIndex(item => item.licenceId === licence.licenceId);

    if (index > -1) {
      state.licences.splice(
        index, 1,
        Object.assign({}, state.licences[index], licence)
      )
    } else {
      state.licences.push(licence);
    }
  },

  /**
   * Update the supplied Licence
   *
   * @param state
   * @param licenceToUpdate {{name: string, licenceId: string}}
   */
  updateLicence (state, licenceToUpdate) {
    const {licenceId, name} = licenceToUpdate;

    const index = state.licences.findIndex(item => item.licenceId === licenceId || item.name === name);

    if (index < 0) {
      state.licences.push(licenceToUpdate);
    } else {
      state.licences.splice(
        index,
        1,
        Object.assign({}, state.licences[index], licenceToUpdate)
      );
    }
  },

  loading (state, loading = false) {
    state.loading = loading;
  },

  loaded (state, loaded = false) {
    state.loaded = loaded;
  },

  initialised (state, initialised = false) {
    state.initialised = initialised;
  },

  token (state, token = undefined) {
    state.token = token;
  },

  error (state, error = undefined) {
    state.error = error;
  },
};

export const getters = {
  /**
   * @param state
   * @return {[]|*[]}
   */
  licences: (state) => {
    return state.licences || [];
  },

  loading: (state) => {
    return state.loading || false;
  },

  loaded: (state) => {
    return state.loaded || false;
  },

  token: (state) => {
    return state.token || undefined;
  },

  initialised: (state) => {
    return state.initialised || false;
  },

  // @todo perhaps this should be `errors` plural
  error: (state) => {
    return state.error || undefined;
  },

  licenceWithLicenceId: (state) => (licenceId) => {
    return state.licences.find(licence => licence.licenceId === licenceId);
  },

  numberOfLicences: (state) => {
    return state.licences.length || 0;
  }
};

export const actions = {

  /**
   * Initialise this store.
   *
   * @param context
   * @param options {{}}
   * @return {Promise<void>}
   */
  async init (context, options = {})  {
    console.log(`## LICENCES STORE - INITIALISING`);

    this.subscribe(async(mutation, state) => {
      if (mutation.type === 'socket/connected') {
        if (state.socket.connected) {

          this.$socket.addListener('licences', (type, subtype, message) => {
            console.log(`## LICENCES STORE - MESSAGE`);
            console.log(message);

            const licence = message;

            switch (subtype) {
              case 'licence-created':
              case 'licence-updated':
              case 'licence-deleted':
                console.log(`## ${subtype}`);
                break;

              default:
                console.log(`## ${subtype} not recognised`);
            }
          });

          console.log(`## LICENCES STORE - SUBSCRIBING`);
          await this.$socket.subscribe(`channel:licences`);
        }
      }
    });

    context.commit('initialised', true);
    console.log(`## LICENCES STORE - INITIALISED`);

  },

  /**
   * Load the Store with Licences.
   * @param context
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loading', true);
      let {licences, token} = await this.$api().licences.listLicences();
      licences.map(licence => commit('updateLicence',  licence));
      commit('token', token);
      commit('loaded', true);
    } catch (error) {
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  /**
   * Unload the Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    commit('loading', false);
    commit('loaded', false);

    commit('token', undefined);
    commit('error', undefined);

    commit('licences', []);
  },

  /**
   * Reload the Store.
   *
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    console.log(`## LICENCES STORE - RELOAD`);
    dispatch('unload');
    dispatch('load');
  }
};
