/**
 * Venue App Admin Components Store.
 *
 * This store handles the Admin Components.
 */
export const state = () => ({
  /**
   * The list of Components that have been added to the Partition.
   */
  components: [],

  /**
   * The list of CreatingComponent(s)
   */
  creatingComponents: [],

  /**
   * The list of UpdatingComponent(s)
   */
  updatingComponents: [

  ],

  loaded: false,

  loading: false,

  error: undefined,
});

export const mutations = {
  /**
   * Set the Components to whatever is supplied.
   *
   * @param state
   * @param components []
   *
   */
  setComponents (state, components = []) {
    state.components = components || [];
  },

  /**
   * Update the supplied Component.
   *
   * @param state
   * @param component {{ componentId: string}}
   */
  updateComponent (state, component) {
    const {componentId} = component;
    const index = state.components.findIndex(item =>  item.componentId === componentId);

    if (index < 0) {
      state.components.push(component);
    } else {
      state.components.splice(index, 1, {...state.components[index], ...component})
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
   * Update the supplied CreatingComponent.
   *
   * @param state
   * @param creatingComponent {{name: string }}
   */
  updateCreatingComponent (state, creatingComponent) {
    const {name} = creatingComponent;
    const index = state.creatingComponents.findIndex(component => component.name === name);

    if (index < 0) {
      state.creatingComponents.push(creatingComponent)
    } else {
      state.creatingComponents.splice(index, 1, {...state.creatingComponents[index], ...creatingComponent});
    }
  },

  /**
   * @param state
   * @param updatingComponent
   */
  updateUpdatingComponent (state, updatingComponent) {
    const {executionArn} = updatingComponent;
    const index = state.updatingComponents.findIndex(item =>  item.executionArn === executionArn);

    if (index < 0) {
      state.updatingComponents.push(updatingComponent);
    } else {
      state.updatingComponents.splice(index, 1, {
        ...state.updatingComponents[index],
        ...updatingComponent
      });
    }
  },
};

export const getters = {

  /**
   * Return the Components.
   *
   * @param state
   * @return {[]|*[]}
   */
  components: (state) => {
    return state.components || [];
  },

  componentWithComponentId: (state) => (componentId) => {
    return state.components.find(component => component.componentId === componentId);
  },

  numberOfComponents: (state) => {
    return state.components.length || 0;
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
   * Return the CreatingComponent identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingComponentWithExecutionArn: (state) => (executionArn) => {
    return state.creatingComponents.find(creatingComponent => creatingComponent.executionArn === executionArn);
  },

  /**
   * Return the UpdateComponent identified with the specified executionArn.
   *
   * @param state
   * @returns {function(*): *}
   */
  updatingComponentWithExecutionArn: (state) => (executionArn) => {
    return state.updatingComponents.find(updatingComponent => updatingComponent.executionArn === executionArn);

  },
};

export const actions = {

  /**
   * Load the store with a list of Components.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loading', true);
      let {components, token} = await this.$api('admin').components.listComponents();

      components.map(component => commit('updateComponent',  {
        ...component,
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
    commit('setComponents', []);
  },

  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  async loadComponentWithComponentId ({commit}, componentId) {
    let componentToLoad = {
      componentId,
      loading: true,
      loaded: false
    };

    try {
      commit('updateComponent', componentToLoad);
      const component = await this.$api('admin').components.getComponentWithComponentId(componentId);

      componentToLoad = {
        ...component,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateComponent', componentToLoad);

    } catch (error) {
      const {message} = error;
      componentToLoad = {
        ...componentToLoad,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateComponent', componentToLoad);
    }
  },


  /**
   * Create a new Component.
   *
   * @param commit
   * @param component {{ name: string }}
   * @return {Promise<void>}
   */
  async createComponent ({commit}, component) {
    const {name} = component;

    if (! name) {
      throw new Error(`name is a required attribute when creating an Component.`)
    }

    let componentToCreate = {
      ...component,
      ...{
        error: undefined,
        creating: true,
      }
    };
    commit('updateCreatingComponent', componentToCreate);

    try {
      const creatingComponent = await this.$api('admin').components.createComponent(component);
      const {executionArn} = creatingComponent;

      componentToCreate = {
        ...componentToCreate,
        ...creatingComponent
      };
      commit('updateCreatingComponent', componentToCreate);

      // polling
      ((executionArn) => {

        const getExecution = async () => {
          componentToCreate = {
            ...componentToCreate,
            ...{
              loading: true
            }
          };
          commit('updateCreatingComponent', componentToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          componentToCreate = {
            ...componentToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingComponent', componentToCreate);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE ADDRESS - FAILED');
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, component: createdComponent} = output;

            if (error) {
              componentToCreate = {
                ...componentToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingComponent', componentToCreate);
            }

            if (createdComponent) {
              componentToCreate = {
                ...componentToCreate,
                ...createdComponent,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingComponent', componentToCreate);

              createdComponent = {
                ...createdComponent,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateComponent', createdComponent);

            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return creatingComponent;

    } catch (error) {
      const {message} = error;
      componentToCreate = {
        ...componentToCreate,
        ...{
          error: message,
          creating: false,
        }
      };
      commit('updateCreatingComponent', componentToCreate);

      throw error;
    }
  },

  /**
   * Update the Component.
   *
   * @param commit
   * *
   * @param updateComponent
   * @returns {Promise<*>}
   */
  async updateComponent ({commit}, updateComponent) {
    console.log(updateComponent);

    const {areaId, componentId} = updateComponent
    delete updateComponent.componentId

    if (! areaId) {
      throw new Error(`areaId is required`);
    }

    let componentUpdate = {
      componentId,
      updateComponent,
      updating: true,
      updated: false,
    }

    try {
      const updatingComponent = await this.$api('admin').components.updateComponentWithComponentId(componentId, updateComponent);
      const {executionArn} = updatingComponent;

      componentUpdate = {
        ...componentUpdate,
        ...updatingComponent,
      };
      commit('updateUpdatingComponent', componentUpdate);

      // start the polling function...
      ((executionArn) => {
        const getExecution = async () => {
          componentUpdate = {
            ...componentUpdate,
            ...{
              loading: true,
            }
          };
          commit('updateUpdatingComponent', componentUpdate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          console.log('## UPDATE EVENT - EXECUTION');
          console.log(execution);

          const {status, stopDate} = execution;

          componentUpdate = {
            ...componentUpdate,
            ...{
              loading: false,
              status,
              stopDate,
            }
          };
          commit('updateUpdatingComponent', componentUpdate);

          if (status === 'RUNNING') {
            console.log('## UPDATE EVENT - RUNNING');
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## UPDATE EVENT - FAILED');
          }

          if (status === 'SUCCEEDED') {
            console.log('## UPDATE EVENT - SUCCEEDED');

            let {output} = execution;
            output = JSON.parse(output);

            let {error, component: updatedComponent} = output;

            if (error) {
              componentUpdate = {
                ...componentUpdate,
                ...{
                  error,
                  updating: false,
                }
              };
              commit('updateUpdatingComponent', componentUpdate);
            }

            if (updatedComponent) {
              componentUpdate = {
                ...componentUpdate,
                ...{
                  updating: false,
                  updated: true,
                }
              };
              commit('updateUpdatingComponent', componentUpdate);

              let updatedComponent = {
                ...updatedComponent,
                ...{
                  loaded: true,
                  loading: false,
                }
              };
              commit('updateComponent', updatedComponent);
            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return updatingComponent;

    } catch (error) {
      const {message} = error;
      componentUpdate = {
        ...componentUpdate,
        ...{
          error: message,
          updating: false,
        }
      };
      commit('updateUpdatingComponent', componentUpdate);
      throw error;
    }
  },
};

