/**
 * Regions Store
 */

export const state = () => ({
  regions: [],

  loading: false,

  loaded: false,

  token: undefined,

  initialised: false,

  error: undefined,
});

export const mutations = {
  regions (state, regions = []) {
    state.regions = regions;
  },

  region (state, region) {
    const index = state.regions.findIndex(item => item.regionId === region.regionId);

    if (index > -1) {
      state.regions.splice(
        index, 1,
        Object.assign({}, state.regions[index], region)
      )
    } else {
      state.regions.push(region);
    }
  },

  /**
   * Update the supplied Region
   *
   * @param state
   * @param regionToUpdate {{name: string, regionId: string}}
   */
  updateRegion (state, regionToUpdate) {
    const {regionId} = regionToUpdate;

    const index = state.regions.findIndex(item => item.regionId === regionId || item.name === name);

    if (index < 0) {
      state.regions.push(regionToUpdate);
    } else {
      state.regions.splice(
        index,
        1,
        Object.assign({}, state.regions[index], regionToUpdate)
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
  regions: (state) => {
    return state.regions || [];
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

  regionWithRegionId: (state) => (regionId) => {
    return state.regions.find(region => region.regionId === regionId);
  },

  numberOfRegions: (state) => {
    return state.regions.length || 0;
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
    console.log(`## REGIONS STORE - INITIALISING`);

    // this.subscribe(async(mutation, state) => {
    //   if (mutation.type === 'socket/connected') {
    //     if (state.socket.connected) {
    //
    //       this.$socket.addListener('regions', (type, subtype, message) => {
    //         console.log(`## REGIONS STORE - MESSAGE`);
    //         console.log(message);
    //
    //         const region = message;
    //
    //         switch (subtype) {
    //           case 'region-created':
    //           case 'region-updated':
    //           case 'region-deleted':
    //             console.log(`## ${subtype}`);
    //             break;
    //
    //           default:
    //             console.log(`## ${subtype} not recognised`);
    //         }
    //       });
    //
    //       console.log(`## REGIONS STORE - SUBSCRIBING`);
    //       await this.$socket.subscribe(`channel:regions`);
    //     }
    //   }
    // });

    context.commit('initialised', true);
    console.log(`## REGIONS STORE - INITIALISED`);

  },

  /**
   * Load the Store with Regions.
   * @param context
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loading', true);
      console.log('LOADING REGIONS');
      let {regions, token} = await this.$api().regions.listRegions();
      regions.map(region => commit('updateRegion',  region));
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

    commit('regions', []);
  },

  /**
   * Reload the Store.
   *
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    console.log(`## REGIONS STORE - RELOAD`);
    dispatch('unload');
    dispatch('load');
  }
};
