/**
 * Components Store.
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
   * Components
   */
  components: [],

  /**
   * Meta data used to track requests for specific Areas.
   */
  withAreaIds: [],

  /**
   * Has the Areas store been loaded?
   */
  loaded: false,

  /**
   * Is the Areas store loading?
   */
  loading: false,

  /**
   * The last error seen by this store.
   */
  error: undefined,
});

export const mutations = {

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
   * Set the Components to whatever is supplied.
   *
   * @param state
   * @param components []
   */
  setComponents (state, components  = []) {
    state.components = components;
  },

  /**
   * Update the supplied Component.
   *
   * @param state
   * @param component
   */
  updateComponent (state, component) {
    const {componentId} = component;
    const index = state.components.findIndex(item =>  item.componentId === componentId);

    if (index < 0) {
      state.components.push(component);
    } else {
      state.components.splice(
        index,
        1,
        {
          ...state.component[index],
          ...component
        }
      );
    }
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

  /**
   * @param state
   * @param withAreaIds
   */
  setWithAreaIds (state, withAreaIds = []) {
    state.withAreaIds = withAreaIds;
  },

  /**
   * Update the WithAreaId.
   *
   * @param state
   * @param withAreaId {{areaId: string}}
   */
  updateWithAreaId (state, withAreaId) {
    const {areaId} = withAreaId;
    const index = state.withAreaIds.findIndex(withAreaId =>  withAreaId.areaId === areaId);

    if (index < 0) {
      state.withAreaIds.push(withAreaId);
    } else {
      state.withAreaIds.splice(
        index,
        1,
        {
          ...state.withAreaIds[index],
          ...withAreaId
        }
      );
    }
  },

}

export const getters = {
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
   * Return the initialising state.
   *
   * @param state
   * @return {boolean}
   */
  initialising: (state) => {
    return state.initialising || false;
  },

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

  /**
   * @param state
   * @return {[]|*[]}
   */
  components: (state) => {
    return state.components || [];
  },

  /**
   * Return the Component identified by the supplied ComponentId.
   *
   * @param state
   * @returns {function(*): *}
   */
  componentWithComponentId: (state) => (componentId) => {
    return state.components.find(component => component.componentId === componentId);
  },

  /**
   * @param state
   * @returns {function(*): *}
   */
  componentsWithAreaId: (state) => (areaId) => {
    return state.components.filter(component => component.areaId === areaId);
  },

  /**
   * Return the withAreaIds.
   *
   * @param state
   * @return {undefined}
   */
  withAreaIds: (state) => {
    return state.withAreaIds || undefined;
  },

  /**
   * @param state
   * @returns {(function(*))|*}
   */
  withAreaId: (state) => (areaId) => {
    return state.withAreaIds.find(withAreaId => withAreaId.areaId === areaId);
  },
};

export const actions = {
  /**
   * Initialise the store.
   *
   * @param commit
   * @param getters
   * @param dispatch
   * @param mode
   * @returns {Promise<void>}
   */
  async initialise ({commit, getters, dispatch}, mode = 'public') {
    console.log(`## COMPONENTS STORE - INITIALISE - ${mode}`);

    const currentInitialised = getters['initialised'];
    const currentMode = getters['mode'];

    // console.log(currentMode, currentInitialised);

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
   * Load the Components.
   *
   * @param commit
   * @param getters
   * @returns {Promise<void>}
   */
  async load ({commit, getters}) {
    const mode = getters['mode'];
    console.log(`## COMPONENTS STORE - MODE ${mode}`);

    try {
      commit('loading', true);
      commit('loaded', false);

      const {components, token} = await this.$api(mode).components.listComponents();

      components.map(component => {
        commit('updateComponent', {
          ...component,
          ...{
            loading: false,
            loaded: true,
            error: undefined,
          }
        });
      })

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

  /**
   * Unload the store.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async unload({commit}) {
    commit('setToken', undefined);
    commit('setError', undefined);
    commit('setLoading', false);
    commit('setLoaded', false);
    commit('setComponents', []);
    commit('setWithAreaIds', []);
  },

  /**
   * Reload the store.
   *
   * @param dispatch
   * @returns {Promise<void>}
   */
  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the Components that belong to the specified Area.
   *
   * @param commit
   * @param getters
   * @param areaId
   * @returns {Promise<void>}
   */
  async loadComponentsWithAreaId ({commit, getters}, areaId) {
    console.log(`## COMPONENTS STORE - LOAD COMPONENTS WITH AREA ID - ${areaId}`);

    const mode = getters['mode'];
    console.log(`## COMPONENTS STORE -  MODE ${mode}`);

    let withAreaId = getters['withAreaId'](areaId);

    if (! withAreaId) {
      withAreaId = {
        areaId,
        token: undefined,
        loaded: false,
      };
    }

    let {token: currentToken} = withAreaId;

    try {
      withAreaId = {
        ...withAreaId,
        ...{areaId, loading: true, error: undefined}
      };
      commit('updateWithAreaId', withAreaId);

      const {components, token} = await this.$api(mode).areas.listComponentsWithAreaId(areaId, currentToken);

      components.map(component => {
        commit('updateComponent', {
          ...component,
          ...{
            loading: false,
            loaded: true,
            error: undefined
          }
        });
      });

      withAreaId = {
        ...withAreaId,
        ...{areaId, token, loading: false, loaded: true}
      };
      commit('updateWithAreaId', withAreaId);

    } catch (error) {
      console.log('error');
      console.log(error);

      withAreaId = {
        ...withAreaId,
        ...{areaId, error, loading: false}
      };
      commit('updateWithAreaId', withAreaId);
    }
  },

  /**
   * Load the Component identified by the supplied ComponentId.
   *
   * @param commit
   * @param getters
   * @param componentId
   * @returns {Promise<void>}
   */
  async loadComponentWithComponentId ({commit, getters}, componentId) {
    console.log(`## COMPONENTS STORE - LOAD COMPONENT WITH COMPONENT ID - ${componentId}`);

    const mode = getters['mode'];
    console.log(`## COMPONENTS STORE -  MODE ${mode}`);

    try {
      let component = await this.$api(mode).components.getComponentWithComponentId(componentId);

      component = {
        ...component,
        ...{
          loading: false,
          loaded: true,
          error: undefined
        }
      };

      commit('updateComponent', component);
    } catch (error) {
      //
    }
  },
};

