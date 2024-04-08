/**
 * Admin Integrations Store.
 */

/**
 * @return {{loaded: boolean, initialising: boolean, initialised: boolean, creatingIntegrations: *[], error: undefined, loading: boolean, integrations: *[]}}
 */
export const state = () => ({
  /**
   * The list of Integrations that have been added to the Venue/Partition.
   */
  integrations: [
    // {
    //   integrationId: 'integration:eventheads:stripe',
    //   type: 'integration',
    //   partition: 'eventheads',
    //   integrationType: 'stripe',
    // }
  ],

  /**
   * The list of Integrations that are added to the Venue/Partition.
   */
  creatingIntegrations: [

  ],

  loaded: false,
  error: undefined,
  initialising: false,
  initialised: false,
  loading: false,


});

export const mutations = {
  /**
   * Set the store integrations to whatever is supplied.
   *
   * @param state
   * @param integrations [{integrationId: string}]
   */
  setIntegrations (state, integrations = []) {
    state.integrations = integrations;
  },

  /**
   * Update the Integration.
   *
   * @param state
   * @param integration {{ integrationType: string, integrationId: string, type: string, partition: string}}
   */
  updateIntegration (state, integration) {
    const {integrationId} = integration;
    const index = state.integrations.findIndex(item =>  item.integrationId === integrationId);

    if (index < 0) {
      state.integrations.push(integration);
    } else {
      state.integrations.splice(index, 1, {...state.integrations[index], ...integration})
    }
  },

  /**
   * Set the pagination token.
   *
   * @param state
   * @param token {string|undefined}
   */
  token (state, token = undefined) {
    state.token = token;
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
   * Update the CreatingIntegration identified by the specified integrationType
   *
   * @param state
   * @param creatingIntegration {{integrationType: string}}
   */
  updateCreatingIntegration (state, creatingIntegration) {
    const {integrationType} = creatingIntegration;
    const index = state.creatingIntegrations.findIndex(item =>  item.integrationType === integrationType);

    if (index < 0) {
      state.creatingIntegrations.push(creatingIntegration);
    } else {
      state.creatingIntegrations.splice(index, 1, {...state.creatingIntegrations[index], ...creatingIntegration})
    }
  },

};

export const getters = {
  /**
   * Return all Integrations in the store.
   *
   * @param state
   * @return {[]|*[]}
   */
  integrations: (state) => {
    return state.integrations || [];
  },

  /**
   * Return the Integration identified by the supplied integrationType.
   *
   * @param state
   * @return {function(*): *}
   */
  integrationWithName: (state) => (integrationType) => {
    return state.integrations.find(integration => integration.integrationType === integrationType);
  },

  /**
   * Return the number of Integrations.
   *
   * @param state
   * @return {number|number}
   */
  numberOfIntegrations: (state) => {
    return state.integrations.length || 0;
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
   * Return the CreatingIntegration with the supplied executionArn.
   *
   * @param state
   * @return {(function(*))|*}
   */
  creatingIntegrationWithExecutionArn: (state) => (executionArn) => {
    return state.creatingIntegrations.find(integration => integration.executionArn === executionArn);
  },
};

export const actions = {
  /**
   * Load the Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {
      console.log(`## ADMIN APP - INTEGRATIONS STORE - LOAD`);
      commit('loading', true);
      commit('loaded', false);

      const {integrations, token} = await this.$api('admin').integrations.listIntegrations();

      commit('setIntegrations',
        integrations.map(integration => {
          return Object.assign({}, integration, {
            loading: false,
            loaded: true,
            error: undefined,
          })
        })
      );
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
   * Unload the entire Store.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async unload ({commit}) {
    commit('token', undefined);
    commit('error', undefined);
    commit('loading', false);
    commit('loaded', false);
    commit('setIntegrations', []);
  },

  /**
   * Reload the Store.
   *
   * @return {Promise<void>}
   */
  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  /**
   * Load the store with the Integration identified by the supplied integrationType.
   *
   * @param commit
   * @param integrationType {string}
   * @return {Promise<void>}
   */
  async loadIntegrationWithName({ commit }, integrationType) {
    let integration = { integrationType, loading: true, loaded: false };
    commit('updateIntegration', integration);

    try {
      const response = await this.$api('admin').integrations.getIntegrationWithIntegrationType(integrationType);
      integration = { ...response, loading: false, loaded: true };
      commit('updateIntegration', integration);
      return integration;

    } catch (error) {
      const { message } = error;
      integration = { ...integration, loading: false, loaded: false, error: message };
      commit('updateIntegration', integration);
      return null;
    }
  },


  /**
   * Create an Integration in the Venue.
   *
   * @param commit
   * @param integration {{ integrationType: string}}
   * @return {Promise<void>}
   */
  async createIntegration ({commit}, integration) {
    const {integrationType} = integration;

    if (! integrationType) {
      throw new Error(`integrationType is required attribute when creating an Integration`);
    }

    let integrationToCreate = {
      ...integration,
      ...{
        creating: true,
        error: undefined,
      }
    };
    commit('updateCreatingIntegration', integrationToCreate);
    try {
      const creatingIntegration = await this.$api('admin').integrations.createIntegration(integration);
      const {executionArn} = creatingIntegration;

      integrationToCreate = {
        ...integrationToCreate,
        ...creatingIntegration
      };

      commit('updateCreatingIntegration', integrationToCreate);

      ((executionArn) => {
        const getExecution = async () => {
          integrationToCreate = {
            ...integrationToCreate,
            ...{
              loading: true
            }
          };
          commit('updateCreatingIntegration', integrationToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);

          const {status, stopDate} = execution;
          integrationToCreate = {
            ...integrationToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingIntegration', integrationToCreate);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 3000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE INTEGRATION - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE INTEGRATION - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            console.log(`## OUTPUT`);
            console.log(output);

            let {error, integration: createdIntegration} = output;
            console.log("ERROR",error)

            if (error) {
              integrationToCreate = {
                ...integrationToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingIntegration', integrationToCreate);
            }

            if (createdIntegration) {
              integrationToCreate = {
                ...integrationToCreate,
                ...createdIntegration,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingIntegration', integrationToCreate);

              createdIntegration = {
                ...createdIntegration,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateIntegration', createdIntegration);
            }
          }
        };

        setTimeout(getExecution, 3000);
      })(executionArn);

      return creatingIntegration;

    } catch (error) {
      const {message} = error;
      integrationToCreate = {
        ...integrationToCreate,
        ...{
          error: message,
          creating: false,
          loaded: false,
          loading: false
        }
      };
      commit('updateCreatingIntegration', integrationToCreate);

      throw error;
    }
  },
};
