export const state = () => ({
  tickets: [],
  token: undefined,
  initialising: false,
  initialised: false,
  loading: false,
  loaded: false,
  error: undefined
})


export const mutations = {
  /**
   * Set the Tickets to whatever is supplied.
   *
   * @param state
   * @param tickets []
   */
  setTickets (state, tickets = [] ) {
    state.tickets = tickets;
  },

  /**
   * Set the Ticket in the Store.
   *
   * @param state
   * @param ticket {{ ticketId: string}}
   */
  setTicket(state, ticket) {
    const {ticketId} = ticket;
    const index = state.tickets.findIndex(item => item.ticketId === ticketId);

    if (index < 0) {
      state.tickets.push(ticket);
    } else {
      state.tickets.splice(index, 1, ticket);
    }
  },

  /**
   * Update the Ticket in the Store.
   * @param state
   * @param ticketToUpdate
   */
  updateTicket (state,ticketToUpdate) {
    const {ticketId} = ticketToUpdate;
    const index = state.tickets.findIndex(item => item.ticketId === ticketId);
    if (index < 0) {
      state.tickets.push(ticketToUpdate);
    } else {
      state.tickets.splice(index, 1, {
          ...state.tickets[index],
          ...ticketToUpdate
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
   * Return the Tickets.
   * @param state
   * @returns {[]}
   */
  tickets: state => state.tickets,

  /**
   * Return the Ticket identified by the specified TicketId.
   *
   * @param state
   * @returns {function(*): *}
   */
  ticketWithTicketId: state => ticketId => state.tickets.find(item => item.ticketId === ticketId),

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
    commit('setTickets', []);
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
    console.log(`## TICKETS STORE - LOAD`);

    try {
      commit('setLoading', true);
      commit('setLoaded', false);

      const {tickets, token} = await this.$api().me.listTickets();

      commit('setTickets', tickets.map(ticket => {
        return Object.assign({}, ticket, {
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
