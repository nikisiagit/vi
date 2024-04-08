/**
 * Tickets With Venue State.
 */
export const state = () => ({
  loaded: false,
  error: undefined,
  initialising: false,
  initialised: false,
  loading: false,
  tickets: [
    // {
    //   name: '',
    //   title: '',
    //   titleLabelId: '',
    //   description: '',
    //   descriptionLabelId: '',
    //   pricingType: '', // free - paid
    //   access: '', // public - private
    //   showQRCode: true,
    //   quantity: 10 || null, // is is 'null' means that is unlimited.
    //   saleStartDatetime: '',
    //   saleEndDatetime: '',
    //   price: 100.50,
    //   currencyId: '' // matches the venue currenId for now...
    // }
  ],

  /**
   * The list of CreatingTicket items.
   */
  creatingTickets: [],

  removingTickets: [],

});

export const mutations = {
  tickets (state, tickets ) {
    state.tickets = tickets;
  },

  loading (state, loading = false) {
    state.loading = loading;
  },

  loaded (state, loaded = false) {
    state.loaded = loaded;
  },

  error (state, error = undefined) {
    state.error = error;
  },

  /**
   * Set the Tickets state to whatever is supplied.
   *
   * @param state
   * @param tickets [{}]
   */
  setTickets (state, tickets = []) {
    state.tickets = tickets;
  },

  /**
   * @param state
   * @param token
   */
  token (state, token = undefined) {
    state.token = token;
  },

  /**
   * Update the specified Ticket.
   *
   * @param state
   * @param ticket {{ ticketId: string, name: string, partition: string, type: string}}
   */
  updateTicket (state, ticket) {
    const {ticketId} = ticket;
    const index = state.tickets.findIndex(item =>  item.ticketId === ticketId);

    if (index < 0) {
      state.tickets.push(ticket);
    } else {
      state.tickets.splice(index, 1, {...state.tickets[index], ...ticket})
    }
  },

  /**
   * Update (or insert) the specified CreatingTicket item.
   *
   * @param state
   * @param creatingTicket {{name: string}}
   */
  updateCreatingTicket (state, creatingTicket) {
    const {name} = creatingTicket;
    const index = state.creatingTickets.findIndex(item =>  item.name === name);

    if (index < 0) {
      state.creatingTickets.push(creatingTicket);
    } else {
      state.creatingTickets.splice(index, 1, {...state.creatingTickets[index], ...creatingTicket})
    }
  },

  /**
   * Set the RemovingVenues state.
   *
   * @param state
   * @param removingVenues
   */
  removingVenues(state, removingVenues = []) {
    state.removingVenues = removingVenues;
  },

  /**
   * Add or update a removingTicket item.
   *
   * @param state
   * @param removingTicket {{name: string, email: string, creating: boolean, executionArn }}
   */
  removingTicket (state, removingTicket) {
    console.log("add removingTicket", removingTicket);

    const index = state.removingTickets.findIndex(item => item.executionArn === removingTicket.executionArn);

    if (index > -1) {
      state.removingTickets.splice(
        index, 1,
        Object.assign({}, state.removingTickets[index], removingTicket)
      )
    } else {
      state.removingTickets.push(removingTicket);
    }
  },

  /**
   * Remove the given ticket form the state
   *
   * @param state
   * @param ticket
   */
  removeTicket(state, ticket) {
    const index = state.tickets.findIndex(item => item.ticketId === ticket.ticketId);

    if (index > -1) {
      state.tickets.splice(index, 1)
    }
  },
}

