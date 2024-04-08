/**
 * Venue App (Admin) - Advertisements
 *
 * This store is used by the Venue App (Admin) to manage the Advertisements in the Venue.
 */

/**
 * @return {{loaded: boolean, initialising: boolean, initialised: boolean, advertisements: *[], error: undefined, loading: boolean}}
 */
export const state = () => ({
  /**
   * The list of Advertisements that belong to the Partition/Venue.
   */
  advertisements: [],

  loaded: false,
  error: undefined,
  initialising: false,
  initialised: false,
  loading: false,


  /**
   * The list of CreatingAdvertisement items.
   */
  creatingAdvertisements: [],
});

export const mutations = {
  /**
   * Set the Advertisements state to whatever is supplied.
   *
   * @param state
   * @param advertisements [{}]
   */
  setAdvertisements (state, advertisements = []) {
    state.advertisements = advertisements;
  },

  /**
   * Update the specified Advertisement.
   *
   * @param state
   * @param advertisement {{ advertisementId: string, name: string, partition: string, type: string}}
   */
  updateAdvertisement (state, advertisement) {
    const {advertisementId} = advertisement;
    const index = state.advertisements.findIndex(item =>  item.advertisementId === advertisementId);

    if (index < 0) {
      state.advertisements.push(advertisement);
    } else {
      state.advertisements.splice(index, 1, {...state.advertisements[index], ...advertisement})
    }
  },

  /**
   * @param state
   * @param token
   */
  token (state, token = undefined) {
    state.token = token;
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

  /**
   * @param state
   * @param error
   */
  error (state, error = undefined) {
    state.error = error;
  },

  /**
   * Update (or insert) the specified CreatingAdvertisement item.
   *
   * @param state
   * @param creatingAdvertisement {{name: string}}
   */
  updateCreatingAdvertisement (state, creatingAdvertisement) {
    const {name} = creatingAdvertisement;
    const index = state.creatingAdvertisements.findIndex(item =>  item.name === name);

    if (index < 0) {
      state.creatingAdvertisements.push(creatingAdvertisement);
    } else {
      state.creatingAdvertisements.splice(index, 1, {...state.creatingAdvertisements[index], ...creatingAdvertisement})
    }
  },
};

export const getters = {
  /**
   * @param state
   * @return {[]|*[]}
   */
  advertisements: (state) => {
    return state.advertisements || [];
  },

  /**
   * Return the number of Advertisements.
   *
   * @param state
   * @return {number|number}
   */
  numberOfAdvertisements: (state) => {
    return state.advertisements.length || 0;
  },

  /**
   * Return the Advertisement identified with the specified name.
   *
   * @param state
   * @return {function(*): *}
   */
  advertisementWithName: (state) => (name) => {
    return state.advertisements.find(advertisement => advertisement.name === name);
  },

  /**
   * Return the Advertisement identified by the supplied AdvertisementId.
   *
   * @param state
   * @return {function(*): *}
   */
  advertisementWithAdvertisementId: (state) => (advertisementId) => {
    return state.advertisements.find(advertisement => advertisement.advertisementId === advertisementId);
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
   * Return the CreatingAdvertisement identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingAdvertisementWithExecutionArn: (state) => (executionArn) => {
    return state.creatingAdvertisements.find(creatingAdvertisement => creatingAdvertisement.executionArn === executionArn);
  }
};

export const actions = {
  /**
   * Load the Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load({commit}) {
    try {
      console.log(`## VENUE APP ADMIN - ADVERTISEMENTS STORE - LOAD`);
      commit('loading', true);
      commit('loaded', false);

      const {advertisements, token} = await this.$api('admin').advertisements.listAdvertisements();

      commit('setAdvertisements',
        advertisements.map(advertisement => {
          return Object.assign({}, advertisement, {
            loading: true,
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
   * @param commit
   * @return {Promise<void>}
   */
  async unload({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setAdvertisements', []);
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
   * Load the Advertisement with the specified name.
   *
   * @param commit
   * @param name
   * @return {Promise<void>}
   */
  async loadAdvertisementWithName({commit}, name) {
    try {
      commit('loading', true);
      const advertisement = await this.$api('admin').advertisements.getAdvertisementWithName(name);

      commit('updateAdvertisement', Object.assign({}, advertisement, {
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
   * Create a new Advertisement.
   *
   * @param commit
   * @param advertisement {{name: string}}
   * @return {Promise<any>}
   */
  async createAdvertisement ({commit}, advertisement) {

    const {name} = advertisement;

    if (! name) {
      throw new Error(`name is a required attribute when creating an Advertisement`);
    }

    let advertisementToCreate = {
      ...advertisement,
      ...{creating: true}
    };
    commit('updateCreatingAdvertisement', advertisementToCreate);

    try {
      const creatingAdvertisement = await this.$api('admin').advertisements.createAdvertisement(advertisement);
      const {executionArn} = creatingAdvertisement;

      advertisementToCreate = {
        ...advertisementToCreate,
        ...creatingAdvertisement,
      };
      commit('updateCreatingAdvertisement', advertisementToCreate);

      // start the polling function
      ((executionArn) => {
        const getExecution = async () => {
          advertisementToCreate = {
            ...advertisementToCreate,
            ...{
              loading: true
            }
          };
          commit('updateCreatingAdvertisement', advertisementToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## CREATE ADVERTISEMENT - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;
          advertisementToCreate = {
            ...advertisementToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingAdvertisement', advertisementToCreate);


          if (status === 'RUNNING') {
            console.log('## CREATE ADVERTISEMENT - RUNNING');
            setTimeout(getExecution, 3000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE ADVERTISEMENT - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE ADVERTISEMENT - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            console.log(`## OUTPUT`);
            console.log(output);

            let {error, advertisement: createdAdvertisement} = output;

            if (error) {
              advertisementToCreate = {
                ...advertisementToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingAdvertisement', advertisementToCreate);
            }

            if (createdAdvertisement) {
              advertisementToCreate = {
                ...advertisementToCreate,
                ...createdAdvertisement,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingAdvertisement', advertisementToCreate);

              createdAdvertisement = {
                ...createdAdvertisement,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateAdvertisement', createdAdvertisement);
            }
          }
        };

        setTimeout(getExecution, 3000);
      })(executionArn);

      return creatingAdvertisement;

    } catch (error) {
      const {message} = error;
      advertisementToCreate = {
        ...advertisementToCreate,
        ...{
          error: message,
          creating: false
        }
      };
      commit('updateCreatingAdvertisement', advertisementToCreate);
    }
  },
}
