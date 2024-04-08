/**
 * Venue App Admin Areas Store.
 *
 * This store handles the Admin Areas.
 */
export const state = () => ({
  /**
   * The list of Areas that have been added to the Partition.
   */
  areas: [],
  //   [
  //   {
  //     icon: 'mdi-home',
  //     /// --- others ----
  //
  //     areaId: 'area:eventheads:home',
  //     type: 'area',
  //     partition: 'eventheads',
  //     name: 'home',
  //
  //     // components list
  //     components: [
  //       // a header component
  //       {
  //         componentId: 'area:eventheads:home:header',
  //         type: 'component',
  //         partition: 'eventheads',
  //         name: 'header',
  //         areaId: 'area:eventheads:home',
  //
  //         // component type and other attributes
  //         componentType: 'header',
  //         image: {
  //           // image attributes
  //         },
  //       },
  //
  //       // an about component
  //       {
  //         componentId: 'area:eventheads:home:about',
  //         type: 'component',
  //         partition: 'eventheads',
  //         name: 'about',
  //         areaId: 'area:eventheads:home',
  //
  //         // component type and other attributes
  //         componentType: 'about',
  //       },
  //
  //       // an advertisements list component
  //       {
  //         componentId: 'area:eventheads:home:advertisements',
  //         type: 'component',
  //         partition: 'eventheads',
  //         name: 'advertisement',
  //         areaId: 'area:eventheads:home',
  //
  //         // component type and other attributes
  //         componentType: 'advertisementsList',
  //         advertisements: [
  //           {
  //             // ... see Advertisement for Schema
  //           }
  //         ]
  //       },
  //
  //       // and events list component
  //       {
  //         componentId: 'area:eventheads:home:events',
  //         type: 'component',
  //         partition: 'eventheads',
  //         name: 'events',
  //         areaId: 'area:eventheads:home',
  //
  //         // component type and other attributes
  //         componentType: 'advertisementsList',
  //         events: [
  //           {
  //             // ... see Event for Schema
  //           }
  //         ]
  //       }
  //     ],
  //
  //     // ... other attributes
  //   }
  // ],

  /**
   * The list of CreatingArea(s)
   */
  creatingAreas: [],

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
   * Set the Areas to whatever is supplied.
   *
   * @param state
   * @param areas []
   *
   */
  setAreas (state, areas = []) {
    state.areas = areas || [];
  },

  /**
   * Update the supplied Area.
   *
   * @param state
   * @param area {{ areaId: string}}
   */
  updateArea (state, area) {
    const {areaId} = area;
    const index = state.areas.findIndex(item =>  item.areaId === areaId);

    if (index < 0) {
      state.areas.push(area);
    } else {
      state.areas.splice(index, 1, {...state.areas[index], ...area})
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
   * Update the supplied CreatingArea.
   *
   * @param state
   * @param creatingArea {{name: string }}
   */
  updateCreatingArea (state, creatingArea) {
    const {name} = creatingArea;
    const index = state.creatingAreas.findIndex(area => area.name === name);

    if (index < 0) {
      state.creatingAreas.push(creatingArea)
    } else {
      state.creatingAreas.splice(index, 1, {...state.creatingAreas[index], ...creatingArea});
    }
  },

  /**
   * Update the supplied Component.
   *
   * @param state
   * @param component {{ componentId: string}}
   */
  updateComponentWithAreaId (state, component) {
    const {componentId, areaId} = component;

    const area = state.areas.find(area => area.areaId === areaId)

    if (area && area?.components) {
      const index = area.components.findIndex(item =>  item.componentId === componentId);

      if (index < 0) {
        area.components.push(component);
      } else {
        area.components.splice(index, 1, {...area.components[index], ...component})
      }
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
   * Return the Areas.
   *
   * @param state
   * @return {[]|*[]}
   */
  areas: (state) => {
    return state.areas || [];
  },

  areaWithAreaId: (state) => (areaId) => {
    return state.areas.find(area => area.areaId === areaId);
  },

  numberOfAreas: (state) => {
    return state.areas.length || 0;
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
   * Return the CreatingArea identified by the supplied executionArn.
   *
   * @param state
   * @return {function(*): *}
   */
  creatingAreaWithExecutionArn: (state) => (executionArn) => {
    return state.creatingAreas.find(creatingArea => creatingArea.executionArn === executionArn);
  },

  /**
   * Return the List of Components associated with an AreaId.
   *
   * @param state
   * @return {function(string): []}
   */
  componentsWithAreaId: (state) => (areaId) => {
    return state.areas.find(area => area.areaId === areaId)?.components || [];
  },

  /**
   * Return the List of Components associated with an AreaId.
   *
   * @param state
   * @return {function(string, string): []}
   */
  componentWithAreaIdAndComponentType: (state) => (areaId, componentType) => {
    let componentWithComponentType = null;

    const area = state.areas.find(area => area.areaId === areaId)
    if (! area) return componentWithComponentType

    if (area?.components) {
      componentWithComponentType = area.components.find(component => component.componentType === componentType)
    }

    return componentWithComponentType;
  },

  // /**
  //  * Return the Component by componentId associated with an AreaId.
  //  *
  //  * @param state
  //  * @return {function(string, string): []}
  //  */
  // componentWithAreaIdAndComponentId: (state) => (areaId, componentId) => {
  //   let componentWithComponentId = null;
  //
  //   const area = state.areas.find(area => area.areaId === areaId)
  //   if (! area) return componentWithComponentId
  //
  //   if (area?.components) {
  //     componentWithComponentId = area.components.find(component => component.componentId === componentId)
  //   }
  //
  //   return componentWithComponentId;
  // },


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
   * Load the store with a list of Areas.
   *
   * @param commit
   * @return {Promise<void>}
   */
  async load ({commit}) {
    try {
      commit('loading', true);
      let {areas, token} = await this.$api('admin').areas.listAreas();

      areas.map(area => commit('updateArea',  {
        ...area,
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
    commit('setAreas', []);
  },

  async reload({dispatch}) {
    await dispatch('unload');
    await dispatch('load');
  },

  async loadAreaWithAreaId ({commit}, areaId) {
    let areaToLoad = {
      areaId,
      loading: true,
      loaded: false,
    };

    try {
      commit('updateArea', areaToLoad);
      const area = await this.$api('admin').areas.getAreaWithAreaId(areaId);

      areaToLoad = {
        ...area,
        ...{
          loading: false,
          loaded: true
        }
      };
      commit('updateArea', areaToLoad);

    } catch (error) {
      const {message} = error;
      areaToLoad = {
        ...areaToLoad,
        ...{
          loading: false,
          loaded: false,
          error: message
        }
      };
      commit('updateArea', areaToLoad);
    }
  },

  async loadComponentsWithAreaId ({commit, getters}, areaId) {
    let areaToLoad = {
      areaId,
      componentsLoading: true,
      componentsLoaded: false
    };

    try {
      commit('updateArea', areaToLoad);

      // find area with areaId in the store
      const area = getters.areaWithAreaId(areaId)

      const {components} = await this.$api('admin').areas.listComponentsWithAreaId(areaId);

      // attach the components list to the area
      area.components = components.map((component) => {
        return {
          ...component,
          ...{
            error: undefined,
            loading: false,
            loaded: true
          }
        }
      });

      areaToLoad = {
        ...area,
        ...{
          componentsLoading: false,
          componentsLoaded: true
        }
      };
      commit('updateArea', areaToLoad);

    } catch (error) {
      const {message} = error;
      areaToLoad = {
        ...areaToLoad,
        ...{
          componentsLoading: false,
          componentsLoaded: false,
          error: message
        }
      };
      commit('updateArea', areaToLoad);
    }
  },

  async loadComponentWithComponentId ({commit, getters}, payload) {
    const { componentId, areaId } = payload
    let areaToLoad = getters.areaWithAreaId(areaId)

    try {
      areaToLoad.components = areaToLoad.components.map((component) => {
        if (component.componentId === componentId) {
          return {
            ...component,
            ...{
              error: undefined,
              loading: true,
              loaded: false
            }
          }
        }

        return component
      })

      commit('updateArea', areaToLoad);
      const componentWithComponentId = await this.$api('admin').areas.getComponentWithComponentId(componentId, areaId);

      areaToLoad.components = areaToLoad.components.map((component) => {
        if (component.componentId === componentId) {
          return {
            ...componentWithComponentId,
            ...{
              error: undefined,
              loading: false,
              loaded: true
            }
          }
        }

        return component
      })
      commit('updateArea', areaToLoad);

    } catch (error) {
      const {message} = error;
      areaToLoad.components = areaToLoad.components.map((component) => {
        if (component.componentId === componentId) {
          return {
            ...component,
            ...{
              loading: false,
              loaded: false,
              error: message
            }
          }
        }

        return component
      })
      commit('updateArea', areaToLoad);
    }
  },

  /**
   * Create a new Area.
   *
   * @param commit
   * @param area {{ name: string }}
   * @return {Promise<void>}
   */
  async createArea ({commit}, area) {
    const {name} = area;

    if (! name) {
      throw new Error(`name is a required attribute when creating an Area.`)
    }

    let areaToCreate = {
      ...area,
      ...{
        error: undefined,
        creating: true,
      }
    };
    commit('updateCreatingArea', areaToCreate);

    try {
      const creatingArea = await this.$api('admin').areas.createArea(area);
      const {executionArn} = creatingArea;

      areaToCreate = {
        ...areaToCreate,
        ...creatingArea
      };
      commit('updateCreatingArea', areaToCreate);

      // polling
      ((executionArn) => {

        const getExecution = async () => {
          areaToCreate = {
            ...areaToCreate,
            ...{
              loading: true
            }
          };
          commit('updateCreatingArea', areaToCreate);

          const execution = await this.$api('admin').executions.getExecutionWithExecutionArn(executionArn);
          const {status, stopDate} = execution;

          areaToCreate = {
            ...areaToCreate,
            ...{
              loading: false,
              status,
              stopDate
            }
          };
          commit('updateCreatingArea', areaToCreate);

          if (status === 'RUNNING') {
            setTimeout(getExecution, 2000);
          }

          if (status === 'FAILED') {
            console.log('## CREATE ADDRESS - FAILED');
          }

          if (status === 'SUCCEEDED') {
            let {output} = execution;
            output = JSON.parse(output);

            let {error, area: createdArea} = output;

            if (error) {
              areaToCreate = {
                ...areaToCreate,
                ...{
                  error,
                  creating: false,
                  loaded: false
                }
              };
              commit('updateCreatingArea', areaToCreate);
            }

            if (createdArea) {
              areaToCreate = {
                ...areaToCreate,
                ...createdArea,
                ...{
                  created: true,
                  creating: false,
                  loaded: true
                }
              };
              commit('updateCreatingArea', areaToCreate);

              createdArea = {
                ...createdArea,
                ...{
                  loading: false,
                  loaded: true,
                  error: undefined
                }
              };
              commit('updateArea', createdArea);

            }
          }
        };

        setTimeout(getExecution, 1000);
      })(executionArn);

      return creatingArea;

    } catch (error) {
      const {message} = error;
      areaToCreate = {
        ...areaToCreate,
        ...{
          error: message,
          creating: false,
        }
      };
      commit('updateCreatingArea', areaToCreate);

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
    delete updateComponent.areaId

    let componentUpdate = {
      componentId,
      updateComponent,
      updating: true,
      updated: false,
    }

    try {
      const updatingComponent = await this.$api('admin').areas.updateComponentWithComponentId(componentId, areaId, updateComponent);
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

              const updateComponentWithAreaId = {
                ...updatedComponent,
                ...{
                  loaded: true,
                  loading: false,
                }
              };
              commit('updateComponentWithAreaId', updateComponentWithAreaId);
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