export const getters = {

  /**
   * @param state
   * @return {undefined}
   */
  tickets: (state) => {
    return state.tickets || [];
  },

  /**
   * Return the number of Tickets.
   *
   * @param state
   * @return {number|number}
   */
  numberOfTickets: (state) => {
    return state.tickets.length || 0;
  },

  /**
   * Return the Tickets identified by the supplied ticketTicketId.
   *
   * @param state
   * @param ticketId {string}
   */
  ticketWithTicketId: (state) => (ticketId) => {
    return ticketId && state.tickets.find(ticket => {
      return ticket.ticketId.toLowerCase() === ticketId.toLowerCase()
    });

  },


  loading: (state) => {
    return state.loading || false;
  },

  loaded: (state) => {
    return state.loaded || false;
  },

  error: (state) => {
    return state.error || undefined;
  },

  /**
   * Return the CreatingTicket identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingTicketWithExecutionArn: (state) => (executionArn) => {
    return state.creatingTickets.find(creatingTicket => creatingTicket.executionArn === executionArn);
  },

  /**
   * Return the RemovingTicket item identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  removingTicketWithExecutionArn: (state) => (executionArn) => {
    return state.removingTickets.find(removingTicket => removingTicket.executionArn === executionArn);
  },
}

export const actions = {
  /**
   * Load the Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load({commit}) {
    try {
      console.log(`## VENUE APP ADMIN - TICKETS STORE - LOAD`);
      commit('loading', true);
      commit('loaded', false);

      const {tickets, token} = await this.$api('admin').tickets.listTickets();

      commit('setTickets',
        tickets.map(ticket => {
          return Object.assign({}, ticket, {
            loading: false,
            loaded: true,
            error: undefined,
          })
        })
      );
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
   * Load the Ticket with the specified ticketId.
   *
   * @param commit
   * @param ticketId
   * @return {Promise<void>}
   */
  async loadTicketWithTicketId({commit}, ticketId) {
    try {
      commit('loading', true);
      const ticket = await this.$api('admin').tickets.getTicketWithTicketId(ticketId);

      commit('updateTicket', Object.assign({}, ticket, {
        loading: false,
        loaded: true,
        error: undefined,
      }));

    } catch (error) {
      commit('error', error);
    } finally {
      commit('loading', false);
    }
  },

  /**
   * @param commit
   * @return {Promise<void>}
   */
  async unload({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setTickets', []);
  },

  /**
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },


  /**
   * Create a new Ticket.
   *
   * @param commit
   * @param ticket {{name: string}}
   * @return {Promise<any>}
   */
  async createTicket ({commit}, ticket) {
    let ticketToCreate = {
      ...ticket,
      ...{creating: true}
    };
    commit('updateCreatingTicket', ticketToCreate);

    try {
      const creatingTicket = await this.$api('admin').tickets.createTicket(ticket);
      const {executionArn} = creatingTicket;

      ticketToCreate = {
        ...ticketToCreate,
        ...creatingTicket,
      };
      commit('updateCreatingTicket', ticketToCreate);

      // start the polling function
      ((executionArn) => {
        const getExecution = async () => {
          ticketToCreate = {
            ...ticketToCreate,
            ...{
              loading: true
            }
          };
          commit('updateCreatingTicket', ticketToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## CREATE TICKET - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          ticketToCreate = {
            ...ticketToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingTicket', ticketToCreate);


          if (status === 'RUNNING') {
            console.log('## CREATE TICKET - RUNNING');
            setTimeout(getExecution, 3000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE TICKET - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE TICKET - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            console.log(`## OUTPUT`);
            console.log(output);

            let {error, ticket: createdTicket} = output;

            if (error) {
              ticketToCreate = {
                ...ticketToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingTicket', ticketToCreate);
            }

            if (createdTicket) {
              ticketToCreate = {
                ...ticketToCreate,
                ...createdTicket,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingTicket', ticketToCreate);

              createdTicket = {
                ...createdTicket,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateTicket', createdTicket);
            }
          }
        };

        setTimeout(getExecution, 3000);
      })(executionArn);

      return creatingTicket;

    } catch (error) {
      console.log("error", error);
      const {message} = error;
      ticketToCreate = {
        ...ticketToCreate,
        ...{
          error: message,
          creating: false
        }
      };
      commit('updateCreatingTicket', ticketToCreate);
    }
  },

  // async removeTicketWithTicketId (context, ticketId) {
  //   await this.$api('admin').tickets.removeTicketWithTicketId(ticketId);
  // },

  async removeTicketWithTicketId (context, ticketId) {
    console.log(`## TICKET STORE - REMOVE-TICKET`);
    console.log(`## TICKET ID TO REMOVE`);

    try {
      const removingTicket = await this.$api('admin').tickets.removeTicketWithTicketId(ticketId);

      context.commit('removingTicket',
        Object.assign({}, removingTicket, {
          removing: true,
        })
      );

      /**
       * The Polling function we will create to retrieve the status of the RemoveTicket request.
       *
       * @link https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
       * @param removingTicket
       */
      const poll = (removingTicket) => {

        const {executionArn} = removingTicket;

        console.log(`## POLL:${executionArn}`);
        console.log(removingTicket);

        const getExecution = async () => {

          context.commit('removingTicket',
            Object.assign({}, removingTicket, {
              loading: true,
            })
          );

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);

          context.commit('removingTicket',
            Object.assign({}, removingTicket, {
              loading: false,
            })
          );

          console.log(`## POLL:${executionArn} - EXECUTION`);
          console.log(execution);

          if (! execution) {
            console.log(`## POLL:${executionArn} - ERROR - NO EXECUTION`);
          }

          const {status} = execution
          console.log(`## POLL:${executionArn} STATUS ${status}`);
          console.log(status);

          if (status === 'FAILED') {
            console.log(`REMOVE TICKET POLL - FAILED`);
            context.commit('creating', {executionArn, status});
          }

          if (status === 'SUCCEEDED') {
            console.log(`REMOVE TICKET POLL - SUCCEEDED`);

            const {executionArn, stopDate} = execution;

            let {output} = execution;
            output = JSON.parse(output);
            console.log(`POLL:${executionArn} - OUTPUT`);
            console.log(output);

            const {error, ticket} = output;

            if (ticket) {
              console.log(`## POLL:${executionArn} - TICKET ID`);
              console.log(ticket);

              // add the execution to the removingTicket.executions[] list
              // update the removingTickets state - remove the removingTicket item
              context.commit('removingTicket', {ticket, executionArn, stopDate, status, removing: false});

              console.log("removeTicket");

              // remove the Ticket from the tickets state
              context.commit('removeTicket', { ticketId: ticket });
            }

            if (error) {
              console.log(`## POLL:${executionArn} - ERROR`);
              console.log(error);

              context.commit('removingTicket', {error, executionArn, stopDate, status, removing: false});
            }
          }
        };

        setTimeout(getExecution, 5000);
      }
      poll(removingTicket);

      console.log(removingTicket);
      return removingTicket;


    } catch (error) {
      console.log(`## TICKETS STORE - DELETE-TICKET - ERROR`);
      console.log(JSON.stringify(error));

      if (error.response) {
        console.log(JSON.stringify(error.response.data.message));
        // this.error = error.response.data.message;
      }
      context.commit('error', error);
      context.commit('loading', false);
    }
  }
};
