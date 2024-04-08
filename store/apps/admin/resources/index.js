/**
 * Resources Store
 *
 */

export const state = () => ({
  /**
   * The list of Resources that belong to the Partition/Venue.
   */
  resources: [
    // {
    //   resourceId: ''
    // }
  ],

  /**
   * The list of Resources that are being created.
   */
  creatingResources: [

  ],



  /**
   * Has the store loaded?
   */
  loaded: false,

  /**
   * Is the store loading?
   */
  loading: false,

  /**
   * The last error
   */
  error: undefined,

  initialising: false,

  initialised: false,
});

export const mutations = {
  /**
   * Set the resources to what ever is supplied.
   *
   * @param state
   * @param resources [{name: string }]
   */
  setResources(state, resources = []) {
    state.resources = resources || [];
  },

  /**
   * Update the supplied Resource.
   *
   * @param state
   * @param resource {{ resourceId: string}}
   */
  updateResource (state, resource) {
    const {resourceId} = resource;
    const index = state.resources.findIndex(item =>  item.resourceId === resourceId);

    if (index < 0) {
      state.resources.push(resource);
    } else {
      state.resources.splice(index, 1, {...state.resources[index], ...resource})
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
   * Set the createResources state to whatever is supplied.
   *
   * @param state
   * @param creatingResources
   */
  setCreatingResources (state, creatingResources = []) {
    state.creatingResources = creatingResources;
  },

  /**
   * Update the specified creatingResource item.
   *
   * @param state
   * @param creatingResource {{name: string}}
   */
  updateCreatingResource (state, creatingResource) {
    // @todo `name` may not be accurate enough - we might need to include `itemId` if its available
    const {name} = creatingResource;
    const index = state.creatingResources.findIndex(item =>  item.name === name);

    if (index < 0) {
      state.creatingResources.push(creatingResource);
    } else {
      state.creatingResources.splice(index, 1, {...state.creatingResources[index], ...creatingResource})
    }
  },
};

export const getters = {
  // RESOURCES

  /**
   * Return the Resources.
   *
   * @param state
   * @return {*[]}
   */
  resources: (state) => {
    return state.resources || [];
  },

  /**
   * Return the number of Resources.
   *
   * @param state
   * @return {number|number}
   */
  numberOfResources: (state) => {
    return state.resources.length || 0;
  },

  /**
   * Return the Resource identified by the specified ResourceId.
   *
   * @param state
   * @return {function(*): *}
   */
  resourceWithResourceId: (state) => (resourceId) => {
    return state.resources.find(resource => resource.resourceId === resourceId);
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

  // CREATING RESOURCES

  /**
   * Return the CreatingResource identified by the supplied executionArn.
   *
   * @param state
   * @return {(function(*))|*}
   */
  creatingResourceWithExecutionArn: (state) => (executionArn) => {
    return state.creatingResources.find(resource => resource.executionArn === executionArn);
  },
};

export const actions = {

  /**
   * Load the store with a list of Themes.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load({commit}) {
    console.log(`## ADMIN RESOURCES - LOAD`);
    try {
      commit('loading', true);
      let {resources, token} = await this.$api('admin').resources.listResources();

      resources = resources.map((resource) => {
        commit('updateResource', {...resource, error: undefined, loading: false, loaded: true})
      });

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
    commit('setResources', []);
  },

  async reload ({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  // async loadResourceWithResourceId ({commit}, resourceId) {
  //   let resourceToLoad = {
  //     resourceId,
  //     loading: true,
  //     loaded: false,
  //   };
  //
  //   try {
  //     commit('updateResource', resourceToLoad);
  //     const resource = await this.$api('admin').resources.getResourceWithResourceId(resourceId);
  //
  //     resourceToLoad = {
  //       ...resource,
  //       ...{
  //         loading: false,
  //         loaded: true
  //       }
  //     };
  //     commit('updateResource', resourceToLoad);
  //
  //   } catch (error) {
  //     const {message} = error;
  //     resourceToLoad = {
  //       ...resourceToLoad,
  //       ...{
  //         loading: false,
  //         loaded: false,
  //         error: message
  //       }
  //     };
  //     commit('updateResource', resourceToLoad);
  //   }
  // },

  /**
   * Load the Resource with the specified ResourceId.
   *
   * @param commit
   * @param resourceId {string}
   * @returns {Promise<void>}
   */
  async loadResourceWithResourceId ({commit}, resourceId) {
    let resourceToLoad = {
      resourceId,
      loading: true,
      loaded: false
    };

    console.log("loadREsourceWithResourceId resourceToLoad", resourceToLoad);

    try {
      commit('updateResource', resourceToLoad);
      const resource = await this.$api('admin').resources.getResourceWithResourceId(resourceId);
      console.log("resourcei nload", resource);

      resourceToLoad = {
        ...resourceToLoad,
        ...resource,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateResource', resourceToLoad);

    } catch (error) {
      const {message} = error;
      resourceToLoad = {
        ...resourceToLoad,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateResource', resourceToLoad);
    }
  },

  /**
   * Load Url of the resource Id.
   *
   * @param {commit, getters}
   * @param resourceId
   * @return {Promise<void>}
   */
  async loadResourceUrlWithResourceId({commit, getters}, resourceId) {
    try {

      const { url, timeout } = await this.$api('admin').resources.getGetUrlWithResourceId(resourceId);

      let resource = getters.resourceWithResourceId(resourceId);

      commit('updateResource', {
        ...resource,
        url,
        timeout,
        error: undefined,
        loading: false,
        loaded: true
      })

    } catch (error) {

    } finally {

    }
  },

  /**
   * Create a new Resource.
   *
   * @param resource
   * @return {Promise<void>}
   */
  async createResource({commit}, resource) {
    console.log(`## CREATE RESOURCE`);
    const {name, file, itemId} = resource;

    if (! name) {
      throw new Error(`name is a required attribute when creating a Resource`);
    }

    if (! file) { // a File
      throw new Error(`file is a required attribute when creating a Resource`);
    }

    if (! itemId) {
      throw new Error(`itemId is a required attribute when creating a Resource`);
    }

    // create our copy of the resource
    let resourceToCreate = {
      ...{
        name,
        itemId
      },
      ...{
        creating: true,
        error: undefined
      }
    };
    commit('updateCreatingResource', resourceToCreate);

    try {
      const creatingResource = await this.$api('admin').resources.createResource(resource);
      const {executionArn} = creatingResource;

      resourceToCreate = {
        ...resourceToCreate,
        ...creatingResource,
        ...{
          creating: true,
        }
      };
      commit('updateCreatingResource', resourceToCreate);


      // @todo Luis - how can we wrap this in a Promise?
      //              so that we could run it with await and use the result of the polling
      //              function (if wanted to).
      // const response = await poll(executionArn);
      // await poll(executionArn);
      ((executionArn) => {
        const getExecution = async () => {
          resourceToCreate = {
            ...resourceToCreate,
            ...{
              loading: true,
            }
          };
          commit('updateCreatingResource', resourceToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## CREATE RESOURCE - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          resourceToCreate = {
            ...resourceToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingResource', resourceToCreate);

          if (status === 'RUNNING') {
            console.log('## CREATE RESOURCE - RUNNING');
            setTimeout(getExecution, 1000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE RESOURCE - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## CREATE RESOURCE - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            console.log(`## OUTPUT`);
            console.log(output);

            let {error, resource: createdResource} = output;

            if (error) {
              resourceToCreate = {
                ...resourceToCreate,
                ...{
                  creating: false,
                  created: false,
                  error,
                }
              };
              commit('updateCreatingResource', resourceToCreate);
            }

            if (createdResource) {
              resourceToCreate = {
                ...resourceToCreate,
                ...createdResource,
                ...{
                  creating: false,
                  created: true,
                  loaded: true,
                }
              };
              commit('updateCreatingResource', resourceToCreate);

              createdResource = {
                ...createdResource,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              }

              commit('updateResource', createdResource);

              const {resourceId} = createdResource;

              const {url} = await this.$api('admin').resources.getPutUrlWithResourceId(resourceId);

              return await this.$api('admin').resources.putFile(url, file);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return creatingResource;

    } catch (error) {

      const {message} = error;
      resourceToCreate = {
        ...resourceToCreate,
        ...{
          error: message,
          creating: false,
          loaded: false,
          loading: false
        }
      };
      commit('updateCreatingResource', resourceToCreate);
      throw error;
    }

    const {putUrl} = createdResource

    if (! putUrl) {
      throw new Error(`putUrl not returned`);
    }

    await this.$api('admin').resources.putFile(putUrl, file);

    return createdResource;
  },
};
