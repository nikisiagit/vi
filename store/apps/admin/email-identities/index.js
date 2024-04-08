/**
 * [PRO-236] Venue App (Admin) - Email - Identities List
 *
 * This store provides the client side interface to the Region - EmailIdentities services.
 *
 * @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-236
 * @link https://5-guys.atlassian.net/jira/polaris/projects/PRO/ideas/view/888327?selectedIssue=PRO-151
 */

/**
 * @returns {{initialising: boolean, initialised: boolean, loaded: undefined, creatingEmailIdentities: *[], emailIdentities: *[], loading: undefined, error: undefined, token: undefined}}
 */
export const state = () => ({
  /**
   * Is this store initialising?
   */
  initialising: false,

  /**
   * Has this store been initialised?
   */
  initialised: false,

  /**
   * Is the store loading?
   */
  loading: undefined,

  /**
   * Has the store loaded?
   */
  loaded: undefined,

  /**
   * The most recent error.
   */
  error: undefined,

  /**
   * Pagination token.
   */
  token: undefined,

  /**
   * The list of EmailIdentities.
   */
  emailIdentities: [],

  /**
   * The list of CreatingEmailIdentity objects.
   *
   * See CreateEmailIdentity.
   */
  creatingEmailIdentities: [],
});


export const mutations = {
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
   * Set the initialised state of the store.
   *
   * @param state
   * @param initialised
   */
  setInitialised (state, initialised = false) {
    state.initialised = initialised;
  },

  /**
   * Set the loading state of the store.
   *
   * @param state
   * @param loading {boolean}
   */
  setLoading (state, loading = false) {
    state.loading = loading;
  },

  /**
   * Set the loaded state of the store.
   *
   * @param state
   * @param loaded {boolean}
   */
  setLoaded (state, loaded = false) {
    state.loaded = loaded;
  },

  /**
   * Set the token state of the store.
   *
   * @param state
   * @param token
   */
  setToken (state, token = undefined) {
    state.token = token;
  },

  /**
   * Set the error
   *
   * @param state
   * @param error {undefined|string}
   */
  setError (state, error = undefined) {
    state.error = error;
  },


  // EMAIL IDENTITIES

  /**
   * Set the list of EmailIdentities.
   *
   * @param state
   * @param emailIdentities
   */
  setEmailIdentities (state, emailIdentities = []) {
    state.emailIdentities = emailIdentities || [];
  },

  /**
   * Update (or insert) the specified EmailIdentity.
   *
   * @param state
   * @param emailIdentity
   */
  updateEmailIdentity (state, emailIdentity) {
    const {emailIdentityId} = emailIdentity;
    const index = state.emailIdentities.findIndex(item =>  item.emailIdentityId === emailIdentityId);

    if (index < 0) {
      state.emailIdentities.push(emailIdentity);
    } else {
      state.emailIdentities.splice(
        index,
        1,
        {
          ...state.emailIdentities[index],
          ...emailIdentity
        }
      );
    }
  },

  // CREATE EMAIL IDENTITY

  /**
   * Set the list of CreatingEmailIdentities.
   *
   * @param state
   * @param creatingEmailIdentities
   */
  setCreatingEmailIdentities (state, creatingEmailIdentities = []) {
    state.creatingEmailIdentities = creatingEmailIdentities || [];
  },

  /**
   * Update the CreatingEmailIdentity in the store.
   *
   * @param state
   * @param creatingEmailIdentity
   */
  updateCreatingEmailIdentity (state, creatingEmailIdentity) {
    const {name} = creatingEmailIdentity;
    const index = state.creatingEmailIdentities.findIndex(item =>  item.name === name);

    if (index < 0) {
      state.creatingEmailIdentities.push(creatingEmailIdentity);
    } else {
      state.creatingEmailIdentities.splice(
        index,
        1,
        {
          ...state.creatingEmailIdentities[index],
          ...creatingEmailIdentity
        }
      );
    }
  },
};


