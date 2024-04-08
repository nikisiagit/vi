/**
 * Venue App Admin Addresses Store.
 *
 * This store handles the Admin Addresses.
 */
export const state = () => ({
  /**
   * The list of Addresses that have been added to the Partition.
   */
  addresses: [],

  /**
   * The list of CreatingAddresses.
   */
  creatingAddresses: [],

  loaded: false,

  loading: false,

  error: undefined,
});

export const mutations = {
  /**
   * Set the Addresses to whatever is supplied.
   *
   * @param state
   * @param addresses []
   *
   */
  setAddresses (state, addresses = []) {
    state.addresses = addresses || [];
  },

  /**
   * Update the supplied Address.
   *
   * @param state
   * @param address {{ addressId: string}}
   */
  updateAddress (state, address) {
    const {addressId} = address;
    const index = state.addresses.findIndex(item =>  item.addressId === addressId);

    if (index < 0) {
      state.addresses.push(address);
    } else {
      state.addresses.splice(index, 1, {...state.addresses[index], ...address})
    }
  },

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
   * Set th stores token.
   *
   * @param state
   * @param token
   */
  token (state, token = undefined) {
    state.token = token;
  },

  /**
   * Update the supplied CreatingAddress.
   *
   * @param state
   * @param creatingAddress {{name: string }}
   */
  updateCreatingAddress (state, creatingAddress) {
    const {name} = creatingAddress;
    const index = state.creatingAddresses.findIndex(address => address.name === name);

    if (index < 0) {
      state.creatingAddresses.push(creatingAddress)
    } else {
      state.creatingAddresses.splice(index, 1, {...state.creatingAddresses[index], ...creatingAddress});
    }
  },
};

export const getters = {

  /**
   * Return the Addresses.
   *
   * @param state
   * @return {[]|*[]}
   */
  addresses: (state) => {
    return state.addresses || [];
  },

  addressWithAddressId: (state) => (addressId) => {
    return state.addresses.find(address => address.addressId === addressId);
  },

  numberOfAddresses: (state) => {
    return state.addresses.length || 0;
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

  /**
   * Return the CreatingAddress identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingAddressWithExecutionArn: (state) => (executionArn) => {
    return state.creatingAddresses.find(creatingAddress => creatingAddress.executionArn === executionArn);
  },
};

export const actions = {

  /**
   * Load the store with a list of Addresses.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loading', true);
      let {addresses, token} = await this.$api('admin').addresses.listAddresses();

      addresses.map(address => commit('updateAddress',  {
        ...address,
        ...{
          error: undefined,
          loading: false,
          loaded: true
        }
      }));

      commit('token', token);
      commit('loaded', true);
    } catch (error) {
      commit('error', error);
      commit('loaded', false);
    } finally {
      commit('loading', false);
    }
  },

  async unload({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setAddresses', []);
  },

  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  async loadAddressWithAddressId ({commit}, addressId) {
    let addressToLoad = {
      addressId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateAddress', addressToLoad);
      const address = await this.$api('admin').addresses.getAddressWithAddressId(addressId);

      addressToLoad = {
        ...address,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateAddress', addressToLoad);

    } catch (error) {
      const {message} = error;
      addressToLoad = {
        ...addressToLoad,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateAddress', addressToLoad);
    }
  },


  /**
   * Create a new Address.
   *
   * @param commit
   * @param address {{ name: string }}
   * @return {Promise<void>}
   */
  async createAddress ({commit}, address) {
    const {name} = address;

    if (! name) {
      throw new Error(`name is a required attribute when creating an Address.`)
    }

    let addressToCreate = {
      ...address,
      ...{
        error: undefined,
        creating: true,
      }
    };
    commit('updateCreatingAddress', addressToCreate);

    try {
      const creatingAddress = await this.$api('admin').addresses.createAddress(address);
      const {executionArn} = creatingAddress;

      addressToCreate = {
        ...addressToCreate,
        ...creatingAddress
      };
      commit('updateCreatingAddress', addressToCreate);

      // polling
      ((executionArn) => {
        const getExecution = async () => {
          addressToCreate = {
            ...addressToCreate,
            ...{
              loading: true
            }
          };
          commit('updateCreatingAddress', addressToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          addressToCreate = {
            ...addressToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingAddress', addressToCreate);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE ADDRESS - FAILED');
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, address: createdAddress} = output;

            if (error) {
              addressToCreate = {
                ...addressToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingAddress', addressToCreate);
            }

            if (createdAddress) {
              addressToCreate = {
                ...addressToCreate,
                ...createdAddress,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingAddress', addressToCreate);

              createdAddress = {
                ...createdAddress,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateAddress', createdAddress);

            }
          }
        };
        setTimeout(getExecution, 3000);
      })(executionArn);

      return creatingAddress;

    } catch (error) {
      const {message} = error;
      addressToCreate = {
        ...addressToCreate,
        ...{
          error: message,
          creating: false,
        }
      };
      commit('updateCreatingAddress', addressToCreate);

      throw error;
    }
  },
};

