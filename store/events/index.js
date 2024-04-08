/**
 * Events Store
 */
export const state = () => ({
  /**
   * The list of Events
   */
  events: [],

  /**
   * Is this store loading
   */
  loading: false,

  /**
   * Is this store loaded?
   */
  loaded: false,

  /**
   * The last error seen by this store
   */
  error: undefined,

  /**
   * Is this store initialising?
   */
  initialising: false,

  /**
   * Has this store been initialised
   */
  initialised: false,

  /**
   * Which mode is this store in?
   *
   * public | protected
   */
  mode: 'public', // protected
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
   * Set the Events to whatever is supplied.
   *
   * @param state
   * @param events []
   */
  setEvents (state, events = []) {
    state.events = events;
  },

  /**
   * Set the supplied Event.
   *
   * @param state
   * @param event {{eventId: string}}
   */
  setEvent (state, event) {
    const {eventId} = event;
    const index = state.events.findIndex(item => item.eventId === eventId);

    if (index < 0) {
      state.events.push(event);
    } else {
      state.events.splice(index, 1, event);
    }
  },

  /**
   * @param state
   * @param event
   */
  updateEvent (state, event) {
    const {eventId} = event;
    const index = state.events.findIndex(item => item.eventId === eventId);

    state.events.splice(
      index,
      1,
      {
        ...state.events[index],
        ...event
      }
    );
  },

  /**
   * Set the initialised state.
   *
   * @param state
   * @param initialised {boolean}
   */
  setInitialised(state, initialised = false) {
    state.initialised = initialised;
  },

  /**
   * Set the initialising state.
   *
   * @param state
   * @param initialising {boolean}
   */
  setInitialising(state, initialising = false) {
    state.initialising = initialising;
  },

  /**
   * Set the loading state.
   *
   * @param state
   * @param loading {boolean}
   */
  setLoading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * Set the loaded state.
   *
   * @param state
   * @param loaded {boolean}
   */
  setLoaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * Set the error state.
   *
   * @param state
   * @param error
   */
  setError (state, error = undefined) {
    state.error = error;
  },

  /**
   * Set the token state.
   *
   * @param state
   * @param token {string|undefined}
   */
  setToken (state, token = undefined) {
    state.token = token;
  },
}

export const getters = {
  /**
   * Return the list of Events.
   *
   * @param state
   * @returns {[]|*[]}
   */
  events: (state) => {
    return state.events || [];
  },

  /**
   * Return the Event identified by the specified EventId.
   *
   * @param state
   * @returns {function(*): *}
   */
  eventWithEventId: (state) => (eventId) => {
    return state.events.find(item => item.eventId === eventId);
  },

  /**
   * @param state
   * @returns {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * @param state
   * @returns {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  initialised: (state) => {
    return state.initialised || false;
  },

  /**
   * @param state
   * @returns {boolean}
   */
  initialising: (state) => {
    return state.initialising || false;
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
   * Initialise the Events store.
   *
   * @param commit
   * @param getters
   * @param dispatch
   * @param mode {string}
   * @returns {Promise<void>}
   */
  async initialise ({commit, getters, dispatch}, mode = 'public') {
    console.log(`## EVENTS STORE - INITIALISE - ${mode}`);

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

    commit('setInitialised', false);
    commit('setInitialising', true);
    commit('setMode', mode);

    // this.$socket().addListener('events', (type, subtype, message) => {
    //   switch (subtype) {
    //     default:
    //       console.log(`## EVENTS STORE - EVENT ${subtype} NOT RECOGNISED`);
    //   }
    // });

    // await this.$socket().subscribe('events');

    commit('setInitialising', false);
    commit('setInitialised', true);
  },

  /**
   * Unload the store of all state.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async unload ({commit}) {
    commit('setLoading', false);
    commit('setLoaded', false);
    commit('setEvents', []);
    commit('setError', undefined);
  },

  /**
   * Reload the Store.
   *
   * @param dispatch
   * @returns {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the store with a list of Events.
   *
   * @param commit
   * @param getters
   * @returns {Promise<void>}
   */
  async load ({commit, getters}) {
    const mode = getters['mode'];
    console.log(`## EVENTS STORE - LOAD - ${mode}`);

    try {
      commit('setLoading', true);
      commit('setLoaded', false);

      const {events, token} = await this.$api(mode).events.listEvents();

      events.map(event => commit('setEvent', {
        ...event,
        ...{
          loaded: true,
          loading: false,
        }
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

  /**
   * Load the Event identified by the supplied EventId.
   *
   * @param commit
   * @param getters
   * @param eventId {string}
   * @returns {Promise<void>}
   */
  async loadEventWithEventId({commit, getters}, eventId) {
    const mode = getters['mode'];
    console.log(`## EVENTS STORE - LOAD EVENT WITH EVENT ID - ${mode}`);

    let eventToLoad = {
      eventId,
      loading: true,
      loaded: false,
    };
    commit('setEvent', eventToLoad);

    try {
      let event = await this.$api(mode).events.getEventWithEventId(eventId);
      // console.log(event);

      eventToLoad = {
        ...eventToLoad,
        ...event,
        ...{
          loaded: true,
          loading: false,
        }
      };

      console.log(eventToLoad);

      commit('updateEvent', eventToLoad);

    } catch (error) {
      const {message} = error;
      eventToLoad = {
        ...eventToLoad,
        ...{
          error: message,
          loaded: false,
          loading: false,
        }
      };
      commit('updateEvent', eventToLoad);
    }
  },
};
