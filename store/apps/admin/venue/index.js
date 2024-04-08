/**
 * [PRO-240] Venue App (Admin) - Store
 *
 * @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-240
 *
 * The store that connects the Venue App (Admin) to the Admin Api.
 */

/**
 * @returns {{initialising: boolean, initialised: boolean, loaded: boolean, venue: undefined, venueUpdates: *[], loading: boolean, error: undefined}}
 */
export const state = () => ({
  /**
   * Is the store/module initialising?
   */
  initialising: false,

  /**
   * Has the store initialised
   */
  initialised: false,

  /**
   * The Venue
   */
  venue: undefined,

  /**
   * Is the store loading?
   */
  loading: false,

  /**
   * Has the store loaded?
   */
  loaded: false,

  /**
   * The last error seen by this store.
   */
  error: undefined,

  /**
   * The list of Venue Updates.
   */
  venueUpdates: [], // ???
});

export const mutations = {

  /**
   * Set the initialised state of the store.
   *
   * @param state
   * @param initialised
   */
  setInitialised (state, initialised = false) {
    state.initialised = initialised;
  },

  /**
   * Set the initialising state of the store.
   *
   * @param state
   * @param initialising
   */
  setInitialising (state, initialising = false) {
    state.initialising = initialising;
  },

  /**
   * Set the Venue to whatever is supplied.
   *
   * @param state
   * @param venue
   */
  venue (state, venue ) {
    state.venue = venue;
  },

  /**
   * Update the Venue.
   *
   * @param state
   * @param update
   */
  updateVenue (state, update) {
    state.venue = Object.assign({}, state.venue, update);
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



  venueUpdates (state, venueUpdates = []) {
    state.venueUpdates = venueUpdates || [];
  },

  updateVenueUpdate (state, venueUpdate) {
    const {executionArn} = venueUpdate;
    const index = state.venueUpdates.findIndex(venueUpdate => venueUpdate.executionArn === executionArn);

    if (index < 0) {
      state.venueUpdates.push(venueUpdate)
    } else {
      state.venueUpdates.splice(index, 1, {...state.venueUpdates[index], ...venueUpdate});
    }
  },
}

export const getters = {
  /**
   * Return the initialised state of the store.
   *
   * @param state
   * @returns {boolean}
   */
  initialised: (state) => {
    return state.initialised || false;
  },

  /**
   * Return the initialising state of the store.
   *
   * @param state
   * @returns {boolean}
   */
  initialising: (state) => {
    return state.initialising || false;
  },

  /**
   * Return the loading state of the store.
   *
   * @param state
   * @return {boolean}
   */
  loading: (state) => {
    return state.loading || false;
  },

  /**
   * Return the loaded state of the Store.
   *
   * @param state
   * @return {boolean}
   */
  loaded: (state) => {
    return state.loaded || false;
  },

  /**
   * Get the last error seen by this store.
   *
   * @param state
   * @return {undefined}
   */
  error: (state) => {
    return state.error || undefined;
  },


  /**
   * Return the Venue.
   *
   * @param state
   * @return {undefined}
   */
  venue: (state) => {
    return state.venue || undefined;
  },





  /**
   * Return the Venues attribute with the specified name.
   *
   * getAttributeWithName ?
   *
   * @param state
   * @return {function(*)}
   */
  getAttribute: (state) => (name) => {
    return state.venue[name] || undefined;
  },





  /**
   * Return the Update identified by the supplied executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  updatingVenueWithExecutionArn: (state) => (executionArn) => {
    return state.venueUpdates.find(venueUpdate => venueUpdate.executionArn === executionArn);
  },
}

export const actions = {
  /**
   * Initialise the store.
   *
   * @returns {Promise<void>}
   */
  async initialise ({dispatch, commit, getters}) {
    console.log(`## ADMIN VENUE - INITIALISING`);

    const isInitialised = getters['initialised'];

    if (isInitialised) {
      console.log(`## ADMIN VENUE - UN INITIALISING`);
      await dispatch('unload');
      await commit('setInitialised', false);
      await commit('setInitialising', false);
      console.log(`## ADMIN VENUE - UN INITIALISED`);
    }

    commit('setInitialising', true);

    // @todo any initialising steps

    commit('setInitialising', false);
    commit('setInitialised', true);
    console.log(`## ADMIN VENUE - INITIALISED`);
  },

  /**
   * Load the Venue from the api and update the Store.
   *
   * loadVenue ?
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loaded', false);
      commit('loading', true);

      const venue = await this.$api('admin').venue.getVenue();

      console.log("updateVenue", venue);

      commit('updateVenue', venue);
      commit('loaded', true);
    } catch (error) {
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  /**
   * Unload the Venue.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    commit('loading', false);
    commit('loaded', false);
    commit('error', undefined);

    commit('venue', undefined);
    commit('venueUpdates', []);
  },

  /**
   * Reload the Venue.
   *
   * @param dispatch
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    dispatch('unload');
    dispatch('load');
  },


  /**
   * Update the Venue.
   *
   * Use this action to update (PATCH) Venue attributes.
   *
   * Not all attributes can be updated.
   *
   * This action will update each attribute individually - making multiple calls to the api.
   *
   * This isn't a problem (ed. right now) - since we typically update attributes
   * individually in the UI.
   *
   * @param commit
   * @param getters
   * @param venueUpdate {{ languageId: (undefined|string), timezoneId: (undefined|string), currencyId: (undefined|string), themeId: (undefined|string)}}
   * @return {Promise<boolean>}
   */
  async updateVenue ({commit, getters}, venueUpdate) {

    const allowed = [
      'languageId',
      'timezoneId',
      'currencyId',
      'themeId',
      'addressId',

      // public, private
      'access',
      'status',

      // social sign-in providers - google, facebook apple
      'socialSignInProviders',
    ];

    // const update = [];

    for (const variable in venueUpdate) {
      const name = variable;

      if (! allowed.includes(name)) {
        console.log(`## UPDATE VENUE - ${name} CANNOT BE UPDATED!`);
      }
    }

    try {
      const updatingVenue = await this.$api('admin').venue.updateVenue(venueUpdate);
      console.log(`## UPDATING VENUE`);
      console.log(updatingVenue);

      const {executionArn} = updatingVenue;

      let update = {
        ...updatingVenue,
        ...{
          updating: true
        },
      };
      commit('updateVenueUpdate', update);

      ((executionArn) => {
        const getExecution = async () => {
          update = {
            ...update,
            ...{
              loading: true,
            }
          };
          commit('updateVenueUpdate', update);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          update = {
            ...update,
            ...{
              loading:false,
              status,
              stopDate
            }
          };
          commit('updateVenueUpdate', update);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## UPDATE VENUE - FAILED');
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, venue: updatedVenue} = output;

            if (error) {
              update = {
                ...update,
                ...{
                  error,
                  updating: false,
                  loaded: false
                },
              };
              commit('updateVenueUpdate', update);
            }

            if (updatedVenue) {
              update = {
                ...update,
                ...updatedVenue,
                ...{
                  updated: true,
                  updating: false,
                  loaded: true
                },
              };
              commit('updateVenueUpdate', update);

              updatedVenue = {
                ...updatedVenue,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateVenue', updatedVenue);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return updatingVenue;
    } catch (error) {
      throw error;
    }
  },



  // @todo refactor anything below this line

  /**
   *
   * @param commit
   * @param descriptionUpdate {{ languageId: string, text: string}}
   * @return {Promise<void>}
   */
  async updateDescription ({commit, getters}, descriptionUpdate) {

    let description = getters.getAttribute('description');

    description = {
      ...description,
      ...{
        loading: true,
        loaded: false,
        updating: true,
        updated: false,
        update: {
          ...descriptionUpdate
        }
      }
    };
    commit('updateVenue', {description});

    try {
      const updatingDescription = await this.$api('admin').venue.updateDescription(descriptionUpdate);
      console.log(`## UPDATING DESCRIPTION `);
      console.log(updatingDescription);

      const {executionArn} = updatingDescription;

      description = {
        ...description,
        ...{
          loading: false,
          loaded: false,
          updating: true,
          updated: false,
          update: {
            ...descriptionUpdate,
            ...updatingDescription
          }
        }
      };
      commit('updateVenue', {description});

      ((executionArn) => {
        const getExecution = async () => {

          description = {
            ...description,
            ...{
              loading: true,
              loaded: false,
              updating: true,
              updated: false,
              update: {
                ...descriptionUpdate,
                ...updatingDescription
              }
            }
          };
          commit('updateVenue', {description});

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## UPDATE DESCRIPTION - EXECUTION');
          console.log(execution);

          const {status} = execution;

          description = {
            ...description,
            ...{
              loading: false,
              loaded: false,
              updating: true,
              updated: false,
              update: {
                ...descriptionUpdate,
                ...updatingDescription,
                ...execution
              }
            }
          };
          commit('updateVenue', {description});

          if (status === 'RUNNING') {
            console.log('## UPDATE DESCRIPTION - RUNNING');
            setTimeout(getExecution, 5000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE THEME - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## UPDATE DESCRIPTION - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            console.log(`## OUTPUT`);
            console.log(output);

            let {error, label: updatedDescription} = output;

            if (error) {
              description = {
                ...description,
                ...{
                  loading: false,
                  loaded: false,
                  updating: false,
                  updated: true,
                  update: {
                    ...descriptionUpdate,
                    ...updatingDescription,
                    ...execution,
                    error
                  }
                }
              };
              commit('updateVenue', {description});
            }

            if (updatedDescription) {
              description = {
                ...description,
                ...updatedDescription,
                ...{
                  loading: false,
                  loaded: true,
                  updating: false,
                  updated: true,
                  update: undefined,
                }
              };
              commit('updateVenue', {description});
            }
          }

        };
        setTimeout(getExecution, 5000);
      })(executionArn);

      return updatingDescription;
    } catch (error) {
      const {message} = error;
      description = {
        ...description,
        ...{
          loading: false,
          loaded: false,
          updating: false,
          update: {
            ...descriptionUpdate,
            error: message,
          }
        }
      };
      commit('updateVenue', {description});

      throw error;
    }
  },

  /**
   * Load the Venue Description Label Object
   * @param commit
   * @return {Promise<void>}
   */
  async loadDescription ({commit}) {

    let description = {loading: true, loaded: false}
    commit('updateVenue', {description,});

    try {
      description = await this.$api('admin').venue.getDescription();

      description = {...description, ...{loading: false, loaded: true, error: undefined}}

      commit('updateVenue', {description,});

    } catch (error) {
      const {message} = error;
      description = {...description, ...{loading: false, loaded: false, error: message}}
      commit('updateVenue', {description,});
    }
  },
};