export const getters = {
  /**
   * Is the store initialising?
   *
   * @param state
   * @returns {boolean}
   */
  initialising: (state) => {
    return state.initialising || false;
  },

  /**
   * Has the store initialised?
   *
   * @param state
   * @returns {boolean}
   */
  initialised: (state) => {
    return state.initialised || false;
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
   * Return the list of EmailIdentities.
   *
   * @param state
   * @returns {[]|*[]}
   */
  emailIdentities: (state) => {
    return state.emailIdentities || [];
  },

  /**
   * Return the EmailIdentity identified by the supplied EmailIdentityId.
   *
   * @param state
   * @returns {function(*): *}
   */
  emailIdentityWithEmailIdentityId: (state) => (emailIdentityId) => {
    return state.emailIdentities.find(emailIdentity => emailIdentity.emailIdentityId === emailIdentityId);
  },

  /**
   * Return the number of EmailIdentity items in the Partition.
   *
   * @param state
   * @returns {number|number}
   */
  numberOfEmailIdentities: (state) => {
    return state.emailIdentities.length || 0;
  },

  /**
   * Return the list of CreatingEmailIdentities.
   *
   * @param state
   * @returns {[]|*[]}
   */
  creatingEmailIdentities: (state) => {
    return state.creatingEmailIdentities || [];
  },

  /**
   * Return the list of CreatingEmailIdentities.
   *
   * @param state
   * @returns {number|number}
   */
  numberOfCreatingEmailIdentities: (state) => {
    return state.creatingEmailIdentities.length || 0;
  },

  /**
   * Return the CreatingEmailIdentity identified by the supplied executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  creatingEmailIdentityWithExecutionArn: (state) => (executionArn) => {
    return state.creatingEmailIdentities.find(creatingEmailIdentity => creatingEmailIdentity.executionArn === executionArn);
  }
};


export const actions = {

  /**
   * Initialise the store.
   *
   * @param dispatch
   * @param commit
   * @returns {Promise<void>}
   */
  async initialise ({dispatch, commit}) {
    console.log(`## ADMIN EMAIL IDENTITIES - INITIALISE`);

    const isInitialised = getters['initialised'];

    if (isInitialised) {
      console.log(`## ADMIN EMAIL IDENTITIES - UN INITIALISING`)

      await dispatch('unload');
      await commit('setInitialised', false);
      await commit('setInitialising', false);

      console.log(`## ADMIN EMAIL IDENTITIES - UN INITIALISED`)
    }

    commit('setInitialising', true);

    // @todo any initialising steps

    commit('setInitialising', false);
    commit('setInitialised', true);

    console.log(`## ADMIN VENUE - INITIALISED`);
  },

  /**
   * Load the store with a list of EmailIdentities.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async load({commit}) {
    try {
      commit('setLoading', true);

      const {token, emailIdentities} = await this.$api('admin').emailIdentities.listEmailIdentities();

      emailIdentities.map((emailIdentity) => {
        commit('updateEmailIdentity', {
          ...emailIdentity,
          ...{
            loaded: true,
            loading: false,
            error: undefined,
          }
        });
      });

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
   * Unload all state from the store.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async unload({commit}) {
    commit('setToken', undefined);
    commit('setError', undefined);
    commit('setLoading', false);
    commit('setLoaded', false);
    commit('setEmailIdentities', []);
    commit('setCreatingEmailIdentities', []);
  },

  /**
   * Reload the store.
   *
   * @param dispatch
   * @returns {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Create a new EmailIdentity.
   *
   * @param commit
   * @param createEmailIdentity
   * @returns {Promise<*&{created: boolean, creating: boolean, error: *}>}
   */
  async createEmailIdentity({commit}, createEmailIdentity) {
    try {
      const {emailAddress} = createEmailIdentity;

      if (! emailAddress) {
        throw new Error(`An email address is required`);
      }


      let creatingEmailIdentity = await this.$api('admin').emailIdentities.createEmailIdentity(createEmailIdentity);

      const {
        executionArn,
        startDate
      } = creatingEmailIdentity

      creatingEmailIdentity = {
        ...creatingEmailIdentity,
        ...createEmailIdentity,
        ...{
          error: undefined,
          creating: true,
          created: false,
        }
      };
      commit('updateCreatingEmailIdentity', creatingEmailIdentity);

      // poll
      ((executionArn) => {
        const getExecution = async () => {
          creatingEmailIdentity = {
            ...creatingEmailIdentity,
            ...{
              loading: true
            }
          };
          commit('updateCreatingEmailIdentity', creatingEmailIdentity);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          creatingEmailIdentity = {
            ...creatingEmailIdentity,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingEmailIdentity', creatingEmailIdentity);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE EMAIL IDENTITY - FAILED');
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, emailIdentity} = output;

            if (error) {
              creatingEmailIdentity = {
                ...creatingEmailIdentity,
                ...{
                  error,
                  created: false,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingEmailIdentity', creatingEmailIdentity);
            }

            if (emailIdentity) {
              creatingEmailIdentity = {
                ...creatingEmailIdentity,
                ...emailIdentity,
                ...{
                  created: true,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingEmailIdentity', creatingEmailIdentity);

              emailIdentity = {
                ...emailIdentity,
                ...{
                  loaded: true,
                  loading: false,
                  error: undefined,
                }
              };
              commit('updateEmailIdentity', emailIdentity);
            }
          }
        };

        setTimeout(getExecution, 3000);
      })(executionArn);

      return creatingEmailIdentity;

    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  /**
   * Load the EmailIdentity identified by the supplied EmailIdentityId
   *
   * @param emailIdentityId
   * @returns {Promise<void>}
   */
  async loadEmailIdentityWithEmailIdentityId({commit}, emailIdentityId) {
    console.log(`## ADMIN EMAIL IDENTITIES - LOAD EMAIL IDENTITY WITH ${emailIdentityId}`)

    try {
      const emailIdentity = await this.$api('admin').emailIdentities.getEmailIdentityWithEmailIdentityId(emailIdentityId);

      commit('updateEmailIdentity', {
        ...emailIdentity,
        ...{
          loading: false,
          loaded: true,
        }
      });

    } catch (error) {
      const {message} = error;
      console.log(message);
    }
  },
};
